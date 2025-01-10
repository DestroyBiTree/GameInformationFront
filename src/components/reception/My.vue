<template>
  <div class="my-content">
    <!-- 信息部分 -->
    <el-card class="user-info">
      <el-descriptions class="margin-top" title="我的信息" :column="3" border>
        <template slot="extra">
          <el-button type="primary" size="small" @click="updateUserInfo"
            >修改</el-button
          >
        </template>
        <el-descriptions-item>
          <template slot="label"><i class="el-icon-user"></i>用户名</template>
          {{ userInfo.username }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"
            ><i class="el-icon-mobile-phone"></i>手机号</template
          >
          功能开发中...
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"
            ><i class="el-icon-location-outline"></i>居住地</template
          >
          功能开发中...
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"><i class="el-icon-tickets"></i>身份</template>
          <el-tag size="small">{{ userInfo.identity }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label"
            ><i class="el-icon-office-building"></i>联系地址</template
          >
          功能开发中...
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <input type="text" v-model="inputValue" placeholder="请输入内容" />
            <button @click="searchDiscount">查询折扣</button>
          </template>
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <input type="text" v-model="userId" placeholder="请输入内容" />
            <button @click="searchDiscountById">查询折扣</button>
          </template>
        </el-descriptions-item>

      </el-descriptions>
    </el-card>
    <!-- 操作部分 -->
    <el-card class="edit">
      <div class="el-descriptions__header">
        <div class="el-descriptions__title">操作</div>
      </div>
      <div class="main">
        <el-tag class="item" @click="logout">退出登录</el-tag>
        <el-tag class="item" @click="toQuestionDetail">定制</el-tag>
      </div>
    </el-card>
  </div>
</template>

<script>
import { discountAPI } from "@/api/discountAPI";
import { discountByIdAPI } from "@/api/discountAPI";
export default {
  name: "My",
  data() {
    return {
      userInfo: this.$store.state.userInfo,
      inputValue: "",
      userId: ""
    };
  },
  methods: {
    async searchDiscount() {
      try {
        // 假设这里的参数 userName 你从某个地方获取，比如用户输入框等，此处先简单写个固定值示例
        const userName = this.inputValue;
        const response = await discountAPI(userName);
        // 一般后端接口返回的数据结构可能有 data 属性包含实际数据，这里根据实际情况调整
        this.discountList = response.data;
      } catch (error) {
        console.error("查询折扣信息出错:", error);
        // 可以在这里添加相应的提示给用户，比如使用 UI 框架的提示组件显示错误消息等
      }
    },
    async searchDiscountById() {
      try {
        const userId = this.userId;
        const response = await discountByIdAPI(userId);
        this.discountList = response.data;
      } catch (error) {
        console.error("查询折扣信息出错:", error);
      }
    },

    // 修改用户信息
    updateUserInfo() {
      // TODO后面实现
      this.$message("功能开发中，敬请期待...");
    },
    // 去用户的提问详情页
    toQuestionDetail() {
      const { href } = this.$router.resolve("/questiondetail");
      window.open(href, "_blank");
    },
    // 退出登录
    logout() {
      localStorage.setItem("state", JSON.stringify({}));
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scope>
.my-content {
  margin-top: 60px;
  .user-info,
  .edit {
    width: 80%;
    margin: 0.9375rem auto;
    .item {
      cursor: pointer;
      margin: 0 0.625rem;
    }
  }
}
</style>
