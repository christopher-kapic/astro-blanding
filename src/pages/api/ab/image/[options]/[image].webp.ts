import sharp from 'sharp'
import { config } from 'src/config';
// import fetch from 'isomorphic-unfetch';

// Convert option in a string format to a key-value pair
// key=value   { [key]: value }
// key         { [key]: true }
const optionToKeyVal = (option: string) =>
  ((split) =>
    split.length > 0
      ? { [split[0]]: split.length > 1 ? split[1] : true }
      : undefined)(option.split('='));

// Parse options string and return options object
const parseOptions = (options: string) => {
  return options
    .split('&')
    .reduce((acc, option) => ({ ...acc, ...optionToKeyVal(option) }), {});
};

export async function get({response, params}: {response: Response, params: any}) {
  const { options, image } = params;

  // Would be nice to handle relative routes like `/github/lighthouse.png`
  // instead of `http://localhost:3000/github/lighthouse.png`
  const decodedUrl = decodeURIComponent(image);
  const parsedOptions = parseOptions(options);
  console.log(parsedOptions.q)

  const readStream = await fetch(decodedUrl);

  const transform = sharp()
    .resize(
      parsedOptions.w ? Number(parsedOptions.w) : undefined,
      parsedOptions.h ? Number(parsedOptions.h) : undefined,
      { fit: 'cover' }
    )
    .webp({ quality: Number(parsedOptions.q) || 80 });

  const headers = new Headers();
  headers.append('Content-Type', 'image/webp');
  headers.append('Cache-Control', `public, max-age=${config.imageOptimization.cache.image.maxAge}, s-maxage=${config.imageOptimization.cache.image.sMaxAge}`);

  return {
    body: readStream.body.pipe(transform),
    encoding: 'binary',
  }
}