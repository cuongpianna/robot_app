<template>
  <div class="shape-container" :style="{top:position.top+'%', left:position.left+'%', width: position.width+'%', height:position.height + '%'}">
    <md-tooltip md-direction="top">{{ name }}</md-tooltip>
    <svg>
      <polygon
        :points="pointsString"
      />
    </svg>
  </div>
</template>

<script>
    export default {
        name: 'SvgShape',
        props: {
            name: {
                type: String, default: ''
            },
            position: {
                type: Object,
                default() {
                  return []
                }
            },
            points: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        computed: {
            pointsString() {
                let pointStrings = []

                if(this.points.length !== 0) {
                  const pointsFlag = []
                  pointsFlag.push(this.points[0])
                  pointsFlag.push([this.points[0][0], this.points[1][1]])
                  pointsFlag.push(this.points[1])
                  pointsFlag.push([this.points[1][0], this.points[0][0]])
                  // var pointsFlag = this.points

                  pointStrings = pointsFlag.map(function(point) {
                    return point[0] + ',' + point[1]
                  }, this)
                }
                return pointStrings.join(' ')
            }
        }
    }
</script>

<style scoped lang="scss">
    .shape-container{
        position: absolute;
        transition: all ease .4s;
        cursor: pointer;

        svg{
            width: 100%;
            height: 100%;

            polygon{
                opacity: 0;
                transition: all ease .3s;
                &:hover{
                    opacity: .5;
                }
            }
        }
    }
</style>
