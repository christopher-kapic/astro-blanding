import nodeHtmlToImage from "node-html-to-image";

export async function get({request}: {request: Request}) {
  const cacheMaxAge = 30 * 60; // 30 minutes

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
  headers.append('cache-control', `public, max-age=${cacheMaxAge}`)
  headers.append('content-type', 'image/png')

  return {
    body: image,
    encoding: 'binary',
    headers: headers
  }
}