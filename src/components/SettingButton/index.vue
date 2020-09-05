<template>
  <el-tooltip
    class="item"
    effect="dark"
    :content="tooltip"
    placement="top"
    tabindex="0"
  >
    <div v-click-outside="hideComponent" :class="className" class="button-wrap" :style="coreStyle" @click="buttonClick">
      <font-awesome-icon :icon="iconName" class="icon-reset icon-action" size="sm" />
      <transition name="slide-up">
        <div v-if="show" class="float-bars">
          <div class="float-wrap">
            <ul class="settings" :style="minWidth">
              <li class="title">{{ title }}
                <font-awesome-icon :icon="iconName" class="icon-title" size="sm" :style="activeColor" />
              </li>
              <li v-for="(item, index) in arraySetting" :key="index" class="setting-item" :style="hoverColor">
                <div slot="item" @click="itemClick(item.url)">
                  <div v-if="item.material">
                    <md-icon class="icon-item md-icon-item material-icons-outlined">{{ item.icon }}</md-icon>
                    {{ item.name }}
                  </div>
                  <div v-else>
                    <font-awesome-icon :icon="item.icon" class="icon-item" size="sm" />
                    {{ item.name }}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
  </el-tooltip>
</template>

<script>
export default {
  name: 'SettingButton',
  props: {
    className: {
      type: String,
      default: ''
    },
    arrayItem: {
      type: Array
    },
    iconName: {
      type: String,
      default: 'bars'
    },
    activeBg: {
      type: String,
      default: '#123D8B'
    },
    defaultBg: {
      type: String,
      default: '#BDBDBD'
    },
    tooltip: {
      type: String,
      default: 'Setting'
    },
    title: {
      type: String,
      default: 'Menu'
    },
    material: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      arraySetting: [],
      show: false,
      is_material: false
    }
  },
  computed: {
    coreStyle() {
      return {
        background: this.show ? this.activeBg : this.defaultBg
      }
    },
    activeColor() {
      return {
        color: this.activeBg
      }
    },
    hoverColor: function() {
      return {
        '--color-hover': this.activeBg
      }
    },
    minWidth: function() {
      return {
        '--min-with': this.width
      }
    }
  },
  watch: {
    coreStyle() {
      return {
        background: this.activeBg ? this.show : this.defaultBg
      }
    }
  },
  mounted() {
    this.is_material = this.material
    this.arraySetting = this.arrayItem
  },
  methods: {
    buttonClick() {
      this.show = !this.show
    },
    itemClick(url) {
      window.location.href = url
    },
    hideComponent() {
      this.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
.button-wrap {
  position: relative;

  &:hover {
    cursor: pointer;
  }

  .float-wrap {
    position: relative;

    &:after {
      position: absolute;
      content: '';
      border-left: 8px solid #ffffff;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      display: block;
      top: 13px;
      right: -8px;
      -webkit-filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, .5));
      filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, .5));
    }
  }

  .float-bars {
    position: absolute;
    top: 0px;
    right: 55px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 1px 5px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    z-index: 1000;
    background: #ffffff;

    ul {
      position: relative;
      list-style-type: none;
      min-width: var(--min-with);

      li {
        padding: 14px 24px;
        font-size: 15px;
        color: black;
        transition: all ease .5s;

        border-bottom: 1px dotted rgba(152, 155, 168, 0.25);

        &:hover {
          background: #f3f3f3;

          div {
            color: var(--color-hover);
          }

          .icon-item {
            color: var(--color-hover);
          }
        }

        div {
          transition: all ease .5s;
          color: rgba(0, 0, 0, 0.65);
          font-size: 14px;
          font-weight: 600;
        }
      }

      li.title {
        text-align: right;
        border-bottom: 1px solid #989ba840;
        color: rgba(33, 33, 33, 0.69);
        font-size: 14px;
        font-weight: 600;

        .icon-title {
          margin-left: 5px;
        }
      }

      &::-webkit-scrollbar {
        width: 10px;
      }

      &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      }

      &::-webkit-scrollbar-thumb {
        background-color: darkgrey;
        outline: 1px solid slategrey
      }

    }
  }

  .slide-up-enter-active {
    transition: all .5s ease;
  }

  .slide-up-leave-active {
    transform: translateX(20px);
    transition: all ease .5s;
    opacity: 0;
  }

  .slide-up-enter, .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 1;
  }

  .icon-item {
    margin-right: 5px;
  }

  .md-icon-item {
    font-size: 18px !important;
    width: unset !important;
    min-width: unset !important;
    height: unset !important;
  }
}
</style>
