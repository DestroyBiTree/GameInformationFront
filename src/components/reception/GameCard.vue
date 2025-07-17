<template>
  <div class="game-card">
    <div class="title">{{ game.title }}</div>
    <div class="platform">平台：{{ game.platform }}</div>
    <div class="genre">类型：{{ game.genre }}</div>
    <div class="rating">评分：{{ game.rating }}/10</div>
    <div class="description">{{ game.description }}</div>
  </div>
</template>

<script>
export default {
  name: 'GameCard',
  props: {
    game: {
      required: true,
      type: Object
    }
  }
}
</script>

<style lang='scss' scoped>
.game-card {
  cursor: pointer;
  padding: 15px;
  margin: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }
  
  .title {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 10px 0 20px 0;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  
  .platform, .genre, .rating {
    font-size: 1rem;
    margin: 10px 0;
    color: #666;
  }
  
  .rating {
    font-weight: 600;
    color: #007bff;
  }
  
  .description {
    font-size: 0.9rem;
    margin: 10px 0;
    color: #777;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style> 