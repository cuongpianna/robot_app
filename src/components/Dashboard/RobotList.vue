<template>
  <v-row>
    <v-col v-for="(item, index) in listRobots" :key="index" md="3">
      <v-card class="robot-wrap">
        <div class="robot-wifi">
          <span class="wifi">Wifi</span>
          <div>
            <md-icon class="chart">bar_chart</md-icon>
          </div>
        </div>
        <div class="robot-pin-wrap">
          <div class="robot-pin" :style="{'background-image': 'url(' + require('@/assets/pin.png') + ')'}">
            <div class="pin-label">PIN</div>
            <div class="pin-value">83%</div>
          </div>
        </div>
        <div class="robot-info-wrap">
          <div class="robot-name">
            {{ item.name }}
          </div>
          <div class="robot-place">
            <span class="place-label">{{ generateTitleView('place', 'dashboard') }}</span>
            <span class="place-value">P14</span>
          </div>
        </div>
        <div class="robot-footer">
          <div class="robot-status">
            <div class="status-wrap">
              <span class="status-label">BT</span>
              <el-toggle-button height="15" width="34"/>
            </div>
            <div class="status-wrap">
              <span class="status-label">TĐ</span>
              <el-toggle-button height="15" width="34"/>
            </div>
          </div>
          <div class="robot-camera">
            <div class="camera-wrap">
              <div class="camera-wrap__inner" @click="redirectCall(item.id)">
                <font-awesome-icon icon="video" color="#ffffff" class="icon-back"/>
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>

</template>

<script>
import { mapGetters } from 'vuex'
import { generateTitleView } from '@/help/utils/i18n'
import ElToggleButton from '@/components/ToggleButton'

const LABEL = {
  model: 'dashboard/'
}

export default {
  name: 'RobotList',
  components: {
    ElToggleButton
  },
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapGetters({
      listRobots: LABEL.model + 'listRobots'
    })
  },
  mounted() {
  },
  methods: {
    generateTitleView,
    redirectCall(id) {
      window.location.href = '/#/users/robots/call/' + id
    }
  }
}
</script>

<style lang="scss" scoped>
$blue1: #2F80ED;
$bgMap: #FCFCFC;
$green1: #27AE60;
$gray1: #828282;
$gray2: #333333;

.robot-wrap {
  .robot-wifi {
    display: flex;
    padding: 12px;
    align-items: center;
    justify-content: flex-start;

    .wifi {
      margin-top: 4px;
      margin-right: 5px;
    }

    .chart {
      color: $green1;
    }
  }

  .robot-pin-wrap {
    text-align: center;

    .robot-pin {
      width: 141px;
      height: 141px;
      margin: 2px auto 10px;
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .pin-label {
        color: $gray1;
        font-size: 16px;
      }

      .pin-value {
        margin-top: 4px;
        color: $gray2;
        font-size: 23px;
        font-weight: bold;
      }
    }
  }

  .robot-info-wrap {
    padding: 0 12px 5px;
    display: flex;
    justify-content: space-between;

    .robot-name {
      font-weight: 500;
      font-size: 18px;
      color: $gray2;
    }

    .robot-place {
      .place-label {

      }

      .place-value {
        font-size: 16px;
        font-weight: 600;
      }
    }
  }

  .robot-footer {
    padding: 14px 0px 14px 0;
    border-top: 1px solid #0000001c;
    display: flex;

    .robot-status {
      flex-basis: 70%;

      display: flex;
      justify-content: space-around;

      .status-wrap {
        display: flex;
        align-items: center;

        /deep/ {
          .v-input {
            margin-top: 0 !important;
          }
        }

        .status-label {
          margin-right: 14px;
        }
      }
    }

    .robot-camera {
      flex-basis: 30%;
      text-align: center;

      .camera-wrap {
        background: #2F80ED;
        border-radius: 4px;
        display: inline-block;
        padding: 6px 14px;
        cursor: pointer;
        transition: all ease .5s;

        &:hover {
          background: #EB5757
        }
      }
    }
  }
}

</style>
