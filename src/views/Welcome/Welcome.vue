<template>
  <div class="welcome-content">
    <!-- 头部 -->
    <div>
      <top></top>
    </div>
    <!-- 主体 -->
    <el-main class="home-main-body">
      <!-- 如果不希望首页每次都刷新数据，可以改为： -->
      <!-- <keep-alive exclude="GameIndex"> -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </el-main>
    <!-- 底部备案 -->
    <bottom></bottom>
  </div>
</template>

<script>
import Top from '@/components/reception/Top.vue'
import Bottom from '@/components/reception/Bottom.vue'
export default {
  components: { Top, Bottom }
}
</script>

<style lang='scss' scope>
.welcome-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: 100%;
  background-size: cover;
  background-color: #dfe6e9;
}
</style>