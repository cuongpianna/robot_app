<template>
  <div class="loading-container">
    <svg-icon :icon-class="'three-dots'" fill="#fff" class="icon-loading" />
  </div>
</template>

<script>
    import SvgIcon from './SvgIcon'

    export default {
        name: 'DashboardFunctions',
        components: {
            SvgIcon
        }
    }
</script>

<style lang="scss" scoped>
    .loading-container {
        position: fixed;
        width: 100%;
        height: 100px;
        background: rgba(0,0,0,0.6);
        .icon-loading

    {
        position: absolute;
        top: 49%;
        left: 49%;
        font-size: 30px;
    }
    }
</style>
