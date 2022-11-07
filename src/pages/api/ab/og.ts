import nodeHtmlToImage from "node-html-to-image";
import { config } from "src/config";

export async function get({request}: {request: Request}) {
  const html = `
  <html>
    <body style="height: 100; width: 120;">
      <div>Check out what I just did! #cool</div>
    </body>
  </html>
  `

  const image = await nodeHtmlToImage({
    html: html
  });

  let headers = new Headers()
  headers.append('cache-control', `public, max-age=${config.imageOptimization.cache.og.maxAge}, s-maxage=${config.imageOptimization.cache.og.sMaxAge}`)
  headers.append('content-type', 'image/png')

  return {
    body: image,
    encoding: 'binary',
    headers: headers
  }
}