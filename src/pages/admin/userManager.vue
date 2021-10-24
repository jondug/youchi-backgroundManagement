<template>
  <div>
    用户
    <div v-for="(user, index) in list" :key="index">
      账号 -- {{ user.account }} 
      昵称 -- {{ user.nickname }} 
      登录次数 --{{ user.loginNum }} 
      最后登录时间 --{{ user.loginTime }}
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      line:1,  
      list: [],
      userListDto: { size: 3, num: 1 },
    };
  },
  created: function () {
    // this.usetList();
    this.usertList();
  },
  methods: {
    usertList() {
      var that = this;
      //   console.log(that.common.token)
    //   var size =  that.line*3
    //   var num = (that.line-1)*3+1
      this.axios
        .get(
          "/user/list/" + 3 + "/" + 1,
          { headers: { token: that.common.token } }
        )
        .then(function (response) {
          console.log(response.data);
          that.list = response.data.data.records;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>