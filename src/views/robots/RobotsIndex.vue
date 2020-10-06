<template>
  <div class="callContainer">
    <div class="call-wrap">
      <div class="call-left" style="overflow:hidden;">
        <div class="video-call-wrap">
          <span id="meet2" style="display:none" />
          <span v-if="mediaSelected == null" id="meet1" />
          <div v-else>
            <video v-if="mediaSelected.fileType == 'Video'" id="vdPlay" ref="video" controls autoplay>
              <source :src="mediaSelected.mediaPath" type="video/mp4">
            </video>
            <img v-if="mediaSelected.fileType == 'Image'" :src="mediaSelected.mediaPath" alt class>
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
              <swiper-slide v-for="(item, index) in robotMedias" :key="index" class="media-item">
                <img
                  v-if="item.fileType == 'Video'"
                  :src="require('@/assets/videothumb.jpg')"
                  class="media-item__inner"
                  @click="selectItem(item)"
                >
                <img
                  v-else
                  :src="item.mediaPath"
                  :alt="item.fileName"
                  class="media-item"
                  @click="selectItem(item)"
                >
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
                <img :src="require('@/assets/robot.jpg')" alt>
              </div>
            </div>
          </div>

          <div class="robot-information">
            <div class="robot-name">{{ generateTitleView('robotName', 'robot') }} : {{ robotInfo.name }}</div>

            <div class="robot-code">{{ generateTitleView('code', 'robot') }} : {{ robotInfo.code }}</div>

            <div class="robot-actions">
              <button class="action-button">
                <font-awesome-icon icon="user-plus" color="#828282" />
              </button>

              <button class="action-button">
                <font-awesome-icon icon="file-alt" color="#828282" />
              </button>

              <button class="action-button camera-button">
                <font-awesome-icon icon="video" color="#ffffff" />
              </button>
            </div>

            <div class="robot-status">
              <div class="robot-status__left">
                <div class="value">Tầng 1</div>
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
          <div class="robot-camera" />
          <div class="robot-control">
            <div class="control-left">
              <div class="control-wrap">
                <div class="control-row">
                  <div class="control-col" />
                  <div class="control-col button">
                    <font-awesome-icon icon="arrow-up" color="#fff" style="font-size: 22px" />
                  </div>
                  <div class="control-col" />
                </div>

                <div class="control-row">
                  <div class="control-col button">
                    <font-awesome-icon icon="arrow-left" color="#fff" style="font-size: 22px" />
                  </div>
                  <div class="control-col button">
                    <font-awesome-icon icon="pause" color="#fff" style="font-size: 22px" />
                  </div>
                  <div class="control-col button">
                    <font-awesome-icon icon="arrow-right" color="#fff" style="font-size: 22px" />
                  </div>
                </div>

                <div class="control-row">
                  <div class="control-col" />
                  <div class="control-col button">
                    <font-awesome-icon icon="arrow-down" color="#fff" style="font-size: 22px" />
                  </div>
                  <div class="control-col" />
                </div>
              </div>
            </div>
            <div class="control-right">
              <button class="btn-control btn-primary">Đặt đồ</button>
              <button class="btn-control">Lấy đồ</button>
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
import { mapGetters, mapActions } from 'vuex'
import { generateTitleView } from '@/help/utils/i18n'
import * as ROBOT_ACTIONS from '../../store/constants/robot'
import * as ROBOTMEDIA_ACTIONS from '../../store/constants/robotmedia'
import RobotMediaService from '../../services/robotmedia.service'
import { dowloadFile } from '../../help/utils/fileHelper'
import * as ACTIONS from '@/store/constants/setting'

const LABEL = {
  modelRobot: 'robot/',
  modelMediaRobot: 'robotmedia/',
  model: 'setting/'
}

export default {
  name: 'RobotCall',
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      settingObj: {},
      jistiDomain: '',
      isLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        name: '',
        status: null
      },
      robotCode: this.$router.currentRoute.params.id,
      mediaSelected: null,
      robotInfo: {},
      robotMedias: [],
      swiperOption: {
        slidesPerView: 8,
        spaceBetween: 10,
        slidesPerGroup: 1,
        loop: false,
        loopFillGroupWithBlank: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      thisState: this.$store.state.listRobotMedia
    }
  },
  computed: {
    ...mapGetters({
      listRobotMedia: LABEL.modelRobot + 'listRobotMedia',
      setting: 'auth/setting'
    })
  },
  watch: {
    mediaSelected: {
      immediate: true,
      handler(data, oldData) {
        if (data.fileType === 'Video') {
          this.$nextTick(() => {
          })
        }
      }
    }
  },
  mounted() {
    this.robotCode = this.$router.currentRoute.params.id
    this.getRobotInfo()
    this.getSetting()
  },
  methods: {
    ...mapActions({
      actGetRobotMedia: LABEL.modelRobot + ROBOT_ACTIONS.ACT_GET_ROBOT_MEDIA,
      actGetRobotInfo:
          LABEL.modelRobot + ROBOT_ACTIONS.ACT_GET_ROBOT_INFO_BY_CODE,
      actExportMedia:
          LABEL.modelMediaRobot + ROBOTMEDIA_ACTIONS.ACT_EXPORT_MEDIA,
      actGetSetting: LABEL.model + ACTIONS.ACT_GET_SETTING
    }),
    getRobotMedia(robotId) {
      this.actGetRobotMedia({
        current_page: this.listQuery.page,
        name: this.listQuery.name,
        robot_id: robotId,
        is_active: this.listQuery.status,
        limit: this.listQuery.limit
      }).then(res => {
        this.robotMedias = res.payload.records
        this.initSocket()
      })
    },
    selectItem(item) {
      this.mediaSelected = item

      if (item == null) {
        var _seft = this
        setTimeout(function() {
          _seft.initComunicationCamera(_seft.robotInfo.cameras)
        })
      }
    },
    openVideoCall() {
      this.mediaSelected = null
    },
    async getRobotInfo() {
      const result = await this.getSetting()
      const { jistiDomain, jistiDomainInternet, isOnline} = result
       this.actGetRobotInfo(this.robotCode).then(res => {
        this.robotInfo = res.payload.records
        var cameras = this.robotInfo.cameras
        this.getRobotMedia(this.robotInfo.id)
        if(isOnline) {
          this.jistiDomain = jistiDomainInternet
        }else {
          this.jistiDomain = jistiDomain
        }
        this.initJitsi(cameras)
      })
    },
    initComunicationCamera(cameras) {
      var comunicationCamera = null

      cameras.forEach(element => {
        if (element.functionType == 1) {
          comunicationCamera = element
        }
      })
      // cameras?.find(x => x.functionType == 1);
      var comunicationCameraDeviceName = comunicationCamera != null ? comunicationCamera.labelName : ''
      var comunicationCameraRoomCode =
          comunicationCamera != null ? comunicationCamera.jitsiCallRoom : this.robotInfo.code
      // var directionCamera = cameras?.find(x => x.functionType == 2);

      const domain = this.jistiDomain
      const options = {
        devices: {
          videoInput: comunicationCameraDeviceName
        },
        // interfaceConfigOverwrite: { filmStripOnly: true },
        roomName: comunicationCameraRoomCode,
        // width: 700,
        // height: 700,
        parentNode: document.querySelector('#meet1')
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
      // cameras?.find(x => x.functionType == 1);
      var comunicationCameraDeviceName = comunicationCamera != null ? comunicationCamera.labelName : ''
      var comunicationCameraRoomCode =
          comunicationCamera != null ? comunicationCamera.jitsiCallRoom : this.robotInfo.code
      // var directionCamera = cameras?.find(x => x.functionType == 2);
      var directionCameraDeviceName = directionCamera != null ? directionCamera.labelName : ''
      var directionCameraRoomCode =
          directionCamera != null ? directionCamera.jitsiCallRoom : this.robotInfo.code + '_1'
      const domain = this.jistiDomain
      const options = {
        devices: {
          videoInput: comunicationCameraDeviceName
        },
        // interfaceConfigOverwrite: { filmStripOnly: true },
        roomName: comunicationCameraRoomCode,
        // width: 700,
        // height: 700,
        parentNode: document.querySelector('#meet1')
      }
      const api = new JitsiMeetExternalAPI(domain, options)

      const option2s = {
        devices: {
          videoInput: directionCameraDeviceName
        },
        // interfaceConfigOverwrite: { filmStripOnly: true },
        roomName: directionCameraRoomCode,
        width: '100%',
        height: '100%',
        parentNode: document.querySelector('#meet2')
      }
      const api2 = new JitsiMeetExternalAPI(domain, option2s)
    },
    initSocket() {
      var listMedias = this.robotMedias
      var robotId = this.robotInfo.id
      var webSocketURI = process.env.VUE_APP_DOWNLOAD_MEDIA_SOCKET_URI // settings.downloadMediaSocketURI;
      var socket = new WebSocket(webSocketURI)
      var _this = this
      socket.onopen = function() {
        console.log('Connected.')
      }

      socket.onclose = function(event) {
        if (event.wasClean) {
          console.log('Disconnected.')
        } else {
          console.log('Connection lost.') // for example if server processes is killed
        }
        console.log('Code: ' + event.code + '. Reason: ' + event.reason)
        setTimeout(function() {
          _this.initSocket()
        }, 1000)
      }

      socket.onmessage = function(event) {
        var message = event.data
        console.log('Data received: ' + message)
        if (message.includes('DownloadMedia_')) {
          var signals = message.split('_')
          var robotID = signals.length >= 2 ? signals[1] : ''
          var mediaId = signals.length >= 3 ? signals[2] : ''

          var segments = location.href.split('/')
          var currentRobotId = segments[segments.length - 1]
          if (currentRobotId == robotID) {
            var mediaIds = []
            mediaIds.push(mediaId)
            // var data = { RobotId: currentRobotId, MediaIds: mediaIds }
            // RobotMediaService.export(data).then(res => {
            //   if (res.isSuccess) {
            //     var exportDatas = res.records
            //     if (exportDatas != null) {
            //       exportDatas.forEach(element => {
            //         dowloadFile(element)
            //
            //         setTimeout(function() {
            //           location.reload()
            //           // _this.getRobotInfo(robotId);
            //         }, 2000)
            //       })
            //     }
            //   }
            // })
          }
        }
        if (message.includes('SelectMedia_')) {
          var signals = message.split('_')
          var robotID = signals.length >= 2 ? signals[1] : ''
          var mediaId = signals.length >= 3 ? signals[2] : ''

          var segments = location.href.split('/')
          var currentRobotId = segments[segments.length - 1]
          if (currentRobotId == robotID) {
            if (mediaId == 'video') {
              _this.selectItem(null)
            } else {
              var selectedItem = listMedias.find(
                  element => element.mediaId == mediaId
              )
              _this.selectItem(selectedItem)
            }
          }
        }

        if(message.includes('reload')) {
          location.reload()
        }

        if (message.includes('DeletedMedia_')) {
          location.reload()
        }
      }

      socket.onerror = function(error) {
        console.log('Error: ' + error.message)
      }
      return socket
    },
    generateTitleView,
    async getSetting() {
      var result = await this.actGetSetting({
        current_page: this.listQuery.page,
        name: this.listQuery.name,
        is_active: this.listQuery.status,
        limit: this.listQuery.limit
      })
      return result.payload.records[0]
    }
  }
}
</script>

<style lang="scss" scoped>
$blue1: #2f80ed;
$bgMap: #fcfcfc;
.call-right {
  display: none;
}

.media-wrap {
  display: none;
}

.video-call-wrap {
  width: 100%;
  height: 100vh;

  iframe {
    width: 100%;
    height: 100%;
  }

  img,
  video {
    width: 100%;
    height: 100%;
  }
}
</style>
