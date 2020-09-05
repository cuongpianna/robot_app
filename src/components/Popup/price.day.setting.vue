<template>
  <div class="popup-container" :class="isShowPopup ? 'active' : ''">
    <div class="popup-content">
      <div class="popup-header">
        <div class="title">
          <slot name="icon"/>
          {{ title }}
        </div>
        <div @click.stop="closePopup">
          <md-icon class="icon-close">close</md-icon>
        </div>
      </div>
      <div class="popup-body">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isShowPopup: false
    }
  },
  watch: {
    isShow: {
      immediate: true,
      handler(val, oldVal) {
        this.isShowPopup = val
        this.$emit('update:isShow', val)
      }
    }
  },
  mounted() {
    this.isShowPopup = this.isShow
  },
  methods: {
    closePopup() {
      this.isShowPopup = false
      this.$emit('update:isShow', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.popup-container {
  position: absolute;
  width: 0;
  height: 100%;
  z-index: -1;
  visibility: hidden;
  opacity: 0;
  top: 0;
  right: 0;
  transition: all ease-in-out .3s;
  background: #fff;

  &.active {
    width: 500px;
    height: 100%;
    z-index: 1800;
    visibility: visible;
    opacity: 1;

    .popup-content {
      display: block;
    }
  }

}

.popup-content {
  display: none;
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0px 9px 12px rgba(0, 0, 0, 0.14), 0px 3px 16px rgba(0, 0, 0, 0.12), 0px 5px 6px rgba(0, 0, 0, 0.2);
}

.popup-header {
  padding: 9px 20px;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  justify-content: space-between;
}

.title {
  align-self: center;
  font-weight: bold;
  font-size: 14px;
  line-height: 15px;
}

.icon-close {
  color: rgba(0, 0, 0, 0.54);
  margin: unset;
  cursor: pointer;
}

.popup-body {
  padding: 10px 20px;
}

.icon-setting {
  margin: unset;
  margin-right: 5px;
  width: 20px;
  height: 20px;
  min-width: 20px;
  font-size: 20px !important;
}

</style>
