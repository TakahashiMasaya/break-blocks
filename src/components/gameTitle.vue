<template>
  <div class="ready">
    <p class="title">Break Blocks</p>
    <p class="text">click to start!</p>
  </div>
</template>

<style scoped lang="scss">
@keyframes colorChange {
  0% {
    color: red;
  }
  20% {
    color: green;
  }
  40% {
    color: blue;
  }
  60% {
    color: yellow;
  }
  80% {
    color: purple;
  }
  100% {
    color: red;
  }
}

.ready {
  font-size: 3rem;
  text-align: center;
  width: 100%;
  .title {
    font-weight: bold;
    animation: colorChange 2s infinite;
  }
  .text {
    font-size: 1.5rem;
  }
}
</style>
