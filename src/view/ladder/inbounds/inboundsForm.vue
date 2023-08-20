<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="入站规则的id:" prop="bid">
          <el-input v-model.number="formData.bid" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="上行流量:" prop="up">
          <el-input v-model.number="formData.up" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="下行流量:" prop="down">
          <el-input v-model.number="formData.down" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="限制总量:" prop="total">
          <el-input v-model.number="formData.total" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="入站规则名称:" prop="remark">
          <el-input v-model="formData.remark" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="是否启用:" prop="enable">
          <el-switch v-model="formData.enable" active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否" clearable ></el-switch>
        </el-form-item>
        <el-form-item label="过期时间:" prop="expiryTime">
          <el-input v-model.number="formData.expiryTime" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="端口:" prop="port">
          <el-input v-model.number="formData.port" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="协议:" prop="protocol">
          <el-input v-model="formData.protocol" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="基本信息:" prop="settings">
          <el-input v-model="formData.settings" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="其他信息:" prop="streamSettings">
          <el-input v-model="formData.streamSettings" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="默认就行:" prop="sniffing">
          <el-input v-model="formData.sniffing" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="监听IP默认留空:" prop="listen">
          <el-input v-model="formData.listen" :clearable="true" placeholder="请输入" />
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
  name: 'Inbounds'
}
</script>

<script setup>
import {
  createInbounds,
  updateInbounds,
  findInbounds
} from '@/api/inbounds'

// 自动获取字典
import { getDictFunc } from '@/utils/format'
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
const route = useRoute()
const router = useRouter()

const type = ref('')
const formData = ref({
            bid: 0,
            up: 0,
            down: 0,
            total: 0,
            remark: '',
            enable: false,
            expiryTime: 0,
            port: 0,
            protocol: '',
            settings: '',
            streamSettings: '',
            sniffing: '',
            listen: '',
        })
// 验证规则
const rule = reactive({
})

const elFormRef = ref()

// 初始化方法
const init = async () => {
 // 建议通过url传参获取目标数据id 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
    if (route.query.id) {
      const res = await findInbounds({ id: route.query.id })
      if (res.code === 0) {
        formData.value = res.data.reinbounds
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
               res = await createInbounds(formData.value)
               break
             case 'update':
               res = await updateInbounds(formData.value)
               break
             default:
               res = await createInbounds(formData.value)
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
