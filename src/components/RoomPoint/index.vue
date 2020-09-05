<template>
  <div class="room-point-container" :style="style" :class="{'none' : left === 0 && top === 0 }" />
</template>

<script>
    export default {
        name: 'RoomPoint',
        props: {
            left: {
                type: Number, default: 0
            },
            top: {
                type: Number, default: 0
            },
            width: {
                type: Number,
                default: 0
            }
        },
        computed: {
            style() {
                return {
                    left: 'calc(' + this.left + '% - 7px)',
                    top: 'calc(' + this.top + '% - 7px)'
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .room-point-container{
        position: absolute;
        /*transition: all ease 2s;*/
        width: 14px;
        height: 14px;
        border-radius: 100%;
        background: #2F80ED;
    }

    .robot-run-container.none{
        display: none;
    }
</style>
