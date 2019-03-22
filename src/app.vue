<template>
  <div id="app" class="app">
    <!-- don't using layout -->
    <router-view v-if="notLayout"/>

    <!-- using layout -->
    <layout v-else/>
  </div>
</template>

<script>
  import Layout from './views/layout';

  export default {
    name: 'App',
    components: {Layout},
    computed: {
      notLayout() {
        return this.$route.meta.notLayout;

      }
    }
  }
</script>

<style scoped lang="less">
  .app {
    width: 100%;
    height: 100%;
  }
</style>
