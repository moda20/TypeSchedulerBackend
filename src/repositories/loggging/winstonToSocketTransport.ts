import Transport from "winston-transport";

interface CustomTransportOptions extends Transport.TransportStreamOptions {
  logFn: (info: any) => void;
}

export class WinstonToSocketTransport extends Transport {
  private logFn: (info: any) => void;

  constructor(opts: CustomTransportOptions) {
    super(opts);
    this.logFn = opts.logFn;
  }

  log(info: any, callback: () => void) {
    setImmediate(() => this.emit("logged", info));

    try {
      this.logFn(info);
    } catch (err) {
      this.emit("error", err);
    }

    callback();
  }
}
