<template>
  <div>
    后台管理系统
    <div style="display: flex; margin-top: 100px">
      <div>
        <div @click="storeManager()">店铺管理</div>
        <div @click="userManager()">用户管理</div>
        <div @click="merchantManager()">商家管理</div>
        <div @click="goodsManager()">商品管理</div>
        <div @click="orderManager()">订单管理</div>
      </div>

      <div style="margin-left: 100px"><router-view></router-view></div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    storeManager() {
      this.$router.push("/adminMain/storeManager");
    },
    userManager() {
      this.$router.push("/adminMain/userManager");
    },
    goodsManager() {
      this.$router.push("/adminMain/goodsManager");
    },
    merchantManager() {
      this.$router.push("/adminMain/merchantManager");
    },
    orderManager() {
      this.$router.push("/adminMain/orderManager");
    },
  },
};
</script>

<style>
</style>