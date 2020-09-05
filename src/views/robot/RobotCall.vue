<template>
  <div class="callContainer">
    <div class="call-wrap">
      <div class="call-left" style="overflow:hidden;">
        <div class="video-call-wrap">
          <span v-if="mediaSelected == null" id="meetrb1" />
          <div v-else style="height: 100%">
            <video v-if="mediaSelected.fileType == 'Video'" controls autoplay class>
              <source :src="mediaSelected.serverMediaPath" type="video/mp4">
            </video>

            <embed style="height: 100%;" v-else-if="mediaSelected.fileType == 'Pdf'" :src="mediaSelected.serverMediaPath" width="100%" height="100%" />

            <img
              v-else
              :src="mediaSelected.serverMediaPath"
              :alt="mediaSelected.fileName"
              class="media-item"
            >
          </div>
        </div>
        <div class="media-wrap">
          <div class="media_inner">
            <swiper :options="swiperOption">
              <swiper-slide class="media_inner__left">
                <img
                  :src="require('@/assets/doctor2.png')"
                  alt
                  class="mainImg"
                  @click="openVideoCall"
                >
              </swiper-slide>
              <swiper-slide v-for="(item, index) in listRobotMedia" :key="index" class="media-item">
                <img
                  v-if="item.fileType == 'Video'"
                  :src="require('@/assets/videothumb.jpg')"
                  class="media-item__inner"
                  @click="selectItem(item)"
                >
                <div
                  v-if="item.fileType == 'Pdf'"
                  class="pdfItem"
                >
                  <font-awesome-icon icon="file-pdf" class="pdfIcon" />
                  {{ item.fileName }}
                </div>
                <img
                  v-else
                  :src="item.serverMediaPath"
                  :alt="item.fileName"
                  class="media-item__inner"
                  @click="selectItem(item)"
                >
                <div class="overlay" :class="item.fileType" @click="selectItem(item)">{{ item.fileName }}</div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
      <div class="call-right">
        <div class="call-right__top">
          <div class="avatar-container">
            <div class="avatar-wrap">
              <div class="avatar-inner">
                <img v-if="robotInfo.thumb" :src="folderUpload + robotInfo.thumb" alt>
              </div>
            </div>
            <div class="robot-name__wrap">
              <div class="robot-name">
                <span class="label">{{ generateTitleView('robotName', 'robot') }} :</span> {{
                  robotInfo.name
                }}
              </div>

              <div class="robot-code">
                <span class="label">{{ generateTitleView('code', 'robot') }} :</span> {{ robotInfo.code }}
              </div>
            </div>

          </div>
          <div class="robot-actions">
            <el-tooltip
              class="item"
              effect="dark"
              :content="generateTitleView('mediaManagement' ,'robot')"
              placement="top"
            >
              <button
                class="action-button"
                :title="generateTitleView('mediaManagement', 'robot')"
                @click="redirectToMedia"
              >
                <font-awesome-icon icon="file-alt" color="#828282" />
              </button>
            </el-tooltip>

            <el-tooltip
              class="item"
              effect="dark"
              :content="generateTitleView('robotControl' ,'robot')"
              placement="top"
            >
              <button class="action-button camera-button" @click="redirectRobotControl">
                <font-awesome-icon icon="arrows-alt" color="#ffffff" />
              </button>
            </el-tooltip>
          </div>
          <div class="robot-information">

            <div class="robot-status">
              <div class="robot-status__left">
                <div class="value">{{ robotInfo.map.name }}</div>
                <div class="label">{{ generateTitleView('workAt', 'robot') }}</div>
              </div>

              <div class="robot-status__right">
                <div class="value">{{ generateTitleView('working', 'robot') }}</div>
                <div class="label">{{ generateTitleView('status', 'robot') }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="call-right__bottom">
          <div v-show="setting.isTwoCamera" id="meetrb2" class="robot-camera" />
          <div v-show="!setting.isTwoCamera" class="robot_info__under">
            <div class="info_under__inner">
              <div class="robot-rows robot-rows_first">
                <el-tooltip :content="generateTitleView('version', 'robot')" effect="dark" placement="top">
                  <span><font-awesome-icon icon="code-branch" style="margin-right: 5px" />
                    Phiên bản: {{ robotInfo.robotVersion.name }}</span>
                </el-tooltip>
              </div>
              <div class="robot-rows__wrap">
                <div class="robot-rows__left">
                  <div class="robot-rows">
                    <font-awesome-icon class="infoIcon" icon="map-marker-alt" />
                    Vị trí [{{ robotStatus.point_x }}, {{ robotStatus.point_y }}]
                  </div>
                  <div class="robot-rows">
                    <font-awesome-icon class="infoIcon" icon="sign-in-alt" />
                    {{ workType }}
                  </div>
                  <div class="robot-rows">
                    <font-awesome-icon class="infoIcon" icon="battery-half" />
                    Pin ({{ robotStatus.pin }}%)
                  </div>

                  <div class="robot-rows">
                    <font-awesome-icon class="infoIcon" icon="wifi" :color="wifiColor" />
                    Wifi
                  </div>
                </div>

                <div class="robot-rows__right">
                  <div class="robot-rows">
                    <font-awesome-icon class="infoIcon" icon="certificate" :color="colorBarrier" />
                    Vật cản
                  </div>
                  <div class="robot-rows">
                    <font-awesome-icon class="infoIcon" icon="play" color="green" />
                    {{ workMode }}
                  </div>
                  <div class="robot-rows">
                    <font-awesome-icon class="infoIcon" icon="pause" :color="colorPause" />
                    Dừng khẩn cấp
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { generateTitleView } from '@/help/utils/i18n'
import * as ROBOT_ACTIONS from '../../store/constants/robot'
import * as ROBOTMEDIA_ACTIONS from '../../store/constants/robotmedia'
import { hasPermissionAction } from '@/help/utils/index'
import { b64EncodeUnicode } from '../../help/utils/stringHelper'
import * as CONTROL_ACTIONS from '../../store/constants/robotcontrol'

const LABEL = {
  modelRobot: 'robot/',
  modelMediaRobot: 'robotmedia/',
  modelAuth: 'auth/',
  modelRobotAction: 'robotaction/',
  robotControl: 'robotcontrol/'
}

export default {
  name: 'RobotCall',
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      VUE_APP_JITSI_DOMAIN: '',
      currentPage: 0,
      pageCount: 0,
      isLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        name: '',
        status: null,
        socket: null,
        webSocketURI: process.env.VUE_APP_DOWNLOAD_MEDIA_SOCKET_URI
      },
      robotId: this.$router.currentRoute.params.id,
      mediaSelected: null,
      robotInfo: {
        map: {},
        robotVersion: {}
      },
      swiperOption: {
        slidesPerView: 8,
        spaceBetween: 10,
        slidesPerGroup: 1,
        autoResize: false,
        loop: false,
        autoHeight: false,
        loopFillGroupWithBlank: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          1340: {
            slidesPerView: 7,
            spaceBetween: 10
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 40
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          }
        }
      },
      folderUpload: process.env.VUE_APP_STORAGE_USER_AVATAR_PUBLIC + '/'
    }
  },
  computed: {
    ...mapGetters({
      listRobotMedia: LABEL.modelRobot + 'listRobotMedia',
      setting: LABEL.modelAuth + 'setting',
      robotStatus: LABEL.robotControl + 'robotStatus'
    }),
    workType: function() {
      var result = ''
      const workType = parseInt(this.robotStatus.workType)
      if (workType === 1) {
        result = 'Đưa cơm'
      } else if (workType === 2) {
        result = 'Đưa thuốc'
      } else if (workType === 3) {
        result = 'Thăm khám'
      } else if (workType === 4) {
        result = 'Thu rác'
      }
      return result
    },
    wifiColor: function() {
      var result = ''
      if (this.robotStatus.networkStatus === '1') {
        result = 'green'
      }
      return result
    },
    colorBarrier: function() {
      var result = ''
      if (this.robotStatus.barrier === '1') {
        result = 'green'
      }
      return result
    },
    workMode: function() {
      var result = ''
      if (this.robotStatus.workMode === '0') {
        result = 'Bằng tay'
      } else if (this.robotStatus.workMode === '1') {
        result = 'Tự động'
      } else if (this.robotStatus.workMode === '2') {
        result = 'Bám vạch'
      }
      return result
    },
    colorPause: function() {
      var result = ''
      if (this.robotStatus.e_stop === '1') {
        result = 'green'
      }
      return result
    }
  },
  mounted() {
    this.robotId = this.$router.currentRoute.params.id
    this.socket = this.initSocket()
    this.getRobotMedia()
    this.getRobotInfo()
  },
  methods: {
    ...mapMutations({
      mutUpdateRobotStatus: LABEL.robotControl + CONTROL_ACTIONS.MUTATION_UPDATE_ROBOT_STATUS
    }),
    ...mapActions({
      actGetRobotMedia: LABEL.modelRobot + ROBOT_ACTIONS.ACT_GET_ROBOT_MEDIA,
      actGetRobotInfo: LABEL.modelRobot + ROBOT_ACTIONS.ACT_FETCH_ONE_ROBOT,
      actExportMedia: LABEL.modelMediaRobot + ROBOTMEDIA_ACTIONS.ACT_EXPORT_MEDIA
    }),
    getRobotMedia() {
      this.actGetRobotMedia({
        current_page: this.listQuery.page,
        name: this.listQuery.name,
        robot_id: this.robotId,
        is_active: this.listQuery.status,
        limit: this.listQuery.limit
      })
    },
    selectItem(item) {
      this.mediaSelected = item
      var robotCode = this.robotInfo.code
      var mediaId = item.mediaId

      var encoded = b64EncodeUnicode(
          'SelectMedia_' + robotCode + '_' + item.mediaId
      )
      this.socket.send(encoded)
    },
    redirectToMedia() {
      window.location.href = '/#/users/robots/media/' + this.robotId
    },
    openVideoCall() {
      this.mediaSelected = null
      var robotCode = this.robotInfo.code

      var _seft = this
      setTimeout(function() {
        _seft.initComunicationCamera(_seft.robotInfo.cameras)
      })

      var encoded = b64EncodeUnicode(
          'SelectMedia_' + robotCode + '_' + 'video'
      )
      this.socket.send(encoded)
    },

    getRobotInfo() {
      this.actGetRobotInfo(this.robotId).then(res => {
        this.robotInfo = res.payload.records
        if(this.setting.isOnline) {
          this.VUE_APP_JITSI_DOMAIN = this.robotInfo.videoCallOnlineUrl
        }else {
          this.VUE_APP_JITSI_DOMAIN = this.robotInfo.videoCallUrl
        }

        var _seft = this
        setTimeout(function() {
          _seft.initJitsi(_seft.robotInfo.cameras)
        }, 1000)
      })
    },
    initComunicationCamera(cameras) {
      var comunicationCamera = null
      cameras.forEach(element => {
        if (element.functionType == 1) {
          comunicationCamera = element
        }
      })
      var comunicationCameraDeviceName =
          comunicationCamera != null ? comunicationCamera.labelName : ''
      var comunicationCameraRoomCode =
          comunicationCamera != null
              ? comunicationCamera.jitsiCallRoom
              : this.robotInfo.code
      const domain = this.VUE_APP_JITSI_DOMAIN
      const options = {
        // devices: {
        //   videoInput: comunicationCameraDeviceName
        // },
        interfaceConfigOverwrite: {
          filmStripOnly: true,
          verticalFilmstrip: true
        },
        roomName: comunicationCameraRoomCode,
        parentNode: document.querySelector('#meetrb1')

      }
      const api = new JitsiMeetExternalAPI(domain, options)
    },
    initJitsi(cameras) {
      var comunicationCamera = null
      var directionCamera = null
      cameras.forEach(element => {
        if (element.functionType == 1) {
          comunicationCamera = element
        }
        if (element.functionType == 2) {
          directionCamera = element
        }
      })
      var comunicationCameraDeviceName =
          comunicationCamera != null ? comunicationCamera.labelName : ''
      var comunicationCameraRoomCode =
          comunicationCamera != null
              ? comunicationCamera.jitsiCallRoom
              : this.robotInfo.code
      var directionCameraDeviceName =
          directionCamera != null ? directionCamera.labelName : ''
      var directionCameraRoomCode =
          directionCamera != null
              ? directionCamera.jitsiCallRoom
              : this.robotInfo.code + '_1'
      const domain = this.VUE_APP_JITSI_DOMAIN
      const options = {
        // devices: {
        //   videoInput: comunicationCameraDeviceName
        // },
        configOverwrite: {
          enableInsecureRoomNameWarning: false,
          enableCalendarIntegration: true,
          enableWelcomePage: false,
          startWithAudioMuted: true
        },
        interfaceConfigOverwrite: {
          // filmStripOnly: true,
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
          SHOW_BRAND_WATERMARK: true
        },
        roomName: comunicationCameraRoomCode,
        parentNode: document.querySelector('#meetrb1'),
        enableInsecureRoomNameWarning: false
      }
      const api = new JitsiMeetExternalAPI(domain, options)

      if (this.setting.isTwoCamera) {
        const option2s = {
          // devices: {
          //   videoInput: directionCameraDeviceName
          // },
          configOverwrite: {
            disableAudioLevels: true
          },
          interfaceConfigOverwrite: {
            // filmStripOnly: true ,
            DISABLE_JOIN_LEAVE_NOTIFICATIONS: false,
            ENFORCE_NOTIFICATION_AUTO_DISMISS_TIMEOUT: 10,
            DISABLE_PRESENCE_STATUS: true,
            SHOW_CHROME_EXTENSION_BANNER: true,
            DISABLE_TRANSCRIPTION_SUBTITLES: true,
            HIDE_INVITE_MORE_HEADER: true,
            AUTO_PIN_LATEST_SCREEN_SHARE: '',
            TOOLBAR_BUTTONS: [],
            GENERATE_ROOMNAMES_ON_WELCOME_PAGE: false,
            // TOOLBAR_ALWAYS_VISIBLE:false,
            // SHOW_DEEP_LINKING_IMAGE: false,
            SHOW_JITSI_WATERMARK: false,
            // SHOW_POWERED_BY: false,
            SHOW_PROMOTIONAL_CLOSE_PAGE: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            DISABLE_VIDEO_BACKGROUND: true,
            VIDEO_QUALITY_LABEL_DISABLED: true,
            // VERTICAL_FILMSTRIP: false,
            SETTINGS_SECTIONS: [],
            RECENT_LIST_ENABLED: false
          },
          roomName: directionCameraRoomCode,
          width: '100%',
          // height: '100%',
          parentNode: document.querySelector('#meetrb2')
        }
        const api2 = new JitsiMeetExternalAPI(domain, option2s)
        api2.executeCommand('toggleFilmStrip')
        api2.executeCommand('toggleVideo')
      }
    },
    initSocket() {
      var webSocketURI = process.env.VUE_APP_DOWNLOAD_MEDIA_SOCKET_URI // settings.downloadMediaSocketURI
      const _this = this
      var socket = new WebSocket(webSocketURI)

      socket.onopen = function() {
        console.log('Connected.')
      }

      socket.onclose = function(event) {
        setTimeout(function() {
          _this.socket = _this.initSocket()
        }, 1000)
        if (event.wasClean) {
          console.log('Disconnected.')
        } else {
          console.log('Connection lost.') // for example if server processes is killed
        }
        console.log('Code: ' + event.code + '. Reason: ' + event.reason)
      }

      socket.onmessage = function(event) {
        var message = event.data
        // console.log('Data received: ' + message)

        if (message[0] === '@') {
          var msg_dump = message.split('#')
          if (msg_dump[msg_dump.length - 1] === '127.0.0.1:7000' && _this.robotInfo.code === 'R32125') {
            _this.mutUpdateRobotStatus(message)
          }

          if (msg_dump[msg_dump.length - 1] === '127.0.0.1:5000' && _this.robotInfo.code === 'R32124') {
            _this.mutUpdateRobotStatus(message)
          }
        }
      }

      socket.onerror = function(error) {
        console.log('Error: ' + error.message)
      }
      return socket
    },
    redirectRobotControl() {
      window.location.href = '/#/users/robots/control/' + this.robotInfo.id
    },
    generateTitleView,
    hasPermissionAction
  }
}
</script>

<style lang="scss" scoped>
$blue1: #2f80ed;
$bgMap: #fcfcfc;

.robot-rows_first {
  font-size: 16px;
  margin-bottom: 25px !important;
}

.robot-rows__wrap {
  display: flex;

  .robot-rows__left {
    flex-basis: 50%;
  }
}

.robot-rows {
  margin-bottom: 7px;
}

.robot_info__under {
  padding: 15px 25px;
}

.video-call-wrap {
  video {
    width: 100%;
    height: 100%;
  }

  video,
  img {
    width: 100%;
    max-height: calc(100vh - 255px);
  }

}

.callContainer {
  height: calc(100vh - 60px);
  padding: 20px 40px;
  max-height: calc(100vh - 60px);

  iframe {
    width: 100%;
  }

  .call-wrap {
    display: flex;
    height: 100%;

    .call-left {
      flex-basis: 70%;
      height: 100%;

      .video-call-wrap {
        height: calc(100vh - 255px);
        margin-bottom: 15px;

        iframe {
          height: 100%;
        }

      }

      .media-wrap {
        height: 165px;

        .media_inner {
          img {
            width: 100%;
            height: 120px;
            cursor: pointer;
          }

          display: block;
          background: #ffffff;
          padding: 10px 30px;

          .media_inner__left {
            cursor: pointer;
            margin-right: 15px;
            width: 200px;
          }

          .media_inner_right {
            width: 100%;
            overflow-x: scroll;

            .media-item {
              display: inline-block;
              width: 120px;
              margin-right: 15px;
              position: relative;

              img, video {
                border-radius: 4px;
                width: 120px;
                height: 120px;
                cursor: pointer;
              }

              .overlay {
                position: absolute;
                width: 100%;
                height: 100%;
                background: black;
              }

            }
          }
        }
      }
    }

    .call-right {
      flex-basis: 30%;
      background: #fff;
      margin-left: 30px;
    }

  }
}

.call-right {
  display: flex;
  flex-direction: column;

  .call-right__top {
    padding: 15px;
    border-bottom: 1px solid #f2f2f2;

    .robot-name {
      text-align: center;
      color: #333333;
      font-weight: 500;
      font-size: 18px;
      margin-top: 10px;
    }

    .robot-code {
      color: #828282;
      font-size: 14px;
      text-align: center;
      margin-top: 8px;
    }

    .robot-actions {
      text-align: center;
      margin-top: 12px;

      .action-button {
        margin-right: 5px;
        width: 35px;
        height: 35px;
        line-height: 35px;
        border: 1px solid #929292;
        border-radius: 4px;
      }

      .camera-button.action-button {
        background: #eb5757;
        border: none;
      }

    }

    .avatar-container {
      display: flex;
      justify-content: center;
      flex-direction: column;

      .avatar-wrap {
        margin: 0 auto;

        .avatar-inner {
          padding: 6px;
          border: 1px dashed #2f80ed;
          border-radius: 100%;

          img {
            border-radius: 100%;
            width: 120px;
            height: 120px;
          }

        }
      }
    }

    .robot-information {
      .robot-status {
        display: flex;
        margin-top: 25px;

        .robot-status__left {
          text-align: center;
          flex-basis: 50%;
          border-right: 1px solid #bdbdbd;

          .value {
            color: #333333;
            font-size: 16px;
            margin-bottom: 5px;
          }

        }

        .robot-status__right {
          text-align: center;
          flex-basis: 50%;

          .value {
            color: #219653;
            font-size: 16px;
            margin-bottom: 5px;
          }

        }
      }
    }
  }

  .call-right__bottom {
    background: #fff;

    .robot-camera {
      flex-basis: 50%;
      background: #e0e0e0;
      width: 100%;
    }

    .robot-control {
      padding: 20px 0;
      flex-basis: 45%;
      display: flex;
      align-items: center;

      .control-right {
        flex-basis: 50%;

        .btn-control {
          display: flex;
          background: #dbdbdb;
          color: #fff;
          border-radius: 4px;
          font-size: 14px;
          width: 135px;
          height: 40px;
          align-items: center;
          justify-content: center;
          margin-right: auto;
          margin-left: auto;
        }

        .btn-control.btn-primary {
          background: #2f80ed;
          margin-bottom: 25px;
        }

      }

      .control-left {
        flex-basis: 50%;
        justify-content: center;

        .control-wrap {
          width: 130px;
          height: 130px;
          border-radius: 100%;
          background: #2f80ed;
          padding: 9px;
          margin: auto;

          .control-row {
            display: flex;
            height: 37px;

            .control-col {
              width: 40px;
              text-align: center;
              line-height: 40px;
            }

            .control-col.button {
              cursor: pointer;
            }

          }
        }
      }
    }
  }
}

.media-item {
  position: relative;
  cursor: pointer;

  &:hover {
    .overlay {
      display: block;
    }

    .overlay.Pdf {
      opacity: 0;
    }

  }

  .overlay {
    transition: all ease 0.5s;
    position: absolute;
    top: 0;
    left: 0;
    display: none;
    width: 100%;
    height: 100%;
    background: #0000004f;
    padding: 5px;
    color: #fff;
  }

}

.call-right__bottom {
  flex-basis: 50%;
}

.avatar-wrap {
  display: none;
}

@media (min-width: 1600px) {
  .avatar-wrap {
    display: block;
  }
}

@media only screen and (max-height: 820px) {
  .call-right__top {
    padding-top: 15px !important;
  }

  .call-right
  .call-right__top
  .avatar-container
  .avatar-wrap
  .avatar-inner
  img {
    width: 90px !important;
    height: 90px !important;
  }
}

@media only screen and (max-height: 720px) {
  .call-right__top {
    padding-top: 15px !important;
  }

  .call-right
  .call-right__top
  .avatar-container
  .avatar-wrap
  .avatar-inner
  img {
    width: 70px !important;
    height: 70px !important;
  }

  .call-right .call-right__bottom .robot-control {
    padding: 10px !important;
  }

  .call-right .call-right__bottom .robot-control {
    padding: 10px 20px !important;
  }

  .robot-name .label {
    display: none;
  }

  .robot-code .label {
    display: none;
  }
}

@media only screen and (max-height: 640px) {
  .robot-name__wrap {
    display: flex;
    justify-content: center;

    span .label {
      display: none;
    }

    .robot-name {
      margin-top: 5px !important;
      margin-right: 10px;
    }

    .robot-code {
      margin-top: 5px !important;
    }

  }

  .call-right .call-right__top .robot-information .robot-actions {
    margin-top: 7px;
  }

  .call-right .call-right__top .robot-information .robot-status {
    margin-top: 15px;
  }

  .call-right .call-right__top {
    padding: 10px;
  }

}

#meetrb2 {
  height: calc(100% - 90px);
}

.circular-label.insecure {
  display: none;
}

.media-item {
  min-height: 100px;
}

.pdfWrap{
  height: 100% !important;
}
</style>

