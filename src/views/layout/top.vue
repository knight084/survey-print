<template>
  <section class="top">
    <!-- logo -->
    <div class="top-logo">
      <logo/>
    </div>

    <!-- profile -->
    <div class="top-profile">
      <profile/>
    </div>
  </section>
</template>

<script>
  import Logo from './logo';
  import Profile from './profile';

  export default {
    name: 'Top',
    components: {Logo, Profile}
  }
</script>

<style scoped lang="less">
  @import '../../styles/mixin/index.less';

  .top {
    .clear();

    height: 100%;
    background-color: #fff;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, .05);

    // logo
    .top-logo {
      float: left;
      margin: 12px 0 0 30px;
    }

    // profile
    .top-profile {
      float: right;
      margin: 20px 30px 0 0;
    }

  }
</style>
