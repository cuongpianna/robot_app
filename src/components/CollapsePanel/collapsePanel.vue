<template>
  <section>
    <div class="title-label"><span>{{ label }}</span>
      <span class="collapse-btn">
        <i v-if="!collapsed" class="el-icon-caret-bottom" @click="collapsePanel" />
        <i v-if="collapsed" class="el-icon-caret-right" @click="openPanel" />
      </span>
    </div>
    <div v-show="!collapsed" class="panel-content">
      <slot />
    </div>
  </section>
</template>
<script>
  export default {
    name: 'CollapsePanel',
    props: {
      label: {
        type: String
      }
    },
    data() {
      return {
        collapsed: false
      }
    },
    computed: {},
    watch: {
      collapsed() {
        this.$emit('panelCollapse', this.collapsed)
        this.$events.emit('PanelCollapseChanged', this.label)
      }
    },
    mounted() {

    },
    methods: {
      collapsePanel() {
        this.collapsed = true
      },
      openPanel() {
        this.collapsed = false
      }
    }
  }
</script>

<style lang="scss">
  .tools-panel {
    font-size: 12px;
    color: #333;
    .title-label {
      font-size: 12px;
      background-color: #888;
      border-bottom: 1px solid #CCC;
      padding: 8px 8px 6px 8px;
      color: #FFF;
      span {
        letter-spacing: 1px;
      }
    }
    .panel-content {
      padding: 6px 6px 6px 6px;
      border-bottom: 1px solid #BBB;
    }
  }
</style>
