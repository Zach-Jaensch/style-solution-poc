import Document from "next/document";
import type { DocumentContext, DocumentInitialProps } from "next/document";
import { ServerStyleSheet } from "styled-components";

interface DocumentProps {
  nonce: string;
}

export default class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps & DocumentProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      // nonce is not currently used in due to limitations with static page generation and styled components
      // however the implementation is here for future use
      // https://github.com/styled-components/styled-components/issues/3468#issuecomment-895474540
      // https://github.com/vercel/next.js/discussions/49648#discussioncomment-6889976

      const nonce = ctx.req?.headers["x-nonce"] as string;
      return {
        ...initialProps,
        nonce: nonce,
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }
}
