<template>
  <div class="detail-content" v-title :data-title='this.$route.query.title'>
    <!-- 内容 -->
    <el-card class="game-box">
      <div class="game-title-box" id="title">{{game.title}}</div>
      <div class="game-platform-box item">游戏平台：{{game.platform}}</div>
      <div class="game-genre-box item">游戏类型：{{game.genre}}</div>
      <div class="game-rating-box item">评分：{{game.rating}}/10</div>
      <hr>
      <div class="game-description-box item" ref="game" v-html="game.description"></div>
    </el-card>
    <!-- 跳转 -->
    <a href="#title" class="top">↑</a>
  </div>
</template>

<script>
import { getGameById } from '@/api/gameAPI'
export default {
  name: 'GameDetail',
  data() {
    return {
      game: {}
    }
  },
  methods: {
    async getGameByIdData(id) {
      const { data: res } = await getGameById(id)
      this.game = res.data
    }
  },
  created() {
    this.getGameByIdData(this.$route.query.id)
  }
}
</script>

<style lang='scss' scoped>
.detail-content {
  margin-top: 60px;
  word-wrap: break-word;
  .game-box {
    width: 80%;
    margin: auto;
    .game-title-box {
      text-align: center;
      padding: 20px;
      font-size: 26px;
      color: #007bff;
      font-weight: bold;
    }
    .item {
      padding: 0.625rem;
      font-size: 1.125rem;
    }
    .game-rating-box {
      color: #007bff;
      font-weight: 600;
    }
  }
  .top {
    position: fixed;
    bottom: 50px;
    right: 50px;
    display: block;
    width: 3.125rem;
    height: 3.125rem;
    background-color: rgba($color: #1e293b, $alpha: 0.8);
    text-align: center;
    line-height: 3.125rem;
    border-radius: 50%;
    text-decoration: none;
    color: #fff;
  }
  a {
    color: #fff;
    font-weight: 700;
  }
}
</style>