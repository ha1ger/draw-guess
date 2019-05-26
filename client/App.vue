<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    window.addEventListener('beforeunload', e => {
      this.$router.push('/')
    })
  }
}
</script>
<style lang="stylus" scoped>
#app {
  height: 100%;
  width: 100%;
}
</style>
<style type="text/css">
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
#app {
  height: 100%;
  width: 100%;
}
</style>
