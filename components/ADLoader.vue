<template>
  <div class="loader">
    <div class="spinner"></div>
  </div>
</template>

<script></script>

<style scoped>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  overflow: hidden;

  > .spinner {
    border: 6px solid var(--ad-grey-lighter);
    border-radius: 50%;
    border-top: 6px solid var(--ad-primary);
    width: 30px;
    height: 30px;
    animation: spin 1s linear infinite;
    -webkit-animation: spin 1s linear infinite;
  }
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
