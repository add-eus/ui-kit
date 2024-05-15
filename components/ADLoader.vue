<template>
  <div class="loader-icon">
    <div class="spinner"></div>
  </div>
</template>

<script></script>

<style scoped>
.loader-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 22px;
  overflow: hidden;

  > .spinner {
    border: 4px solid var(--ad-grey-lighter);
    border-radius: 50%;
    border-top: 4px solid var(--ad-pink);
    width: 22px;
    height: 22px;
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
