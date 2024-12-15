<script setup>
import { DATA } from './data'
</script>

<template>
  <div v-for="(pitem, pindex) in DATA" :key="pindex">
    <h2 :id="pitem.title" tabindex="-1">{{ pitem.title }}</h2>
    <div class="links">
      <a
        v-for="(item, index) in pitem.items"
        :key="index"
        class="link"
        :href="item.link"
        target="_blank"
        rel="noreferrer"
      >
        <div class="box">
          <div class="title">{{ item.title }}</div>
          <div class="bottom">
            <img :src="item.icon" alt="" />
            <div class="desc">{{ item.desc }}</div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.links {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.link {
  text-decoration: none; /* 去掉下划线 */
  color: inherit; /* 继承父元素的颜色 */
  background: none; /* 移除背景 */
  border: none; /* 移除边框 */
  outline: none; /* 移除点击时的外边框（聚焦时） */
}

.box {
  width: 260px;
  height: 90px;
  overflow: hidden;
  padding: 10px 15px;
  background: #f3f5f7;
  border-radius: 8px;
  img {
    width: 30px;
    height: 30px;
    padding: 4px;
    border-radius: 4px;
    background: #dddee4;
  }
  .title {
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }
  .bottom {
    flex: 1;
    overflow: hidden;
    margin-top: 10px;
    display: flex;
    gap: 10px;
    .desc {
      line-height: 1.2;
      font-size: 12px;
      color: #666;
      display: -webkit-box; /* 设置为多行文本显示 */
      -webkit-line-clamp: 2; /* 限制显示两行 */
      -webkit-box-orient: vertical; /* 设置排列方向为纵向 */
      overflow: hidden; /* 超出部分隐藏 */
      text-overflow: ellipsis; /* 超出部分显示省略号 */
      flex-grow: 1;
    }
  }
}
</style>
