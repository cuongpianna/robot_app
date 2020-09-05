<template>
  <div id="app" data-app>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style>
#nprogress .bar {
  background: #6ad706 !important;

  position: fixed;
  z-index: 1031;
  top: 0;
  left: 0;

  width: 100%;
  height: 2px;
}
</style>

