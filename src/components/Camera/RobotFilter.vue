<template>
  <v-card class="main-camera">
    <v-row class="v-row__filter">
      <v-col md="10">
        <canvas v-show="!wsError" id="videoCanvas" ref="videoCanvas" />
        <div v-show="wsError" class="cameraWrap">
          <md-icon class="cameraIcon">camera_alt</md-icon>

          <div class="cameraQuote">Không có camera hoặc không có kết nối</div>
        </div>
      </v-col>
      <v-col md="2" class="camera-list">
        <div
          v-for="(item, index) in listCamera"
          :key="index"
          class="camera-item"
          :class="item.id == mainCamera.id ? 'active' : ''"
          @click="changeMainCamera(item)"
        >
          <div class="camera-icon">
            <md-icon>camera_alt</md-icon>
          </div>
          <div class="camera-name">
            {{ item.name }}
          </div>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { generateTitleView } from '@/help/utils/i18n'
import { MUTATION_CHANGE_MAIN_CAMERA } from '../../store/constants/camera'

const LABEL = {
  model: 'camera/'
}

export default {
  name: 'RobotFilter',
  data() {
    return {
      isLoading: false,
      wsError: false
    }
  },
  computed: {
    ...mapGetters({
      currentMap: LABEL.model + 'currentMap',
      currentArea: LABEL.model + 'currentArea',
      parentName: LABEL.model + 'parentName',
      listCamera: LABEL.model + 'listCamera',
      mainCamera: LABEL.model + 'mainCamera'
    })
  },
  watch: {
    mainCamera: {
      deep: true,
      handler(newMainCamera) {
        if (newMainCamera !== undefined) {
          this.initCamera(newMainCamera.ip)
        } else {
          this.wsError = true
        }
      }
    }
  },
  mounted() {
    // this.initCamera()
  },
  methods: {
    ...mapMutations({
      mutationChangeMainCamera: LABEL.model + MUTATION_CHANGE_MAIN_CAMERA
    }),
    initCamera(ip) {
      try {
        this.wsError = false
        const canvas = this.$refs.videoCanvas

        const ws = new WebSocket(ip)

        const player = new jsmpeg(ws, { canvas: canvas, autoplay: true, audio: true, loop: true })
      } catch (e) {
        this.wsError = true
      }
    },
    changeMainCamera(item) {
      this.mutationChangeMainCamera(item.id)
    },
    generateTitleView
  }
}
</script>

<style lang="scss" scoped>
$blue1: #2F80ED;
$bgMap: #FCFCFC;
.main-camera {
  margin-bottom: 10px;
  min-height: calc(100vh - 400px);
}

.v-row__filter {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;

  .filter-title {
    font-size: 16px;
    color: #ffffff;
  }

  form {
    width: 250px;
    position: relative;

    input {
      width: 100%;
      background: #ffffff;
      border-radius: 4px;
      height: 30px;
      padding-left: 23px;
      line-height: 30px;
    }

    .btnSubmit {
      position: absolute;
      right: 8px;
      top: 5px;
    }

    .icon-search {
      position: absolute;
      left: 5px;
      top: 6px;
    }
  }
}

.camera-list {
  .camera-item {
    position: relative;
    height: 150px;
    background: #00000026;
    transition: all ease .5s;
    cursor: pointer;
    padding: 10px;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 10px;

    .camera-icon {
      position: absolute;
      top: calc(50% - 10px);
      left: calc(50% - 10px);
    }

    .camera-name {
      position: absolute;
      bottom: 0px;
      left: 10px;
      font-size: 13px;
      color: #d40707;
    }

    &:hover {
      background: #BDBDBD;
    }
  }

  .camera-item.active {
    background: #BDBDBD;
  }
}

.cameraWrap {
  background: #BDBDBD;
  position: relative;
  height: 500px;

  .cameraIcon {
    position: absolute;
    top: 50%;
    font-size: 24px !important;
    left: 50%;
  }

  .cameraQuote {
    position: absolute;
    top: 55%;
    font-size: 14px !important;
    width: 100%;
    text-align: center;
  }
}

</style>
