<template>
  <v-card class="automatic-wrap">
    <div class="auto-title__wrap">
      <div class="auto-title__left">Chế độ tự động</div>
      <div class="auto-title__right">
        <font-awesome-icon icon="bell" color="#409EFF" />
        <a style="margin-right:10px" @click="openGetScheduleDialog()">Lịch chạy robot</a>

        <font-awesome-icon icon="plus-circle" color="#409EFF" />
        <a @click="openRobotScheduleDialog()">Thêm nhiệm vụ</a>
      </div>
    </div>

    <div class="auto_info__wrap">
      <div class="auto_info__content">
        <div class="info__item">
          <div class="left">
            <md-icon>medical_services</md-icon>
          </div>
          <div class="right">
            <div class="value" style="min-height: 25px">{{ missionName }}</div>
            <div class="label">Chế độ đang làm việc</div>
          </div>
        </div>
        <div class="info__item">
          <div class="left">
            <md-icon>view_list</md-icon>
          </div>
          <div class="right">
            <div class="value" style="min-height: 25px">
              <i v-for="(item, index) in areaRoomNameList" :key="index">
                <i v-if="index !== 0">-</i>
                {{ item }}
              </i>
            </div>
            <div class="label">Danh sách phòng</div>
          </div>
        </div>
      </div>
      <button class="auto_info__button">
        <md-icon v-if="workStatus === 0" class="iconPause">pause</md-icon>
        <md-icon v-if="workStatus === 1" class="iconPause">play_arrow</md-icon>
      </button>
    </div>

    <div class="auto_actions_wrap">
      <div class="left">
        <button
          class="btnAction"
          :class="{'active' : robotStatus.workMode
            === '1'}"
          @click="doShortMission(shortMission.connectAction)"
        >Kết nối
        </button>
      </div>
      <div class="right">

        <button
            v-for="(autoAction,index) in firstAutoRobotList"
            :key="index"
            class="btn-long"
            :class="setClassButton(autoAction.code)"
            @click="setScheduleWithAnAction(autoAction.code)"
        >{{ autoAction.actionName }}
        </button>
      </div>
    </div>

    <!-- down -->

    <div class="auto_actions_wrap noMargin">
      <div class="left">
        <button
          class="btnAction"
          :class="{'active' : mission === '2'}"
          @click="doShortMission(shortMission.resetAction)"
        >Reset
        </button>
      </div>
      <div class="right">
        <button
            v-for="(autoAction,index) in secondAutoRobotList"
            :key="index"
            class="btn-long"
            :class="setClassButton(autoAction.code)"
            @click="setScheduleWithAnAction(autoAction.code)"
        >{{ autoAction.actionName }}
        </button>
      </div>
    </div>

    <!-- Dialog -->
    <v-dialog v-model="showDialog1" max-width="550">
      <v-card>
        <v-card-title>Danh sách lịch chạy robot</v-card-title>

        <div class="md-contents">
          <md-table v-if="listRobotSchedule.length > 0" v-model="listRobotSchedule">
            <md-table-row
              slot="md-table-row"
              slot-scope="{ item }"
            >
              <md-table-cell :md-label="generateTitleView('Tác vụ', 'camera')">{{ item.actionName }}</md-table-cell>
              <md-table-cell
                :md-label="generateTitleView('Lịch chạy', 'camera')"
              >{{ item.scheduleTimeFormated }}
              </md-table-cell>
            </md-table-row>
          </md-table>
          <div v-else class="noCamera" style="padding: 0 20px">{{ generateTitleView('noCamera', 'camera') }}</div>
        </div>

        <md-dialog-actions>
          <md-button
            class="md-primary"
            @click="hideDialog1()"
          >{{ generateTitleView('close', 'camera') }}
          </md-button>
        </md-dialog-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showDialog" max-width="550">
      <v-card class="robotSchedule">
        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          :name="generateTitleView('Lệnh điều khiển', 'veeValidate')"
        >
          <div class="search">
            <v-select
              v-model="sheduleForm.robotActionModel"
              :items="listRobotActions"
              item-text="actionName"
              item-value="code"
              label="Chọn lệnh điều khiển"
              dense
              solo
            />
          </div>
          <span class="vee-errors">{{ errors[0] }}</span>
        </ValidationProvider>
        <div>
          <span class="realSize">Tốc độ</span>
          <v-text-field v-model="sheduleForm.speed" outlined dense />
        </div>
        <div>
          <label>
            <input v-model="sheduleForm.actionType" type="radio" value="1"> Thực thi luôn
          </label>
        </div>
        <div>
          <label>
            <input v-model="sheduleForm.actionType" type="radio" value="2"> Chọn thời gian
          </label>
          <input
            id="birthdaytime"
            v-model="sheduleForm.scheduleTime"
            type="datetime-local"
            name="birthdaytime"
          >
        </div>
        <md-dialog-actions>
          <md-button
            class="md-primary"
            @click="hideDialog()"
          >{{ generateTitleView('close', 'camera') }}
          </md-button>
          <button class="btn-control btn-primary" @click="setSchedule()">Lập lịch</button>
        </md-dialog-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import Cookies from 'js-cookie'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import * as CONTROL_ACTIONS from '../../../store/constants/robotcontrol'
import * as ROBOTACTIONS from '../../../store/constants/robot'
import * as ROBOT_ACTIONS from '../../../store/constants/robotaction'
import { generateTitleView } from '@/help/utils/i18n'
import _ from 'lodash'

const LABEL = {
  robotControl: 'robotcontrol/',
  robotAction: 'robotaction/',
  robot: 'robot/'
}

const MISSION_LIST = {
  chuyenCom: 5,
  thamBenhNhan: 6,
  chuyenThuoc: 7,
  thuRac: 8,
  veLayDO: 3,
  veGara: 4
}

export default {
  name: 'AutomaticAction',
  props: {
    areaNo: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      shortMission: {
        connectAction: 1,
        resetAction: 2
      },
      currentMissionAdd: '',
      mode: 1,
      showDialog: false,
      showDialog1: false,
      listQuery: {
        page: 1,
        limit: 1000,
        name: '',
        status: null
      },
      listRobotSchedule: [],
      robotObject: {},
      sheduleForm: {
        actionType: 1,
        speed: 1
      },
      speed: 1.5
    }
  },
  computed: {
    ...mapGetters({
      areaRoomList: LABEL.robotControl + 'areaRoomList',
      mission: LABEL.robotControl + 'mission',
      workStatus: LABEL.robotControl + 'workStatus',
      listRobotActions: LABEL.robotAction + 'listRobotActions',
      totalRobotActions: LABEL.robotAction + 'totalRobotActions',
      autoRobotActions: LABEL.robotAction + 'autoRobotActions',
      manualRobotActions: LABEL.robotAction + 'manualRobotActions',
      // listRobotSchedule: LABEL.robotAction + "listRobotSchedule",
      robotStatus: LABEL.robotControl + 'robotStatus'
    }),
    firstAutoRobotList: function() {
      const actionCount = this.orderedAutoRobotActions.length
      if (actionCount >= 4) {
        return this.orderedAutoRobotActions.slice(0, 4)
      } else {
        return this.orderedAutoRobotActions.slice(0, actionCount)
      }
    },
    secondAutoRobotList: function() {
      const actionCount = this.orderedAutoRobotActions.length
      if (actionCount > 4) {
        return this.orderedAutoRobotActions.slice(4, actionCount)
      } else {
        return []
      }
    },
    orderedAutoRobotActions: function() {
      const autoRobotActions = this.$store.getters[
          'robotaction/autoRobotActions'
          ]
      return _.orderBy(autoRobotActions, 'orderIndex')
    },
    areaRoomNameList: function() {
      const roomList = this.$store.getters['robotcontrol/areaRoomList']
      const results = roomList.map((room) => {
        return room.name.replace('Phòng ', '')
      })
      return results
    },
    missionName: function() {
      var result = ''
      if (this.mission === MISSION_LIST.chuyenCom) {
        result = this.getMissionName('Chuyển cơm đến phòng ')
      } else if (this.mission === MISSION_LIST.thamBenhNhan) {
        result = this.getMissionName('Thăm bệnh nhân tại phòng ')
      } else if (this.mission === MISSION_LIST.chuyenThuoc) {
        result = this.getMissionName('Chuyển thuốc đến phòng ')
      } else if (this.mission === MISSION_LIST.thuRac) {
        result = this.getMissionName('Thu rác tại phòng ')
      }else if (this.mission === MISSION_LIST.veLayDO) {
        result = 'Về lấy đồ'
      } else if (this.mission === MISSION_LIST.veGara) {
        result = 'Về gara'
      }
      return result
    }
  },
  mounted() {
    const robotId = this.$router.currentRoute.params.id
    this.getRobot(robotId)
    this.getRobotActions()
  },
  methods: {
    ...mapMutations({
      mutChangeMission:
          LABEL.robotControl + CONTROL_ACTIONS.MUTATION_CHANGE_WORK_MODE,
      mutChangeStatus:
          LABEL.robotControl + CONTROL_ACTIONS.MUTATION_CHANGE_WORK_STATUS,
    }),
    ...mapActions({
      actFetchAllRobotActions:
          LABEL.robotAction + ROBOT_ACTIONS.ACT_FETCH_ROBOT_ACTION_PAGING,
      actGetCurrentRobot: LABEL.robot + ROBOTACTIONS.ACT_FETCH_ONE_ROBOT,
      actFetchAllRobotSchedule:
          LABEL.robotAction + ROBOT_ACTIONS.ACT_GET_ROBOT_SCHEDULE,
      actCreateRobotSchedule:
          LABEL.robotAction + ROBOT_ACTIONS.ACT_INSERT_ROBOT_SCHEDULE
    }),
    getRobotActions() {
      this.actFetchAllRobotActions({
        current_page: this.listQuery.page,
        name: this.listQuery.name,
        is_active: this.listQuery.status,
        limit: this.listQuery.limit,
        isAutomaticAction: true
      })
    },
    getMissionName(name) {
      var rooms = Cookies.get('rooms')
      if(rooms != null && rooms != undefined && rooms != '') {
        var newRoom = rooms.replaceAll('_', ',')
        return name + newRoom
      }else {
        return name
      }
    },
    getRobotSchedule() {
      this.actFetchAllRobotSchedule()
    },
    createSchedule(robotId, robotCode, actionCode, actionType, mapCode, speed, roomList, scheduleTime) {
      const formCreate = {
        robotId: robotId,
        robotCode: robotCode,
        actionCode: actionCode,
        actionType: actionType,
        mapCode: mapCode,
        speed: speed,
        roomList: roomList,
        scheduleTime: scheduleTime
      }
      this.actCreateRobotSchedule(formCreate)
    },
    getRoomList() {
      let roomList = ''
      for (const [index, item] of this.areaRoomList.entries()) {
        var roomName = item.name.match(/\d+/)[0]
        if (index + 1 !== this.areaRoomList.length) {
          roomName = roomName + '_'
        }
        roomList += roomName
      }
      return roomList
    },
    changeMission(mission) {
      this.mutChangeMission(mission)
    },
    generateTitleView,
    hideDialog() {
      this.showDialog = false
    },
    hideDialog1() {
      this.showDialog1 = false
    },
    openDialog() {
      this.showDialog = true
    },
    setScheduleWithAnAction(code) {
      const actionObject = this.orderedAutoRobotActions.filter((o) => {
        return o.code === code
      })[0]

      if(actionObject.needRoom) {
        var obj = {
          speed: 1,
          actionType: 1,
          robotActionModel: code
        }

        this.sheduleForm = obj
        this.showDialog = true
      }else {
        Cookies.set('rooms', '')
        const value = `@${this.mode}#${code}#${this.areaNo}#${this.speed}#&_${this.robotObject.code}`
        this.$emit('clicked', value)
      }
    },
    setSchedule() {
      const map_id = this.areaNo
      const speed = this.sheduleForm.speed
      const roomList = this.getRoomList()

      if (this.sheduleForm.actionType === 1) {
        if (parseInt(this.robotStatus.workMode) !== 1) {
          this.$notify.warning({
            title: this.generateTitleView('error', 'message'),
            message: 'Bạn cần kết nối chế độ điều khiển tự động để thực thi.',
            duration: 2000
          })
          return
        } else if (parseInt(this.robotStatus.missionStatus) === 0) {
          this.$notify.warning({
            title: this.generateTitleView('error', 'message'),
            message: 'Robot chưa thực hiện xong nhiệm vụ.',
            duration: 2000
          })
          return
        }
      }

      if (roomList === '') {
        this.$notify.error({
          title: this.generateTitleView('error', 'message'),
          message: 'Bạn chưa chọn danh sách phòng',
          duration: 2000
        })
        return
      }
      if (this.sheduleForm.robotActionModel === '') {
        this.$notify.error({
          title: this.generateTitleView('error', 'message'),
          message: 'Bạn chưa mã lệnh điều khiển',
          duration: 2000
        })
        return
      }
      if (this.sheduleForm.actionType === 2 && this.sheduleForm.scheduleTime === '') {
        this.$notify.error({
          title: this.generateTitleView('error', 'message'),
          message: 'Bạn chưa chọn thời gian chạy lệnh',
          duration: 2000
        })
        return
      }
      if (this.sheduleForm.actionType === 1) {
        const value =
            '@!1#' +
            this.sheduleForm.robotActionModel +
            '#' +
            map_id +
            '#' +
            this.sheduleForm.speed +
            '#' +
            roomList +
            '&' + '_' + this.robotObject.code
        this.$emit('clicked', value)
        this.changeMission(this.sheduleForm.robotActionModel)
        this.currentMissionAdd = this.sheduleForm.robotActionModel
        Cookies.set('rooms', roomList)
      } else {
        this.createSchedule(
            this.robotObject.id,
            this.robotObject.code,
            this.sheduleForm.robotActionModel,
            '2',
            map_id,
            speed,
            roomList,
            this.sheduleForm.scheduleTime
        )
      }
      this.hideDialog()
    },
    openRobotScheduleDialog() {
      this.showDialog = true
      this.sheduleForm = { actionType: 1, speed: 1 }
    },
    getRobot(id) {
      this.actGetCurrentRobot(id).then((res) => {
        const dataUser = res.payload.records
        this.robotObject = JSON.parse(JSON.stringify(dataUser))
      })
    },
    openGetScheduleDialog() {
      this.actFetchAllRobotSchedule().then((res) => {
        this.listRobotSchedule = res.payload.records
        this.showDialog1 = true
      })
    },
    doShortMission(mission) {
      const value = `@${this.mode}#${mission}#${this.areaNo}#${this.speed}#&_${this.robotObject.code}`
      this.$emit('clicked', value)
      Cookies.set('rooms', '')
    },
    setClassButton(v) {
      if(this.mission == v) {
        return 'superActive'
      }else if(this.currentMissionAdd == v){
         return 'active'
      }
    }
  }
}
</script>

<style scoped lang="scss">
$gray1: #333;
$blue1: #409eff;
$red: #eb5757;

.btn-long.superActive{
  background: $blue1 !important;
}

.automatic-wrap {
  padding: 15px;

  .auto-title__wrap {
    display: flex;
    justify-content: space-between;
  }

  .auto-title__left {
    font-size: 16px;
    color: $gray1;
  }

  .auto-title__right {
    color: $blue1;
  }
}

.auto_info__wrap {
  margin-top: 10px;
  display: flex;
  margin-bottom: 15px;

  &:last-child {
    margin-bottom: 0;
  }

  .auto_info__content {
    width: calc(100% - 82px);
    display: flex;
    justify-content: space-between;
    padding: 10px 30px 10px 10px;
    border: 1px solid #e0e0e0;
    margin-right: 15px;

    .info__item {
      display: flex;
      align-items: flex-start;

      .left {
        margin-right: 15px;

        /deep/ i {
          font-size: 32px !important;
          color: $blue1;
        }
      }

      .right {
        .value {
          font-size: 15px;
          font-weight: 500;
          color: $gray1;
        }

        .label {
          font-size: 12px;
          color: #828282;
          margin-top: 3px;
        }
      }
    }
  }
}

.auto_info__button {
  width: 67px;
  height: 67px;
  border-radius: 4px;
  background: $red;
}

.iconPause {
  color: #fff !important;
}

.auto_actions_wrap {
  margin-bottom: 15px;
  display: flex;
  height: 40px;
  line-height: 40px;

  .left {
    width: 60px;
    margin-right: 15px;

    button {
      width: 100%;
      color: #ffffff;
      font-size: 14px;
      border-radius: 4px;
      background: #e0e0e0;
      transition: all ease 0.5s;

      &:hover {
        background: #7b7b7b;
      }
    }

    button.active {
      background: $blue1;
    }
  }

  .right {
    width: calc(100% - 75px);
    display: flex;

    button {
      flex-basis: 25%;
      margin-right: 15px;
      border-radius: 4px;
      color: #ffffff;
      background: #dbdbdb;
      transition: all ease 0.5s;

      &:last-child {
        margin: 0;
      }

      &:hover {
        background: #7b7b7b;
      }
    }

    button.btn-outlined {
      background: #ffffff;
      border: 1px solid $blue1;
      color: $blue1;
    }

    .btn-long.active {
      background: #7b7b7b !important;
    }
  }
}

.noMargin {
  margin-bottom: 0 !important;
}

.robotSchedule {
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
}

.robotSchedule /deep/ .v-text-field__slot label.v-label.v-label--active {
  left: -8px !important;
  right: auto !important;
}

.robotSchedule /deep/ .v-text-field__slot label.v-label {
  left: 0px !important;
  right: auto !important;
}

.robotSchedule /deep/ .v-text-field--outlined fieldset {
  padding-left: 8px;
}

.robotSchedule /deep/ .v-input__slot legend {
  text-align: left;
}

.robotSchedule /deep/ .v-input__slot {
  min-height: 40px !important;
  margin-bottom: 15px;
}

.robotSchedule /deep/ .v-text-field--outlined .v-label {
  top: 10px;
}

.robotSchedule /deep/ .mdi{
  &:before{
    display: none;
  }
}

.robotSchedule /deep/ .v-text-field__slot label {
  font-weight: normal !important;
  font-size: 14px;
}

.robotSchedule /deep/ .v-text-field__details {
  display: none;
}

.robotSchedule::-webkit-scrollbar {
  width: 1em;
}

.robotSchedule::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.robotSchedule::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
}

.btn-control.btn-primary {
  background: $blue1;
  color: #fff !important;
  padding: 3px 7px;
  border-radius: 3px;
  margin-left: 6px;
}

input#birthdaytime {
  border: 1px solid #cdcdcd;
  padding: 4px;
  border-radius: 3px;
  margin-left: 5px;
}

</style>
