<template>
  <v-row class="v-row__filter">
    <v-col md="12">
      <span class="filter-title">{{ generateTitleView('robotList', 'dashboard') }} {{ parentName }} - {{
          currentArea
        }} </span>
    </v-col>
  </v-row>

</template>

<script>
import { mapGetters } from 'vuex'
import { generateTitleView } from '@/help/utils/i18n'

const LABEL = {
  model: 'dashboard/'
}

export default {
  name: 'RobotFilter',
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapGetters({
      currentMap: LABEL.model + 'currentMap',
      currentArea: LABEL.model + 'currentArea',
      parentName: LABEL.model + 'parentName'
    })
  },
  mounted() {
  },
  methods: {
    generateTitleView
  }
}
</script>

<style lang="scss" scoped>
$blue1: #2F80ED;
$bgMap: #FCFCFC;

.v-row__filter {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;

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

</style>
