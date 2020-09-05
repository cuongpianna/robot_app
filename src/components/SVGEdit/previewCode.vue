<template>
  <div id="pre_code">
    <pre v-highlightjs="scadaTemplate"><code class="html"></code></pre>
  </div>
</template>
<script>
  import '@/assets/css/highlight/default.css'
  import '@/assets/css/highlight/atom-one-light.css'

  export default {
    props: {
      scadaTemplate: {
        type: String,
        default: ''
      }
    },
    data() {
      return {}
    },
    computed: {},
    methods: {}
  }
</script>
<style lang="scss">
  #pre_code {
    flex-grow: 1;
    background-color: #fafafa;
    overflow: auto;
  }

  code {
    font-size: 0.8rem;
    min-height: 600px;
    user-select: text;
  }

  pre {
    margin: 0;
  }
</style>
