<template>
  <div class="app-container">
    <robot-filter/>
    <camera-map/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import CameraMap from '@/components/Camera/map'
import RobotFilter from '@/components/Camera/RobotFilter'

const LABEL = {
  model: 'area'
}
export default {
  name: LABEL.name,
  components: {
    CameraMap,
    RobotFilter
  },
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapGetters([])
  },
  watch: {},
  mounted() {
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.app-container {
  padding: 0;
  margin: 10px;
}
</style>
