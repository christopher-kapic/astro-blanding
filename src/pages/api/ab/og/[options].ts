import nodeHtmlToImage from "node-html-to-image";
import { config } from "src/config";

interface Type {
  width: number;
  height: number;
  h1: number;
}

const standardImageDims: { standard: Type, twitter: Type, discord: Type } = {
  standard: { // facebook, google
    width: 1200,
    height: 630,
    h1: 72,
  },
  twitter: {
    width: 1200, // 4096,
    height: 600, //2048
    h1: 72,
  },
  discord: {
    width: 1200,
    height: 1200,
    h1: 140,
  },
}

export async function get({request, params}: {request: Request, params: any}) {
  const {options} = params;

  const test = encodeURIComponent(JSON.stringify({site: "standard"}))

  const parsedOptions = JSON.parse(decodeURIComponent(test))
  const { site }: { site: string } = parsedOptions;

  const html = `
  <html style="margin: 0px; padding: 0px; height: ${standardImageDims[site].height + 16 /* add 16 bc it was always short 16px, not sure why */}px; width: ${standardImageDims[site].width + 16}px;">
    <body style="
    padding: 64px;
    background-color:#ffd599;
    background-image:
    radial-gradient(at 43% 28%, hsla(199,68%,65%,1) 0px, transparent 50%),
    radial-gradient(at 1% 92%, hsla(73,90%,66%,1) 0px, transparent 50%),
    radial-gradient(at 83% 74%, hsla(74,91%,76%,1) 0px, transparent 50%),
    radial-gradient(at 57% 41%, hsla(354,74%,72%,1) 0px, transparent 50%),
    radial-gradient(at 84% 97%, hsla(180,80%,70%,1) 0px, transparent 50%),
    radial-gradient(at 96% 44%, hsla(153,79%,79%,1) 0px, transparent 50%),
    radial-gradient(at 89% 44%, hsla(297,64%,76%,1) 0px, transparent 50%);
    ">
      <div style="background-color: #202124; color: white; font-family: sans-serif;
      padding: 64px;
      box-sizing: border-box; height: 100%; width: 100%">
        <h1 style="font-size: ${
          site === "discord" ? 120 : 60
        }px;">astro-blanding</h1>
        <h2 style="font-size: 48px;">The perfect starter for your <em>Astro</em> project.</h2>
        <h2 style="font-size: 32px;">Check it out on Github today.</h2>
      </div>
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