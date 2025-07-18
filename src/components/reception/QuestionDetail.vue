<template>
  <div
    class="question-detail-content"
    v-infinite-scroll="loadMoreQuestions"
    infinite-scroll-distance="5"
  >
    <el-card v-for="question in displayQuestions" :key="question.id" class="item">
      <div class="el-descriptions__header">
        <div class="el-descriptions__title">问题： {{ question.content }}</div>
      </div>
      <div v-if="question.answered === 0" class="unreplay">
        我们会尽快回复哒，请耐心等待
      </div>
      <div
        v-if="question.answered === 1"
        class="replay"
        @click="gotoDetail(question)"
      >
        点我查看推荐游戏
      </div>
    </el-card>
    <div v-if="displayQuestions.length === 0" class="no-data">
      <el-empty description="暂无问题数据"></el-empty>
    </div>
  </div>
</template>

<script>
import { getQuestionsByUserIdAPI } from "@/api/question";
export default {
  name: "QuestionDetail",
  data() {
    return {
      allQuestions: [], // 所有问题
      displayQuestions: [], // 当前显示的问题
      userID: this.$store.state.userInfo.userID,
      pagination: {
        currentPage: 0,
        pageSize: 3,
        total: 0,
      },
    };
  },
  methods: {
    async getUserQuestions() {
      try {
        const { data: res } = await getQuestionsByUserIdAPI(this.userID);
        if (res.code !== 200) {
          this.$message({ message: res.msg, type: "error" });
          return;
        }
        this.allQuestions = res.data || [];
        this.pagination.total = this.allQuestions.length;
        this.loadMoreQuestions();
      } catch (error) {
        this.$message({ message: "获取问题列表失败", type: "error" });
      }
    },
    loadMoreQuestions() {
      // 判断还有没有数据
      const maxPage = Math.ceil(this.pagination.total / this.pagination.pageSize);
      if (this.pagination.currentPage >= maxPage) return;
      
      // 当前页面 +1
      this.pagination.currentPage++;
      
      // 计算当前页面应该显示的数据
      const startIndex = (this.pagination.currentPage - 1) * this.pagination.pageSize;
      const endIndex = startIndex + this.pagination.pageSize;
      const newQuestions = this.allQuestions.slice(startIndex, endIndex);
      
      this.displayQuestions.push(...newQuestions);
    },
    gotoDetail(question) {
      // 这里需要根据实际的数据结构调整，可能需要查询对应的推荐游戏
      if (question.answer && question.answer.id) {
        this.$router.push({
          path: "/detail",
          query: { id: question.answer.id, title: question.answer.title },
        });
      } else {
        this.$message({ message: "暂无对应的推荐游戏", type: "info" });
      }
    },
  },
  created() {
    this.getUserQuestions();
  },
};
</script>

<style lang="scss" scope>
.question-detail-content {
  overflow: auto;
  width: 80%;
  height: 90vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .item {
    margin: 1.25rem;
    .replay {
      cursor: pointer;
      color: #409eff;
    }
    .unreplay {
      color: #ccc;
    }
  }
  .no-data {
    text-align: center;
    margin-top: 2rem;
  }
}
</style>
