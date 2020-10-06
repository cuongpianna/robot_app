<template>
  <div ref="robotControl" class="app-container">
    <div class="robot-control-container">
      <robot-information :robot-object="robotObject" :area-name="areaName"/>

      <v-card ref="robotControls" v-resize="onResize" class="robot-map__container">
        <div id="mapContainer" ref="mapContainer" v-loading="loading" class="robot-map__wrap">
          <svg class="svgEditor">
            <defs>
              <marker id="red-arrowhead" viewBox="0 0 10 10" refX="7" refY="5" markerUnits="strokeWidth" markerWidth="5" markerHeight="4" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" stroke="none" fill="red" />
              </marker>
            </defs>

            <marker
              id="markerSquare"
              markerWidth="7"
              markerHeight="7"
              refX="4"
              refY="4"
              orient="auto"
            >
              <rect x="1" y="1" width="5" height="5" style="stroke: none; fill:#000000;" />
            </marker>

            <line
              :x1="robotPoint[0]"
              :x2="arrowPoint[0]"
              :y1="robotPoint[1]"
              :y2="arrowPoint[1]"
              stroke="red"
              marker-end="url(#red-arrowhead)"
              stroke-width="4"
              class="line"
            />
            <circle
              v-for="(point, index) in roomPoints"
              :key="index"
              :cx="point.x"
              :cy="point.y"
              r="7"
              :fill="getPointFill(point)"
            />

          </svg>
          <svg-robot :left="left" :top="top" :icon="robotObject.icon" :title="robotObject.name" />
          <svg-shape
            v-for="(shape, ind) in objectList"
            :key="ind"
            :position="shape.position"
            :points="shape.newPoints"
            :name="shape.name"
            @click.native="selectRoom(shape)"
          />
          <img id="mapImg" ref="mapContainer" :src="folderUpload + robotObject.map.thumb">
        </div>
      </v-card>

      <robot-actions :area-no="robotObject.map.areaNo" :robot-object="robotObject" />
    </div>
  </div>

</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import resize from 'vue-resize-directive'
import * as ACTIONS from '../../store/constants/robot'
import { generateTitleView } from '@/help/utils/i18n'
import RobotInformation from './components/RobotInformation'
import RobotActions from './components/RobotActions'
import SvgShape from '@/components/SvgShape'
import SvgRobot from '@/components/SvgRobot'
import * as CONTROL_ACTIONS from '../../store/constants/robotcontrol'

const LABEL = {
  name: 'RobotControl',
  model: 'robot/',
  robotControl: 'robotcontrol/',
  modelArea: 'area/'
}

export default {
  name: LABEL.name,
  directives: {
    resize
  },
  components: {
    RobotInformation,
    RobotActions,
    SvgShape,
    SvgRobot
  },
  data() {
    return {
      areaName: '',
      isUploadThumb: false,
      robotObject: {
        map: {}
      },
      folderUpload: process.env.VUE_APP_STORAGE_USER_AVATAR_PUBLIC,
      objectList: [],
      listAreaEvent: [],
      areaNameList: [],
      sockets: null,
      sizeX: 0,
      sizeY: 0,
      roomPoints: [],
      loading: true,
      pointsColor: 'teal',
      robotPoint: [],
      pointsString: '',
      scaleMapX: 0,
      scaleMapY: 0,
      arrowPoint: [],
      realRoomList: []
    }
  },
  computed: {
    ...mapGetters({
      robotStatus: LABEL.robotControl + 'robotStatus',
      areaRoomList: LABEL.robotControl + 'areaRoomList',
      robotCode: LABEL.robotControl + 'robotCode',
      currentRobotCode: LABEL.robotControl + 'currentRobotCode'
    }),
    left: function() {
      return this.robotStatus.point_x * 100 / (this.robotObject.map.width * 100)
    },
    top: function() {
      return this.robotStatus.point_y * 100 / (this.robotObject.map.height * 100)
    }
  },
  watch: {
    areaRoomList: {
      deep: true,
      handler(oldValue, newValue) {
        this.roomPoints = []
        const mapWidth = this.$refs.mapContainer.clientWidth
        const mapHeight = this.$refs.mapContainer.clientHeight
        for (const item of newValue) {
          const y = Math.round(mapHeight * item.points[2].y / this.sizeY)
          const x = Math.round(mapWidth * item.points[2].x / this.sizeX)

          this.roomPoints.push({
            top: item.points[2].y / this.sizeY * 100,
            left: item.points[2].x / this.sizeX * 100,
            obj: item,
            y: y,
            x: x
          })
        }
      }
    },
    robotStatus: {
      deep: true,
      handler(newValue) {
        if(this.currentRobotCode == '') {

        }
        this.robotPoint = []

        const mapWidth = this.$refs.mapContainer.clientWidth
        const mapHeight = this.$refs.mapContainer.clientHeight

        var realX4 = this.robotStatus.point_x
        var realY4 = this.robotStatus.point_y

        var noChange = true

        for(const item of this.realRoomList) {
          var conditionX = Math.abs(parseFloat(realX4) - parseFloat(item.realX3))
          var conditionY = Math.abs(parseFloat(realY4) - parseFloat(item.realY3))

          if(conditionX <= (parseFloat(item.deltax) * 100) && conditionY <= (parseFloat(item.deltay) * 100)) {
            this.mutationChangeCurrentName(item.name)
            noChange = false
            break
          }

        }
        if(noChange) {
          this.mutationChangeCurrentName('')
        }

        const x = Math.round(this.robotStatus.point_x / this.robotObject.map.width * 100 * mapWidth / 100 / 100)
        const y = Math.round(this.robotStatus.point_y / this.robotObject.map.height * 100 * mapHeight / 100 / 100)

        this.robotPoint.push(x)
        this.robotPoint.push(y)

        // mui ten
        const deg = parseInt(newValue.delta_deg)
        const point_x = this.robotPoint[0] + Math.cos(this.convertDeg(deg) * Math.PI / 180) * 30
        const point_y = this.robotPoint[1] + Math.sin(this.convertDeg(deg) * Math.PI / 180) * 30

        this.arrowPoint = []

        this.arrowPoint.push(point_x)
        this.arrowPoint.push(point_y)
      }
    },
    roomPoints: {
      deep: true,
      handler() {
        const pointStrings = this.roomPoints.map(function(point) {
          return point.x + ',' + point.y
        }, this)
        const result = pointStrings.join(' ')
        this.pointsString = result
      }
    }
  },
  mounted() {
    this.changeAppTitle('HỆ THỐNG ĐIỀU KHIỂN ROBOT')
    const robotId = this.$router.currentRoute.params.id
    this.getRobot(robotId)
    this.sockets = this.initSocket()
    this.$store.commit('robotcontrol/clearRoomList')
  },
  destroyed() {
    this.sockets.close()
  },
  methods: {
    ...mapActions({
      actGetCurrentRobot: LABEL.model + ACTIONS.ACT_FETCH_ONE_ROBOT,
      actGetCurrentArea: LABEL.modelArea + 'actFetchOneArea'
    }),
    ...mapMutations({
      mutUpdateRobotStatus: LABEL.robotControl + CONTROL_ACTIONS.MUTATION_UPDATE_ROBOT_STATUS,
      mutationUpdateRoomAreaList: LABEL.robotControl + CONTROL_ACTIONS.MUTATION_UPDATE_AREA_LIST,
      mutationChangeRobotCode: LABEL.robotControl + 'mutationChangeRobotCode',
      mutationChangeCurrentName: LABEL.robotControl + CONTROL_ACTIONS.MUTATION_UPDATE_CURRENT_ROOM_NAME,
      changeAppTitle: 'app/CHANGE_APP_TITLE'
    }),
    getPointFill() {
      return this.pointsColor
    },
    getRobot(id) {
      this.actGetCurrentRobot(id).then(res => {
        const mapWidth = this.$refs.mapContainer.clientWidth

        this.loading = false
        const dataUser = res.payload.records
        this.robotObject = JSON.parse(JSON.stringify(dataUser))
        this.initMap()
        const jsonData = JSON.parse(this.robotObject.map.jsonData)
        this.scaleMapX = mapWidth / jsonData.sizeMap.w

        var mapSize = jsonData.sizeMap

        var realMapObject = this.robotObject.map

        for(const item of jsonData.objectList){
          let point3 = item.points[2]
          var realPercentX = point3.x / mapSize.w * 100
          var realPercentY = point3.y /mapSize.h * 100
          item.realX3 = realPercentX * realMapObject.width / 100 * 100
          item.realY3 = realPercentY * realMapObject.height / 100 * 100
        }
        this.realRoomList = jsonData.objectList

        this.sizeX = jsonData.sizeMap.w
        this.sizeY = jsonData.sizeMap.h
        this.mutationChangeRobotCode(this.robotObject.code)

        this.getArea(this.robotObject.map.parentId)
      })
    },
    initMap() {
      const width = this.$refs.mapContainer.clientWidth
      if (this.robotObject.map.jsonData) {
        const jsonData = JSON.parse(this.robotObject.map.jsonData)
        if (jsonData) {
          const sizeMap = jsonData.sizeMap
          const scale = width / sizeMap.w
          this.calcPosition(scale)
        } else {
          this.objectList = []
        }
      }
    },
    calcPosition(scale) {
      if (this.robotObject.map.jsonData) {
        const jsonData = JSON.parse(this.robotObject.map.jsonData)
        const sizeMap = jsonData.sizeMap
        const objectList = jsonData.objectList
        for (const item of objectList) {
          if (item.type === 'object') {
            const points = item.points
            var points2 = JSON.parse(JSON.stringify(points))
            points2.pop()

            const list_x = []
            const list_y = []
            for (const point of points2) {
              list_x.push(point.x)
              list_y.push(point.y)
            }
            const minPoint = [Math.min(...list_x), Math.min(...list_y)]
            const maxPoint = [Math.max(...list_x), Math.max(...list_y)]

            const left = minPoint[0] / sizeMap.w * 100
            const top = minPoint[1] / sizeMap.h * 100
            const width = (maxPoint[0] - minPoint[0]) / sizeMap.w * 100
            const height = (maxPoint[1] - minPoint[1]) / sizeMap.h * 100

            const position = {
              left: left,
              top: top,
              width: width,
              height: height
            }

            item.position = position

            const newPoints = []
            for (const point of points2) {
              const newPoint = [Math.round((point.x - minPoint[0]) * scale), Math.round((point.y - minPoint[1]) * scale)]
              newPoints.push(newPoint)
            }
            item.newPoints = newPoints
          }
        }
        this.objectList = objectList
      }
    },
    onResize() {
      this.initMap()

      this.roomPoints = []
      const mapWidth = this.$refs.mapContainer.clientWidth
      const mapHeight = this.$refs.mapContainer.clientHeight
      for (const item of this.areaRoomList) {
        const y = Math.round(mapHeight * item.points[2].y / this.sizeY)
        const x = Math.round(mapWidth * item.points[2].x / this.sizeX)

        this.roomPoints.push({
          top: item.points[2].y / this.sizeY * 100,
          left: item.points[2].x / this.sizeX * 100,
          obj: item,
          y: y,
          x: x
        })
      }
    },
    initSocket() {
      var webSocketURI = process.env.VUE_APP_DOWNLOAD_MEDIA_SOCKET_URI
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

        // setTimeout(function() {
        //   _this.initSocket()
        // }, 1000)
      }

      socket.onmessage = function(event) {
        var message = event.data
        // console.log('Data received: ' + message)
        if (message[0] === '@') {
          var msg_dump = message.split('#')
          if(_this.robotObject.code === msg_dump[msg_dump.length - 1]) {
            _this.mutUpdateRobotStatus(message)
          }
        }
      }

      socket.onerror = function(error) {
        console.log('Error: ' + error.message)
      }
      return socket
    },
    selectRoom(area) {
      this.mutationUpdateRoomAreaList(area)
    },
    convertDeg(deg) {
      return -deg
    },
    generateTitleView,
    getArea(id) {
      this.actGetCurrentArea(id).then(res => {
        this.areaName = res.payload.records.name
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 0;

  .robot-control-container {
    padding: 20px 0 60px 40px;
  }
}

.robot-map__container {
  padding: 20px 10px 10px 10px;

  img {
    width: 100%;
  }
}

.svgEditor {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.robot-map__wrap {
  position: relative;
}

.line{
  transition: all ease 2s;
  transition-duration: 1s;
}
</style>
