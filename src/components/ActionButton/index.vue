<template>
  <button class="btnAction" :class="{'disable':isConnect }" :disabled="isConnect" @click="emitAction">
    {{ title }}
  </button>
</template>

<script>
export default {
  name: 'ActionButton',
  props: {
    name: {
      type: String, default: ''
    },
    listObject: {
      type: Array,
      default() {
        return []
      }
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
    order: {
      type: Number,
      default: () => 1
    },
    robotObject: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
    }
  },
  watch: {
    listObject: {
      deep: true,
      handler(oldValue, newValue) {
        const obj = this.listObject.filter((o) => {
          return o.orderIndex === this.order
        })

        this.object = obj[0]
        if(this.object.actionName.includes('Kết nối')) {
          this.title = 'Kết nối'
        }else {
          this.title = this.object.actionName
        }
      }
    }
  },
  computed: {
    object() {
      const obj = this.listObject.filter((o) => {
        return o.orderIndex === this.order
      })
      return obj[0]
    },
    title() {
      if(this.object.actionName.includes('Kết nối')) {
        var title = 'Kết nối'
      }else {
        var title = this.object.actionName
      }
      return title
    }
  },
  methods: {
    emitAction() {
      // @2#17#6#1.5#$
      // @2#17#6#1.5#$_robotCode
      const value = `@${this.mode}#${this.object.code}#${this.areaNo}#${this.speed}#&_${this.robotObject.code}`
      this.$emit('emit-action', value)
    }
  }
}
</script>

<style scoped lang="scss">
$gray1: #333;
$gray2: #DBDBDB;
$blue1: #409eff;

.btnAction{
  width: 100%;
  border-radius: 4px;
  height: 36px;
  line-height: 36px;
  color: #ffffff;
  background: $gray2;
  margin-bottom: 10px;
  transition: all ease .5s;

  &:hover{
    background: #7b7b7b;
  }

  &:last-child{
    margin-bottom: 0;
  }
}

.btnAction.btnConnect{
  &:hover{
    background: $blue1;
  }
}

.btnAction.btnConnect.active{
  background: $blue1;
}

.btnAction.disable{
  &:hover{
    background: $gray2;
    cursor: not-allowed;
  }
}
</style>
