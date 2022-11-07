import { encode } from "blurhash";
import { createCanvas, loadImage, Image } from 'canvas'
import { config } from 'src/config'

const getImageData = (image: Image) => {
  const canvas = createCanvas(image.width, image.height)
  const context = canvas.getContext('2d')
  context.drawImage(image, 0, 0)
  return context.getImageData(0, 0, image.width, image.height)
}

// Open-source help requested: use sharp instead of canvas
// import sharp from 'sharp';

// const encodeImageToBlurhash = (path: string): Promise<string> =>
//   new Promise((resolve, reject) => {
//     sharp(path)
//       .raw()
//       .ensureAlpha()
//       .resize(32, 32, { fit: "inside" })
//       .toBuffer((err, buffer, { width, height }) => {
//         if (err) return reject(err);
//         resolve(encode(new Uint8ClampedArray(buffer), width, height, 4, 4));
//       });
//   });

export async function get({response, params}: {response: Response, params: any}) {
  const { image } = params;

  // Would be nice to handle relative routes like `/github/lighthouse.png`
  // instead of `http://localhost:3000/github/lighthouse.png`
  const decodedUrl = decodeURIComponent(image);

  const decodedImage = await loadImage(decodedUrl)
  const imageData = getImageData(decodedImage)
  const blurhash = encode(
    imageData.data,
    imageData.width,
    imageData.height,
    4,
    4
  )

  return new Response(JSON.stringify({blurhash: blurhash}), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": `public, max-age=${config.imageOptimization.cache.preview.maxAge}, s-maxage=${config.imageOptimization.cache.preview.sMaxAge}`
    }
  });
}