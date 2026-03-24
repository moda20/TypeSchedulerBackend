import config from "@config/config";
import axios from "axios";

axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default axios;

const createHttpService = (config: any) => {
  const newService = axios.create(config);
  newService.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error),
  );
  return newService;
};

export const lokiHttpService = createHttpService({
  baseURL: config.get("grafana.lokiUrl") || "",
  adapter: "fetch",
  timeout: 60000,
});

export const GotifyHttpService = createHttpService({
  baseURL: config.get("notifications.gotify.url") || "",
  adapter: "fetch",
  headers: {
    Authorization: `Bearer ${config.get("notifications.gotify.token")}`,
  },
  params: {
    token: config.get("notifications.gotify.appToken"),
  },
  timeout: 60000,
});

export const NtfyHttpService = createHttpService({
  baseURL: config.get("notifications.ntfy.url") || "",
  adapter: "fetch",
  headers: {
    Authorization: `Bearer ${config.get("notifications.ntfy.token")}`,
  },
  timeout: 60000,
});
