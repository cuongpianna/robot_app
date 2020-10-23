<template>
  <v-card class="hand-wrap">
    <div class="auto-title__wrap">Chế độ bằng tay</div>
    <div class="hand-action__wrap">
      <div class="left">
        <vibot-button
            :name="labelActions.connectManual"
            :list-object="listManualAction"
            :area-no="areaNo"
            :is-connect="isAutomatic"
            :robot-object="robotObject"
            @emit-action="onDoMissionConnect"
        />
        <action-button v-for="(item, index) in dynamicManualAction"  :list-object="listManualAction"
                       :area-no="areaNo" :is-connect="isAutomatic" :robot-object="robotObject"
                       @emit-action="onDoMission" :order="item.orderIndex" :key="index"/>
      </div>

      <div class="right">
        <div class="control__inner">
          <div class="rows row1">
            <icon-button
                :name="labelActions.up"
                :icon="'arrow-up'"
                :list-object="listManualAction"
                :area-no="areaNo"
                :is-connect="isAutomatic"
                :robot-object="robotObject"
                :action-param="actionParram"
                @emit-action="onDoMission"
                :step="1"
            />
          </div>
          <div class="rows row2">
            <icon-button
                :name="labelActions.left"
                :icon="'arrow-left'"
                :list-object="listManualAction"
                :area-no="areaNo"
                :is-connect="isAutomatic"
                :robot-object="robotObject"
                :action-param="actionParram"
                @emit-action="onDoMission"
                :step="2"
            />
            <icon-button
                :name="labelActions.down"
                :icon="'pause'"
                :list-object="listManualAction"
                :area-no="areaNo"
                :is-connect="isAutomatic"
                :action-param="actionParram"
                :robot-object="robotObject"
                @emit-action="onDoMission"
                :step="3"
            />
            <icon-button
                :name="labelActions.right"
                :icon="'arrow-right'"
                :list-object="listManualAction"
                :area-no="areaNo"
                :is-connect="isAutomatic"
                :action-param="actionParram"
                :robot-object="robotObject"
                @emit-action="onDoMission"
                :step="4"
            />
          </div>
          <div class="rows row3">
            <icon-button
                :name="labelActions.down"
                :icon="'arrow-down'"
                :list-object="listManualAction"
                :area-no="areaNo"
                :is-connect="isAutomatic"
                :action-param="actionParram"
                :robot-object="robotObject"
                @emit-action="onDoMission"
                step="5"
            />
          </div>

          <div class="row4">
            <button @click="openGetActionParramDialog()">Tham số</button>
          </div>
        </div>
      </div>
    </div>
    <v-dialog v-model="dialogModal" max-width="550">
      <v-card class="actionParam">
        <div class="dialogSetting">
          <div>
            <span class="realSize">Bước sang trái</span>
            <v-text-field v-model="actionParram.leftSeed" outlined dense/>
          </div>
          <div>
            <span class="realSize">Bước sang phải</span>
            <v-text-field v-model="actionParram.rightSeed" outlined dense/>
          </div>
          <div>
            <span class="realSize">Bước tiến</span>
            <v-text-field v-model="actionParram.forwardSeed" outlined dense/>
          </div>
          <div>
            <span class="realSize">Bước lùi</span>
            <v-text-field v-model="actionParram.backwardSeed" outlined dense/>
          </div>
        </div>
        <md-dialog-actions>
          <md-button
              class="md-primary"
              @click="hideDialog()"
          >{{ generateTitleView('close', 'camera') }}
          </md-button>
          <button class="btn-control btn-primary" @click="updateActionParram()">Lưu</button>
        </md-dialog-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import * as CONTROL_ACTIONS from '@/store/constants/robotcontrol'
import * as ROBOT_ACTIONS from '@/store/constants/robotaction'
import { generateTitleView } from '@/help/utils/i18n'
import VibotButton from '@/components/VibotButton'
import ActionButton from '@/components/ActionButton'
import IconButton from '@/components/IconButton'

const LABEL = {
  robotControl: 'robotcontrol/',
  robotActions: 'robotaction/'
}

export default {
  name: 'HandAction',
  components: {
    VibotButton,
    ActionButton,
    IconButton
  },
  props: {
    areaNo: {
      type: Number,
      default: 1
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
      dialogModal: false,
      listQuery: {
        page: 1,
        limit: 20,
        name: '',
        status: null
      },
      actionParram: {
        leftSeed: 1,
        rightSeed: 1,
        forwardSeed: 1,
        backwardSeed: 1
      },
      labelActions: {
        connectManual: 'Kết nối – bằng tay',
        nangHang: 'Nâng hàng',
        haHang: 'Hạ hàng',
        bamDuong: 'Bám đường',
        up: 'Tiến',
        down: 'Lùi',
        left: 'Trái',
        right: 'Phải',
        pause: 'Dừng'
      }
    }
  },
  computed: {
    ...mapGetters({
      mission: LABEL.robotControl + 'mission',
      workStatus: LABEL.robotControl + 'workStatus',
      isAutomatic: LABEL.robotControl + 'isAutomatic',
      listManualAction: LABEL.robotActions + 'listManualAction'
    }),
    dynamicManualAction() {
      const result = this.listManualAction.filter(obj => {
        return obj.orderIndex > 5
      })
      return result.reverse()
    }
  },
  mounted() {
    this.getManualListAction()
    this.getActionParram()
  },
  methods: {
    ...mapActions({
      actGetManualList: LABEL.robotActions + ROBOT_ACTIONS.ACT_GET_LIST_MANUAL,
      actGetActionParram:
          LABEL.robotActions + ROBOT_ACTIONS.ACT_GET_ACTION_PARRAM,
      actUpdateActionParram:
          LABEL.robotActions + ROBOT_ACTIONS.ACT_UPDATE_ACTION_PARRAM
    }),
    ...mapMutations({
      mutUpdateRobotStatus:
          LABEL.robotControl + CONTROL_ACTIONS.MUTATION_CHANGE_AUTOMATIC
    }),
    getManualListAction() {
      this.actGetManualList({
        current_page: this.listQuery.page,
        name: this.listQuery.name,
        is_active: this.listQuery.status,
        limit: this.listQuery.limit,
        showInManualRobotDashboard: true
      })
    },
    getActionParram() {
      this.actGetActionParram().then((res) => {
        this.loading = false
        this.actionParam = res.payload.records
      })
    },
    updateActionParram() {
      this.actUpdateActionParram(this.actionParram).then((res) => {
        if (res.isSuccess) {
          this.$notify.success({
            title: this.generateTitleView('success', 'message'),
            message: this.generateTitleView('successMessage', 'message'),
            duration: 2000
          })
          this.hideDialog()
        }
        this.loading = false
      })
    },
    onDoMission(value) {
      this.$emit('emit-action', value)
    },
    onDoMissionConnect(value) {
      this.$emit('emit-action', value)
    },
    hideDialog() {
      this.dialogModal = false
    },
    showDialog() {
      this.dialogModal = true
    },
    openGetActionParramDialog() {
      this.actGetActionParram().then((res) => {
        this.actionParam = res.payload.records
        this.loading = false
        this.dialogModal = true
      })
    },
    generateTitleView
  }
}
</script>

<style scoped lang="scss">
$gray1: #333;
$gray2: #dbdbdb;
$blue1: #409eff;

.hand-wrap {
  padding: 15px;

  .auto-title__wrap {
    font-size: 16px;
    color: $gray1;
  }

  .hand-action__wrap {
    /*width: 140px;*/
  }
}

.dialogSetting {
  padding: 20px !important;
}

.hand-action__wrap {
  //display: flex;
  margin-top: 10px;
  width: 100%;

  .left {
    margin-right: 20px;
    display: inline-block;
    width: 40%;

    .btnAction {
      width: 100%;
      border-radius: 4px;
      height: 36px;
      line-height: 36px;
      color: #ffffff;
      background: $gray2;
      margin-bottom: 10px;
      transition: all ease 0.5s;

      &:hover {
        background: #7b7b7b;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    .btnAction.btnConnect {
      &:hover {
        background: $blue1;
      }
    }

    .btnAction.btnConnect.active {
      background: $blue1;
    }

    .btnAction.disable {
      &:hover {
        background: $gray2;
        cursor: not-allowed;
      }
    }
  }

  .right {
    //width: calc(100% - 140px);
    display: inline-block;
  }
}

.control__inner {
  text-align: center;

  button {
    width: 74px;
    height: 36px;
    line-height: 36px;
    background: #dbdbdb;
    text-align: center;
    border-radius: 4px;
    margin-right: 10px;
  }
}

.rows {
  margin-bottom: 10px;
  width: 100%;
}

.btn-control.btn-primary {
  background: $blue1;
  color: #fff !important;
  padding: 3px 7px;
  border-radius: 3px;
  margin-left: 6px;
}
</style>
