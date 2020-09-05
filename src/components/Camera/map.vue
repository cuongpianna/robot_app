<template>
  <v-card>
    <v-row>
      <v-col md="12" class="select-map__container">
        <div class="select-map__wrap">
          <v-col md="3" class="select-map__header">
            <div class="lbArea">{{ generateTitleView('selectMap', 'dashboard') }}</div>
            <v-select
              v-model="currentParentMap"
              :items="listParentAreas"
              item-text="name"
              item-value="id"
              :label="generateTitleView('selectArea', 'area')"
              solo
              dense
              @change="onChangeAreaParent"
            />
          </v-col>
          <div style="display:flex;">
            <v-col md="3" class="select-map__body">
              <span v-if="listChildrenMap.length > 0">
                <div
                  v-for="(item, index) in listChildrenMap"
                  :key="index"
                  class="map-item"
                  :class="{'active':item.id== currentFloor}"
                  @click="getListCamera(item)"
                >
                  {{ item.name }}
                </div>
              </span>
            </v-col>
            <v-col md="9">
              <div ref="mapContainer" v-resize="onResize" class="map-container">
                <svg-camera
                  v-for="(item, index) in cameraList"
                  :id="item.id"
                  :key="index"
                  class="cameraObj"
                  :class-name="item.camera.id == mainCamera.id ? 'active' : ''"
                  :position="item.position"
                  :points="item.newPoints"
                  :name="item.camera.name"
                  @click.native="changeMainCamera(item.camera)"
                />
                <img :src="folderUpload + currentMapObject.thumb">
              </div>
            </v-col>
          </div>
        </div>
      </v-col>

    </v-row>
  </v-card>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { generateTitleView } from '@/help/utils/i18n'
import * as ACTIONS from '../../store/constants/camera'
import SvgCamera from '@/components/SvgCamera'
import resize from 'vue-resize-directive'
import { MUTATION_CHANGE_MAIN_CAMERA } from '../../store/constants/camera'

const LABEL = {
  model: 'camera/'
}

export default {
  name: 'TrackingCamera',
  directives: {
    resize
  },
  components: {
    SvgCamera
  },
  data() {
    return {
      isLoading: false,
      folderUpload: process.env.VUE_APP_STORAGE_USER_AVATAR_PUBLIC + '/',
      objectList: []
    }
  },
  computed: {
    ...mapGetters({
      listParentAreas: LABEL.model + 'listParentAreas',
      listChildrenMap: LABEL.model + 'listAreaByParent',
      currentParentMap: LABEL.model + 'currentParentMap',
      currentFloor: LABEL.model + 'currentFloor',
      currentMapObject: LABEL.model + 'currentMapObject',
      mainCamera: LABEL.model + 'mainCamera'
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
      this.actFilterArea({ ParentId: this.currentParentMap }).then(() => {
        this.actFilterCamera(this.currentFloor)
      })
    })
  },
  methods: {
    ...mapActions({
      actGetListParent: LABEL.model + ACTIONS.ACT_FETCH_AREA_PARENT,
      actFilterArea: LABEL.model + ACTIONS.ACT_FETCH_AREA_ALL,
      actFilterCamera: LABEL.model + ACTIONS.ACT_FETCH_CAMERA
    }),
    ...mapMutations({
      mutSetCurrentMapObject: LABEL.model + ACTIONS.MUTATION_SET_CURRENT_MAP_OBJECT,
      mutationChangeMainCamera: LABEL.model + MUTATION_CHANGE_MAIN_CAMERA
    }),
    generateTitleView,
    onChangeAreaParent(vals) {
      this.actFilterArea({ ParentId: vals }).then(() => {
        this.initMap()
      })
    },
    getListCamera(id) {
      this.actFilterCamera(id)
      this.mutSetCurrentMapObject(id)
      this.initMap()
    },
    initMap() {
      const width = this.$refs.mapContainer.clientWidth
      const jsonData = JSON.parse(this.currentMapObject.jsonData)
      if (jsonData) {
        const sizeMap = jsonData.sizeMap
        const scale = width / sizeMap.w
        this.caclPosition(scale)
      } else {
        this.objectList = []
      }
    },
    changeMainCamera(item) {
      this.mutationChangeMainCamera(item.id)
    },
    caclPosition(scale) {
      const jsonData = JSON.parse(this.currentMapObject.jsonData)
      const sizeMap = jsonData.sizeMap
      const objectList = jsonData.objectList
      for (const item of objectList) {
        if (item.type === 'object') {
          var points = item.points
          var list_x = []
          var list_y = []
          for (const point of points) {
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
          for (const point of points) {
            var newPoint = [parseInt((point.x - minPoint[0]) * scale), parseInt((point.y - minPoint[1]) * scale)]
            newPoints.push(newPoint)
          }
          item.newPoints = newPoints
        } else {
          points = item.points[0]

          left = points.x / sizeMap.w * 100
          top = points.y / sizeMap.h * 100

          position = {
            left: left,
            top: top
          }

          item.position = position
        }
      }
      this.objectList = objectList
    },
    onResize() {
      this.initMap()
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
    margin-top: 15px;

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
}

.map-container {
  img {
    width: 100%;
  }
}

.cameraObj {
  z-index: 1000;
}
</style>
