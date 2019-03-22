<template>
  <!-- side menu -->
  <aside class="side">
    <Menu ref="menu"
          class="menu"
          theme="dark"
          width="220"
          accordion
          :open-names="openedMenuNames"
          :active-name="activatedMenuName"
          @on-select="handleMenuSelect">
      <template v-for="menu in mappedMenuTree">
        <!-- has submenu -->
        <Submenu v-if="menu._children && menu._children.length"
                 :name="menu.name"
                 :key="menu.name">
          <!-- menu title -->
          <template slot="title">
          <span class="iconfont"
                :class="`icon-${menu.icon}`"></span>{{menu.title}}
          </template>

          <!-- submenu-item -->
          <template v-for="submenu in menu._children">
            <MenuItem :name="submenu.name"
                      :key="submenu.name">
            <span class="iconfont"
                  :class="`icon-${submenu.icon}`"></span>{{submenu.title}}
            </MenuItem>
          </template>
        </Submenu>

        <!-- don't has submenu-->
        <MenuItem v-else
                  :name="menu.name"
                  :key="menu.name">
        <span class="iconfont"
              :class="`icon-${menu.icon}`"></span>{{menu.title}}
        </MenuItem>
      </template>
    </Menu>
  </aside>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    name: "Side",
    computed: {
      ...mapState([
        'menuTree',
        'activatedName',
        'openedNames'
      ]),

      // menu-tree mapped according to the role
      mappedMenuTree() {
        return this.menuTree ? JSON.parse(JSON.stringify(this.menuTree)) : [];

      },
      // current opened menu names
      openedMenuNames() {
        return this.openedNames || [];

      },
      // current activated menu name, default is 'login'
      activatedMenuName() {
        return this.activatedName || 'login';

      }
    },
    watch: {
      openedMenuNames() {
        this.$nextTick(() => {
          this.$refs.menu.updateOpened();
        });

      },
      activatedMenuName() {
        this.$nextTick(() => {
          this.$refs.menu.updateActiveName();
        });

      }
    },
    methods: {
      handleMenuSelect(name) {
        this.$router.push({name});

      }
    }
  };
</script>

<style lang="less">
  .side {
    height: 100%;

    .menu.ivu-menu-dark.ivu-menu-vertical {
      height: 100%;
      background: #181924;
      font-size: 18px;

      // menu item
      .ivu-menu-submenu {

        // opened menu item
        &.ivu-menu-opened {

          // menu title
          .ivu-menu-submenu-title {
            background: #232431;
            color: #F79300;
          }

          // submenu list
          .ivu-menu {
            background-color: #2D2F3F;
          }

        }

        &.ivu-menu-item-active.ivu-menu-child-item-active {

          .ivu-menu-submenu-title {
            background: #232431;
            color: #F79300;
          }

        }

        // menu title
        .ivu-menu-submenu-title {
          color: #61637F;

          &:hover {
            background: #232431;
            color: #F79300;
          }

          .iconfont {
            float: left;
            margin-top: 2px;
            margin-right: 8px;

            &.icon-fujian {
              margin-left: -3px;
              margin-right: 5px;
            }

          }

        }

        // submenu item
        .ivu-menu-item {
          font-size: 16px;
          color: #61637F;

          &:hover {
            background: #232431;
            color: #fff;
          }

          .iconfont {
            float: left;
            margin-right: 8px;
          }

        }

        // submenu item activated
        .ivu-menu-item-active,
        .ivu-menu-item-active:hover {
          color: #fff;
        }

      }

    }

  }
</style>
