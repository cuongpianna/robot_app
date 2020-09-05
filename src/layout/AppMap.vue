<template>
  <div :class="classObj" v-if="!showLoading" class="app-wrapper">
    <app-header/>
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <div class="main-container">
      <app-main :hotelId="hotelId"/>
    </div>
    <right-panel v-if="showSettings">
      <settings/>
    </right-panel>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import AppMain from '@/components/AppMain'
import AppHeader from '@/components/AppHeader'
import Settings from '@/components/Settings/index'
import ResizeMixin from './mixin/ResizeHandler'
import Cookies from 'js-cookie'

export default {
  name: 'Layout',
  components: {
    AppMain,
    AppHeader,
    RightPanel,
    Settings,
    Loading
  },
  mixins: [ResizeMixin],
  data() {
    return {
      hotelId: '',
      showLoading: false
    }
  },
  computed: {
    showSettings() {
      return this.$store.state.settings.showSettings
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        mobile: this.device === 'mobile'
      }
    }
  },
  mounted() {
    if (this.$router.currentRoute.params.id) {
      this.hotelId = this.$router.currentRoute.params.id
      Cookies.set('hotelId', this.hotelId, { expires: 365 })
    } else {
      this.hotelId = Cookies.get('hotelId')
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  background: #f0f2f5;
  overflow-x: hidden;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }

}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 60px;
  right: 0;
  z-index: 9;
  width: 100%;
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100%)
}

.mobile .fixed-header {
  width: 100%;
}

.main-container {
  top: 60px;
  margin-left: 0 !important;
}

</style>
