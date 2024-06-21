import type { NextApiRequest, NextApiResponse } from "next";
import { createProxyMiddleware } from "http-proxy-middleware";
import { S12_API_URL } from "#/utils/s12/consts";

const proxy = createProxyMiddleware({
  target: S12_API_URL,
  changeOrigin: true,
});

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  proxy(req, res, (result: unknown) => {
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
