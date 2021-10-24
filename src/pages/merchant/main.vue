<template>
  <div>
    <h2>欢迎：{{ name }}</h2>
    <div style="display: flex">
      <div style="width: 150px; text-align: center">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1" @click="storeManager()">
            <span slot="title">店铺管理</span>
          </el-menu-item>
          <el-menu-item index="2" @click="goodsManager()">
            <span slot="title">菜单管理</span>
          </el-menu-item>
          <el-menu-item index="3">
            <span slot="title" @click="commentManager()">评论</span>
          </el-menu-item>
          <el-menu-item index="4">
            <span slot="title" @click="orderManager()">订单</span>
          </el-menu-item>
        </el-menu>
      </div>

      <div style="margin-left: 50px; width: 100%">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
    };
  },
  created : function(){
    this.name=localStorage.getItem("merchantName");
  },
  methods: {
    storeManager() {
      this.$router.push("/merchantMain/storeManager");
    },
    goodsManager() {
      this.$router.push("/merchantMain/goodsManager");
    },
    commentManager() {
      this.$router.push("/merchantMain/comment");
    },
    orderManager() {
      this.$router.push("/merchantMain/orderManager");
    },
  },
};
</script>

<style>
</style>