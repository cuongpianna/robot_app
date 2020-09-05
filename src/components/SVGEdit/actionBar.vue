<template>
  <section>

    <div id="top_bar">
      <el-row>
        <el-col :span="3">
          <div>
            <el-dropdown size="medium" @command="handleMenuCommand">
              <el-button plain size="small" icon="el-icon-menu" @click="">File</el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="open">Open</el-dropdown-item>
                <el-dropdown-item command="download">Lưu thành</el-dropdown-item>
                <!--<el-dropdown-item command="save">暂存</el-dropdown-item>-->
                <!--<el-dropdown-item command="load">读取暂存</el-dropdown-item>-->
              </el-dropdown-menu>
            </el-dropdown>
            <el-button plain size="small" icon="el-icon-setting" @click="$emit('actionSettings')">Cài đặt</el-button>
          </div>
        </el-col>
        <el-col :span="5">
          <div>
            <el-button-group>
              <el-button plain size="small" :class="{isActiveBtn: isShowEditor}" @click="$emit('actionShowEditor')">
                <i class="el-icon-edit-outline" /> Thiết kế
              </el-button>
              <el-button plain size="small" :class="{isActiveBtn: isShowPreview}" @click="$emit('actionShowPreview')">
                <i class="el-icon-view" /> Xem trước
              </el-button>
              <el-button plain size="small" :class="{isActiveBtn: isShowCode}" @click="$emit('actionShowCodeView')">
                <i class="el-icon-tickets" /> Mã Nguồn
              </el-button>
            </el-button-group>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="upload-btn-wrapper">
            <el-button type="prime" size="small" icon="el-icon-plus">Nhập svg</el-button>
            <input ref="uploadSvg" type="file" name="myfile" @change="onImportSvg">
          </div>
        </el-col>
        <el-col :span="10">
          <div>
            <el-button-group>
              <el-button
                plain
                type="danger"
                size="small"
                icon="el-icon-delete"
                @click="$emit('actionRemoveCurrentComp')"
              />
              <el-button
                plain
                size="small"
                icon="el-icon-plus"
                @click="$emit('actionDuplicateCurrentComp')"
              />
            </el-button-group>
            <el-button-group>
              <el-button plain size="small" icon="el-icon-upload2" @click="$emit('actionMoveToFront')" />
              <el-button plain size="small" icon="el-icon-download" @click="$emit('actionMoveToBack')" />
            </el-button-group>
          </div>
        </el-col>
        <el-col :span="4">
          <el-button plain type="primary" size="small" icon="el-icon-upload" class="fl-right" @click="$emit('actionSaveDoc')">Lưu</el-button>
          <el-button plain size="small" icon="el-icon-news" class="fl-right" style="margin-right: 6px;" @click="$emit('actionDownload')">Export
          </el-button>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      title="Thông báo"
      :visible.sync="openDialogVisible"
      width="30%"
    >
      <span>Thiết kế sẽ bị hủy ?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="openDialogVisible = false">Hủy</el-button>
        <el-button type="primary" @click="loadDoc">Tiếp tục</el-button>
      </span>
    </el-dialog>
  </section>
</template>
<script>
  export default {
    props: {
      isShowCode: false,
      isShowPreview: false,
      isShowEditor: true,
      comps: null
    },
    data() {
      return {
        openDialogVisible: false,
        loadType: ''
      }
    },
    computed: {},
    methods: {
      loadDoc() {
        this.openDialogVisible = false
        if (this.loadType === 'storage') {
          this.$emit('actionLoadDoc')
        } else {
          this.$emit('actionOpenDoc')
        }
      },
      handleMenuCommand(cmd) {
        switch (cmd) {
          case 'save':
            this.$emit('actionSaveDoc')
            break
          case 'load':
            if (this.comps.length > 0) {
              this.loadType = 'storage'
              this.openDialogVisible = true
            } else {
              this.$emit('actionLoadDoc')
            }
            break
          case 'download':
            this.$emit('actionDownload')
            break
          case 'open':
            if (this.comps.length > 0) {
              this.loadType = 'file'
              this.openDialogVisible = true
            } else {
              this.$emit('actionOpenDoc')
            }
            break
          default:
            break
        }
      },
      onImportSvg(e) {
        const files = e.target.files || e.dataTransfer.files
        if (!files.length) {
          return
        }
        const reader = new FileReader()
        reader.onload = (e) => {
          const svgStr = e.target.result
          this.$emit('actionImportSvg', svgStr)
          this.$refs.uploadSvg.value = ''
        }
        reader.readAsText(files[0])
      }
    }
  }
</script>
<style lang="scss">
  #top_bar {
    width: 100%;
    height: 54px;
    flex: 0 0 54px;
    background-color: #EEE;
    border-bottom: 1px solid #AAA;
    padding: 10px;
    z-index: 999;
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, .15);
  }

  .isActiveBtn {
    color: #409EFF;
    border-bottom-color: #409EFF;
  }

  .upload-btn-wrapper {
    position: relative;
    overflow: hidden;
    display: inline-block;
  }

  .upload-btn-wrapper input[type=file] {
    /*font-size: 100px;*/
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    height: 28px;
    width: 100px
  }

  .el-dropdown-menu {
    left: 5px;
    width: 170px;
    border: 1px solid #AAA;
  }
</style>
