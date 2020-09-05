<template>
  <v-card class="robot-info__container">
    <div class="robot-avatar">
      <v-card flat tile class="d-flex">
        <v-img :lazy-src="folderUpload + robotObject.thumb" aspect-ratio="1.5" :transition="false"/>
      </v-card>
    </div>
    <div class="robot-info">
      <div class="robot-info__top">
        <div class="robot-code">
          {{ generateTitleView('robotCode', 'robotControl') }}
          {{ robotObject.code }}
        </div>
        <div class="robot-name">
          {{ generateTitleView('robotName', 'robotControl') }}
          {{ robotObject.name }}

          <el-tooltip class="item" effect="dark" :content="generateTitleView('Video Call' ,'robot')" placement="top">
            <button class="action-button camera-button" @click="redirectVideoCall">
              <font-awesome-icon icon="video" color="#fff"/>
            </button>
          </el-tooltip>
        </div>
        <hr>
      </div>

      <div class="robot-info__bottom">
        <div class="room info-item">
          <md-icon class="locationIcon infoIcon">location_on</md-icon>
          Vị trí [{{ robotStatus.point_x }}, {{ robotStatus.point_y }}, {{ robotStatus.delta_deg }}]
        </div>
        <div class="wifi info-item" :class="{'active' : robotStatus.networkStatus == 1}">
          <md-icon class="infoIcon">wifi</md-icon>
          Wifi
        </div>
        <div class="pin info-item active">
          <md-icon class="infoIcon">battery_std</md-icon>
          Pin ({{ robotStatus.pin }}%)
        </div>
        <div class="pin info-item" :class="{'active' : robotStatus.barrier == 1}">
          <md-icon class="infoIcon">fence</md-icon>
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
          <md-icon class="infoIcon">pause_circle_filled</md-icon>
          Tự động
        </div>
        <div class="bt info-item" :class="{'active' : robotStatus.workMode == 0}">
          <font-awesome-icon icon="hand-point-up" class="awsIcon" :color="manualColor"/>
          Bằng tay
        </div>
      </div>
    </div>

  </v-card>
</template>

<script>
const LABEL = {
  name: 'RobotControl',
  model: 'robot/',
  robotControl: 'robotcontrol/'
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
    }
  },
  data() {
    return {
      folderUpload: process.env.VUE_APP_STORAGE_USER_AVATAR_PUBLIC
    }
  },
  computed: {
    ...mapGetters({
      robotStatus: LABEL.robotControl + 'robotStatus'
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
  methods: {
    redirectVideoCall() {
      window.location.href = '/#/users/robots/call/' + this.robotObject.id
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
  width: 150px;
  margin-right: 20px;
}

.robot-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100% - 170px);

  .robot-code {
    color: $gray3;
    font-size: 14px;
  }

  .robot-name {
    padding-top: 6px;
    padding-bottom: 10px;
    color: $gray1;
    font-weight: 500;
    font-size: 18px;
  }

  hr {
    width: 30px;
    border: 1px solid $blue1;
  }

  .robot-info__bottom {
    display: flex;
    justify-content: space-between;

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

.action-button {
  margin-right: 5px;
  width: 30px;
  height: 30px;
  line-height: 30px;
  transition: alle ease 1s;
  border-radius: 4px;
  background: $blue1;
  border: none;

  &:hover {
    background: $red1;
  }
}
</style>
