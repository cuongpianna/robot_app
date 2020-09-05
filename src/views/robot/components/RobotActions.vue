<template>
  <div class="robot-actions__container">
    <automatic-action :robot-object="robotObject" class="left" :area-no="areaNo" @clicked="onDoMission"/>
    <hand-action :robot-object="robotObject" class="right" :area-no="areaNo" @emit-action="onManualDoAction"/>
  </div>
</template>

<script>
import AutomaticAction from './AutomaticAction'
import HandAction from './HandAction'
import { b64EncodeUnicode } from '../../../help/utils/stringHelper'

export default {
  name: 'RobotActions',
  components: {
    AutomaticAction,
    HandAction
  },
  props: {
    areaNo: {
      type: Number, default: 1
    },
    robotObject: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      folderUpload: process.env.VUE_APP_STORAGE_USER_AVATAR_PUBLIC + '/'
    }
  },
  mounted() {
    this.socket = this.initSocket()
  },
  methods: {
    initSocket() {
      var webSocketURI = process.env.VUE_APP_ROBOT_UDP_SOCKET_URI
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
        console.log('Data received: ' + message)
      }

      socket.onerror = function(error) {
        console.log('Error: ' + error.message)
      }
      return socket
    },
    onDoMission(value) {
      console.log(value)

      var encoded = b64EncodeUnicode(
          value
      )
      this.socket.send(encoded)
    },
    onManualDoAction(value) {
      var encoded = b64EncodeUnicode(
          value
      )
      this.socket.send(encoded)
    }
  }
}
</script>

<style scoped lang="scss">
.robot-actions__container {
  margin-top: 10px;
  display: flex;

  .left {
    width: calc(100% - 590px);
    margin-right: 20px;
  }

  .right {
    width: 590px;
  }
}
</style>
