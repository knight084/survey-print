<template>
  <div class="layout">
    <!-- header -->
    <header class="header">
      <top/>
    </header>

    <!-- navigator -->
    <nav v-show="!hideMenu"
         class="nav">
      <side/>
    </nav>

    <!-- main content -->
    <main class="main"
          :style="mainStyle">
      <template v-if="keepAlive">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </template>

      <template v-else>
        <router-view/>
      </template>
    </main>
  </div>
</template>

<script>
  import Top from './top';
  import Side from './side';

  export default {
    name: 'Layout',
    components: {Top, Side},
    computed: {
      // whether using keep-alive
      keepAlive() {
        const currentRoute = this.$route;

        return currentRoute.meta && currentRoute.meta.keepAlive;
      },
      // whether hiding menu
      hideMenu() {
        const currentRoute = this.$route;

        return currentRoute.meta && currentRoute.meta.hideMenu;
      },
      // the style of main container according by hideMenu
      mainStyle() {
        return {paddingLeft: `${this.hideMenu ? 20 : 240}px`};
      }
    }
  }
</script>

<style scoped lang="less">
  .layout {
    width: 100%;
    height: 100%;

    // header
    .header {
      position: fixed;
      left: 0;
      top: 0;
      z-index: 999;
      width: 100%;
      height: 80px;
    }

    // navigator
    .nav {
      position: fixed;
      left: 0;
      top: 0;
      z-index: 999;
      padding-top: 80px;
      width: 220px;
      height: 100%;
    }

    // main content
    .main {
      height: 100%;
      padding: 100px 20px 20px 240px;
    }

  }
</style>
