import { encode } from 'blurhash';
import { config } from 'src/config'
import sharp from 'sharp';

const encodeImageToBlurhash = (path: Buffer): Promise<string> =>
  new Promise((resolve, reject) => {
    sharp(path)
      .raw()
      .ensureAlpha()
      .resize(32, 32, { fit: "inside" })
      .toBuffer((err, buffer, { width, height }) => {
        if (err) return reject(err);
        resolve(encode(new Uint8ClampedArray(buffer), width, height, 4, 4));
      });
  });

export async function get({response, params}: {response: Response, params: any}) {
  const { image } = params;

  // Would be nice to handle relative routes like `/github/lighthouse.png`
  // instead of `http://localhost:3000/github/lighthouse.png`
  const decodedUrl = decodeURIComponent(image);

  const input = await fetch(decodedUrl);

  const arrayBuffer = await input.arrayBuffer();

  const buffer = Buffer.from(arrayBuffer);

  const blurhash = await encodeImageToBlurhash(buffer);

  return new Response(JSON.stringify({blurhash: blurhash}), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": `public, max-age=${config.imageOptimization.cache.preview.maxAge}, s-maxage=${config.imageOptimization.cache.preview.sMaxAge}`
    }
  });
}