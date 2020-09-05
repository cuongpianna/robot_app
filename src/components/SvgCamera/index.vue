<template>
  <div class="camera-container" :style="style" :class="className">
    <md-tooltip md-direction="top">{{ name }}</md-tooltip>
    <font-awesome-icon icon="video" class="iconVideo" />
  </div>
</template>

<script>
    export default {
        name: 'SvgCamera',
        props: {
            name: {
                type: String, default: ''
            },
            position: {
                type: Object,
                default: function() {
                  return []
                }
            },
            points: {
                type: Array,
                default: function() {
                  return []
                }
            },
            className: {
              type: String, default: ''
            }
        },
        computed: {
            pointsString() {
                const pointStrings = this.points.map(function(point) {
                    return point[0] + ',' + point[1]
                }, this)
                return pointStrings.join(' ')
            },
            left() {
              return this.position.left
            },
            top() {
              return this.position.top
            },
            style() {
              if(this.className === 'active') {
                return {
                  left: 'calc(' + this.position.left + '% - 7px)',
                  top: 'calc(' + this.position.top + '% - 10px)'
                }
              }else {
                return {
                  left: 'calc(' + this.position.left + '% - 10.025px)',
                  top: 'calc(' + this.position.top + '% - 10px)'
                }
              }
            }
        }
    }
</script>

<style scoped lang="scss">
    .camera-container{
        position: absolute;
        transition: all ease .4s;
        cursor: pointer;
    }

  .camera-container.active{
    .iconVideo{
      color: #eb5757;
      font-size: 18px;
    }
  }
</style>
