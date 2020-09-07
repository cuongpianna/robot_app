<template>
  <div ref="robotControl" class="app-container">
    <div class="robot-control-container">
      <robot-information :robot-object="robotObject" />

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
          <!--          <room-point v-for="(item, index) in roomPoints" :id="item.obj.id" :key="index" :left="item.left" :top="item.top" />-->
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
import RoomPoint from '@/components/RoomPoint'
import SvgShape from '@/components/SvgShape'
import SvgRobot from '@/components/SvgRobot'
import * as CONTROL_ACTIONS from '../../store/constants/robotcontrol'

const LABEL = {
  name: 'RobotControl',
  model: 'robot/',
  robotControl: 'robotcontrol/'
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
    SvgRobot,
    RoomPoint
  },
  data() {
    return {
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
      svgLinePoints: [],
      pathPoints: [],
      scaleMapX: 0,
      scaleMapY: 0,
      robotDirection: {},
      arrowPoint: []
    }
  },
  computed: {
    ...mapGetters({
      robotStatus: LABEL.robotControl + 'robotStatus',
      areaRoomList: LABEL.robotControl + 'areaRoomList',
      robotCode: LABEL.robotControl + 'robotCode'
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
      handler(newValue, oldValue) {
        this.robotPoint = []

        const mapWidth = this.$refs.mapContainer.clientWidth
        const mapHeight = this.$refs.mapContainer.clientHeight

        const x = Math.round(this.robotStatus.point_x / this.robotObject.map.width * 100 * mapWidth / 100 / 100)
        const y = Math.round(this.robotStatus.point_y / this.robotObject.map.height * 100 * mapHeight / 100 / 100)

        this.robotPoint.push(x)
        this.robotPoint.push(y)
        const listSpace = []

        for (const item of this.pathPoints) {
          const d = parseInt(Math.sqrt(Math.abs((item.x - this.robotPoint[0]) * (item.x - this.robotPoint[0]) - (item.y - this.robotPoint[1]) * (item.y - this.robotPoint[1]))))
          listSpace.push(d)
        }
        const minSpace = Math.min(...listSpace)
        const indexSpace = listSpace.indexOf(minSpace)

        const deg = parseInt(this.robotStatus.delta_deg)

        var point1 = this.pathPoints[indexSpace]
        if(this.pathPoints[indexSpace + 1] === undefined) {
          var point2 = this.pathPoints[indexSpace - 1]
        }else {
          point2 = this.pathPoints[indexSpace + 1]
        }

        // arrow head
        if(this.robotStatus.missionStatus) {
          if(deg === 180) {
            if(point1.y < point2.y) {
              this.setRobotDirectionByPoint(point1, point2)
            }else {
              this.setRobotDirectionByPoint(point2, point1)
            }
          }else if(deg === 0) {
            if(point1.y > point2.y) {
              this.setRobotDirectionByPoint(point1, point2)
            }else {
              this.setRobotDirectionByPoint(point2, point1)
            }
          }else if(deg === 90) {
            if(point1.x < point2.x) {
              this.setRobotDirectionByPoint(point1, point2)
            }else {
              this.setRobotDirectionByPoint(point2, point1)
            }
          }else if(deg === 270) {
            if(point1.x > point2.x) {
              this.setRobotDirectionByPoint(point1, point2)
            }else {
              this.setRobotDirectionByPoint(point2, point1)
            }
          }
        }

        // mui ten
        const degg = parseInt(newValue.delta_deg)
        const point_x = this.robotPoint[0] + Math.cos(this.convertDeg(degg) * Math.PI / 180) * 30
        const point_y = this.robotPoint[1] + Math.sin(this.convertDeg(degg) * Math.PI / 180) * 30

        this.arrowPoint = []

        this.arrowPoint.push(point_x)
        this.arrowPoint.push(point_y)
      }
    },
    roomPoints: {
      deep: true,
      handler(newValue, oldValue) {
        const pointStrings = this.roomPoints.map(function(point) {
          return point.x + ',' + point.y
        }, this)
        const result = pointStrings.join(' ')
        this.pointsString = result

        this.svgLinePoints = []

        if(this.roomPoints.length > 1) {
          for (const [i, v] of this.roomPoints.entries()) {
            if(i < (this.roomPoints.length - 1)) {
              const obj = {
                x1: v.x,
                y1: v.y,
                x2: this.roomPoints[i + 1].x,
                y2: this.roomPoints[i + 1].y
              }
              this.svgLinePoints.push(obj)
            }
          }
        }
      }
    }
  },
  mounted() {
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
      actGetCurrentRobot: LABEL.model + ACTIONS.ACT_FETCH_ONE_ROBOT
    }),
    ...mapMutations({
      mutUpdateRobotStatus: LABEL.robotControl + CONTROL_ACTIONS.MUTATION_UPDATE_ROBOT_STATUS,
      mutationUpdateRoomAreaList: LABEL.robotControl + CONTROL_ACTIONS.MUTATION_UPDATE_AREA_LIST,
      mutationChangeRobotCode: LABEL.robotControl + 'mutationChangeRobotCode'
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

        for(const item of jsonData.objectList) {
          this.pathPoints.push({
            x: Math.round(item.points[2].x * this.scaleMapX),
            y: Math.round(item.points[2].y * this.scaleMapX)
          })
        }
        this.sizeX = jsonData.sizeMap.w
        this.sizeY = jsonData.sizeMap.h
        this.mutationChangeRobotCode(this.robotObject.code)
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
          } else {
            const points = item.points[0]

            const left = points.x / sizeMap.w * 100
            const top = points.y / sizeMap.h * 100

            const position = {
              left: left,
              top: top
            }

            item.position = position
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

        setTimeout(function() {
          _this.initSocket()
        }, 1000)
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
    setRobotDirectionByPoint(p1, p2) {
      this.robotDirection = {
        x1: p1.x,
        y1: p1.y,
        x2: p2.x,
        y2: p2.y
      }
    },
    convertDeg(deg) {
      return -deg
    },
    generateTitleView
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
