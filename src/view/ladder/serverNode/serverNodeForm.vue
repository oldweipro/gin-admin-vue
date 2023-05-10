<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="服务器名称:" prop="serverName">
          <el-input v-model="formData.serverName" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="服务器主机地址:" prop="serverHost">
          <el-input v-model="formData.serverHost" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="服务器端口:" prop="serverPort">
          <el-input v-model.number="formData.serverPort" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="服务器状态:" prop="serverStatus">
          <el-input v-model.number="formData.serverStatus" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="备注描述:" prop="describe">
          <el-input v-model="formData.describe" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="带宽:" prop="bandwidth">
          <el-input v-model="formData.bandwidth" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="服务器地区:" prop="region">
          <el-input v-model="formData.region" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
          <el-button type="primary" @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServerNode'
}
</script>

<script setup>
import {
  createServerNode,
  updateServerNode,
  findServerNode
} from '@/api/serverNode'

// 自动获取字典
import { getDictFunc } from '@/utils/format'
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
const route = useRoute()
const router = useRouter()

const type = ref('')
const formData = ref({
            serverName: '',
            serverHost: '',
            serverPort: 0,
            serverStatus: 0,
            describe: '',
            bandwidth: '',
            region: '',
        })
// 验证规则
const rule = reactive({
               serverName : [{
                   required: true,
                   message: '服务器节点名称不能为空',
                   trigger: ['input','blur'],
               }],
               serverHost : [{
                   required: true,
                   message: '服务器主机地址不能为空',
                   trigger: ['input','blur'],
               }],
               serverPort : [{
                   required: true,
                   message: '服务器端口不能为空',
                   trigger: ['input','blur'],
               }],
               serverStatus : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
})

const elFormRef = ref()

// 初始化方法
const init = async () => {
 // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
    if (route.query.id) {
      const res = await findServerNode({ ID: route.query.id })
      if (res.code === 0) {
        formData.value = res.data.reserverNode
        type.value = 'update'
      }
    } else {
      type.value = 'create'
    }
}

init()
// 保存按钮
const save = async() => {
      elFormRef.value?.validate( async (valid) => {
         if (!valid) return
            let res
           switch (type.value) {
             case 'create':
               res = await createServerNode(formData.value)
               break
             case 'update':
               res = await updateServerNode(formData.value)
               break
             default:
               res = await createServerNode(formData.value)
               break
           }
           if (res.code === 0) {
             ElMessage({
               type: 'success',
               message: '创建/更改成功'
             })
           }
       })
}

// 返回按钮
const back = () => {
    router.go(-1)
}

</script>

<style>
</style>
