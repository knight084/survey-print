<template>
  <div class="home">
    <!-- 干扰元素 -->
    <div class="home-print">
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


    <!-- 需要打印的元素 -->
    <div class="home-print"
         ref="print">
      <div class="print-title">从业人员预防性健康检查合格证明</div>
      <div class="print-content">
        <img class="content-avatar"
             :src="testImgUrl">
        <ul class="content-list">
          <li class="content-item name"><span>姓名:</span><span>张三</span></li>
          <li class="content-item"><span>年龄:</span><span>30</span></li>
          <li class="content-item"><span>身份证号:</span><span>420000198901012020</span></li>
          <li class="content-item"><span>编号:</span><span>20190322001</span></li>
          <li class="content-item"><span>有限期止:</span><span>2020年3月22日</span></li>
        </ul>
      </div>
    </div>

    <!-- 打印按钮 -->
    <div class="home-btn">
      <Button class="btn-img"
              type="primary"
              @click="handlePrintImg">打印img
      </Button>
      <!--<Button class="btn-pdf"
              type="primary"
              @click="handlePrintPdf">打印pdf
      </Button>-->
    </div>

    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
  import html2canvas from 'html2canvas';
  import html2pdf from 'html2pdf.js';
  import printJs from 'print-js';

  export default {
    name: 'Home',
    data() {
      return {
        // testImgUrl: 'https://obs-jkgl.obs.cn-north-1.myhuaweicloud.com:443/obs-tjpic/b283c11b-f8e8-4ad8-b7c0-5107cab7fedd.jpg?AccessKeyId=MTK44BF0YO9V8KGMRGF0&Expires=1553858983&Signature=INFiqP%2BreSIqlntqARoRkyeftAU%3D'
        testImgUrl: 'http://img1.xcarimg.com/exp/2872/2875/2937/20101220130509576539.jpg'

      };

    },
    methods: {
      handlePrintImg() {
        this.$nextTick(() => {
          console.log('printImg');
          const printEl = this.$refs.print;

          html2canvas(printEl, {
            logging: false,
            useCORS: true,
            scale: 10
          })
            .then(canvas => {
              canvas.toBlob(blob => {
                const imgUrl = window.URL.createObjectURL(blob);

                printJs({
                  printable: imgUrl,
                  type: 'image',
                  logging: false,
                  onPrintDialogClose: () => {
                    // window.URL.revokeObjectURL(imgUrl);

                  },
                  onError: e => {
                    console.log(e);

                  }
                });


              });

            });

        });

      },
      handlePrintPdf() {
        this.$nextTick(() => {
          console.log('printPdf');

          const printEl = this.$refs.print;

          html2pdf()
            .from(printEl)
            .outputPdf()
            .then(bin => {
              const blob = new Blob([bin], {type: 'application/pdf'});
              const pdfUrl = window.URL.createObjectURL(blob);

              printJs({
                printable: pdfUrl,
                type: 'pdf',
                logging: false,
                onPrintDialogClose: () => {
                  window.URL.revokeObjectURL(pdfUrl);

                },
                onError: e => {
                  console.log(e);

                }
              });

            })
            .catch(e => {
              this.$message.error('失败，请重试！');

              console.error(e);

            });

        });

      }
    },
    mounted() {
      const canvas = document.querySelector('#canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = this.testImgUrl;
      img.crossOrigin = 'Anonymous';

      img.onload = () => {
        console.log('loaded');
        ctx.drawImage(img, 0, 0, 60, 60);

        console.log('custom drawing done');

      };

    }
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

      &:nth-of-type(1) {
        margin-bottom: 100px;
      }

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

    .home-btn {
      width: 280px;
      margin-top: 20px;
      text-align: center;

      .btn-pdf {
        margin-left: 20px;
      }

    }

  }
</style>
