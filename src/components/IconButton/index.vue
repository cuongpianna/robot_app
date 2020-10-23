<template>
  <button class="btnAction" :class="{'disable':isConnect }" :disabled="isConnect" @click="emitAction" v-show="step != 0">
    <font-awesome-icon :icon="icon" color="black"/>
  </button>
</template>

<script>
export default {
  name: 'IconButton',
  props: {
    name: {
      type: String, default: ''
    },
    listObject: {
      type: Array,
      default: () => []
    },
    speed: {
      type: Number,
      default: 1.5
    },
    areaNo: {
      type: Number,
      default: 0
    },
    mode: {
      type: Number,
      default: 2
    },
    isConnect: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String, default: ''
    },
    robotObject: {
      type: Object,
      default: () => {
      }
    },
    actionParam: {
      type: Object,
      default: () => {
      }
    },
    step: {
      type: Number,
      default: () => 0
    }
  },
  data() {
    return {
      object: {}
    }
  },
  watch: {
    listObject: {
      deep: true,
      handler(newValue, oldValue) {
        const obj = this.listObject.filter((o) => {
          return o.orderIndex === this.step
        })
        this.object = obj[0]
      }
    }
  },
  methods: {
    emitAction() {
      // @2#17#6#1.5#$_robotCode
      // @2#17#6#1.5#left#right#up#down#$_robotCode
      console.log(this.actionParam)
      const value = `@${this.mode}#${this.object.code}#${this.areaNo}#${this.speed}#${this.actionParam.leftSeed}#${this.actionParam.rightSeed}#${this.actionParam.backwardSeed}#${this.actionParam.forwardSeed}#&_${this.robotObject.code}`
      this.$emit('emit-action', value)
    }
  }
}
</script>

<style scoped lang="scss">
$gray1: #333;
$gray2: #DBDBDB;
$blue1: #409eff;

.btnAction {
  width: 100%;
  border-radius: 4px;
  height: 36px;
  line-height: 36px;
  color: #ffffff;
  background: $gray2;
  margin-bottom: 10px;
  transition: all ease .5s;

  &:hover {
    background: #7b7b7b;
  }

  &:last-child {
    margin-bottom: 0;
  }
}

.btnAction.btnConnect {
  &:hover {
    background: $blue1;
  }
}

.btnAction.btnConnect.active {
  background: $blue1;
}

.btnAction.disable {
  &:hover {
    background: $gray2;
    cursor: not-allowed;
  }
}
</style>
