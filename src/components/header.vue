<template>
  <div id="header">
      <h1 class="title">MarkdownFileSystem</h1>
      <nav class="nav">
        <ul class="menu-group">
          <li class="menu-item"><a href="#">項目1</a></li>
        </ul>
      </nav>
  </div>
</template>

<script>
export default {
  name: "header.vue",
}
</script>

<style scoped>
div#header {
  display: flex;
  width: 100%;
  height: 70px;
  background-color: #141920;
  color: #E6E6E6;
  align-items: center;
  top: 0px;
}

.title {
  margin-left: 130px;
  margin-right: auto;
}
.menu-item {
  list-style: none;
  display: inline-block;
  padding: 10px;
}
</style>
