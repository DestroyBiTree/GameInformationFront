<template>
  <div class="game-content" @click="gotoDetail">
    <div class="title">游戏名称：{{game.title}}</div>
    <div class="platform">游戏平台：{{game.platform}}</div>
    <div class="genre">游戏类型：{{game.genre}}</div>
    <div class="rating">评分：{{game.rating}}/10</div>
    <div class="description">游戏描述：{{game.description}}</div>
  </div>
</template>

<script>
export default {
  name: 'Game',
  props: {
    game: {
      required: true,
      type: Object
    }
  },
  methods: {
    gotoDetail() {
      const { href } = this.$router.resolve({ path: '/detail', query: { id: this.game.id, title: this.game.title } })
      window.open(href, '_blank')
    }
  }
}
</script>

<style lang='scss' scoped>
.game-content {
  cursor: pointer;
  padding: 15px;
  .title {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 10px 0 20px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .platform, .genre, .rating {
    font-size: 1rem;
    margin: 10px 0;
  }
  .rating {
    font-weight: 600;
    color: #007bff;
  }
  .description {
    font-size: 1rem;
    margin: 10px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style> 