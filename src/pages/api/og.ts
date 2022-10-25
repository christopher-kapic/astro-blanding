// import queryStringToJSON from "@utils/QueryStringtoJSON"; // This should be built in to JavaScript, but it is not.
import nodeHtmlToImage from "node-html-to-image";

export async function get({request}: {request: Request}) {
  // const body = queryStringToJSON(await request.text())
  // console.log(body)
  const image = await nodeHtmlToImage({
    html: '<html><body style="height: 100; width: 120;"><div>Check out what I just did! #cool</div></body></html>'
  });

  // Headers do not yet work.
  let headers = new Headers()
  headers.append('name', 'christopher')

  return {
    body: image,
    encoding: 'binary',
    headers: headers
  }
}