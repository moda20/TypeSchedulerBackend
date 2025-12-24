import config from "@config/config";
import axios from "axios";

export default axios;

export const lokiHttpService = axios.create({
  baseURL: config.get("grafana.lokiUrl") || "",
  adapter: "fetch",
  timeout: 60000,
});

export const GotifyHttpService = axios.create({
  baseURL: config.get("gotify.url") || "",
  adapter: "fetch",
  headers: {
    Authorization: `Bearer ${config.get("gotify.token")}`,
  },
  params: {
    token: config.get("gotify.appToken"),
  },
  timeout: 60000,
});

export const NtfyHttpService = axios.create({
  baseURL: config.get("ntfy.url") || "",
  adapter: "fetch",
  headers: {
    Authorization: `Bearer ${config.get("ntfy.token")}`,
  },
  timeout: 60000,
});
