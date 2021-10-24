<template>
  <div id="context">
    你好-con
    <input type="submit" name="" id="" @click="click()">
    <div>
      {{a}}
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  // components: { HelloWorld },
  name: "context",
data() {
    return {
      a:[],
    };
  },
  created:function() {},
  methods:{
    click(){
      axios
      .get("http://localhost:8081/classify/findAll")
      .then(function(response){
        console.log(response.data.data)
        this.a=response.data.data
      })
      .catch(function(error){
        console.log(error)
      })
    }
  },


  Comment: {
    // Hello,
  },
};
</script>

<style>
</style>