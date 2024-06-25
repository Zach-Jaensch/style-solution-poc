import { createProxyMiddleware } from "http-proxy-middleware";
import type { NextApiRequest, NextApiResponse } from "next";
import { S12_API_URL } from "#/utils/s12/constants";

const proxy = createProxyMiddleware({
  target: S12_API_URL,
  changeOrigin: true,
});

interface ResponseData {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  await proxy(req, res, (result: unknown) => {
    if (result instanceof Error) {
      throw result;
    }
  });
}

export const config = {
  api: {
    externalResolver: true,
    // https://github.com/chimurai/http-proxy-middleware/issues/795#issuecomment-1314464432
    bodyParser: false,
  },
};
