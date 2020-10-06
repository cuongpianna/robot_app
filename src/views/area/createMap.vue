<template>
  <div class="app-container">
    <sticky :z-index="10" class-name="sub-navbar">
      <div class="page-title">
        <div class="title-container">
          <router-link to="/#/areas/index" class="back-link">
            <font-awesome-icon icon="chevron-left" color="#424242" class="icon-back" />
          </router-link>
          <router-link to="/#/users/areas/index" title="DashBoard" class="title-page">
            {{ generateTitleView('editMap', 'area') }}
          </router-link>
        </div>

        <div class="action-container">
          <el-button icon="el-icon-upload" type="primary" class="btn-create-hotel" @click="showUploadImage">
            {{ generateTitleView('uploadImage', 'createMap') }}
          </el-button>
          <el-button icon="el-icon-download" type="danger" class="btn-create-hotel" @click="addObject">
            {{ generateTitleView('saveSetting', 'createMap') }}
          </el-button>

        </div>
      </div>
    </sticky>

    <div class="create-map_wrapper">
      <div class="edit-wrap">
        <div ref="editorCanvas" class="editor-canvas">
          <img ref="imageMap" :src="thumbUrl" alt="" class="imp-editor-image">

          <div id="imp-editor-shapes-container">
            <svg class="svg-editor" @click="addPoint">
              <circle
                v-for="(point, index) in points"
                :key="index"
                :cx="point.x"
                :cy="point.y"
                r="4"
                :fill="getPointFill(point)"
              />

            </svg>
          </div>
        </div>
      </div>

      <v-card class="tool-wrap">
        <el-scrollbar id="wcp-editor-object-settings">
          <div class="setting-header">
            {{ generateTitleView('proberty', 'createMap') }}
          </div>
          <div v-if="selectedTool == 'addObject' || selectedTool == 'editObject'">
            <div v-show="points.length > 0" class="setting-content">
              <div class="setting-title">
                <span class="label">{{ generateTitleView('objectTitle', 'createMap') }}</span>
                <input v-model="formCreate.title" type="text" required>
              </div>
              <div class="setting-title">
                <span class="label">Delta x (mét)</span>
                <input v-model="formCreate.deltax" type="text" required>
              </div>
              <div class="setting-title">
                <span class="label">Delta y (mét)</span>
                <input v-model="formCreate.deltay" type="text" required>
              </div>
              <div class="setting-title">
                Danh sách điểm
              </div>
              <div v-for="(item, index) in points" :key="index" class="setting-item">
                <span>X{{ index + 1 }} <input v-model="item.x" type="number" class="input-point" @change="changePoint"></span>
                <span class="setting-item__right">Y{{ index + 1 }} <input
                  v-model="item.y"
                  type="number"
                  class="input-point"
                ></span>
                <el-button class="el-edit" icon="el-icon-edit" @click="setPoint(index)" />
                <font-awesome-icon icon="times" class="fa-remove" @click="removePoint(index)" />
              </div>
            </div>
          </div>
        </el-scrollbar>
        <div class="object-list-wrap-title">
          <font-awesome-icon class="iconMinus" icon="minus" />
          <el-select v-model="filterListObject" size="small" class="selectObj">
            <el-option value="0" label="Danh sách đối tượng" />
<!--            <el-option value="1" label="Danh sách phòng" />-->
<!--            <el-option value="2" label="Danh sách camera" />-->
          </el-select>
        </div>
        <el-scrollbar id="wcp-editor-object-list-wrap" view-class="yf-content">

          <div
            v-for="(item, index) in objectListFilter"
            :key="index"
            class="object-item"
            :class="{'active': selectedObject.id == item.id}"
          >
            <span v-if="item.type==='object'" class="titleWidth" @click="selectObject(item)">{{ item.name }}</span>
            <span v-else class="titleWidth" @click="selectObject(item)">{{ item.camera.name }}</span>

            <font-awesome-icon icon="times" class="fa-remove" @click="removeObject(index)" />
          </div>
        </el-scrollbar>
      </v-card>
    </div>

    <div class="vb-tools">
      <div class="tool-item" @click="showUploadImage">
        <md-tooltip md-direction="right">{{ generateTitleView('uploadImage', 'createMap') }}</md-tooltip>
        <md-icon>cloud_upload</md-icon>
      </div>

      <div class="tool-item" :class="{'active': selectedTool == 'addObject'}" @click="selectTool('addObject')">
        <md-tooltip md-direction="right">{{ generateTitleView('addObject', 'createMap') }}</md-tooltip>
        <font-awesome-icon icon="plus-circle" />
      </div>
      <div class="tool-item" @click="showMapSetting">
        <md-tooltip md-direction="right">{{ generateTitleView('settingMap', 'createMap') }}</md-tooltip>
        <font-awesome-icon icon="cog" />
      </div>
    </div>

    <v-dialog v-model="dialogUploadImage" max-width="210">
      <v-card class="dialogUploadImage">
        <vue-upload-multiple-image
          :data-images="images"
          id-upload="myIdUpload"
          edit-upload="myIdEdit"
          :multiple="false"
          :drag-text="generateTitleView('dragImage', 'createMap')"
          @upload-success="uploadImageSuccess"
          @edit-image="editImage"
        />
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogMapSetting" max-width="450">
      <v-card class="dialogMapSetting">
        <span class="realSize">Kích thước thực tế (mét)</span>
        <v-text-field
          v-model="areaObject.width"
          :label="generateTitleView('width', 'createMap')"
          outlined
          dense
        />

        <v-text-field
          v-model="areaObject.height"
          :label="generateTitleView('height', 'createMap')"
          outlined
          dense
        />

        <md-dialog-actions>
          <button class="btn-control btn-primary" @click="saveMapSetting">{{ generateTitleView('Save', 'createMap') }}</button>
          <button class="btn-control" @click="dialogMapSetting = false">{{
            generateTitleView('close', 'camera')
          }}
          </button>
        </md-dialog-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import Sticky from '@/components/Sticky'
import { hasPermissionAction } from '@/help/utils/index'
import { generateTitleView } from '@/help/utils/i18n'
import { mapActions, mapGetters } from 'vuex'
import * as ACTIONS from '../../store/constants/area'
import VueUploadMultipleImage from 'vue-upload-multiple-image'
import { data2blob } from '@/help/utils'
import mimes from '../../components/ImageCropper/utils/mimes'
import request from '@/help/request.agency'

const LABEL = {
  model: 'area/'
}

export default {
  name: 'CreateMap',
  components: {
    Sticky,
    VueUploadMultipleImage
  },
  data() {
    return {
      pointIndex: null,
      dialogMapSetting: false,
      areaObject: {},
      dialogUploadImage: false,
      images: [],
      folderUpload: process.env.VUE_APP_STORAGE_USER_AVATAR_PUBLIC,
      imgFormat: 'png',
      allowedImgFormat: ['jpg', 'png'],
      urlUpload: 'file/upUserAvatar',
      currentUser: '',
      thumbUrl: '',
      selectedTool: '',
      points: [],
      fillOpacity: 0.5,
      fill: 'blue',
      stroke: 'gray',
      strokeWidth: 1,
      pointsColor: 'teal',
      formCreate: {
        title: '',
        id: null,
        deltax: 0,
        deltay: 0
      },
      objectList: [],
      selectedObject: '',
      mapSize: {},
      formCamera: {
        name: '',
        type: 'camera',
        point: {}
      },
      filterListObject: '0'
    }
  },
  computed: {
    ...mapGetters({
      language: 'language'
    }),
    pointsString() {
      const pointStrings = this.points.map(function(point) {
        return point.x + ',' + point.y
      }, this)
      return pointStrings.join(' ')
    },
    objectListFilter() {
      let result = []
      if (this.filterListObject === '0') {
        result = this.objectList
      } else if (this.filterListObject === '1') {
        result = this.objectList.filter((obj) => {
          return obj.type === 'object'
        })
      } else if (this.filterListObject === '2') {
        result = this.objectList.filter((obj) => {
          return obj.type === 'camera'
        })
      }
      return result
    }
  },
  mounted() {
    this.$store.commit('app/CHANGE_APP_TITLE', 'HỆ THỐNG GIÁM SÁT VÀ ĐIỀU KHIỂN ROBOT')
    const areaId = this.$router.currentRoute.params.id
    if (typeof areaId !== 'undefined' && areaId !== null) {
      this.getArea(areaId)
    }
    this.currentUser = this.$store.state.auth.name
  },
  methods: {
    ...mapActions({
      actGetCurrentArea: LABEL.model + ACTIONS.ACT_FETCH_ONE_AREA,
      actUpdateThumb: LABEL.model + ACTIONS.ACT_UPDATE_THUMB,
      actUpdateJson: LABEL.model + ACTIONS.ACT_UPDATE_JSON,
      actEditArea: LABEL.model + ACTIONS.ACT_EDIT_AREA
    }),
    generateTitleView,
    hasPermissionAction,
    getArea(id) {
      this.actGetCurrentArea(id).then(res => {
        this.areaObject = res.payload.records
        this.thumbUrl = this.folderUpload + this.areaObject.thumb

        if (this.areaObject.jsonData) {
          this.objectList = JSON.parse(this.areaObject.jsonData)['objectList']
        }

        this.images = [{
          path: this.folderUpload + this.areaObject.thumb,
          default: 1,
          highlight: 1
        }]
      })
    },
    showUploadImage() {
      this.dialogUploadImage = true
    },
    uploadImageSuccess() {

    },
    editImage(formData, index, fileList) {
      setTimeout(function() {
        var imageUrl = fileList[0].path
        const fmData = new FormData()
        var tempImgFormat = this.allowedImgFormat.indexOf(this.imgFormat) === -1 ? 'jpg' : this.imgFormat
        const mime = mimes[tempImgFormat]
        fmData.append('base64_image', data2blob(imageUrl, mime), 'base64_image' + '.' + this.imgFormat)
        const urlUpload = this.urlUpload
        request({
          url: urlUpload,
          method: 'post',
          data: fmData
        }).then(resData => {
          this.areaObject.thumb = resData.data
          this.updateThumb()
        }).catch(err => {
          console.log(err)
        })
      }.bind(this), 100)
    },
    updateThumb() {
      this.areaObject['modified'] = new Date().toJSON()
      this.areaObject['modifiedBy'] = this.currentUser
      this.actUpdateThumb(this.areaObject).then(res => {
        if (res.isSuccess) {
          this.getArea(this.areaObject.id)
        }
      })
    },
    selectTool(item) {
      this.selectedTool = item
      if (item === 'addObject') {
        this.points = []
        this.formCreate.title = ''
        this.formCreate.id = null
        this.formCreate.deltax = 0
        this.formCreate.deltay = 0
        this.selectedObject = {}
        this.points = [
          { x: 0, y: 0 },
          { x: 0, y: 0 },
          { x: 0, y: 0 }
        ]
      } else {
        this.points = []
        this.formCreate.title = ''
        this.formCreate.id = null
        this.formCreate.camera = {}
        this.selectedObject = {}
      }
    },
    addPoint(evt) {
      if (this.selectedTool === 'editObject' || this.selectedTool === 'addObject') {
        if (this.pointIndex !== null) {
          const point = {
            x: evt.offsetX,
            y: evt.offsetY
          }
          const pointsFlag = JSON.parse(JSON.stringify(this.points))
          pointsFlag[this.pointIndex] = point
          this.points = []
          for (const item of pointsFlag) {
            this.points.push(item)
          }
        }
      }
    },
    getPointFill(point) {
      return this.pointsColor
    },
    changePoint() {
      console.log(this.points)
    },
    addObject() {
      var objectType = 'object'
      if (this.selectedTool === 'addObject') {
        objectType = 'object'
      }

      if (this.selectedTool === 'deleteObject') {
        this.saveSetting()
        return
      }

      if (this.selectedTool === 'addObject' || this.selectedTool === 'editObject') {
        if (this.formCreate.title !== '') {
          if (this.formCreate.id == null) {
            const uuid = Math.random().toString(36).slice(-6)
            this.objectList.push({
              name: this.formCreate.title,
              points: this.points,
              id: uuid,
              type: objectType,
              deltax: this.formCreate.deltax,
              deltay: this.formCreate.deltay
            })
            this.saveSetting()
          } else {
            for (var item of this.objectList) {
              if (item.id === this.formCreate.id) {
                item.name = this.formCreate.title
                item.points = this.points
                item.deltax = this.formCreate.deltax
                item.deltay = this.formCreate.deltay
                this.saveSetting()
                break
              }
            }
          }
        } else {
          this.$notify.warning({
            title: this.generateTitleView('warning', 'message'),
            message: this.generateTitleView('nameObjectRequired', 'createMap'),
            duration: 3000
          })
        }
      } else {
        this.saveSetting()
      }
    },
    selectObject(item) {
      this.selectedObject = item
      this.points = item.points
      this.formCreate.title = item.name
      this.formCreate.id = item.id
      this.formCreate.deltax = item.deltax
      this.formCreate.deltay = item.deltay
      if (item.type === 'object') {
        this.selectedTool = 'editObject'
      }
    },
    saveSetting() {
      const height = this.$refs.editorCanvas.clientHeight
      const width = this.$refs.editorCanvas.clientWidth
      this.areaObject['modified'] = new Date().toJSON()
      this.areaObject['modifiedBy'] = this.currentUser
      this.areaObject.jsonData = JSON.stringify({
        objectList: this.objectList,
        sizeMap: {
          w: width,
          h: height
        }
      })
      this.actUpdateJson(this.areaObject).then(res => {
        if (res.isSuccess) {
          this.selectedTool = ''
          this.points = []
          this.formCreate.title = ''
          this.getArea(this.areaObject.id)
          this.$notify.success({
            title: this.generateTitleView('success', 'message'),
            message: res.message,
            duration: 2000
          })
        }
      })
      this.pointIndex = null
    },
    removePoint(index) {
      var flagPoint = JSON.parse(JSON.stringify(this.points))
      flagPoint[index].x = 0
      flagPoint[index].y = 0

      this.points = []

      for (const item of flagPoint) {
        this.points.push(item)
      }
    },
    removeObject(index) {
      this.selectedTool = 'deleteObject'
      this.objectList.splice(index, 1)
      this.formCreate = {
        title: '',
        id: null
      }
      this.points = []
    },
    showMapSetting() {
      this.dialogMapSetting = true
    },
    saveMapSetting() {
      this.areaObject['modified'] = new Date().toJSON()
      this.areaObject['modifiedBy'] = this.currentUser
      this.actEditArea(this.areaObject).then(res => {
        if (res.isSuccess) {
          this.$notify.success({
            title: this.generateTitleView('success', 'message'),
            message: this.generateTitleView('successMessage', 'message'),
            duration: 2000
          })
          this.dialogMapSetting = false
        } else {
          this.$notify.error({
            title: this.generateTitleView('error', 'message'),
            message: this.generateTitleView('errorMessage', 'message'),
            duration: 2000
          })
          this.dialogMapSetting = false
        }
      })
    },
    setPoint(index) {
      this.pointIndex = index
    }
  }
}
</script>

<style lang='scss' scoped>
$blueActive: #0258D0;

.times {
  z-index: 1000;
}

#wcp-editor-object-settings {
  height: 50%;
}

/deep/ .el-scrollbar__wrap {
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
}

.fa-remove {
  cursor: pointer;
  color: #F56C6C;
  margin-left: 5px
}

.object-item {
  line-height: 40px;
  padding: 0 10px;
  background: #f1f1f1;
  cursor: pointer;
  position: relative;

  &:hover {
    background: #DFDFDF;
  }

  .fa-remove {
    position: absolute;
    right: 20px;
    top: 10px;
  }
}

.object-item.active {
  background: $blueActive;
  color: #fff;
}

.svg-editor {
  width: 100%;
  height: 100%;
}

.app-container {
  .action-container {
    margin-right: 25px;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    margin-bottom: 5px;
  }

  padding: 0;

  .page-title {
    padding: 0 25px;
    background: #fff;
    font-size: 24px;
    display: flex;
    height: 60px;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .title-container {
      display: flex;
    }

    .icon-back {
      font-size: 12px;
      margin-top: 4px;
    }

    .title-page {
      margin-left: 10px;
      font-weight: bold;
      color: rgba(33, 33, 33, 0.85);
    }

    .btn-export-excel {
      padding: 5px 10px;
    }

    .btn-create-hotel {
      padding: 5px 10px;
    }

  }

}

.app-container {
  height: calc(100vh - 60px);
  position: relative;
}

.create-map_wrapper {
  height: calc(100% - 60px);
  display: flex;
  margin-left: 70px;

  .edit-wrap {
    //margin-right: 20px;
  }

  .tool-wrap {
    flex-basis: 250px;
    background: #ffffff;
  }
}

.vb-tools {
  position: absolute;
  background: #ffffff;
  left: 10px;
  top: 50%;
  margin-top: -205px;
  border: 1px solid #D7D7D7;
  border-radius: 3px;
}

.vb-tools .tool-item {
  cursor: pointer;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 46px;
  height: 46px;
  font-size: 20px;

  &:hover {
    background: #F1F1F1;
  }
}

.edit-wrap {
  /*position: relative;*/
  z-index: 0;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center !important;
  //margin-left: 66px;

  .editor-canvas {
    //width: 300px;
    width: 820px;
    position: absolute;
    background: #fff;
  }
}

.dialogUploadImage {
  padding: 10px;
}

#imp-editor-shapes-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.tool-item.active {
  background: #0258D0;
  color: white !important;

  &:hover {
    background: #0258D0;
  }
}

.svg-editor circle {
  fill: rgba(0, 0, 0, .5);
  stroke-width: 1px;
  stroke: #fff;
}

.tool-wrap {
  display: flex;
  flex-direction: column;

  #wcp-editor-right #wcp-editor-object-settings {
    overflow-y: auto;
    flex: 2;
  }

  #wcp-editor-object-list-wrap {
    flex: 1;
    max-height: 50%;
  }
}

.setting-header {
  background: #F1F1F1;
  line-height: 40px;
  padding: 0 10px;
  font-size: 14px;
}

.setting-item {
  padding: 4px 25px;
}

.input-point {
  background: white;
  border: 1px solid #dfdfdf;
  color: #333;
  width: 50px;
  font-size: 12px;
  flex: 1;
  height: 24px;
  margin: 0;
  padding-left: 7px;
  line-height: 24px;
  font-weight: 400;
  box-shadow: none;
  outline: none;
  border-radius: 3px;
}

.setting-item__right {
  margin-left: 15px;
}

.setting-action {
  text-align: right;
  padding: 7px;
}

.btn-saveObject {
  padding: 5px 8px;
}

.setting-title {
  padding: 5px 10px;

  display: flex;

  input {
    background: white;
    border: 1px solid #dfdfdf;
    color: #333;
    width: 50px;
    font-size: 12px;
    flex: 1;
    height: 24px;
    padding: 0 7px;
    line-height: 24px;
    font-weight: 400;
    box-shadow: none;
    outline: none;
    border-radius: 3px;
    margin-left: 5px;
  }

  .label {
    width: 90px;
  }

  &:first-child {
    margin-top: 8px;
  }
}

.wcp-editor-object-list-wrap {
  display: flex;
  flex-direction: column-reverse;
}

.dialogMapSetting {
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
}

.dialogMapSetting /deep/ .v-text-field__slot label.v-label.v-label--active {
  left: -8px !important;
  right: auto !important;
}

.dialogMapSetting /deep/ .v-text-field__slot label.v-label {
  left: 0px !important;
  right: auto !important;
}

.dialogMapSetting /deep/ .v-text-field--outlined fieldset {
  padding-left: 8px;
}

.dialogMapSetting /deep/ .v-input__slot legend {
  text-align: left;
}

.dialogMapSetting /deep/ .v-input__slot {
  min-height: 40px !important;
  margin-bottom: 30px;
}

.dialogMapSetting /deep/ .v-text-field--outlined .v-label {
  top: 10px;
}

.dialogMapSetting /deep/ .v-text-field__slot label {
  font-weight: normal !important;
  font-size: 14px;
}

.dialogMapSetting /deep/ .v-text-field__details {
  display: none;
}

.dialogMapSetting::-webkit-scrollbar {
  width: 1em;
}

.dialogMapSetting::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.dialogMapSetting::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
}

.setting-camera-title {
  /deep/ .v-input {
    margin-left: 5px;
  }

  /deep/ .v-text-field__details {
    display: none;
  }
}

.object-list-wrap-title {
  line-height: 40px;
  padding: 0 10px;
  background: #f1f1f1;
  cursor: pointer;
  font-weight: bold;
}

.iconMinus {
  margin-right: 5px;
}

.titleWidth {
  width: 150px;
  display: inline-block;
}

.el-edit {
  padding: 0 !important;
  border: none !important;
}

#wcp-editor-object-settings {
  overflow-x: hidden !important;
}

#wcp-editor-object-settings /deep/ .el-scrollbar__wrap {
  overflow-x: hidden !important;
}

.realSize {
  margin-bottom: 7px;
  display: block;
}

.selectObj {
  max-width: 200px;
}
.btn-control.btn-primary {
  background: #409EFF;
  color: #fff !important;
  padding: 3px 7px;
  border-radius: 3px;
  margin-right: 10px;
}

.btn-control{
  padding: 3px 7px;
  background: #9e9e9e4f;
  border-radius: 3px;
}

</style>
