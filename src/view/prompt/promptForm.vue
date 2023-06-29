<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="提示词名称:" prop="name">
          <el-input v-model="formData.name" :clearable="false" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="提示词描述:" prop="description">
          <el-input v-model="formData.description" :clearable="true" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="提示词价格:" prop="useFee">
          <el-input v-model.number="formData.useFee" :clearable="false" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="提示词内容:" prop="content">
          <el-input v-model="formData.content" :clearable="true" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="是否分享:" prop="isShare">
          <el-select v-model="formData.isShare" placeholder="请选择" :clearable="true">
            <el-option v-for="(item,key) in isShareOptions" :key="key" :label="item.label" :value="item.value" />
          </el-select>
       </el-form-item>
        <el-form-item label="快捷键:" prop="shortcut_key">
          <el-input v-model="formData.shortcut_key" :clearable="true" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="类别分类:" prop="category">
          <el-select v-model="formData.category" placeholder="请选择" :clearable="true">
            <el-option v-for="(item,key) in promptCategoryOptions" :key="key" :label="item.label" :value="item.value" />
          </el-select>
       </el-form-item>
        <el-form-item label="使用时间:" prop="useDuration">
          <el-input v-model.number="formData.useDuration" :clearable="true" placeholder="请输入" />
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
  name: 'Prompt'
}
</script>

<script setup>
import {
  createPrompt,
  updatePrompt,
  findPrompt
} from '@/api/prompt'

// 自动获取字典
import { getDictFunc } from '@/utils/format'
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
const route = useRoute()
const router = useRouter()

const type = ref('')
const isShareOptions = ref([])
const promptCategoryOptions = ref([])
const formData = ref({
            name: '',
            description: '',
            useFee: 0,
            content: '',
            isShare: undefined,
            shortcut_key: '',
            category: undefined,
            useDuration: 0,
        })
// 验证规则
const rule = reactive({
               name : [{
                   required: true,
                   message: '提示词名称不能为空',
                   trigger: ['input','blur'],
               }],
               useFee : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
               content : [{
                   required: true,
                   message: '提示词内容不能为空',
                   trigger: ['input','blur'],
               }],
               isShare : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
               category : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
               useDuration : [{
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
      const res = await findPrompt({ ID: route.query.id })
      if (res.code === 0) {
        formData.value = res.data.reprompt
        type.value = 'update'
      }
    } else {
      type.value = 'create'
    }
    isShareOptions.value = await getDictFunc('isShare')
    promptCategoryOptions.value = await getDictFunc('promptCategory')
}

init()
// 保存按钮
const save = async() => {
      elFormRef.value?.validate( async (valid) => {
         if (!valid) return
            let res
           switch (type.value) {
             case 'create':
               res = await createPrompt(formData.value)
               break
             case 'update':
               res = await updatePrompt(formData.value)
               break
             default:
               res = await createPrompt(formData.value)
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
