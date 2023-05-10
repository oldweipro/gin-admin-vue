<template>
  <div class="bottom-info">
    <div>
      <span>Powered by</span>
      <span>
        <a href="#">{{ $GIN_VUE_ADMIN.appName }}</a>
      </span>
    </div>
  </div>
</template>

<script>
// 此文件内容为版权信息，如需改动，请联系wx:shouzi_1994购买授权 未授权状态只需保留此代码 不影响任何正常使用
// 项目为apatch协议 请遵守版权协议内容
import $GIN_VUE_ADMIN from '@/core/config'

export default {
  name: 'BottomInfo',
  computed: {
    $GIN_VUE_ADMIN() {
      return $GIN_VUE_ADMIN
    }
  }
}
</script>

<style lang="scss">
.bottom-info {
  color: #888;
  height: 30px;
  line-height: 12px;
  a {
    color: #888;
  }
  div {
    display: flex;
    justify-content: center;
    span{
      margin: 0 3px;
    }
  }
}
</style>
