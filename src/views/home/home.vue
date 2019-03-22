<template>
  <div class="home">
    <!-- 需要打印的元素 -->
    <div id="print" class="home-print">
      <div class="print-title">从业人员预防性健康检查合格证明</div>
      <div class="print-content">
        <img class="content-avatar" src="../../assets/img/home/avatar.jpg">
        <ul class="content-list">
          <li class="content-item"><span>姓名:</span><span>张三</span></li>
          <li class="content-item"><span>年龄:</span><span>30</span></li>
          <li class="content-item"><span>身份证号:</span><span>420000198901012020</span></li>
          <li class="content-item"><span>编号:</span><span>20190322001</span></li>
          <li class="content-item"><span>有限期止:</span><span>2020年3月22日</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import printJs from 'print-js';

  export default {
    name: 'Home'
  }
</script>

<style scoped lang="less">
  @import '../../styles/mixin/clear.less';

  .home {
    position: relative;
    width: 100%;
    height: 100%;

    .home-print {
      width: 280px;
      padding: 10px;
      background-color: lightblue;

      .print-title {
        font-size: 16px;
        text-align: center;
      }

      .print-content {
        .clear();

        margin-top: 10px;

        .content-avatar {
          float: left;
          width: 60px;
        }

        .content-list {
          float: left;
          margin-left: 15px;
          list-style-type: none;

          .content-item {

            span + span {
              margin-left: 8px;
            }

          }

        }

      }

    }

  }
</style>
