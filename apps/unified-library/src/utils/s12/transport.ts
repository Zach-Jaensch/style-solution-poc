import type { GrpcWebTransportOptions } from "@bufbuild/connect-web";
import { createGrpcWebTransport } from "@bufbuild/connect-web";
import { S12_API_URL } from "./constants";

const API_V3_PATH = "/api/v3";
const GRPC_DEV_TOOLS_EVENT_NAME = "connect-web-dev-tools-ready";

const publicInterceptors: NonNullable<GrpcWebTransportOptions["interceptors"]> =
  [];

function addDevToolsInterceptor() {
  if (
    "__CONNECT_WEB_DEVTOOLS__" in global &&
    typeof global.__CONNECT_WEB_DEVTOOLS__ === "function"
  ) {
    publicInterceptors.push(
      global.__CONNECT_WEB_DEVTOOLS__ as (typeof publicInterceptors)[number],
    );
    window.removeEventListener(
      GRPC_DEV_TOOLS_EVENT_NAME,
      addDevToolsInterceptor,
    );
  }
}

addDevToolsInterceptor();

if ("window" in global) {
  // https://github.com/SafetyCulture/grpc-web-devtools?tab=readme-ov-file#connect-web
  window.addEventListener(GRPC_DEV_TOOLS_EVENT_NAME, addDevToolsInterceptor);
}

const publicOptions: GrpcWebTransportOptions = {
  baseUrl: API_V3_PATH,
  interceptors: publicInterceptors,
  // uncomment if sentry is not picking up these requests
  // https://github.com/SafetyCulture/frontend-reactor/pull/14023
  // fetch: (...args) => fetch(...args),
};

export const publicTransport = createGrpcWebTransport(publicOptions);

const publicServerOptions: GrpcWebTransportOptions = {
  baseUrl: new URL(API_V3_PATH, S12_API_URL).toString(),
  fetch(input, init) {
    const request = new Request(input, init);
    // eslint-disable-next-line lingui/no-unlocalized-strings -- Not displayed in UI
    request.headers.set("Origin", S12_API_URL);
    return fetch(input, init);
  },
};

export const publicServerSideTransport =
  createGrpcWebTransport(publicServerOptions);
