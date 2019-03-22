<template>
  <section class="profile">
    <!-- user -->
    <div class="profile-user">
      <Dropdown trigger="click">
        <a class="operator-link"
           href="javascript:">
          <p class="link-username">{{username}}</p>
          <p class="link-role">{{role}}</p>
          <Icon class="link-icon"
                type="ios-arrow-down"
                size="18"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem @click.native="handleLogout">注 销</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>

    <!-- avatar -->
    <div class="profile-avatar">{{firstName}}</div>
  </section>
</template>

<script>
  import {Modal} from 'iview';
  import utils from '../../utils';

  export default {
    name: 'Profile',
    data() {
      return {
        profile: null
      };
    },
    computed: {
      username() {
        return this.profile ? this.profile.name : '';
      },
      role() {
        return this.profile ? this.profile.role : '';
      },
      firstName() {
        return this.profile ? this.profile.name[0] : '';
      }
    },
    methods: {
      handleLogout() {
        Modal.confirm({
          title: '确认',
          content: '确定要注销吗？',
          onOk: () => {
            // clear token
            utils.sessionStorage.remove('token');

            // clear profile
            utils.sessionStorage.remove('profile');

            // redirect to login
            this.$router.push({name: 'login'});
          }
        });
      }
    },
    created() {
      this.profile = utils.sessionStorage.get('profile');
    }
  }
</script>

<style scoped lang="less">
  @import '../../styles/mixin/index.less';

  .profile {
    .clear();

    height: 100%;

    // user & avatar
    .profile-user,
    .profile-avatar {
      float: right;
    }

    // user
    .profile-user {

      .operator-link {
        color: inherit;

        // username &role
        .link-username,
        .link-role {
          height: 20px;
          line-height: 20px;
          padding: 0 35px 0 12px;
        }

        // username
        .link-username {
          font-size: 14px;
          color: #333;
        }

        // role
        .link-role {
          color: #666;
        }

        // icon
        .link-icon {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }

      }

      // adjust background-color
      .ivu-dropdown-item:hover {
        background-color: #f79300;
      }

    }

    .profile-avatar {
      display: inline-block;
      width: 40px;
      height: 40px;
      line-height: 40px;
      border-radius: 50%;
      background-color: #f79300;
      font-size: 18px;
      color: #fff;
      text-align: center;
    }

  }

</style>
