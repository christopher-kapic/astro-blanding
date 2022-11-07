<script lang="ts">
  import { decode } from "blurhash";
  import { onMount } from "svelte";
  import { url } from "@utils/GetURL";


  let w: number;
  let h: number;
  export let src: string;
  export let height: number | string | null;
  export let width: number | string | null;
  export let alt: string;
  export let fill: boolean = false;
  export let priority: boolean = false;
  export let style: string = "";
  export let className: string = "";
  export let preview: string | null;

  let canvas: HTMLCanvasElement;

  let fullSrc: string = src;
  console.log(src);
  if (src[0] === "/") {
    fullSrc = url + src;
  }

  onMount(async () => {
    if (!preview) {
      const res = await fetch(
        `/api/ab/image/blurhash/${encodeURIComponent(fullSrc)}`
      );
      const json = await res.json();

      console.log(w)

      const pixels = decode(json.blurhash, Number(w), Number(h));
      const ctx = canvas.getContext("2d");
      const imageData = ctx!.createImageData(Number(w), Number(h));
      imageData.data.set(pixels);
      ctx!.putImageData(imageData, 0, 0);
    } else {
      const pixels = decode(preview, Number(w), Number(h));
      const ctx = canvas.getContext("2d");
      const imageData = ctx!.createImageData(Number(w), Number(h));
      imageData.data.set(pixels);
      ctx!.putImageData(imageData, 0, 0);
    }

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
    }/${encodeURIComponent(fullSrc)}.webp`}
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
