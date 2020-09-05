<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      // vnodes.push(<svg-icon icon-class={icon}/>)
      //   vnodes.push(<font-awesome-icon icon={icon} class="icon-sidebar" />)
        vnodes.push(<md-icon class="icon-sidebar">{icon}</md-icon>)
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>
<style scoped>
    .icon-sidebar {
        font-size: 22px;
        margin: 10px;
        color: #686868;
        width: 25px;
    }
</style>
