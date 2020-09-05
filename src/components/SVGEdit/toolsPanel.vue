<template>
  <collapse-panel label="Thư viện">
    <div id="comp-container">
      <collapse-panel label="Cơ bản" class="comp-cate" @panelCollapse="onPanelCollapse">
        <div class="comp-list">
          <drag
            v-for="tool in compTools"
            :key="tool.id"
            class="comp-item"
            :transfer-data="{type:tool.name, config:tool.config, attrs:tool.attrs, params:tool.params }"
          >

            <img
              class="comp-icon"
              :src="require(`@/assets/img/scada/${tool.name}.png`)"
              :alt="tool.type"
            >

          </drag>
        </div>
      </collapse-panel>
      <collapse-panel label="Điều hòa khí" class="comp-cate" @panelCollapse="onPanelCollapse">
        <div class="comp-list">
          <drag
            v-for="tool in compToolsEx"
            :key="tool.id"
            class="comp-item"
            :transfer-data="{type:tool.name, name:tool.name, config:tool.config, attrs:[], params:tool.params }"
          >
            <img
              class="comp-icon comp-icon-svg"
              :src="tool.imgUrl"
              :alt="tool.type"
            >
          </drag>
        </div>
      </collapse-panel>
      <collapse-panel label="Hệ thông đốt" class="comp-cate" @panelCollapse="onPanelCollapse">
        <div class="comp-list">
          <drag
            v-for="tool in compToolsEx2"
            :key="tool.id"
            class="comp-item"
            :transfer-data="{type:tool.name, name:tool.name, config:tool.config, attrs:[], params:tool.params }"
          >
            <img
              class="comp-icon comp-icon-svg"
              :src="tool.imgUrl"
              :alt="tool.type"
            >
          </drag>
        </div>
      </collapse-panel>
    </div>
  </collapse-panel>
</template>
<script>
  import { Drag } from 'vue-drag-drop'
  import scadaComps from '@/components/Scada/Basic'
  import scadaCompsEx from '@/components/Scada/Extend_1'
  import scadaCompsEx2 from '@/components/Scada/Extend_2'

  export default {
    components: { Drag },
    props: {},
    data() {
      return {
        compTools: [],
        compToolsEx: [],
        compToolsEx2: []
      }
    },
    computed: {},
    mounted() {
      this.compTools = scadaComps.tools
      this.compToolsEx = scadaCompsEx.tools
      this.compToolsEx2 = scadaCompsEx2.tools
    },
    methods: {
      onPanelCollapse() {
        this.$events.emit('PanelCollapseChanged', 'Panel Collapse')
      }
    }
  }
</script>

<style lang="scss">
  $prime_color: #20a0ff;
  $dark_bgcolor: #324057;
  $light_bgcolor: #f2f2f2;

  $toolbar_title: 3px solid $prime_color;

  @mixin clearfix {
    &:after {
      content: "";
      display: table;
      clear: both;
    }
  }

  @mixin scrollBar {
    &::-webkit-scrollbar-track-piece {
      background: #d3dce6;
    }
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background: #AAA;
      border-radius: 20px;
    }
  }

  @mixin relative {
    position: relative;
    width: 100%;
    height: 100%;
  }

  @mixin al-scrollbar {
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(50, 65, 87, 0.2);
      outline: 1px solid slategrey;
    }

    &::-webkit-scrollbar {
      width: 10px;
    }
  }

  @mixin al-scroll-container {
    overflow-y: auto;
    border: solid 1px rgb(223, 230, 236);
    @include al-scrollbar;
  }

  @mixin al-toolbar {
    background: $light_bgcolor;
    padding: 10px;
    //margin: 10px 0;
  }

  @mixin al-title-hint {
    border-left: 3px solid $prime_color;
  }


  #comp-container {
    max-height: 400px;
    overflow: auto;
    @include scrollBar;
    padding-right: 2px;
  }

  .panel-subtitle {
    margin: 4px 0;
    padding: 4px 4px 2px 4px;
    line-height: 16px;
    background-color: #CCC;
  }

  .tools-panel {
    .comp-cate {
      .title-label {
        margin: 0px 0 4px 0;
        padding: 4px 4px 2px 6px;
        line-height: 16px;
        background-color: #CCC;
        color: #444;
      }
      .panel-content {
        padding: 0;
        border-bottom: 0;
      }
    }
  }

  .comp-list {
    margin-bottom: 4px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 52px;
    /*grid-template-rows: repeat(3, 1fr);*/
    grid-column-gap: 2px;
    grid-row-gap: 2px;
    .comp-item {
      font-size: 12px;
      line-height: 52px;
      background-color: #FFF;
      text-align: center;
      cursor: pointer;
      border: 1px solid #DDD;
      color: #20a0ff;
    }
  }

  .collapse-btn {
    float: right;
  }

  .comp-icon {
    width: 100%;
    height: 100%;
  }

  .comp-icon-svg {
    padding: 5px;
  }
</style>
