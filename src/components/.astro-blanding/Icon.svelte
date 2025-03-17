<script lang="ts">
  // I plan to deprecate this, but there are still bugs in the astro-icon provider.
  export let size = 24;
  export let icon: string;
</script>

<svg
  width={size.toString()}
  height={size.toString()}
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <use href={`/feather-sprite.svg#${icon}`}/>
</svg>