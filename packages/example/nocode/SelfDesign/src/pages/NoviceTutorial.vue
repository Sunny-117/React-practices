<template>
  <div class="w">
    <div class="title">
      <div class="w1000_flex">
        <div class="title_left">
          <div>
            <strong>SelfDeign</strong>
          </div>
          <div>零代码设计平台</div>
          <div>快速创建属于你的网页</div>
        </div>
        <div class="title_right">
          <img src="/img/course/1.png" alt="1" />
        </div>
      </div>
    </div>
    <div class="info">
      <div class="w1000_flex">
        <div class="info_left">
          <img src="/img/course/2.png" alt="2" />
        </div>
        <div class="info_right">
          <div>随意拼接</div>
          <div>轻调外观</div>
          <div>轻松拖拽</div>
          <div>只需几分钟，即可生成展示网页</div>
        </div>
      </div>
    </div>
    <div class="video">
			<iframe 
				src="//player.bilibili.com/player.html?aid=681404924&bvid=BV1HS4y1G7P3&cid=505273556&page=1" 
				scrolling="no" 
				border="0" 
				frameborder="no" 
				framespacing="0" 
				allowfullscreen="true"
				class="v"
			> </iframe>
    </div>
    <div class="go">
      <div class="text">
        快来创建<br />
        一个属于你的网页吧
      </div>
      <div>
        <div class="btn" @click="go">立即使用</div>
      </div>
    </div>
    <div class="foot">©2022-SelfDesign</div>
  </div>
</template>
<script setup>
import {useRouter} from 'vue-router';
const router = useRouter();
const go = () => router.push('/project');
</script>
<style lang="scss">
.w1000_flex {
  width: 1000px;
  display: flex;
  justify-content: space-between;
}
.w {
  & > div {
    display: flex;
    justify-content: center;
    padding: 82px 0 72px;
  }
  .title {
    div {
      .title_left {
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 50px;
        div {
          font-family: Book Antiqua;
          // font-weight: bold;
          color: #444444;
          line-height: 60px;
          white-space: nowrap;
        }
      }
      .title_right {
        img {
          width: 370px;
          box-shadow: 0px 3px 24px 1px rgba(0, 0, 0, 0.16);
          border-radius: 24px 64px 256px 0px;
          border: 3px solid #eeeeee;
        }
      }
    }
  }
  .info {
    background-color: #666;
    .info_left {
      img {
        width: 370px;
        box-shadow: 0px 3px 24px 1px rgba(255, 255, 255, 0.36);
        border-radius: 32px 6px 16px 128px;
        opacity: 1;
        border: 2px solid #707070;
      }
    }
    .info_right {
      display: flex;
      position: relative;
      padding-bottom: 30px;
      align-items: flex-end;
      font-size: 34px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
      div:nth-child(1) {
        position: absolute;
        top: 20px;
        left: 173px;
        transform: rotate(14deg);
      }
      div:nth-child(2) {
        position: absolute;
        top: 100px;
        left: 78px;
        transform: rotate(352deg);
      }
      div:nth-child(3) {
        position: absolute;
        top: 160px;
        left: 231px;
        transform: rotate(352deg);
      }
    }
  }
  .video {
    .v {
      width: 1000px;
      height: 600px;
    }
  }
  .go {
    height: 400px;
    align-items: center;
    background: url(/img/course/3.png) no-repeat center/contain;
    .text {
      margin-right: 106px;
      font-size: 42px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #444444;
      white-space: nowrap;
    }
    div {
      .btn {
        display: flex;
        padding: 10px;
        justify-content: center;
        align-items: center;
        font-size: 22px;
        font-weight: bold;
        color: #ffffff;
        background: #4a8af4;
        box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
        cursor: pointer;
      }
    }
  }
  .foot {
    line-height: 12px;
    color: #fff;
    background: #666666;
  }
}
iframe {
  padding-bottom: 10px;
  border-radius: 20px;
  border: 1px solid #666666;
}
</style>
