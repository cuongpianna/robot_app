<template>
  <v-card class="robot-info__container">
    <div class="robot-avatar">
      <v-card flat tile class="d-flex" style="padding: 10px; border: 1px dashed #2f80ed; border-radius: 50%">
        <img :src="folderUpload + robotObject.thumb" alt="" style="border-radius: 50%">
      </v-card>
    </div>
    <div class="robot-info">
      <div class="position">
        <div class="top">
          <div class="status">
            Trạng thái hoạt động: <span v-if="robotStatus.pin == null || robotStatus.pin == undefined" style="color: red">Không có tín hiệu</span>
            <span style="color: green" v-else>Đang hoạt động</span>
          </div>
          <button @click="redirectVideoCall" class="btn-giamsat">Giám sát robot</button>
        </div>
        <div class="bottom"> {{ dateNow | fullDatetime }} </div>
      </div>
      <div class="robot-info__top">
        <div class="robot-name">
          Thông tin robot:
          <span>{{ robotObject.code }} - {{ robotObject.name}} <span v-if="robotObject.robotVersion != undefined">({{ robotObject.robotVersion.name }})</span></span>

        </div>
        <div class="map">
          Địa điểm: {{ areaName }} - {{ robotObject.map.name }}
        </div>
        <hr>
      </div>

      <div class="robot-info__bottom">
        <div class="bottom-left">
          <div class="room info-item">
            <md-icon class="locationIcon infoIcon">location_on</md-icon>
            Vị trí [{{ robotStatus.point_x }}, {{ robotStatus.point_y }}, {{ robotStatus.delta_deg }}] <span v-if="currentRoomName !== ''">{{ currentRoomName }}</span>
          </div>
        </div>
        <div class="bottom-right">
          <div class="wifi info-item" :class="{'active' : robotStatus.networkStatus == 1}">
            <md-icon class="infoIcon">wifi</md-icon>
            <span v-if="setting.isOnline">Wifi</span> <span v-else>Wifi-LAN</span>
          </div>
          <div class="pin info-item active">
            <md-icon class="infoIcon">battery_std</md-icon>
            Pin ({{ robotStatus.pin }}%)
          </div>
          <div class="pin info-item" :class="{'active' : robotStatus.barrier == 1}">
            <md-icon class="infoIcon">label</md-icon>
            Vật cản
          </div>
          <div class="bamvach info-item" :class="{'active' : robotStatus.workMode == 2}">
            <md-icon class="infoIcon">view_stream</md-icon>
            Bám vạch
          </div>
          <div class="dkc info-item" :class="{'active' : robotStatus.e_stop == 1}">
            <md-icon class="infoIcon">pause_circle_filled</md-icon>
            Dừng khẩn cấp
          </div>
          <div class="automatic info-item" :class="{'active' : robotStatus.workMode == 1}">
            <md-icon class="infoIcon">autorenew</md-icon>
            Tự động
          </div>
          <div class="bt info-item" :class="{'active' : robotStatus.workMode == 0}">
            <font-awesome-icon icon="hand-point-up" class="awsIcon" :color="manualColor"/>
            Bằng tay
          </div>
        </div>
      </div>
    </div>

  </v-card>
</template>

<script>
const moment = require('moment')
const LABEL = {
  name: 'RobotControl',
  model: 'robot/',
  robotControl: 'robotcontrol/',
  modelArea: 'area/'
}

import { generateTitleView } from '@/help/utils/i18n'
import { mapGetters } from 'vuex'

export default {
  name: 'RobotInformation',
  props: {
    robotObject: {
      type: Object,
      default: () => {
        return {}
      }
    },
    areaName: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      folderUpload: process.env.VUE_APP_STORAGE_USER_AVATAR_PUBLIC,
      dateNow: ''
    }
  },
  computed: {
    ...mapGetters({
      robotStatus: LABEL.robotControl + 'robotStatus',
      currentRoomName: LABEL.robotControl + 'currentRoomName',
      setting: 'auth/setting'
    }),
    manualColor: function() {
      let color = '#828282'
      if (this.robotStatus.workMode === '0') {
        color = 'green'
      } else if (this.robotStatus.workMode === '1') {
        color = '#828282'
      }
      return color
    }
  },
  mounted() {
    this.interval = setInterval(this.updateTime, 1000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {
    redirectVideoCall() {
      window.location.href = '/#/dashboard'
    },
    updateTime() {
      this.dateNow = moment().format()
    },
    generateTitleView
  }
}
</script>

<style scoped lang="scss">
$gray3: #828282;
$gray1: #333333;
$blue1: #2F80ED;
$green: #219653;
$red1: #eb5757;

.robot-info__container {
  padding: 15px;
  display: flex;
  margin-bottom: 10px;
}

.robot-avatar {
  width: 100px;
  margin-right: 20px;
}

.robot-info {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100% - 170px);

  .robot-code {
    color: $gray3;
    font-size: 13px;
  }

  .robot-name {
    margin-bottom: 5px;
    color: black;
    font-weight: 600;
    font-size: 17px;
  }

  .map{
    color: black;
    font-weight: 600;
    font-size: 17px;
  }

  hr {
    width: 60px;
    border: 1px solid $blue1;
    margin: 3px 0;
  }

  .robot-info__bottom {
    display: flex;
    justify-content: space-between;


    .bottom-right{
      text-align: right;

      .info-item{
        display: inline-block;
        padding: 0 7px;
      }
    }

    .info-item {
      font-size: 14px;
      color: $gray1;
      flex-basis: 12.5%;
    }

    .room.info-item {
      color: $blue1;

      .locationIcon {
        color: $blue1 !important;
        margin-right: 5px;
      }

      .awsIcon {
        color: #828282 !important;
        font-size: 28px !important;
      }
    }

    .info-item.active {
      /deep/ i {
        color: $green;
      }
    }
  }
}

.position{
  position: absolute;
  right: 0;

  .top{
    display: flex;
    align-items: center;
  }

  .bottom{
    text-align: right;
    font-size: 16px;
    margin-top: 4px;
    font-weight: 600;
    color: blue;
  }

  .status{
    font-weight: 600;
    font-size: 15px;
  }
}

.btn-giamsat{
  margin-left: 25px;
  padding: 5px 10px;
  background: #409EFF;
  color: white;
  transition: all ease .5s;
  border-radius: 4px;
  font-weight: bold;

  &:hover{
    background: #eb5757;
  }
}
</style>
