import type { Message } from "@bufbuild/protobuf";
import type { Route } from "playwright-core";

// TODO: Refactor and publish this from `frontend-reactor`.

// This is a shortened version of the `enc.ts` file from the `frontend-reactor`:
// https://github.com/SafetyCulture/frontend-reactor/blob/master/cypress-ui-tests/cypress/support/grpc.ts
//
// Additional methods may be available in that file.

/**
 * Adds 5 bytes to the beginning of the payload. The first byte indicates if the
 * message is compressed or not. The next 4 bytes are the size of the rest of
 * the message.
 */
const addSize = (serialized: Uint8Array) => {
  let len = serialized.length;
  const bytesArray = [0, 0, 0, 0, 0];
  const payload = new Uint8Array(5 + serialized.length);
  for (let i = 4; i >= 1; i--) {
    bytesArray[i] = len % 256;

    len = len >>> 8;
  }
  payload.set(new Uint8Array(bytesArray));
  payload.set(serialized, 5);
  return payload;
};

/**
 * Adds the trailer back onto the message. This is not perfect, as it assumes
 * that request was successful, and the trailer is always the same.
 */
const addTrailer = (serialized: Uint8Array) => {
  const byteArray = [
    128, 0, 0, 0, 15, 103, 114, 112, 99, 45, 115, 116, 97, 116, 117, 115, 58,
    48, 13, 10,
  ];
  const payload = new Uint8Array(serialized.length + byteArray.length);
  payload.set(serialized, 0);
  payload.set(new Uint8Array(byteArray), serialized.length);
  return payload;
};

/**
 * Converts a protobuf message into a connect-web response, including the
 * connect-web trailers. connect-web responses are not base64 encoded.
 *
 * Based on `ConnectWebResponse` from `frontend-reactor`.
 */
function convertGrpcBody(message?: Message): Buffer {
  const body = message
    ? addTrailer(addSize(message.toBinary()))
    : addTrailer(addSize(new Uint8Array(0)));

  return Buffer.from(body);
}

type PlaywrightRouteOptions = NonNullable<Parameters<Route["fulfill"]>[0]>;

type PartialPlaywrightResponse = Pick<
  PlaywrightRouteOptions,
  "body" | "contentType" | "status"
>;

/** Creates a partial Playwright response for a given protobuf message. */
export function createPlaywrightResponse(
  message?: Message,
): PartialPlaywrightResponse {
  return {
    body: convertGrpcBody(message),
    contentType: "application/grpc-web+proto",
    status: 200,
  };
}
