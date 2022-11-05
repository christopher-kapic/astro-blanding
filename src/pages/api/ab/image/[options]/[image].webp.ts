import sharp from 'sharp'
// import fetch from 'isomorphic-unfetch';

// Convert option in a string format to a key-value pair
// key=value   { [key]: value }
// key         { [key]: true }
const optionToKeyVal = (option) =>
  ((split) =>
    split.length > 0
      ? { [split[0]]: split.length > 1 ? split[1] : true }
      : undefined)(option.split('='));

// Parse options string and return options object
const parseOptions = (options) => {
  return options
    .split('&')
    .reduce((acc, option) => ({ ...acc, ...optionToKeyVal(option) }), {});
};

export async function get({response, params}: {response: Response, params: any}) {
  const cacheMaxAge = 60 * 60 * 24 // 24 hours

  const { options, image } = params;

  // Would be nice to handle relative routes like `/github/lighthouse.png`
  // instead of `http://localhost:3000/github/lighthouse.png`
  const decodedUrl = decodeURIComponent(image);
  const parsedOptions = parseOptions(options);

  const readStream = await fetch(decodedUrl);

  const transform = sharp()
    .resize(
      parsedOptions.w ? Number(parsedOptions.w) : undefined,
      parsedOptions.h ? Number(parsedOptions.h) : undefined,
      { fit: 'cover' }
    )
    .webp({ progressive: true });

  const headers = new Headers();
  headers.append('Content-Type', 'image/webp');
  headers.append('Cache-Control', `public, max-age=${cacheMaxAge}`);

  return {
    body: readStream.body.pipe(transform),
    encoding: 'binary',
  }
}