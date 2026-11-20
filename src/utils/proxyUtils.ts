import { proxy, proxy_job } from "@generated/prisma";
import {
  getJobProxies,
  incrementProxyInjection,
  incrementProxyUsage,
} from "@repositories/proxies";
import { LogEventNames } from "@typesDef/api/jobs";
import {
  ProxyManagerConstructorInterface,
  proxyPickingStrategy,
} from "@typesDef/proxies";
import defaultAxiosInstance from "@utils/httpRequestConfig";
import { eventLog } from "@utils/loggers";
import type { AxiosInstance } from "axios";
import { fetch as bunFetch } from "netbun";

export const injectProxyIntoInstance = (
  proxy: proxy,
  axiosInstance: AxiosInstance,
  logger?: (x: any) => void,
) => {
  const isSocksProxy = proxy.protocol?.includes("socks");
  if (isSocksProxy) {
    logger &&
      logger(
        "!!WARNING!! Using socks proxy will use a custom fetch function, this will override the default adapter. Check here : https://github.com/oven-sh/bun/issues/16812",
      );
    const proxyUrl = `${proxy.protocol}://${proxy.username ? proxy.username + ":" + proxy.password + "@" : ""}${proxy.proxy_ip}:${proxy.proxy_port}`;
    // TODO as of this addition, bun doesn't fully or partially support socks5 proxies,
    // so we are going to use a custom fetch function to handle the socks for now.
    // socks proxy is inadvised for now, as this might expose more problems in the future
    axiosInstance.defaults.adapter = "fetch";

    axiosInstance.defaults.env = {
      fetch: (req, init) => {
        return bunFetch(req, {
          ...init,
          proxy: proxyUrl,
        });
      },
    };
  } else {
    axiosInstance.defaults.proxy = {
      host: proxy.proxy_ip,
      port: proxy.proxy_port,
      protocol: proxy.protocol,
      auth: proxy.username
        ? {
            username: proxy.username,
            password: proxy.password,
          }
        : undefined,
    };
  }

  return axiosInstance;
};

export const getProxyConfigWithStrategy = (
  proxies: proxy_job[],
  strategy?: proxyPickingStrategy,
  targetId?: number,
) => {
  if (!strategy) return proxies[0];
  switch (strategy) {
    case proxyPickingStrategy.RANDOM:
      return proxies[Math.floor(Math.random() * proxies.length)];
    case proxyPickingStrategy.ROUND_ROBIN:
      return proxies.sort((a, b) =>
        a.injection_count > b.injection_count ? 1 : -1,
      )[0];
    case proxyPickingStrategy.LEAST_USED:
      return proxies.sort((a, b) => (a.use_count > b.use_count ? 1 : -1))[0];
    case proxyPickingStrategy.SPECIFIC:
      return proxies.find((p) => p.proxy_id === targetId);
    default:
      throw new Error("Invalid proxy picking strategy");
  }
};

export const injectProxy = async ({
  jobId,
  axiosInstance,
  logger,
  proxyStrategy,
  targetProxyId,
}: {
  jobId: number;
  axiosInstance: AxiosInstance;
  logger?: any;
  proxyStrategy?: proxyPickingStrategy;
  targetProxyId?: number;
}) => {
  const sysLog = eventLog(LogEventNames.SysLogEvent);
  const targetJob = await getJobProxies(Number(jobId));
  if (targetJob?.proxies?.length) {
    type extPRoxyJob = (typeof targetJob.proxies)[0];
    const proxyJob = getProxyConfigWithStrategy(
      targetJob.proxies,
      proxyStrategy,
      targetProxyId,
    ) as extPRoxyJob;
    const proxy = proxyJob?.proxy;

    logger &&
      logger(
        `Using ${proxyStrategy} strategy to pick from ${targetJob.proxies?.length} proxies`,
      );

    if (proxy) {
      logger && logger(`proxy ${proxy.proxy_ip}:${proxy.proxy_port} injected`);

      injectProxyIntoInstance(proxy, axiosInstance, logger);

      const proxyUsageInterceptor = axiosInstance.interceptors.request.use(
        (config) => {
          incrementProxyUsage(proxyJob.id).then().catch(sysLog.warn);
          return config;
        },
      );

      incrementProxyInjection(proxyJob.id).then().catch(sysLog.warn);
      return {
        ...proxy,
        password: "***",
        proxyUsageInterceptor,
      };
    } else {
      logger &&
        logger.warn(`No proxy was picked based on strategy : ${proxyStrategy}`);
    }
  }
};

export class ProxyManager {
  jobId: number;
  defaultAxiosInstance: AxiosInstance;
  proxyStrategy?: proxyPickingStrategy;
  targetProxyId?: number;
  logger: (data: any) => void = console.log;
  // a map between the axios instance and a single interceptor id.
  instanceMap: Map<AxiosInstance, number> = new Map();
  constructor({
    defaultAxiosInstance,
    logger,
    proxyStrategy,
    targetProxyId,
    jobId,
  }: ProxyManagerConstructorInterface) {
    this.jobId = jobId;
    this.defaultAxiosInstance = defaultAxiosInstance;
    this.proxyStrategy = proxyStrategy;
    this.targetProxyId = targetProxyId;
    this.logger = logger;
  }

  private async injectAndSaveProxies(args: Parameters<typeof injectProxy>[0]) {
    const injectionResult = await injectProxy(args);
    if (injectionResult?.proxyUsageInterceptor !== undefined) {
      this.instanceMap.set(
        args.axiosInstance,
        injectionResult.proxyUsageInterceptor,
      );
    }
    return injectionResult;
  }

  async injectProxies() {
    return this.injectAndSaveProxies({
      jobId: this.jobId,
      axiosInstance: this.defaultAxiosInstance,
      logger: this.logger,
      proxyStrategy: this.proxyStrategy,
      targetProxyId: this.targetProxyId,
    });
  }

  async reInjectProxies(
    newStrategy?: proxyPickingStrategy,
    newProxyTargetId?: number,
  ) {
    this.uninjectProxies(this.defaultAxiosInstance);
    return this.injectAndSaveProxies({
      jobId: this.jobId,
      axiosInstance: this.defaultAxiosInstance,
      logger: this.logger,
      proxyStrategy: newStrategy ?? this.proxyStrategy,
      targetProxyId: newProxyTargetId ?? this.targetProxyId,
    });
  }

  async injectProxiesIntoANewClient(
    targetInstance?: AxiosInstance,
    proxyStrategy?: proxyPickingStrategy,
    newProxyTargetId?: number,
  ) {
    const newInstance = targetInstance ?? defaultAxiosInstance.create();
    this.uninjectProxies(newInstance);
    await this.injectAndSaveProxies({
      jobId: this.jobId,
      axiosInstance: newInstance,
      logger: this.logger,
      proxyStrategy: proxyStrategy ?? this.proxyStrategy,
      targetProxyId: newProxyTargetId ?? this.targetProxyId,
    });
    return newInstance;
  }

  uninjectProxies(targetInstance: AxiosInstance) {
    delete targetInstance.defaults.env?.fetch;
    delete targetInstance.defaults.proxy;
    if (this.instanceMap.has(targetInstance)) {
      const interceptorId = this.instanceMap.get(targetInstance);
      if (interceptorId === undefined) {
        this.logger(
          "A proxy interceptor id was not found, even though the it was registered",
        );
        return;
      }
      targetInstance.interceptors.request.eject(interceptorId);
      this.instanceMap.delete(targetInstance);
    }
    return targetInstance;
  }

  /**
   * Clears all interceptors from the instance map
   * This will not clear the injection count, only the usage count interceptors.
   * Use only if you want to destroy axios references to garbage collect the proxy manager.
   */
  clearInterceptors() {
    for (const [instance, id] of this.instanceMap.entries()) {
      instance.interceptors.request.eject(id);
      this.instanceMap.delete(instance);
    }
  }
}
