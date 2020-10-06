<template>
  <div class="app-container">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form class="role-info__inners" @submit.prevent="handleSubmit(handleSubmitUser)">
        <sticky :z-index="10" class-name="sub-navbar">
          <div class="page-title">
            <div class="title-container">
              <router-link to="/users/robots/index" class="back-link">
                <font-awesome-icon icon="chevron-left" color="#424242" class="icon-back"/>
              </router-link>
              <span class="title-page">{{ formTitle }}</span>
            </div>
            <div class="action-container">

              <!--              <span class="btn-add-camera" @click="manageMedia"-->
              <!--                    v-if="formTitle === generateTitleView('editRobot', 'robot')">{{-->
              <!--                  generateTitleView('manageMedia', 'robot')-->
              <!--                }}</span>-->

              <router-link to="/users/robots/index">
                <el-button plain class="btn-back">{{ generateTitleView('cancel', 'usermanagement') }}</el-button>
              </router-link>
              <button type="submit" plain class="btn-save">{{ generateTitleView('save', 'usermanagement') }}
              </button>
            </div>
          </div>
        </sticky>
        <md-card class="role-info">
          <div class="role-info__inner">
            <div class="role-info__inners">
              <div class="info-title">{{ generateTitleView('info', 'robot') }}</div>
              <div class="info-content">
                <div class="form">
                  <el-row :gutter="40" class="mb-10">
                    <el-col :span="12">
                      <ValidationProvider v-slot="{ errors }" rules="required"
                                          :name="generateTitleView('robotName', 'veeValidate')">
                        <v-text-field
                            v-model="formCreate.name"
                            :label="generateTitleView('robotName', 'robot')"
                            outlined
                            :height="10"
                        />
                        <span class="vee-errors">{{ errors[0] }}</span>
                      </ValidationProvider>

                    </el-col>

                    <el-col :span="12">
                      <ValidationProvider v-slot="{ errors }" rules="required"
                                          :name="generateTitleView('code', 'veeValidate')">
                        <v-text-field
                            v-model="formCreate.code"
                            :label="generateTitleView('code', 'robot')"
                            outlined
                            disabled
                            :height="10"
                        />
                        <span class="vee-errors">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </el-col>
                  </el-row>

                  <el-row :gutter="40" class="mb-20" style="margin-bottom: 20px">
                    <el-col :span="12" class="robotVersion">
                      <v-select
                          v-model="formCreate.robotVersion"
                          :items="listRobotVersions"
                          item-text="name"
                          :label="generateTitleView('selectVersion', 'robot')"
                          outlined
                          dense
                          return-object
                          class="vibot-select"
                      />
                    </el-col>

                    <el-col :span="12">
                      Icon robot:
                      <multiselect
                          v-model="formCreate.icon"
                          :options="robotIcons"
                          :option-height="100"
                          :show-labels="false"
                          :close-on-select="true"
                          :clear-on-select="true"
                          placeholder="Chọn icon"
                      >
                        <template slot="singleLabel" slot-scope="props">
                          <div>
                            <img class="option__image" :src="require(`@/assets/${props.option}`)"
                                 style="width:30px; height:30px">
                            <span class="option__desc">
                              <span class="option__title"/>
                            </span>
                          </div>
                        </template>
                        <template slot="option" slot-scope="props">
                          <img class="option__image pull-left" :src="require(`@/assets/${props.option}`)"
                               style="width:30px; height:30px">
                          <div class="option__desc pull-left">
                            <span class="option__title"/>
                          </div>
                          <div class="both-risk"/>
                        </template>
                      </multiselect>
                    </el-col>
                  </el-row>

                  <el-row class="md-10" :gutter="40" style="margin-bottom: 20px">
                    <el-col :span="12" class="vibotDateWrap" :gutter="40">
                      <div class="inner" style="display: flex">
                        <thumb-upload style="margin-left: 10px"
                                      title="Logo của robot"
                                      :img.sync="formCreate.thumb"
                                      :api-url="urlUpload"
                                      :folder-upload="folderUpload"
                        />
                      </div>
                    </el-col>
                    <el-col :span="12" class="statusWrap">
                      <ValidationProvider v-slot="{ errors }" rules="required"
                                          :name="generateTitleView('workat', 'veeValidate')">

                        <v-select
                            v-model="formCreate.isActive"
                            :items="USER_STATUS"
                            item-text="label"
                            item-value="value"
                            label="Trạng thái hoạt động"
                            outlined
                            dense
                        />

                        <span class="vee-errors">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </el-col>
                  </el-row>


                  <el-row :gutter="40" class="mb-10">
                    <el-col :span="12">
                      <div class="info-title" style="margin-bottom: 15px">Cấu hình cho mạng LAN</div>
                      <ValidationProvider v-slot="{ errors }" rules="required"
                                          :name="generateTitleView('videoCallUrl', 'veeValidate')">
                        <v-text-field
                            v-model="formCreate.videoCallUrl"
                            :label="generateTitleView('videoCallUrl', 'robot')"
                            outlined
                            :height="10"
                        />
                        <span class="vee-errors">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </el-col>

                    <el-col :span="12">
                      <div class="info-title" style="margin-bottom: 15px">Cấu hình cho mạng Internet</div>
                      <ValidationProvider v-slot="{ errors }" rules="required"
                                          :name="generateTitleView('videoCallUrl', 'veeValidate')">
                        <v-text-field
                            v-model="formCreate.videoCallOnlineUrl"
                            :label="generateTitleView('videoCallOnlineUrl', 'robot')"
                            outlined
                            :height="10"
                        />
                        <span class="vee-errors">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </el-col>
                  </el-row>


                </div>
              </div>
            </div>
          </div>

          <div class="robot-info__right">
            <el-row :gutter="40" class="mb-10">
              <el-col :span="24">
                <v-textarea
                    v-model="formCreate.description"
                    :label="generateTitleView('description', 'doctor')"
                    outlined
                    rows="3"
                />
              </el-col>
            </el-row>

            <el-row class="mb-10">
              <div class="info-title" style="margin-bottom: 0">{{ generateTitleView('area', 'robot') }}</div>
            </el-row>

            <el-row class="mb-10" :gutter="40">
              <el-col :gutter="40" :span="12">
                <v-select
                    v-model="parentId"
                    :items="listParentArea"
                    item-text="name"
                    item-value="id"
                    :label="generateTitleView('selectBigArea', 'robot')"
                    dense
                    @change="changeAreaParent"
                />
              </el-col>

              <el-col :gutter="40" :span="12">
                <v-select
                    v-model="formCreate.map"
                    :items="listChildrenArea"
                    item-text="name"
                    :label="generateTitleView('selectChildArea', 'robot')"
                    dense
                    return-object
                />
              </el-col>
            </el-row>

            <el-row :gutter="40" class="mb-10">
              <el-col :span="24">
                <div class="title-wrapper">
                  <h3 class="cameraTitle">{{ generateTitleView('cameraList', 'camera') }}
                    ({{ formCreate.cameras.length }})</h3>

                  <span class="btn-add-camera" @click="openAddCamera">{{ generateTitleView('addCamera', 'area') }}</span>
                </div>

                <md-table v-model="formCreate.cameras" md-card>

                  <md-table-row slot="md-table-row" slot-scope="{ item }" md-auto-select>
                    <md-table-cell :md-label="generateTitleView('cameraName', 'camera')"> {{ item.name }} </md-table-cell>
                    <md-table-cell><span @click="removeCamera(item)"><md-icon class="removeCamera">delete</md-icon></span></md-table-cell>
                  </md-table-row>
                </md-table>
              </el-col>
            </el-row>
          </div>
        </md-card>
      </form>
    </ValidationObserver>
    <v-dialog v-model="showDialog" max-width="550">
      <v-card>
        <v-card-title>{{ generateTitleView('addCameraTitle', 'camera') }}</v-card-title>

        <div class="search">
          <input v-model="listQuery.name" type="text" class="cameraInput" :placeholder="generateTitleView('cameraName', 'camera')">
          <button class="btn-search">
            <font-awesome-icon icon="search" color="#fff" @click="searchCamera" />
          </button>
        </div>

        <div class="md-contents">
          <md-table v-if="listCameras.length > 0" v-model="listCameras" md-card @md-selected="onSelect">

            <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="multiple" md-auto-select>
              <md-table-cell :md-label="generateTitleView('cameraName', 'camera')">{{ item.name }}</md-table-cell>
            </md-table-row>
          </md-table>
          <div v-else class="noCamera">
            {{ generateTitleView('noCamera', 'camera') }}
          </div>
        </div>

        <md-dialog-actions>
          <md-button class="md-primary" @click="showDialog = false">{{ generateTitleView('close', 'camera') }}
          </md-button>
          <md-button class="md-primary" @click="addCamera">{{ generateTitleView('addCamera', 'camera') }}</md-button>

        </md-dialog-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import Sticky from '@/components/Sticky'
import { generateTitleView } from '@/help/utils/i18n'
import { mapGetters, mapActions } from 'vuex'
import * as ACTIONS from '../../store/constants/robot'
import { ACT_GET_CAMERA_AVAILABLE } from '../../store/constants/camera'
import { ACT_GET_ALL_ROBOT_VERSION } from '../../store/constants/robotversion'
import { hasPermissionAction } from '@/help/utils/index'
import ThumbUpload from '@/components/AvatarUpload'
import Multiselect from 'vue-multiselect'

const LABEL = {
  model: 'robot/',
  modelRobotVersion: 'robotversion/',
  modelCamera: 'camera/'
}

const defaultCreate = {
  name: '',
  code: '',
  description: '',
  ip: '',
  privateIP: '',
  port: '',
  isActive: true,
  videoCallUrl: '',
  cameras: [],
  privatePort: '',
  videoCallOnlineUrl: '',
  robotVersion: {},
  thumb: '',
  icon: ''
}

export default {
  name: 'CreateRobot',
  components: {
    Sticky,
    ThumbUpload,
    Multiselect
  },
  data() {
    return {
      robotIcons: ['robot1.svg', 'robot2.svg', 'robot3.svg', 'robot4.svg', 'robot5.svg', 'robot6.png', 'robot7.png', 'robot8.png', 'robot9.png', 'robot10.png'],
      parentId: '',
      cameraSelected: [],
      showDialog: false,
      menu: false,
      formCreate: JSON.parse(JSON.stringify(defaultCreate)),
      formTitle: this.$router.currentRoute.params.id != null ? this.generateTitleView('editRobot', 'robot') : this.generateTitleView('createRobot', 'robot'),
      currentUser: '',
      currentDate: '',
      isEdit: false,
      urlUpload: 'file/upUserAvatar',
      folderUpload: process.env.VUE_APP_STORAGE_USER_AVATAR_PUBLIC,
      USER_STATUS: [
        { value: true, label: this.generateTitleView('active', 'module') },
        { value: false, label: this.generateTitleView('deactive', 'module') }
      ],
      listQuery: {
        page: 1,
        limit: 10,
        name: '',
        status: null
      }
    }
  },
  computed: {
    ...mapGetters({
      language: 'language',
      listCameras: LABEL.modelCamera + 'availableCameras',
      listParentArea: LABEL.model + 'listParentArea',
      parentAreaModel: LABEL.model + 'parentAreaModel',
      listChildrenArea: LABEL.model + 'listChildrenArea',
      listRobotVersions: LABEL.modelRobotVersion + 'listAllRobotVersion'
    })
  },
  watch: {
    language: {
      immediate: true,
      handler() {
        this.USER_STATUS = [
          { value: true, label: this.generateTitleView('active', 'module') },
          { value: false, label: this.generateTitleView('deactive', 'module') }
        ]
      }
    }
  },
  mounted() {
    this.$store.commit('app/CHANGE_APP_TITLE', 'HỆ THỐNG GIÁM SÁT VÀ ĐIỀU KHIỂN ROBOT')
    const robotId = this.$router.currentRoute.params.id
    if (typeof robotId !== 'undefined' && robotId !== null) {
      this.getRobot(robotId)
    } else {
      this.formCreate.code = this.generate(4)
    }
    this.currentUser = this.$store.state.auth.name
    if (this.formTitle === LABEL.edit) {
      this.isEdit = true
    }
    this.actFetchAllUsers()
    this.actGetParentArea()
    this.actGetAllRobotVersion()
    this.searchCamera()
  },
  methods: {
    ...mapActions({
      actCreateRobot: LABEL.model + ACTIONS.ACT_INSERT_ROBOT,
      actGetCurrentRobot: LABEL.model + ACTIONS.ACT_FETCH_ONE_ROBOT,
      actEditRobot: LABEL.model + ACTIONS.ACT_EDIT_ROBOT,
      actFetchAllUsers: LABEL.model + ACTIONS.ACT_FETCH_USERS,
      actGetCamera: LABEL.modelCamera + ACT_GET_CAMERA_AVAILABLE,
      actGetParentArea: LABEL.model + ACTIONS.ACT_GET_PARENT_AREA,
      actGetChildAreaByParent: LABEL.model + ACTIONS.ACT_GET_CHILD_AREA_BY_PARENT,
      actSetParentArea: LABEL.model + ACTIONS.ACT_SET_PARENT_AREA,
      actGetAllRobotVersion: LABEL.modelRobotVersion + ACT_GET_ALL_ROBOT_VERSION
    }),
    handleSubmitUser() {
      this.formTitle === this.generateTitleView('editRobot', 'robot') ? this.editRobot() : this.createRobot()
    },
    getRobot(id) {
      this.actGetCurrentRobot(id).then(res => {
        const dataUser = res.payload.records
        this.formCreate = JSON.parse(JSON.stringify(dataUser))
        if (this.formCreate.map != null) {
          this.parentId = this.formCreate.map.parentId
          this.actGetChildAreaByParent({ ParentId: this.parentId })
        }
      })
    },
    createRobot() {
      this.formCreate['created'] = new Date().toJSON()
      this.formCreate['createdBy'] = this.currentUser
      this.actCreateRobot(this.formCreate).then(res => {
        if (res.isSuccess) {
          this.$notify.success({
            title: this.generateTitleView('success', 'message'),
            message: this.generateTitleView('successMessage', 'message'),
            duration: 2000
          })
          setTimeout(() => {
            window.location.href = '/#/users/robots/index'
          }, 2000)
        } else {
          this.$notify.error({
            title: this.generateTitleView('error', 'message'),
            message: this.generateTitleView('errorMessage', 'message'),
            duration: 2000
          })
          setTimeout(() => {
            window.location.href = '/#/users/robots/index'
          }, 2000)
        }
      })
    },
    manageMedia() {
      var robotId = this.$router.currentRoute.params.id
      window.location.href = '/#/users/robots/media/' + robotId
    },
    editRobot() {
      this.formCreate['modified'] = new Date().toJSON()
      this.formCreate['modifiedBy'] = this.currentUser
      this.actEditRobot(this.formCreate).then(res => {
        if (res.isSuccess) {
          this.$notify.success({
            title: this.generateTitleView('success', 'message'),
            message: this.generateTitleView('successMessage', 'message'),
            duration: 2000
          })
          setTimeout(() => {
            window.location.href = '/#/users/robots/index'
          }, 2000)
        } else {
          this.$notify.error({
            title: this.generateTitleView('error', 'message'),
            message: this.generateTitleView('errorMessage', 'message'),
            duration: 2000
          })
          setTimeout(() => {
            window.location.href = '/#/users/robots/index'
          }, 2000)
        }
      })
    },
    searchCamera() {
      this.actGetCamera({
        current_page: this.listQuery.page,
        name: this.listQuery.name,
        is_active: true,
        limit: this.listQuery.limit
      })
    },
    openAddCamera() {
      this.showDialog = true
    },
    addCamera() {
      this.showDialog = false
      if (this.formCreate.cameras.length === 0) {
        this.formCreate.cameras = this.cameraSelected
      } else {
        this.formCreate.cameras = this.formCreate.cameras.concat(this.cameraSelected)
      }
    },
    onSelect(items) {
      this.cameraSelected = items
    },
    removeCamera(camera) {
      var filtered = this.formCreate.cameras.filter(function(value, index, arr) {
        return value.id !== camera.id
      })
      this.formCreate.cameras = filtered
      this.listCameras.push(camera)
    },
    changeAreaParent(vals) {
      this.actGetChildAreaByParent({ ParentId: vals })
    },
    generate(n) {
      var add = 1
      var max = 12 - add

      if (n > max) {
        return this.generate(max) + this.generate(n - max)
      }

      max = Math.pow(10, n + add)
      var min = max / 10
      var number = Math.floor(Math.random() * (max - min + 1)) + min

      return ('RR' + number).substring(add)
    },
    generateTitleView,
    hasPermissionAction
  }
}
</script>

<style lang="scss" scoped>

.noCamera {
  padding: 0 20px;
}

.app-container {
  .action-container {
    margin-right: 25px;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
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

    .btn-back {
      background: #8e97a9;
      color: #fff;
      padding: 8px 20px;
    }

    .btn-save {
      background: #123d8b;
      color: #fff;
      padding: 5px 20px;
      font-size: 14px;
      border-radius: 4px;
    }
  }

  .role-info {
    margin: 10px 10px 10px;
    background: #fff;
    padding: 20px;
    display: flex;

    .role-info__inner {
      flex-basis: 50%;
    }

    .info-title {
      margin-bottom: 10px;
      font-weight: 600;
      font-size: 17px;
      line-height: 28px;
      color: #212121;
    }

    .item-name /deep/ .el-input__inner {
      width: 100%;
    }

    .item-username /deep/ label,
    .item-name /deep/ label,
    .item-email /deep/ label,
    .item-phone /deep/ label,
    .item-address /deep/ label,
    .item-role /deep/ label {
      padding-bottom: 0;
    }

    .el-form-item {
      margin-bottom: 9px;
    }

    .label-hotel_admin {
      display: flex;
      margin-bottom: 0;
      margin-top: 10px;

      label {
        padding: 0;
      }

      .admin-checkbox {
        display: inline-block;
        margin-left: 15px;
      }
    }
  }
}

.selectRole /deep/ {
  .el-select.drag-select {
    height: 36px !important;
  }

  input {
    border: none !important;
    height: 36px !important;
  }
}

.vee-errors {
  color: #CE5454;
}

.role-info /deep/ .v-text-field__slot label.v-label.v-label--active {
  left: -8px !important;
  right: auto !important;
}

.role-info /deep/ .v-text-field__slot label.v-label {
  left: 0px !important;
  right: auto !important;
}

.role-info /deep/ .v-text-field--outlined fieldset {
  padding-left: 8px;
}

.role-info /deep/ .v-input__slot legend {
  text-align: left;
}

.role-info /deep/ .v-input__slot {
  min-height: 40px !important;
}

.role-info /deep/ .v-text-field--outlined .v-label {
  top: 10px;
}

.role-info /deep/ .v-text-field__slot label {
  font-weight: normal !important;
  font-size: 14px;
}

.role-info /deep/ .v-text-field__details {
  display: none;
}

.mb-10 {
  margin-bottom: 12px;
}

.vibotDateWrap /deep/ .v-text-field {
  padding-top: 0 !important;
}

.btn-add-camera {
  color: #fff;
  padding: 6px 15px;
  border-radius: 4px;
  font-size: 14px;
  background: #4b74db;
  cursor: pointer;
}

.search {
  margin-bottom: 15px;
  min-width: 550px;
  display: flex;
  padding: 0 20px;
  justify-content: flex-end;
  align-items: center;

  .cameraInput {
    border: 1px solid #00000029;
    padding: 0 12px;
    border-radius: 3px 0 0 3px;
  }

  .btn-search {
    width: 22px;
    height: 22px;
    line-height: 20px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    //border-radius: 3px;
    cursor: pointer;
    background: #448AFF;
  }
}

.pd-10 {
  padding-top: 10px;
}

.removeCamera {
  color: red !important;
}

.vibot-select /deep/ label.v-label--active {
  left: -13px !important;
}

.title-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.robot-info__right {
  padding-top: 40px;
  flex-basis: 50%;
  margin-left: 40px;
}

.statusWrap /deep/ .v-label.v-label--active.theme--light {
  left: -19px !important;
  top: 4px;
}

.robotVersion /deep/ label.v-label {
  right: auto;
  left: -17px !important;
  position: absolute;
  top: 3px !important;
}
</style>
