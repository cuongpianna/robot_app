<template>
  <div class="callContainer">
    <div class="call-wrap">
      <div class="call-left" style="overflow:hidden;">
        <div class="video-call-wrap">
          <span v-if="mediaSelected == null" id="meetrb1"/>
          <div v-else style="height: 100%">
            <video v-if="mediaSelected.fileType == 'Video'" controls autoplay class>
              <source :src="mediaSelected.serverMediaPath" type="video/mp4">
            </video>

            <embed style="height: 100%;" v-else-if="mediaSelected.fileType == 'Pdf'"
                   :src="mediaSelected.serverMediaPath" width="100%" height="100%"/>

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
                  <font-awesome-icon icon="file-pdf" class="pdfIcon"/>
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
          <div class="top">
            <div class="avatar-container">
              <div class="avatar-wrap">
                <div class="avatar-inner">
                  <img v-if="robotInfo.thumb" :src="folderUpload + robotInfo.thumb" alt>
                </div>
              </div>
              <div class="robot-name__wrap">
                <div class="robot-name">
                  <span class="label" style="color: black">Thông tin robot:</span> {{ robotInfo.code }} -
                  {{ robotInfo.name }} ( {{ robotInfo.robotVersion.name }} )
                </div>

                <div class="robot-name">
                  <span class="label" style="color: black">{{ generateTitleView('workAt', 'robot') }}:</span>
                  {{ areaName }} - {{ robotInfo.map.name }}
                </div>

                <hr>

                <div class="robot-name">
                  {{ generateTitleView('status', 'robot') }}:
                  <span v-if="robotStatus.point_x != undefined" style="color: green">
                    {{ generateTitleView('working', 'robot') }}
                  </span>
                  <span v-else style="color: red"> {{ generateTitleView('notWorking', 'robot') }} </span>
                </div>

              </div>

            </div>

            <div class="robot_info__under">
              <div class="info_under__inner">
                <div class="robot-rows__wrap">
                  <div class="robot-rows__left">
                    <div class="robot-rows">
                      <font-awesome-icon class="infoIcon" icon="map-marker-alt"/>
                      Vị trí <span v-show="robotStatus.point_x != undefined">[{{
                        robotStatus.point_x
                      }}, {{ robotStatus.point_y }}]</span>
                    </div>

                    <div class="robot-rows">
                      <font-awesome-icon class="infoIcon" icon="battery-half"/>
                      Pin ({{ robotStatus.pin }}%)
                    </div>

                    <div class="robot-rows">
                      <font-awesome-icon class="infoIcon" icon="wifi" :color="wifiColor"/>
                      <span v-if="setting.isOnline">Wifi</span> <span v-else>Wifi-LAN</span>
                    </div>

                    <div class="robot-rows" v-show="workType">
                      <font-awesome-icon class="infoIcon" icon="sign-in-alt"/>
                      {{ workType }}
                    </div>
                  </div>

                  <div class="robot-rows__right">
                    <div class="robot-rows" style="min-height: 20px">
                      <span v-show="currentRoomName !== ''">{{ currentRoomName }}</span>
                    </div>
                    <div class="robot-rows">
                      <font-awesome-icon class="infoIcon" icon="certificate" :color="colorBarrier"/>
                      Vật cản
                    </div>
                    <div class="robot-rows">
                      <font-awesome-icon class="infoIcon" icon="pause" :color="colorPause"/>
                      Dừng khẩn cấp
                    </div>
                    <div class="robot-rows" v-show="workMode">
                      <font-awesome-icon class="infoIcon" icon="play" color="green"/>
                      {{ workMode }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bottom">
            <div v-show="setting.isTwoCamera" id="meetrb2" class="robot-camera"/>
          </div>
        </div>

        <div class="call-right__bottom">
          <div class="notification">
            <div class="left">
              <v-textarea
                  solo
                  rows="2"
              ></v-textarea>
            </div>
            <div class="right">
              <button class="btn-notification">Thông báo</button>
            </div>
          </div>
          <div class="robot-actions">
            <button
                class="action-button"
                :title="generateTitleView('mediaManagement', 'robot')"
                @click="redirectToMedia"
            >
              {{ generateTitleView('mediaManagement', 'robot') }}
              <font-awesome-icon icon="file-alt" color="#828282"/>
            </button>

            <button class="action-button camera-button" @click="redirectRobotControl">
              {{ generateTitleView('robotControl', 'robot') }}
              <font-awesome-icon icon="arrows-alt" color="#ffffff"/>
            </button>
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
import { hasPermissionAction } from '@/help/utils'
import { b64EncodeUnicode } from '../../help/utils/stringHelper'
import * as CONTROL_ACTIONS from '../../store/constants/robotcontrol'

const LABEL = {
  modelRobot: 'robot/',
  modelMediaRobot: 'robotmedia/',
  modelAuth: 'auth/',
  modelRobotAction: 'robotaction/',
  robotControl: 'robotcontrol/',
  modelArea: 'area/'
}

const MISSION_LIST = {
  chuyenCom: 5,
  thamBenhNhan: 6,
  chuyenThuoc: 7,
  thuRac: 8,
  veLayDO: 3,
  veGara: 4
}

export default {
  name: 'RobotCall',
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      areaName: '',
      realRoomList: [],
      VUE_APP_JITSI_DOMAIN: '',
      currentPage: 0,
      pageCount: 0,
      isLoading: false,
      listQuery: {
        page: 1,
        limit: 100,
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
      robotStatus: LABEL.robotControl + 'robotStatus',
      currentRoomName: LABEL.robotControl + 'currentRoomName'
    }),
    workType: function() {
      var result = ''
      const workType = parseInt(this.robotStatus.workType)
      if (workType === MISSION_LIST.chuyenCom) {
        result = 'Chuyển cơm'
      } else if (workType === MISSION_LIST.thamBenhNhan) {
        result = 'Thăm bệnh nhân'
      } else if (workType === MISSION_LIST.chuyenThuoc) {
        result = 'Chuyển thuốc'
      } else if (workType === MISSION_LIST.thuRac) {
        result = 'Thu rác'
      } else if (workType === MISSION_LIST.veLayDO) {
        result = 'Về lấy đồ'
      } else if (workType === MISSION_LIST.veGara) {
        result = 'Về gara'
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
  watch: {
    robotStatus: {
      deep: true,
      handler() {

        var realX4 = this.robotStatus.point_x
        var realY4 = this.robotStatus.point_y

        var noChange = true

        for (const item of this.realRoomList) {
          var conditionX = Math.abs(parseFloat(realX4) - parseFloat(item.realX3))
          var conditionY = Math.abs(parseFloat(realY4) - parseFloat(item.realY3))
          if (conditionX <= (parseFloat(item.deltax) * 100) && conditionY <= (parseFloat(item.deltay) * 100)) {
            this.mutationChangeCurrentName(item.name)
            noChange = false
            break
          }

        }
        if (noChange) {
          this.mutationChangeCurrentName('')
        }
      }
    }
  },
  mounted() {
    this.robotId = this.$router.currentRoute.params.id
    this.socket = this.initSocket()
    this.getRobotMedia()
    this.getRobotInfo()
    this.changeAppTitle('HỆ THỐNG GIAO TIẾP QUA ROBOT')
  },
  methods: {
    ...mapMutations({
      mutUpdateRobotStatus: LABEL.robotControl + CONTROL_ACTIONS.MUTATION_UPDATE_ROBOT_STATUS,
      mutationChangeRobotCode: LABEL.robotControl + 'mutationChangeRobotCode',
      mutationChangeCurrentName: LABEL.robotControl + CONTROL_ACTIONS.MUTATION_UPDATE_CURRENT_ROOM_NAME,
      changeAppTitle: 'app/CHANGE_APP_TITLE'
    }),
    ...mapActions({
      actGetRobotMedia: LABEL.modelRobot + ROBOT_ACTIONS.ACT_GET_ROBOT_MEDIA,
      actGetRobotInfo: LABEL.modelRobot + ROBOT_ACTIONS.ACT_FETCH_ONE_ROBOT,
      actExportMedia: LABEL.modelMediaRobot + ROBOTMEDIA_ACTIONS.ACT_EXPORT_MEDIA,
      actGetCurrentArea: LABEL.modelArea + 'actFetchOneArea'
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
    getArea(id) {
      this.actGetCurrentArea(id).then(res => {
        this.areaName = res.payload.records.name
      })
    },
    getRobotInfo() {
      this.actGetRobotInfo(this.robotId).then(res => {
        this.robotInfo = res.payload.records

        this.getArea(this.robotInfo.map.parentId)

        if (this.setting.isOnline) {
          this.VUE_APP_JITSI_DOMAIN = this.robotInfo.videoCallOnlineUrl
        } else {
          this.VUE_APP_JITSI_DOMAIN = this.robotInfo.videoCallUrl
        }

        this.robotObject = JSON.parse(JSON.stringify(this.robotInfo))
        const jsonData = JSON.parse(this.robotObject.map.jsonData)

        var mapSize = jsonData.sizeMap

        var realMapObject = this.robotObject.map

        for (const item of jsonData.objectList) {
          let point3 = item.points[2]
          var realPercentX = point3.x / mapSize.w * 100
          var realPercentY = point3.y / mapSize.h * 100
          item.realX3 = realPercentX * realMapObject.width / 100 * 100
          item.realY3 = realPercentY * realMapObject.height / 100 * 100
        }
        this.realRoomList = jsonData.objectList

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
          enableWelcomePage: false
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

          const robotCode = msg_dump[msg_dump.length - 1]
          if (_this.robotInfo.code === robotCode) {
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
  .call-right__top {
    padding: 15px;
    border-bottom: 1px solid #f2f2f2;

    .robot-name {
      color: #333333;
      font-weight: 600;
      font-size: 15px;
      margin-top: 7px;
    }

    .robot-code {
      color: #828282;
      font-size: 14px;
      margin-top: 8px;
    }


    .avatar-container {
      display: flex;
      justify-content: space-around;

      .avatar-wrap {

        .avatar-inner {
          padding: 6px;
          border: 1px dashed #2f80ed;
          border-radius: 100%;

          img {
            border-radius: 100%;
            width: 90px;
            height: 90px;
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

  .call-right__top {
    justify-content: space-between;
    border-bottom: 0 !important;
    height: calc(100% - 155px);
    display: flex;
    flex-direction: column;

    .bottom {
      height: 350px;

      #meetrb2 {
        height: 100%;
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


.circular-label.insecure {
  display: none;
}

.media-item {
  min-height: 100px;
}

.pdfWrap {
  height: 100% !important;
}

hr {
  margin-top: 10px;
  border: 1px solid #2f80ed;
  width: 80px
}

.call-right__bottom {
  padding: 5px 15px;

  .notification {
    justify-content: space-between;
    display: flex;
    align-items: center;

    .right {
      width: 120px;

      button {
        transition: all ease .5s;
        background: $blue1;
        border-radius: 4px;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        width: 100%;
        height: 30px;
      }
    }

    .left {
      margin-right: 10px;
      width: calc(100% - 150px);
    }

    .left /deep/ .v-text-field__details {
      display: none;
    }
  }
}

.robot-actions {
  text-align: center;
  margin-top: 10px;

  .item {
    cursor: pointer;
  }

  .action-button {
    padding: 0 8px;
    margin-right: 5px;
    height: 35px;
    line-height: 35px;
    border: 1px solid #929292;
    border-radius: 4px;
    cursor: pointer;
  }

  .camera-button.action-button {
    background: #eb5757;
    border: none;
    color: #fff;
  }

}

.call-right__top {
  padding-bottom: 0 !important;
}

</style>

