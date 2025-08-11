<template>
  <div class="weather-config-content">
    <!-- 标题说明 -->
    <div class="header-section">
      <h2>天气配置管理</h2>
      <p class="description">在这里您可以管理天气配置信息，包括看板ID、地区代码、发送频率和API密钥。</p>
    </div>

    <!-- 天气配置列表 -->
    <div class="weather-config-section">
      <el-card class="weather-config-card">
        <div slot="header" class="clearfix">
          <span>天气配置列表</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="refreshWeatherConfigs">刷新</el-button>
        </div>

        <el-table :data="weatherConfigs" style="width: 100%" v-loading="loading">
          <el-table-column prop="id" label="ID" width="80"></el-table-column>
          <el-table-column prop="boardId" label="看板ID" width="180"></el-table-column>
          <el-table-column prop="localCode" label="地区代码" width="200"></el-table-column>
          <el-table-column prop="sendingFrequency" label="发送频率" width="120"></el-table-column>
          <el-table-column prop="apiKey" label="api密钥" width="120"></el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button size="mini" @click="editWeatherConfig(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <!-- 编辑天气配置对话框 -->
    <el-dialog 
      title="编辑天气配置"
      :visible.sync="dialogVisible"
      width="500px">
      <el-form :model="tempForm" :rules="rules" ref="weatherConfigFormRef" label-width="120px">
        <el-form-item label="地区代码" prop="localCode">
          <el-input v-model="tempForm.localCode" placeholder="请输入地区代码"></el-input>
        </el-form-item>
        <el-form-item label="发送频率" prop="sendingFrequency">
          <el-input-number 
            v-model="tempForm.sendingFrequency"
            :min="0"
            :step="1"
            placeholder="请输入发送频率"
            style="width: 100%">
          </el-input-number>
        </el-form-item>
        <el-form-item label="API密钥" prop="apiKey">
          <el-input v-model="tempForm.apiKey" placeholder="请输入API密钥"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveWeatherConfig" :loading="saveLoading">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getWeatherConfigs, updateWeatherConfig } from '@/api/weatherConfigAPI'

export default {
  name: 'WeatherConfig',
  data() {
    return {
      // 天气配置列表数据
      weatherConfigs: [],
      loading: false,
      saveLoading: false,
      dialogVisible: false,

      // 使用独立的临时表单数据，避免直接修改源数据
      tempForm: {
        id: null,
        boardId: '',
        localCode: '',
        sendingFrequency: 0,
        apiKey: ''
      },

      // 表单验证规则
      rules: {
        localCode: [
          { required: true, message: '请输入地区代码', trigger: 'blur' },
          { validator: (rule, value, callback) => {
              if (value === '' || value === null || value === undefined) {
                callback(new Error('请输入地区代码'));
              } else if (isNaN(Number(value))) {
                callback(new Error('必须是数字'));
              } else {
                callback();
              }
            }, trigger: 'blur' }
        ],
        sendingFrequency: [
          { required: true, message: '请输入发送频率', trigger: 'blur' },
          { type: 'number', min: 0, message: '必须是非负整数', trigger: 'blur' }
        ],
        apiKey: [
          { required: true, message: '请输入API密钥', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 获取天气配置列表
    async getWeatherConfigs() {
      this.loading = true
      try {
        const { data: res } = await getWeatherConfigs()
        if (res.code === 200) {
          this.weatherConfigs = res.data
        } else {
          this.$message.error(res.message || '获取天气配置列表失败')
        }
      } catch (error) {
        this.$message.error('网络错误，请稍后重试')
      } finally {
        this.loading = false
      }
    },

    // 刷新天气配置列表
    refreshWeatherConfigs() {
      this.getWeatherConfigs()
    },

    // 编辑天气配置 - 使用深拷贝初始化临时表单
    editWeatherConfig(row) {
      // 深拷贝确保不影响原始数据
      this.tempForm = JSON.parse(JSON.stringify(row))
      this.dialogVisible = true
    },

    // 保存天气配置
    async saveWeatherConfig() {
      this.$refs.weatherConfigFormRef.validate(async (valid) => {
        if (valid) {
          // 确保数字字段转为数字类型
          const formData = {
            ...this.tempForm,
            boardId: Number(this.tempForm.boardId),
            localCode: Number(this.tempForm.localCode),
            sendingFrequency: Number(this.tempForm.sendingFrequency)
          }
          
          this.saveLoading = true
          try {
            const { data: res } = await updateWeatherConfig(formData)
            if (res.code === 200) {
              this.$message.success('保存成功')
              // 保存成功后更新列表中的对应项
              const index = this.weatherConfigs.findIndex(item => item.id === formData.id)
              if (index !== -1) {
                this.weatherConfigs.splice(index, 1, { ...formData })
              }
              this.dialogVisible = false
            } else {
              this.$message.error(res.message || '保存失败')
            }
          } catch (error) {
            this.$message.error('网络错误，请稍后重试')
          } finally {
            this.saveLoading = false
          }
        }
      })
    }
  },
  created() {
    this.getWeatherConfigs()
  }
}
</script>

<style lang="scss" scope>
.weather-config-content {
  margin-top: 60px;
  .header-section {
    text-align: center;
    margin-bottom: 20px;
    h2 {
      font-size: 24px;
      color: #333;
    }
    .description {
      color: #666;
      margin-top: 10px;
    }
  }
  .weather-config-section {
    width: 90%;
    margin: 0 auto;
  }
}
</style>
    