<script lang="ts">
  import { decode } from "blurhash";
  import { onMount } from "svelte";
  import { url } from "@utils/GetURL";


  let w: number;
  let h: number;
  export let quality: number = 80;
  export let src: string;
  export let height: number | string | undefined = undefined;
  export let width: number | string | undefined = undefined;
  export let alt: string;
  export let fill: boolean = false;
  export let priority: boolean = false;
  export let style: string = "";
  export let className: string = "";
  export let preview: string | undefined = undefined;

  let canvas: HTMLCanvasElement;

  let fullSrc: string = src;
  if (src[0] === "/") {
    fullSrc = url + src;
  }

  if (src === "src") {
    console.error(`Got src="src" in <Image />. Are you sure you didn't mean src={src}?`);
  }

  if ((!fill && !height) || (!fill && !width)) {
    console.error("Fill is not set, expecting `fill` or `width` and `height` props in <Image />");
  }

  onMount(async () => {
    let blurhash: any;
    if (!preview) {
      const res = await fetch(
        `/api/ab/image/blurhash/${encodeURIComponent(fullSrc)}`
      );
      const json = await res.json();
      blurhash = json.blurhash;
    } else {
      const wrapper = async () => {
        return preview
      }
      blurhash = await wrapper(); // Is there a way to do this without a wrapper?
    }

    const pixels = decode(blurhash, Number(w), Number(h));
    const ctx = canvas.getContext("2d");
    const imageData = ctx!.createImageData(Number(w), Number(h));
    imageData.data.set(pixels);
    ctx!.putImageData(imageData, 0, 0);

    return () => {};
  });
</script>

<div
  bind:clientHeight={h}
  bind:clientWidth={w}
  style={fill
    ? `width: 100%; height: 100%;`
    : `width: ${Number(width)}px; height: ${Number(height)}px;`}
>
  <canvas width={w} height={h} bind:this={canvas} />
  <img
    alt={alt}
    height={h}
    width={w}
    src={`/api/ab/image/w=${width ? width : w}&h=${
      height ? height : h
    }&q=${quality}/${encodeURIComponent(fullSrc)}.webp`}
    loading={priority ? "eager" : "lazy"}
    style={style}
    class={className}
  />
</div>

<style>
  div {
    position: relative;
  }
  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
  img {
    position: absolute;
    top: 0px;
    left: 0px;
  }
</style>
