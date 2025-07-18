<template>
  <div class="customize-content">
    <!-- 标题说明 -->
    <div class="header-section">
      <h2>首页内容管理</h2>
      <p class="description">在这里您可以管理首页显示的游戏信息，包括添加、编辑和删除游戏。</p>
    </div>

    <!-- 添加游戏按钮 -->
    <div class="action-section">
      <el-button type="primary" @click="showAddDialog">
        <i class="el-icon-plus"></i> 添加新游戏
      </el-button>
    </div>

    <!-- 游戏列表 -->
    <div class="games-section">
      <el-card class="games-card">
        <div slot="header" class="clearfix">
          <span>当前游戏列表</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="refreshGames">刷新</el-button>
        </div>
        
        <el-table :data="games" style="width: 100%" v-loading="loading">
          <el-table-column prop="title" label="游戏名称" width="200">
          </el-table-column>
          <el-table-column prop="platform" label="平台" width="120">
          </el-table-column>
          <el-table-column prop="genre" label="类型" width="120">
          </el-table-column>
          <el-table-column prop="rating" label="评分" width="100">
            <template slot-scope="scope">
              <span class="rating-text">{{ scope.row.rating }}/10</span>
            </template>
          </el-table-column>
          <el-table-column prop="description" label="描述" min-width="200">
            <template slot-scope="scope">
              <span class="description-text">{{ scope.row.description }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button size="mini" @click="editGame(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="deleteGame(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="pagination-container">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="pagination.currentPage"
            :page-size="pagination.pageSize"
            :total="pagination.total"
            layout="prev, pager, next, total">
          </el-pagination>
        </div>
      </el-card>
    </div>

    <!-- 添加/编辑游戏对话框 -->
    <el-dialog 
      :title="dialogTitle" 
      :visible.sync="dialogVisible" 
      width="600px"
      @close="resetForm">
      <el-form :model="gameForm" :rules="rules" ref="gameFormRef" label-width="80px">
        <el-form-item label="游戏名称" prop="title">
          <el-input v-model="gameForm.title" placeholder="请输入游戏名称"></el-input>
        </el-form-item>
        <el-form-item label="游戏平台" prop="platform">
          <el-select v-model="gameForm.platform" placeholder="请选择游戏平台" style="width: 100%">
            <el-option label="PC" value="PC"></el-option>
            <el-option label="PlayStation 5" value="PlayStation 5"></el-option>
            <el-option label="Xbox Series X/S" value="Xbox Series X/S"></el-option>
            <el-option label="Nintendo Switch" value="Nintendo Switch"></el-option>
            <el-option label="移动端" value="移动端"></el-option>
            <el-option label="多平台" value="多平台"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="游戏类型" prop="genre">
          <el-select v-model="gameForm.genre" placeholder="请选择游戏类型" style="width: 100%">
            <el-option label="动作" value="动作"></el-option>
            <el-option label="冒险" value="冒险"></el-option>
            <el-option label="角色扮演" value="角色扮演"></el-option>
            <el-option label="策略" value="策略"></el-option>
            <el-option label="射击" value="射击"></el-option>
            <el-option label="竞速" value="竞速"></el-option>
            <el-option label="体育" value="体育"></el-option>
            <el-option label="模拟" value="模拟"></el-option>
            <el-option label="益智" value="益智"></el-option>
            <el-option label="独立" value="独立"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="游戏评分" prop="rating">
          <el-input-number 
            v-model="gameForm.rating" 
            :min="0" 
            :max="10" 
            :step="0.1" 
            :precision="1"
            placeholder="0.0-10.0"
            style="width: 100%">
          </el-input-number>
        </el-form-item>
        <el-form-item label="游戏描述" prop="description">
          <el-input 
            type="textarea" 
            v-model="gameForm.description" 
            :rows="4"
            placeholder="请输入游戏描述">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveGame" :loading="saveLoading">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getGamesByPage, addGame, updateGame, deleteGame } from '@/api/gameAPI'

export default {
  name: 'Customize',
  data() {
    return {
      // 游戏列表数据
      games: [],
      loading: false,
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      
      // 对话框相关
      dialogVisible: false,
      dialogTitle: '添加游戏',
      saveLoading: false,
      isEdit: false,
      
      // 表单数据
      gameForm: {
        id: null,
        title: '',
        platform: '',
        genre: '',
        rating: 0,
        description: ''
      },
      
      // 表单验证规则
      rules: {
        title: [
          { required: true, message: '请输入游戏名称', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ],
        platform: [
          { required: true, message: '请选择游戏平台', trigger: 'change' }
        ],
        genre: [
          { required: true, message: '请选择游戏类型', trigger: 'change' }
        ],
        rating: [
          { required: true, message: '请输入游戏评分', trigger: 'blur' },
          { type: 'number', min: 0, max: 10, message: '评分必须在0-10之间', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入游戏描述', trigger: 'blur' },
          { min: 10, max: 500, message: '长度在 10 到 500 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 获取游戏列表
    async getGames() {
      this.loading = true
      try {
        const { data: res } = await getGamesByPage(this.pagination.currentPage, this.pagination.pageSize)
        if (res.code === 200) {
          this.games = res.data.games
          this.pagination.total = res.data.total
        } else {
          this.$message.error(res.message || '获取游戏列表失败')
        }
      } catch (error) {
        this.$message.error('网络错误，请稍后重试')
      } finally {
        this.loading = false
      }
    },
    
    // 刷新游戏列表
    refreshGames() {
      this.getGames()
    },
    
    // 分页切换
    handleCurrentChange(page) {
      this.pagination.currentPage = page
      this.getGames()
    },
    
    // 显示添加对话框
    showAddDialog() {
      this.dialogTitle = '添加游戏'
      this.isEdit = false
      this.dialogVisible = true
      this.resetGameForm()
    },
    
    // 编辑游戏
    editGame(game) {
      this.dialogTitle = '编辑游戏'
      this.isEdit = true
      this.dialogVisible = true
      this.gameForm = { ...game }
    },
    
    // 删除游戏
    deleteGame(game) {
      this.$confirm(`确定要删除游戏 "${game.title}" 吗？`, '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const { data: res } = await deleteGame(game.id)
          if (res.code === 200) {
            this.$message.success('删除成功')
            this.getGames()
          } else {
            this.$message.error(res.message || '删除失败')
          }
        } catch (error) {
          this.$message.error('网络错误，请稍后重试')
        }
      }).catch(() => {
        // 用户取消删除
      })
    },
    
    // 保存游戏
    saveGame() {
      this.$refs.gameFormRef.validate(async (valid) => {
        if (valid) {
          this.saveLoading = true
          try {
            let res
            if (this.isEdit) {
              // 编辑模式
              res = await updateGame(this.gameForm.id, this.gameForm)
            } else {
              // 添加模式
              res = await addGame(this.gameForm)
            }
            
            if (res.data.code === 200) {
              this.$message.success(this.isEdit ? '编辑成功' : '添加成功')
              this.dialogVisible = false
              this.getGames()
            } else {
              this.$message.error(res.data.message || '操作失败')
            }
          } catch (error) {
            this.$message.error('网络错误，请稍后重试')
          } finally {
            this.saveLoading = false
          }
        }
      })
    },
    
    // 重置表单
    resetForm() {
      if (this.$refs.gameFormRef) {
        this.$refs.gameFormRef.resetFields()
      }
      this.resetGameForm()
    },
    
    // 重置游戏表单数据
    resetGameForm() {
      this.gameForm = {
        id: null,
        title: '',
        platform: '',
        genre: '',
        rating: 0,
        description: ''
      }
    }
  },
  created() {
    this.getGames()
  }
}
</script>

<style lang="scss" scoped>
.customize-content {
  margin-top: 60px;
  padding: 0 20px;
  
  .header-section {
    text-align: center;
    margin-bottom: 30px;
    
    h2 {
      color: #2c3e50;
      margin-bottom: 10px;
    }
    
    .description {
      color: #7f8c8d;
      font-size: 14px;
    }
  }
  
  .action-section {
    text-align: right;
    margin-bottom: 20px;
  }
  
  .games-section {
    .games-card {
      .rating-text {
        color: #007bff;
        font-weight: 600;
      }
      
      .description-text {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      .pagination-container {
        margin-top: 20px;
        text-align: center;
      }
    }
  }
  
  .dialog-footer {
    text-align: right;
  }
}
</style>