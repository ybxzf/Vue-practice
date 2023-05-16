<template>
  <div class="container">
    <div class="sidebar">
      <!-- 左边固定200px -->
      <p>Sidebar content goes here.</p>
    </div>
    <div class="content">
      <!-- 右边自适应 -->
      <p>Main content goes here.</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
  /* container为外层包裹元素 */
  .container {
    width: 100%;
    overflow: hidden;
  }

  /* 左侧固定宽度200px */
  .sidebar {
    float: left;
    width: 200px;
    height: 100%;
  }

  /* 右侧自适应 */
  .content {
    margin-left: 200px; /* 设置左边栏的宽度 */
    height: 100%;
    overflow: auto; /* 当右边内容超出容器高度时，自动添加滚动条 */
  }
</style>