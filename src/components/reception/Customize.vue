<template>
  <div class="customize-content">
    <!-- 提示 -->
    <div class="tip">
      <p>{{msg}}</p>
    </div>
    <!-- 表格 -->
    <el-card class="form-card">
      <div slot="header" class="clearfix">
        <span>游戏推荐咨询</span>
      </div>
      <el-form ref="formData" :rules="rules" :model="formData">
        <el-form-item prop="content">
          <el-input class="textarea-input" ref="textarea" type="textarea" :autosize="{ minRows: 4}" placeholder="例如：我喜欢开放世界的冒险游戏，有什么好推荐吗？或者：我想找一些适合Switch平台的多人游戏，有什么建议？" resize="none" v-model.trim="formData.content">
          </el-input>
        </el-form-item>
        <div class="form">
          <el-button type="primary" @click="addQuestion('formData')">提交</el-button>
          <el-button @click="resetForm('formData')">重置</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addQuestionAPI } from '@/api/question'
export default {
  name: 'Customize',
  data() {
    return {
      msg: '根据您的游戏喜好和需求，我们将为您推荐适合的游戏，具体回复可以在 "我的游戏记录-操作-推荐咨询" 中进行查看',
      formData: {
        userID: this.$store.state.userInfo.userID,
        content: ''
      },
      rules: {
        content: { required: true, message: '咨询内容不能为空哦，亲~', trigger: 'blur' }
      }
    }
  },
  methods: {
    addQuestion(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const { data: res } = await addQuestionAPI(this.formData)
          if (res.code !== 200) return this.$message({ message: res.msg, type: 'error' })
          this.$message({ message: res.msg, type: 'success' })
          this.resetForm(formName)
        } else {
          this.$message({ message: '请填写正确的信息', type: 'error' })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.customize-content {
  margin-top: 60px;
  .tip {
    width: 80%;
    margin: auto;
    padding: 8px 16px;
    background-color: #ecf8ff;
    border-radius: 4px;
    border-left: 5px solid #50bfff;
    p {
      font-size: 14px;
      color: #5e6d82;
      line-height: 1.5em;
    }
  }
  .form-card {
    width: 80%;
    margin: 20px auto;
  }
}
</style>