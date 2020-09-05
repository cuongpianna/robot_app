<template>
  <div class="app-container" data-app>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form class="role-info__inners" @submit.prevent="handleSubmit(handleSubmitUser)">
        <sticky :z-index="10" class-name="sub-navbar">
          <div class="page-title">
            <div class="title-container">
              <router-link to="/usermedia/index" class="back-link">
                <font-awesome-icon icon="chevron-left" color="#424242" class="icon-back" />
              </router-link>
              <span class="title-page">{{ formTitle }}</span>
            </div>
            <div class="action-container">
              <router-link to="/usermedia/index">
                <el-button plain class="btn-back">{{ generateTitleView('cancel', 'usermanagement') }}</el-button>
              </router-link>
              <button type="submit" plain class="btn-save">{{ generateTitleView('save', 'usermanagement') }}
              </button>
            </div>
          </div>
        </sticky>
        <md-card class="role-infor">
          <div class="role-info__inner">
            <div class="role-info__inners">
              <div class="info-title">{{ generateTitleView('create', 'userMedia') }}</div>
              <div class="info-content">
                <div class="form">
                  <el-row :gutter="40" class="mb-10">
                    <el-col :span="12">
                      <ValidationProvider v-slot="{ errors }" rules="required" :name="generateTitleView('mediaName', 'veeValidate')">
                        <v-text-field
                          v-model="formCreate.fileName"
                          :label="generateTitleView('mediaName', 'userMedia')"
                          outlined
                          :height="10"
                        />
                        <span class="vee-errors">{{ errors[0] }}</span>
                      </ValidationProvider>

                    </el-col>


                  </el-row>

                  <el-row :gutter="40" class="mb-10">

                    <el-col :span="12" class="vibotDateWrap">
                      <v-file-input label="Chọn Media" :v-model="file" v-on:change="handleFileUpload($event)"/>
                      <!-- <label>
                         <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
                      </label> -->
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </div>
        </md-card>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
    import Sticky from '@/components/Sticky'
    import { generateTitleView } from '@/help/utils/i18n'
    import ThumbUpload from '@/components/AvatarUpload'
    import { mapGetters, mapActions } from 'vuex'
    import * as ACTIONS from '../../store/constants/usermedia'

    const LABEL = {
        model: 'usermedia/',
        title: 'medias',
        edit: 'Sửa',
        create: 'Tạo mới'
    }
   const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })
    const defaultCreate = {
        name: '',
        thumbnail: ''
    }

    export default {
        name: 'CreateUser',
        components: {
            Sticky,
            ThumbUpload
        },
        data() {
            return {
                menu: false,
                formCreate: JSON.parse(JSON.stringify(defaultCreate)),
                formTitle:  this.generateTitleView('create', 'userMedia'),
                currentUser: '',
                currentDate: '',
                isEdit: false,
                file: '',
            }
        },
        computed: {
            ...mapGetters({
                language: 'language'
            })
        },
        mounted() {
            this.currentUserId = this.$store.state.auth.id
            this.currentUser = this.$store.state.auth.name
            if (this.formTitle === LABEL.edit) {
                this.isEdit = true
            }
        },
        methods: {
            ...mapActions({
              actCreateMedia: LABEL.model + ACTIONS.ACT_INSERT_MEDIA
            }),
            handleSubmitUser() {
               this.createMedia()
            },
            handleFileUpload(e){
              this.file = e;
            },

            createMedia() {
              debugger;
                // this.formCreate['created'] = new Date().toJSON()
                // this.formCreate['createdBy'] = this.currentUser
                // this.formCreate['file'] = this.file;
                 const imagePath =this.file;
                 var fileName = imagePath.name;
                var fileExtension = fileName.substr((fileName.lastIndexOf('.') + 1));
                if (imagePath) {
                    const base64 = toBase64(imagePath).then(result => {

                      debugger;
                        const formData = new FormData()
                        formData.append('base64Image', result)
                        formData.append('fileName', this.formCreate['fileName'])
                        formData.append('extension', fileExtension)
                        formData.append('userId',this.currentUserId )
                        formData.enctype = 'multipart/form-data'

                         this.actCreateMedia(formData).then(res => {
                            if (res.isSuccess) {
                              this.$notify.success({
                                title:  this.generateTitleView('success', 'message'),
                                message: this.generateTitleView('successMessage', 'message'),
                                duration: 2000
                              })
                              setTimeout(() => {
                                window.location.href = '/#/usermedia/index'
                              }, 2000)
                            } else {
                              this.$notify.error({
                                title: this.generateTitleView('commonError', 'message'),
                                message: res.message,
                                duration: 2000
                              })
                            }
                          })
                        // const data = this.$store.dispatch(this.actCreateMedia, formData).then(res => {
                        //     if (res.isSuccess) {
                        //        this.$notify.success({
                        //           title:  this.generateTitleView('success', 'message'),
                        //           message: this.generateTitleView('successMessage', 'message'),
                        //           duration: 2000
                        //         })
                        //         setTimeout(() => {
                        //           window.location.href = '/#/usermedia/index'
                        //         }, 2000)
                        //     }
                        // })
                        // return data
                    })
                    return base64
                }

            },
            
            generateTitleView,
          // parseDate(date) {
          //   if (!date) return null

          //   const [month, day, year] = date.split('/')
          //   return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
          // }
        }
    }
</script>

<style lang="scss" scoped>

    .myInput /deep/ .v-label{
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
        .el-select.drag-select{
            height: 36px !important;
        }

        input{
            border: none !important;
            height: 36px !important;
        }
    }

    .vee-errors{
        color: #CE5454;
    }

    .role-infor /deep/ .v-text-field__slot label.v-label.v-label--active{
        left: -8px !important;
        right: auto !important;
    }

    .role-infor /deep/ .v-text-field__slot label.v-label{
        left: 0px !important;
        right: auto !important;
    }

    .role-infor /deep/ .v-text-field--outlined fieldset{
        padding-left: 8px;
    }

    .role-infor /deep/ .v-input__slot legend{
        text-align: left;
    }

    .role-infor /deep/ .v-input__slot{
        min-height: 40px !important;
    }

    .role-infor /deep/ .v-text-field--outlined .v-label {
        top: 10px;
    }

    .role-infor /deep/ .v-text-field__slot label{
        font-weight: normal !important;
        font-size: 14px;
    }

    .role-infor /deep/ .v-text-field__details{
        display: none;
    }

    .mb-10{
        margin-bottom: 12px;
    }

  .vibotDateWrap /deep/ .v-text-field{
    padding-top: 0 !important;
  }

    @media only screen and (max-width: 1400px) {
      .app-container .role-infor .role-info__inner{
        flex-basis: 80%;
      }
    }

    @media only screen and (max-width: 1024px) {
      .app-container .role-infor .role-info__inner{
        flex-basis: 100%;
      }
    }
</style>
