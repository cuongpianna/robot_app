<template>
  <section>
    <el-dialog
      title="Setup Editor"
      :visible.sync="dialogVisible"
      @close="$emit('dialogClose')"
      width="30%">
      <div class="setting-item">
        <label class="setting-title">Editor</label>
        <div class="setting-content">
          <label>Width: </label>
          <el-input-number :controls=false :max="3000" v-model="canvasConfig.width"
                           style="float: left"></el-input-number>
          <label>Height: </label>
          <el-input-number :controls=false :max="2000" v-model="canvasConfig.height"
                           style="float: left"></el-input-number>
        </div>
        <div class="setting-content">
          <label>Backgroud Color: </label>
          <el-color-picker size="small" v-model="canvasConfig.bgColor"/>
        </div>
      </div>
      <div class="setting-item">
        <label class="setting-title">Setup</label>
        <div class="setting-content">
          <label>Show Grid: </label>
          <el-switch
            v-model="canvasConfig.showGrid">
          </el-switch>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="changeSettings">Done</el-button>
      </span>
    </el-dialog>
  </section>
</template>
<script>
  export default {
    props: {
      isShowDialog: false,
      config: null
    },
    data() {
      return {
        dialogVisible: false,
        canvasConfig: {
          width: 1000,
          height: 600,
          bgColor: '#FFF',
          showGrid: true,
          zoom: 1
        }
      }
    },
    watch: {
      isShowDialog() {
        this.dialogVisible = this.isShowDialog
      },
      config() {
        this.canvasConfig = Object.assign({}, this.config)
      }
    },
    methods: {
      changeSettings() {
        this.dialogVisible = false
        this.$emit('settingsChanged', this.canvasConfig)
      }
    }
  }
</script>
<style lang="scss" scoped>

  .setting-item {
    .setting-title {
      display: block;
      margin-bottom: 10px;
      background: #DDD;
      padding: 2px 0 0 6px
    }
    input {
      max-width: 70px;
      margin-right: 30px;
    }
    .setting-content {
      padding-left: 10px;
      margin-bottom: 10px;
      label {
        display: block;
        float: left;
        margin-right: 4px;
        margin-top: 3px;
      }
      .el-switch {
        margin: 4px 0 0 4px
      }
    }
    .el-color-picker--small .el-color-picker__trigger {
      width: 60px !important;
    }
  }
</style>
