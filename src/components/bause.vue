<template>
  <div
    :class="{
      bause: true,
      exploded__parts: props.isExplode
    }"
  >
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  x: number
  y: number
  width: number
  height: number
  isExplode: boolean
}>()
</script>

<style scoped lang="scss">
.bause {
  position: absolute;
  background-color: #4444dd;
  border-radius: 10px;
  width: v-bind('`${props.width}px`');
  height: v-bind('`${props.height}px`');
  transform: translate(v-bind('`${props.x}px`'), v-bind('`${props.y}px`'));
}

//Mixin to add random position of each particle
@mixin random-position($direction, $random_percentage) {
  @if $direction == top-left {
    translate: percentage($random_percentage * -1) percentage($random_percentage * -1);
  }
  @if $direction == top-right {
    translate: percentage($random_percentage) percentage($random_percentage * -1);
  }
  @if $direction == bottom-left {
    translate: percentage($random_percentage * -1) percentage($random_percentage);
  }
  @if $direction == bottom-right {
    translate: percentage($random_percentage) percentage($random_percentage);
  }
}

.exploded__parts {
  --animation-speed: 0.5s;
  --parts-columns: 4; //Amount of columns for the parts
  --parts-radius: 0%; //Border radius of the parts
  $col-width: calc(100% / var(--parts-columns));
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax($col-width, auto));
  transition: all var(--animation-speed);
  pointer-events: none;
  background-color: transparent;
  & > * {
    background-color: #7878e6;
    border-radius: var(--parts-radius);
    transition: all var(--animation-speed) cubic-bezier(0.57, 0.55, 0.31, 1);

    //For each child up to 50 childs
    @for $i from 0 through 50 {
      &:nth-child(#{$i}) {
        //Create random property values
        scale: (random(20) * 0.1);
        rotate: (random(360) + 80deg) * (random(3) - 2);
        transform: skew((random(60) + 10) + deg);
        filter: blur((random(3) * 0.5) + px);

        //Create random percentage for each child
        $random_percentage: calc((random(300) + 100) / 100);

        //Add the random position, by default the particles will go to the top-left side
        @include random-position(top-left, $random_percentage);

        //Each second child, the particle will go to the top-right side
        &:nth-child(2n + 2) {
          @include random-position(top-right, $random_percentage);
        }

        //Each third child, the particle will go to the bottom-left side
        &:nth-child(3n + 3) {
          @include random-position(bottom-left, $random_percentage);
        }

        //Each fourth child, the particle will go to the bottom-right side
        &:nth-child(4n + 4) {
          @include random-position(bottom-right, $random_percentage);
        }
      }
    }
  }
}
</style>
