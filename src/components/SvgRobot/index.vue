<template>
  <div class="robot-run-container" :style="style" :class="{'none' : left === 0 && top === 0 }">
    <md-tooltip md-direction="top">{{ title }}</md-tooltip>
    <img class="imgRobot" :src="require(`@/assets/${icon}.svg`)" alt="">
  </div>
</template>

<script>
    export default {
        name: 'SvgRobot',
        props: {
            name: {
                type: String, default: ''
            },
            left: {
                type: Number, default: 0
            },
            top: {
                type: Number, default: 0
            },
            width: {
              type: Number,
              default: 0
            },
            title: {
              type: String,
              default: ''
            },
            icon: {
              type: String,
              default: 'robot1'
            }
        },
        computed: {
            style() {
                return {
                    left: 'calc(' + this.left + '% - 15px)',
                    top: 'calc(' + this.top + '% - 15px)'
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .robot-run-container{
        position: absolute;
        transition: all ease .5s;
    }

    .imgRobot{
      width: 30px;
    }

  .robot-run-container.none{
    display: none;
  }
</style>
