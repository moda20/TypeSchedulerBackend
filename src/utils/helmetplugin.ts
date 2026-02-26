// helmet.plugin.ts
import { helmet } from "elysia-helmet";

export const helmetPlugin = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'", "unpkg.com"],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        "cdn.jsdelivr.net",
        "fonts.googleapis.com",
        "unpkg.com",
      ],
      fontSrc: ["'self'", "fonts.gstatic.com", "data:"],
      imgSrc: ["'self'", "data:", "cdn.jsdelivr.net"],
      scriptSrc: [
        "'self'",
        "https: 'unsafe-inline'",
        "cdn.jsdelivr.net",
        "'unsafe-eval'",
      ],
    },
  },
});
