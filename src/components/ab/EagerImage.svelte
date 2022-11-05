<script lang="ts">
  export let src: string;
  export let height: number | string;
  export let width: number | string;
  export let alt: string;
</script>

<img alt={alt} src={`/api/ab/image/w=${width}&h=${height}/${encodeURIComponent(src)}.webp`} loading="eager" />