<script lang="ts">
  import { decode } from "blurhash";

  import { onMount } from 'svelte';

  export let src: string;
  export let height: number | string;
  export let width: number | string;
  export let alt: string;
  
  let canvas: HTMLCanvasElement;

  onMount(async () => {
    const res = await fetch(`/api/ab/image/blurhash/${encodeURIComponent(src)}`)
    const json = await res.json();
    console.log('before')
    console.log(json)
    console.log('after')

    const pixels = decode(json.blurhash, Number(width), Number(height));
		const ctx = canvas.getContext('2d');
    const imageData = ctx!.createImageData(Number(width), Number(height));
    imageData.data.set(pixels);
    ctx!.putImageData(imageData, 0, 0);

		return () => {
		};
	});

</script>

<div style={`width: ${Number(width)}px; height: ${Number(height)}px;`}>
  <canvas width={width} height={height} bind:this={canvas}></canvas>
  <img alt={alt} height={height} width={width} src={`/api/ab/image/w=${width}&h=${height}/${encodeURIComponent(src)}.webp`} loading="lazy" />
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