<template>
  <div>
    <div id="meet1" />
    <ul>
      <li v-for="item in cameras" :key="item.deviceId">
        {{ item.label }}
      </li>
    </ul>

  </div>

</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import * as ACTIONS from '@/store/constants/setting'

const LABEL = {
  modelRobot: 'robot/',
  modelMediaRobot: 'robotmedia/',
  model: 'setting/'
}

export default {
  name: 'RobotCall',
  data() {
    return {
      cameras: [],
      formCreate: {},
      listQuery: {
        page: 1,
        name: '',
        status: null,
        limit: 10
      },
      jistiDomain: ''
    }
  },
  computed: {
    ...mapGetters({
      listRobotMedia: LABEL.modelRobot + 'listRobotMedia'
    })
  },
  mounted() {
    this.getSetting()
  },
  methods: {
    ...mapActions({
      actGetSetting: LABEL.model + ACTIONS.ACT_GET_SETTING,
      actUpdateSetting: LABEL.model + ACTIONS.ACT_UPDATE_SETTING
    }),
    initJitsi() {
      const domain = this.jistiDomain
      const options = {
        interfaceConfigOverwrite: { filmStripOnly: true },
        roomName: 'CONFIGCAMERA',
        parentNode: document.querySelector('#meet1')
      }
      const api = new JitsiMeetExternalAPI(domain, options)
      api.getAvailableDevices().then(devices => {
        this.cameras = devices.videoInput
      })
    },
    getSetting() {
      this.actGetSetting({
        current_page: this.listQuery.page,
        name: this.listQuery.name,
        is_active: this.listQuery.status,
        limit: this.listQuery.limit
      }).then(res => {
        this.formCreate = JSON.parse(JSON.stringify(res.payload.records[0]))
        this.jistiDomain = this.formCreate.jistiDomain
        this.initJitsi()
      })
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
