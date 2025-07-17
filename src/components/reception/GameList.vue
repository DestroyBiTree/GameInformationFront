<template>
  <div :style="{width:width}" class="games-card-content">
    <el-card v-if="games.length!==0" class="games-card">
      <div v-for='item in games' :key="item.id" class="game-item">
        <game :game="item"></game>
      </div>
      <div class="bottom">
        <el-pagination @current-change="currentChange" :current-page="currentPage" :page-size="pageSize" :total="total" class="pagination" background layout="prev, next">
        </el-pagination>
      </div>
    </el-card>
    <el-card v-else class="games-card">
      <el-empty description="暂无游戏数据"></el-empty>
    </el-card>
  </div>
</template>

<script>
import Game from './Game.vue'
export default {
  components: { Game },
  name: 'gamesList',
  props: {
    games: {
      required: true,
      type: Array
    },
    total: {
      required: true,
      type: Number
    },
    currentPage: {
      required: true,
      type: Number
    },
    pageSize: {
      required: true,
      type: Number
    },
    width: {
      default: '80%',
      type: String
    }
  },
  methods: {
    currentChange(currentPage) {
      this.$emit('current-change', currentPage)
    }
  }
}
</script>

<style lang='scss' scoped>
.games-card {
  .bottom {
    height: 2.1875rem;
    position: relative;
    .pagination {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%);
    }
  }
  
  .game-item {
    border-bottom: 1px solid #f0f0f0;
    &:last-child {
      border-bottom: none;
    }
  }
}
</style> 