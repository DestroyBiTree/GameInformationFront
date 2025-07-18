<template>
  <div class="index-content">
    <!-- 游戏列表 -->
    <game-list :games="games" :currentPage="this.pagination.currentPage" :pageSize="this.pagination.pageSize" :total="this.pagination.total" v-on:current-change="handleCurrentChange"></game-list>
  </div>
</template>

<script>
import GameList from './GameList.vue'
import { getGamesByPage } from '@/api/gameAPI'
export default {
  components: { GameList },
  name: 'GameIndex',
  data() {
    return {
      // 游戏列表
      games: [],
      pagination: {
        currentPage: 1,
        pageSize: 7,
        total: 0
      }
    }
  },
  methods: {
    async getGamesByPageData() {
      const { data: res } = await getGamesByPage(this.pagination.currentPage, this.pagination.pageSize)
      this.games = res.data.games
      this.pagination.total = res.data.total
    },
    handleCurrentChange(currentPage) {
      this.pagination.currentPage = currentPage
      this.getGamesByPageData()
    }
  },
  created() {
    this.getGamesByPageData()
  },
  // 当组件被keep-alive缓存后重新激活时，重新获取数据
  activated() {
    this.getGamesByPageData()
  }
}
</script>

<style lang='scss' scoped>
.index-content {
  margin-top: 60px;
  display: flex;
  justify-content: space-evenly;
}
</style>