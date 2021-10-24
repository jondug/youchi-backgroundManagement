<template>
  <div>
    店铺分类
    <div style="display: flex; margin: 20px 0">
      <el-input
        style="width: 300px"
        v-model="search"
        placeholder="输入关键字搜索"
      />
      <el-button type="primary" slot="reference">搜索</el-button>
      <el-button type="primary" round style="margin-right: 50px" @click="add()"
        >添加分类</el-button
      >
    </div>

    <div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="id" label="id" width="180"> </el-table-column>

        <el-table-column prop="name" label="类名" width="180">
        </el-table-column>

        <el-table-column label="修改" width="150">
          <template slot-scope="scope">
            <el-button type="warning" @click="modify(scope.row)"
              >修改</el-button
            >
          </template>
        </el-table-column>

        <el-table-column width="350" label="删除">
          <template slot-scope="scope">
            <el-popconfirm title="确定删除" >
              <el-button type="danger" slot="reference" @click="del(scope.row)">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="block">
      <!-- <span class="demonstration"></span> -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="PageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </div>

    <el-dialog title="修改" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-input v-model="form.name"></el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="enterModify()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加" :visible.sync="addFormVisible">
      <el-input v-model="name"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="enterAdd()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addFormVisible: false,
      dialogFormVisible: false,
      form: {},
      formLabelWidth: "120px",
      // 总数据
      tableData: [],
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 1,
      // 个数选择器（可修改）
      pageSizes: [1, 2, 3, 4],
      // 默认每页显示的条数（可修改）
      PageSize: 4,
      search: "",
      name: "",
    };
  },
  created: function () {
    this.listClassify(this.PageSize, this.currentPage);
  },
  methods: {
    // 分页
    // 每页显示的条数
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.PageSize = val;
      console.log(this.PageSize);
      // 点击每页显示的条数时，显示第一页
      this.listClassify(val, 1);
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1;
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val;
      // 切换页码时，要获取每页显示的条数
      this.listClassify(this.PageSize, val);
    },
    listClassify(s, n) {
      var that = this;
      console.log("s:"+s+",n:"+n)
      this.axios
        .get(
          "/storeClassify/allClassify/" + s + "/" + n
          //   { headers: { token: that.common.token } }
        )
        .then(function (response) {
          console.log(response.data);
          that.tableData = response.data.data.records;
          that.totalCount = response.data.data.total;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    modify(data) {
      console.log(data);
      this.form = data;
      this.dialogFormVisible = true;
    },
    enterModify() {
      var that = this;
      this.axios({
        method: "post",
        url: "/storeClassify/modifyClassify",
        data: that.form,
      }).then(function (response) {
        console.log(response.data);
        that.dialogFormVisible = false;
      });
    },
    del(data) {
      var that = this;
      this.axios({
        method: "delete",
        url: `/storeClassify/delClassify/ ${data.id}`,
      }).then(function (response) {
        console.log(response.data);
        that.listClassify(that.PageSize, that.currentPage);
      });
    },
    add() {
      this.addFormVisible = true;
    },
    enterAdd() {
      var that = this;
      this.axios({
        method: "post",
        url: "/storeClassify/addClassify/" + that.name,
        data: that.form,
      }).then(function (response) {
        console.log(response.data);
        that.name=""
        that.addFormVisible = false;
        that.listClassify(that.PageSize, that.currentPage);
      });
    },
  },
};
</script>

<style>
</style>