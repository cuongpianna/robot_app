<template>
  <div class="popup-container" :class="isShow ? 'active' : ''">
    <slot />
  </div>
</template>

<script>
    export default {
        components: {
        },
        props: {
            isShow: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
            }
        },
        watch: {
        },
        mounted() {
        },
        methods: {
        }
    }
</script>

<style lang="scss" scoped>
    .popup-container {
        position: absolute;
        width: 0;
        height: auto;
        min-height: 100%;
        background: #fff;
        z-index: 1800;
        visibility: hidden;
        opacity: 0;
        top: 0;
        right: 0;
        transition: all ease-in-out .3s;

        &.active {
                     width: 100%;
                     visibility: visible;
        opacity: 1;
                 }
    }
</style>
