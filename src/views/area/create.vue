<template>
  <div class="app-container">
    <ValidationObserver v-slot="{ handleSubmit }" tag="form"  ref="observer">
      <form class="role-info__inners" @submit.prevent="handleSubmit(handleSubmitUser)">
        <sticky :z-index="10" class-name="sub-navbar">
          <div class="page-title">
            <div class="title-container">
              <router-link to="/users/areas/index" class="back-link">
                <font-awesome-icon icon="chevron-left" color="#424242" class="icon-back" />
              </router-link>
              <span class="title-page">{{ formTitle }}</span>
            </div>
            <div class="action-container">
              <router-link to="/users/areas/index">
                <el-button plain class="btn-back">{{ generateTitleView('cancel', 'usermanagement') }}
                </el-button>
              </router-link>
              <button type="submit" plain class="btn-save">
                {{ generateTitleView('save', 'usermanagement') }}
              </button>
            </div>
          </div>
        </sticky>
        <md-card class="role-infor">
          <div class="role-info__inner">
            <div class="role-info__inners">
              <div class="info-title">{{ generateTitleView('info', 'area') }}</div>
              <div class="info-content">
                <div class="form">
                  <el-row :gutter="40" class="mb-10">
                    <el-col :span="12">
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        :name="generateTitleView('name', 'veeValidate')"
                      >
                        <v-text-field
                          v-model="formCreate.name"
                          :label="generateTitleView('areaName', 'area')"
                          outlined
                          :height="10"
                        />
                        <span class="vee-errors">{{ errors[0] }}</span>
                      </ValidationProvider>
                      <v-select
                        v-model="formCreate.parentId"
                        :items="listParentAreas"
                        item-text="name"
                        item-value="id"
                        :label="generateTitleView('selectArea', 'area')"
                        persistent-hint
                      />
                    </el-col>
                    <el-col :span="12" class="vibotDateWrap">

                      <vue-upload-multiple-image
                        :data-images="images"
                        id-upload="myIdUpload"
                        edit-upload="myIdEdit"
                        :multiple="false"
                        drag-text="Kéo hình ảnh"
                        @upload-success="uploadImageSuccess"
                        @edit-image="editImage"
                        @before-remove="beforeRemove"
                      />
                    </el-col>
                  </el-row>

                  <el-row :gutter="40" class="mb-10">
                    <el-col :span="12">
                      <ValidationProvider
                        v-slot="{ errors }"
                        :name="generateTitleView('areaName', 'veeValidate')"
                      >
                        <v-text-field
                          v-model="formCreate.width"
                          :label="generateTitleView('width', 'area')"
                          outlined
                          :height="10"
                        />
                        <span class="vee-errors">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </el-col>
                    <el-col :span="12" class="vibotDateWrap">

                      <ValidationProvider
                        v-slot="{ errors }"
                        :name="generateTitleView('areaName', 'veeValidate')"
                      >
                        <v-text-field
                          v-model="formCreate.height"
                          :label="generateTitleView('height', 'area')"
                          outlined
                          :height="10"
                        />
                        <span class="vee-errors">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </el-col>
                  </el-row>

                  <el-row :gutter="40" class="mb-10">
                    <el-col :span="24">
                      <v-textarea
                        v-model="formCreate.description"
                        :label="generateTitleView('description', 'area')"
                        outlined
                        rows="3"
                      />
                    </el-col>

                  </el-row>
                  <el-row :gutter="40" class="mb-10" type="flex" align="middle">
                    <el-col :span="12">
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        :name="generateTitleView('workat', 'veeValidate')"
                      >
                        <v-select
                          v-model="formCreate.isActive"
                          :items="AREA_STATUS"
                          item-text="label"
                          item-value="value"
                          label="Select"
                          persistent-hint
                          single-line
                        />

                        <span class="vee-errors">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </el-col>

                    <el-col :span="12">
                      <v-text-field
                        v-model="formCreate.areaNo"
                        :label="generateTitleView('areaNo', 'area')"
                        outlined
                        :height="10"
                      />
                    </el-col>
                  </el-row>

                  <el-row :gutter="40">
                    <el-col :span="24">
                      <div class="title-wrapper">
                        <h3 class="cameraTitle">{{ generateTitleView('cameraList', 'camera') }}
                          ({{ formCreate.cameras.length }})</h3>

                        <span class="btn-add-camera" @click="openAddCamera">{{ generateTitleView('addCamera', 'area') }}</span>
                      </div>

                      <md-table v-model="formCreate.cameras" md-card>

                        <md-table-row slot="md-table-row" slot-scope="{ item }" md-auto-select>
                          <md-table-cell
                            :md-label="generateTitleView('cameraName', 'camera')"
                          >{{ item.name }}
                          </md-table-cell>
                          <md-table-cell :md-label="generateTitleView('cameraIp', 'camera')">
                            {{ item.ip }}
                          </md-table-cell>
                          <md-table-cell><span @click="removeCamera(item)"><md-icon
                            class="removeCamera"
                          >delete</md-icon></span></md-table-cell>
                        </md-table-row>
                      </md-table>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </div>
        </md-card>
      </form>
    </ValidationObserver>

    <v-dialog v-model="showDialog" max-width="550">
      <v-card>
        <v-card-title>{{ generateTitleView('addCameraTitle', 'camera') }}</v-card-title>

        <div class="search">
          <input
            v-model="listQuery.name"
            type="text"
            class="cameraInput"
            :placeholder="generateTitleView('cameraName', 'camera')"
          >
          <button class="btn-search">
            <font-awesome-icon icon="search" color="#fff" @click="searchCamera" />
          </button>
        </div>

        <div class="md-contents">
          <md-table v-if="listCameras.length > 0" v-model="listCameras" md-card @md-selected="onSelect">

            <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="multiple" md-auto-select>
              <md-table-cell :md-label="generateTitleView('cameraName', 'camera')">{{ item.name }}
              </md-table-cell>
              <md-table-cell :md-label="generateTitleView('cameraIp', 'camera')">{{ item.ip }}
              </md-table-cell>
            </md-table-row>
          </md-table>
          <div v-else class="noCamera">
            {{ generateTitleView('noCamera', 'camera') }}
          </div>
        </div>

        <md-dialog-actions>
          <md-button class="md-primary" @click="showDialog = false">
            {{ generateTitleView('close', 'camera') }}
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
    import * as ACTIONS from '../../store/constants/area'
    import { ACT_GET_CAMERA_AVAILABLE } from '../../store/constants/camera'
    import VueUploadMultipleImage from 'vue-upload-multiple-image'
    import { data2blob } from '@/help/utils'
    import mimes from '../../components/ImageCropper/utils/mimes'
    import request from '@/help/request.agency'

    const LABEL = {
        model: 'area/',
        modelCamera: 'camera/',
        modelAuth: 'auth/',
        title: 'areas',
        edit: 'Sửa',
        create: 'Tạo mới'
    }

    const defaultCreate = {
        name: '',
        description: '',
        parentId: '',
        isActive: true,
        thumb: '',
        cameras: [],
        areaNo: 0
    }

    export default {
        name: 'CreateUser',
        components: {
            Sticky,
            VueUploadMultipleImage
        },
        data() {
            return {
                cameraSelected: [],
                showDialog: false,
                menu: false,
                formCreate: JSON.parse(JSON.stringify(defaultCreate)),
                formTitle: this.$router.currentRoute.params.id != null ? this.generateTitleView('editArea', 'area') : this.generateTitleView('createArea', 'area'),
                currentUser: '',
                currentDate: '',
                isEdit: false,
                urlUpload: 'file/upUserAvatar',
                folderUpload: process.env.VUE_APP_STORAGE_USER_AVATAR_PUBLIC,
                AREA_STATUS: [
                    { value: true, label: this.generateTitleView('active', 'module') },
                    { value: false, label: this.generateTitleView('deactive', 'module') }
                ],
                listQuery: {
                    page: 1,
                    limit: 10,
                    name: '',
                    status: null
                },
                images: [],
                imgFormat: 'png',
                allowedImgFormat: ['jpg', 'png']
            }
        },
        computed: {
            ...mapGetters({
                language: 'language',
                listParentAreas: LABEL.model + 'listParentAreas',
                listCameras: LABEL.modelCamera + 'availableCameras',
                areaNo: LABEL.modelAuth + 'areaNo'
            })
        },
        watch: {
            language: {
                immediate: true,
                handler(val, oldVal) {
                    this.AREA_STATUS = [
                        { value: true, label: this.generateTitleView('active', 'module') },
                        { value: false, label: this.generateTitleView('deactive', 'module') }
                    ]
                }
            }
        },
        mounted() {
            const areaId = this.$router.currentRoute.params.id
            if (typeof areaId !== 'undefined' && areaId !== null) {
                this.getArea(areaId)
            } else {
                this.formCreate.areaNo = this.areaNo
            }
            this.currentUser = this.$store.state.auth.name
            if (this.formTitle === LABEL.edit) {
                this.isEdit = true
            }
            this.getParentArea()
            this.searchCamera()
        },
        methods: {
            ...mapActions({
                actCreateArea: LABEL.model + ACTIONS.ACT_INSERT_AREA,
                actGetCurrentArea: LABEL.model + ACTIONS.ACT_FETCH_ONE_AREA,
                actEditArea: LABEL.model + ACTIONS.ACT_EDIT_AREA,
                actParentArea: LABEL.model + ACTIONS.ACT_FETCH_AREA_PARENT,
                actGetCamera: LABEL.modelCamera + ACT_GET_CAMERA_AVAILABLE
            }),
            handleSubmitUser() {
                this.formTitle === this.generateTitleView('editArea', 'area') ? this.editArea() : this.createArea()
            },
            getParentArea() {
                this.actParentArea({ ParentId: null })
            },
            getArea(id) {
                this.actGetCurrentArea(id).then(res => {
                    const dataUser = res.payload.records
                    this.formCreate = JSON.parse(JSON.stringify(dataUser))
                    this.images = [{
                        path: this.folderUpload + this.formCreate.thumb,
                        default: 1,
                        highlight: 1
                    }]
                })
            },
            createArea() {
                this.formCreate['created'] = new Date().toJSON()
                this.formCreate['createdBy'] = this.currentUser
                this.actCreateArea(this.formCreate).then(res => {
                    if (res.isSuccess) {
                        this.$notify.success({
                            title: this.generateTitleView('success', 'message'),
                            message: this.generateTitleView('successMessage', 'message'),
                            duration: 2000
                        })
                        setTimeout(() => {
                            window.location.href = '/#/users/areas/index'
                        }, 2000)
                    } else {
                        this.$notify.error({
                            title: this.generateTitleView('areas', 'message'),
                            message: res.message,
                            duration: 2000
                        })
                    }
                })
            },
            editArea() {
                this.formCreate['modified'] = new Date().toJSON()
                this.formCreate['modifiedBy'] = this.currentUser
                this.actEditArea(this.formCreate).then(res => {
                    if (res.isSuccess) {
                        this.$notify.success({
                            title: this.generateTitleView('success', 'message'),
                            message: this.generateTitleView('successMessage', 'message'),
                            duration: 2000
                        })
                        setTimeout(() => {
                            window.location.href = '/#/users/areas/index'
                        }, 2000)
                    } else {
                        this.$notify.error({
                            title: this.generateTitleView('error', 'message'),
                            message: this.generateTitleView('errorMessage', 'message'),
                            duration: 2000
                        })
                        setTimeout(() => {
                            window.location.href = '/#/users/areas/index'
                        }, 2000)
                    }
                })
            },
            openAddCamera() {
                this.showDialog = true
            },
            searchCamera() {
                this.actGetCamera({
                    current_page: this.listQuery.page,
                    name: this.listQuery.name,
                    is_active: true,
                    limit: this.listQuery.limit
                })
            },
            onSelect(items) {
                this.cameraSelected = items
            },
            addCamera() {
                this.showDialog = false
                if (this.formCreate.cameras.length === 0) {
                    this.formCreate.cameras = this.cameraSelected
                } else {
                    this.formCreate.cameras = this.formCreate.cameras.concat(this.cameraSelected)
                }
            },
            removeCamera(camera) {
                var filtered = this.formCreate.cameras.filter(function(value, index, arr) {
                    return value.id !== camera.id
                })
                this.formCreate.cameras = filtered
                this.listCameras.push(camera)
            },
            uploadImageSuccess(formData, index, fileList) {
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
                    this.formCreate.thumb = resData.data
                }).catch(err => {
                    console.log('ko')
                })
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
                        this.formCreate.thumb = resData.data
                    }).catch(err => {
                        console.log('ko')
                    })
                }.bind(this), 100)
            },
            beforeRemove(index, done, fileList) {
                var r = confirm('Bạn có muốn xóa ảnh?')
                if (r === true) {
                    done()
                }
            },
            generateTitleView
        }
    }
</script>

<style lang="scss" scoped>

    .noCamera {
        padding: 0 20px;
    }

    .myInput /deep/ .v-label {
        /*left: 0 !important;*/
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

        .role-infor {
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

    .role-infor /deep/ .v-text-field__slot label.v-label.v-label--active {
        left: -8px !important;
        right: auto !important;
    }

    .role-infor /deep/ .v-text-field__slot label.v-label {
        left: 0px !important;
        right: auto !important;
    }

    .role-infor /deep/ .v-text-field--outlined fieldset {
        padding-left: 8px;
    }

    .role-infor /deep/ .v-input__slot legend {
        text-align: left;
    }

    .role-infor /deep/ .v-input__slot {
        min-height: 40px !important;
    }

    .role-infor /deep/ .v-text-field--outlined .v-label {
        top: 10px;
    }

    .role-infor /deep/ .v-text-field__slot label {
        font-weight: normal !important;
        font-size: 14px;
    }

    .role-infor /deep/ .v-text-field__details {
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

    .removeCamera {
        color: red !important;
    }

    .title-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }

    @media only screen and (max-width: 1400px) {
        .app-container .role-infor .role-info__inner {
            flex-basis: 80%;
        }
    }

    @media only screen and (max-width: 1024px) {
        .app-container .role-infor .role-info__inner {
            flex-basis: 100%;
        }
    }
</style>
