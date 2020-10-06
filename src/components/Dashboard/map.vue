<template>
  <div v-resize="onResize">
    <v-card v-for="(area, index) in listAllChildArea" :key="index" class="mapWrapper">
      <v-row>
        <v-col md="12">
          <div class="area-title">
            <span class="area-title-value">
              {{ area.parentName }} - {{ area.name }}
            </span>

            <div v-if="area.robots" class="robot-list_wrap">
              <div v-for="(item, ind) in area.robots" :key="ind" class="robot_list__item">
                <span class="robot-value">
                  {{ item.name }}

                  <img class="imgRobot" :src="require(`@/assets/${item.icon}`)" alt="" style="width: 25px">

                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="generateTitleView('robotControl' ,'dashboard')"
                    placement="top"
                  >
                    <el-button icon="el-icon-rank" class="btn-videocall" @click="redirectRobotControl(item)" />
                  </el-tooltip>

                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="generateTitleView('videoCall' ,'dashboard')"
                    placement="top"
                  >
                    <el-button icon="el-icon-video-camera" class="btn-videocall" @click="redirectVideoCall(item)">
                      <font-awesome-icon icon="video" />
                    </el-button>
                  </el-tooltip>
                </span>
              </div>
            </div>
          </div>
          <div :id="'map-' + area.id" class="map-container">
            <svg class="svgEditor">
              <defs>
                <marker id="red-arrowhead" viewBox="0 0 10 10" refX="7" refY="5" markerUnits="strokeWidth" markerWidth="5" markerHeight="4" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" stroke="none" fill="red" />
                </marker>
              </defs>

              <line
                v-for="value in area.robots"
                :x1="value.px"
                :x2="value.arrowX"
                :y1="value.py"
                :y2="value.arrowY"
                stroke="red"
                marker-end="url(#red-arrowhead)"
                stroke-width="4"
                class="line"
                v-if="value.px"
              />

            </svg>

            <svg-robot
              v-for="value in area.robots"
              v-if="area.robots.length > 0"
              :key="value.id"
              :title="value.name"
              :icon="value.icon"
              :left="value.mapWidth"
              :top="value.mapHeight"
            />
            <svg-shape
              v-for="(shape, ind) in resultList[index]"
              :key="ind"
              :position="shape.position"
              :points="shape.newPoints"
              :name="shape.name"
            />
            <img :ref="'map' + area.id" :src="folderUpload + area.thumb" class="imgMap">
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { generateTitleView } from '@/help/utils/i18n'
import * as ACTIONS from '../../store/constants/dashboard'
import SvgShape from '@/components/SvgShape'
import SvgRobot from '@/components/SvgRobot'
import resize from 'vue-resize-directive'

const LABEL = {
  model: 'dashboard/',
  area: 'area/'
}

export default {
  name: 'DashboardMap',
  directives: {
    resize
  },
  components: {
    SvgShape,
    SvgRobot
  },
  data() {
    return {
      isLoading: false,
      folderUpload: process.env.VUE_APP_STORAGE_USER_AVATAR_PUBLIC + '/',
      objectList: [],
      resultList: [],
      socket: null
    }
  },
  watch: {
    listAllChildArea: {
      deep: true,
      handler(newValue) {
        for(var area of newValue) {
          var ref = '#map-' + area.id
          if(document.querySelector(ref) != null) {
            const width = document.querySelector(ref).offsetWidth
            const height = document.querySelector(ref).offsetHeight
            for(var robot of area.robots) {
              if(robot.point_x !== undefined) {
                var robotPoint = []
                const x = Math.round(robot.point_x / robot.map.width * 100 * width / 100 / 100)
                const y = Math.round(robot.point_y / robot.map.height * 100 * height / 100 / 100)
                robotPoint.push(x)
                robotPoint.push(y)
                robot.px = x
                robot.py = y
                const deg = parseInt(robot.deg)

                const point_x = robotPoint[0] + Math.cos(this.convertDeg(deg) * Math.PI / 180) * 30
                const point_y = robotPoint[1] + Math.sin(this.convertDeg(deg) * Math.PI / 180) * 30

                robot.arrowX = point_x
                robot.arrowY = point_y
              }
            }
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      listRobots: LABEL.model + 'listRobots',
      currentFloor: LABEL.model + 'currentFloor',
      currentMapObject: LABEL.model + 'currentMapObject',
      listAllChildArea: LABEL.model + 'listAllChildArea',
      user_id: 'userId',
      userType: 'userType'
    }),
    cameraList: function() {
      const cameras = this.objectList.filter((item) => {
        return item.type === 'camera'
      })
      return cameras
    }
  },
  mounted() {
    this.actGetListParent().then(() => {
      this.actGetAllChildArea({
        UserId: this.user_id,
        UserType: this.userType
      }).then(() => {
        setTimeout(function() {
          this.initMap()
        }.bind(this), 100)
      })
    })
    this.sockets = this.initSocket()
  },
  destroyed() {
    this.sockets.close()
  },
  methods: {
    ...mapActions({
      actGetListParent: LABEL.model + ACTIONS.ACT_FETCH_AREA_PARENT,
      actFilterArea: LABEL.model + ACTIONS.ACT_FETCH_AREA_ALL,
      actFilterRobot: LABEL.model + ACTIONS.ACT_FETCH_ROBOT,
      actGetAllChildArea: LABEL.model + ACTIONS.ACT_GET_ALL_CHILD_AREA
    }),
    ...mapMutations({
      mutSetCurrentMapObject: LABEL.model + ACTIONS.MUTATION_SET_CURRENT_MAP_OBJECT,
      mutUpdateRobotPosition: LABEL.model + ACTIONS.MUTATION_UPDATE_POSITION_ROBOT
    }),
    generateTitleView,
    onChangeAreaParent(vals) {
      this.actFilterArea({ ParentId: vals })
    },
    initMap() {
      this.resultList = []
      for (const item of this.listAllChildArea) {
        if (item.jsonData) {
          var ref = '#map-' + item.id
          const width = document.querySelector(ref).offsetWidth
          const jsonData = JSON.parse(item.jsonData)
          const sizeMap = jsonData.sizeMap
          const scale = width / sizeMap.w
          var rsl = this.caclPosition(scale, item)
          this.resultList.push(rsl)
        } else {
          this.resultList.push([])
        }
      }
    },
    caclPosition(scale, area) {
      const jsonData = JSON.parse(area.jsonData)
      const sizeMap = jsonData.sizeMap
      const objectList = jsonData.objectList
      for (const item of objectList) {
        if (item.type === 'object') {
          var points = item.points
          var points2 = JSON.parse(JSON.stringify(points))

          points2.pop()
          var list_x = []
          var list_y = []
          for (const point of points2) {
            list_x.push(point.x)
            list_y.push(point.y)
          }
          var minPoint = [Math.min(...list_x), Math.min(...list_y)]
          var maxPoint = [Math.max(...list_x), Math.max(...list_y)]

          var left = minPoint[0] / sizeMap.w * 100
          var top = minPoint[1] / sizeMap.h * 100
          var width = (maxPoint[0] - minPoint[0]) / sizeMap.w * 100
          var height = (maxPoint[1] - minPoint[1]) / sizeMap.h * 100

          var position = {
            left: left,
            top: top,
            width: width,
            height: height
          }

          item.position = position

          var newPoints = []
          for (const point of points2) {
            var newPoint = [Math.round((point.x - minPoint[0]) * scale), Math.round((point.y - minPoint[1]) * scale)]
            newPoints.push(newPoint)
          }
          item.newPoints = newPoints
        }
      }

      return objectList
    },
    onResize() {
      this.initMap()
    },
    redirectVideoCall(area) {
      window.location.href = '/#/users/robots/call/' + area.id
    },
    redirectRobotControl(area) {
      window.location.href = '/#/users/robots/control/' + area.id
    },
    initSocket() {
      var webSocketURI = process.env.VUE_APP_DOWNLOAD_MEDIA_SOCKET_URI
      var socket = new WebSocket(webSocketURI)
      var _this = this
      socket.onopen = function() {
        console.log('Connected')
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
          _this.mutUpdateRobotPosition(message)
        }
      }

      socket.onerror = function(error) {
        console.log('Error: ' + error.message)
      }
      return socket
    },
    convertDeg(deg) {
      return -deg
    }
  }
}
</script>

<style lang="scss" scoped>
$blue1: #2F80ED;
$bgMap: #FCFCFC;

.select-map__container {
  //background: $bgMap;
  .lbArea {
    min-width: 100px;
  }

}

.select-map__wrap {
  .select-map__header {
    padding: 0px 15px;
    display: flex;
    align-items: center;

    span {
      margin-right: 15px;
    }

    /deep/ .v-text-field__details {
      display: none;
    }

  }

  .select-map__body {
    .map-item {
      cursor: pointer;
      padding: 10px 20px;
      font-size: 16px;
      font-weight: 500;
      color: #333333;
      border-top: 1px solid #bdbdbd33;
      transition: all ease .5s;

      &:hover {
        background: #56ccf226;
        color: $blue1;
      }

      &.active {
        background: #56ccf226;
        color: $blue1;
      }

      &:last-child {
        border-bottom: 1px solid #bdbdbd33;
      }

    }
  }

  .content-item {
    display: none;

    &.active {
      display: block;
    }

  }
}

.map-container {
  position: relative;

  img {
    width: 100%;
  }
}

.mapWrapper {
  padding: 10px;
  margin-bottom: 30px;
}

.area-title {
  font-weight: bold;
  font-size: 16px;
  display: flex;
  justify-content: space-between;

  .area-title-value {
    /*width: 200px;*/
  }
}

.robotList {
  font-weight: normal;
}

.btn-videocall {
  padding: 7px 7px;
  margin-left: 5px;
  background: #409EFF;
  color: white;
  transition: all ease .5s;

  &:hover {
    background: #eb5757;
  }
}

.robot-list_wrap {
  display: flex;
  align-items: center;
}

.robot_list__item {
  margin-right: 25px;

  &:last-child {
    margin-right: 0;
  }
}

.map-container {
  margin-top: 30px;
}

.svgEditor {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

/*.imgMap{*/
/*  height: 800px;*/
/*}*/
</style>
