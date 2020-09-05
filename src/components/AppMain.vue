<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" :hotel-id="hotelId" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  props: {
    hotelId: {
      type: String,
      default() {
        return ''
      }
    }
  },
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  /* height: calc(100vh - 60px);*/
  width: 100%;
  position: relative;
  /*overflow-x: hidden;*/
  height: unset !important;
}
.fixed-header+.app-main {
  margin-top: 60px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
