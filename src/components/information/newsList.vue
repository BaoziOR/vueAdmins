<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getNewsList">搜索</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">增加</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="news" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;color:#333" border>
			<el-table-column type="selection" width="55">
			</el-table-column>
            <el-table-column prop="logined_time" label="ID" width="60" sortable>
				<template slot-scope="scope">{{ scope.row.id}}</template>	
			</el-table-column>
            	<el-table-column prop="title" label="标题" width="300" sortable>
				<template slot-scope="scope">{{ scope.row.title}}</template>	
			</el-table-column>
            <el-table-column prop="image" label="图片" width="400" sortable>
                    <template slot-scope="scope">
                    <img :src="scope.row.image1" class="image" width="100" height="60">
                    <img :src="scope.row.image2" class="image" width="100" height="60">
                    <img :src="scope.row.image3" class="image" width="100" height="60">
                    </template>
			</el-table-column>
            <el-table-column prop="keywords" label="关键词" width="100" sortable>
				<template slot-scope="scope">{{ scope.row.keywords}}</template>	
			</el-table-column>
			<el-table-column prop="author" label="作者" width="100" sortable>
				<template slot-scope="scope">{{ scope.row.author}}</template>	
			</el-table-column>
			<el-table-column prop="channelName" label="渠道" width="400" sortable>
				<template slot-scope="scope">{{ scope.row.channelName}}</template>	
			</el-table-column>
				<el-table-column prop="comments" label="评论" width="220" sortable>
				<template slot-scope="scope">{{ scope.row.comments}}</template>	
			</el-table-column>
				<el-table-column prop="created_time" label="创建时间" width="220" sortable>
				<template slot-scope="scope">{{ scope.row.created_time}}</template>	
			</el-table-column>
            	<el-table-column prop="updated_time" label="更新时间" width="220" sortable>
				<template slot-scope="scope">{{ scope.row.updated_time}}</template>	
			</el-table-column>
            	<el-table-column prop="views" label="查看数" width="220" sortable>
				<template slot-scope="scope">{{ scope.row.views}}</template>	
			</el-table-column>
      	<!-- <el-table-column prop="password" label="密码" width="10" sortable v-show="isPassword">
				<template slot-scope="scope">{{ scope.row.password}}</template>	
			</el-table-column> -->
			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<!-- <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="姓名">
					<el-input v-model="editForm.username" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="base32">
					<el-input v-model="editForm.base32"></el-input>
				</el-form-item>
				<el-form-item label="登录时间">
					<el-date-picker type="date" placeholder="选择日期" v-model="editForm.logined_time" :disabled="true"></el-date-picker>
				</el-form-item>
				<el-form-item label="状态">
					<el-input type="" v-model="editForm.status" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="密码">
					<el-input type="" v-model="editForm.password"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog> -->

		<!--新增界面-->
	</section>
</template>

<script>
import util from "../../common/js/util.js";
//import NProgress from 'nprogress'
import {
  getNewsListPage,
  editUser,
} from "../../api/api";

export default {
  data() {
    return {
      border: true,
      filters: {
        name: ""
      },
      news: [],
      pageSize:10,
      total: 0,
      page: 1,
      listLoading: false,
      sels: [], //列表选中列
      isPassword:false,
      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      //编辑界面数据
      editForm: {
        base32: "",
        id: 0,
        logined_time: "",
        status: "",
		    username: "",
		    password:""
      },
      password:'',
      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      //新增界面数据
      addForm: {
        name: "",
        sex: -1,
        age: 0,
        birth: "",
        addr: ""
      }
    };
  },
  methods: {
    //切换分页
    handleCurrentChange(val) {
      this.page = val;
      this.getNewsList();
    },
    //获取新闻列表
    getNewsList() {
      let para = {
        //page: this.page,
        start: this.page,
        pageSize:this.pageSize,
        username: localStorage.getItem("name"),
        token: localStorage.getItem("token")
      };
      this.listLoading = true;
      //NProgress.start();
      getNewsListPage(para).then(res => {
        console.log(res);
        this.listLoading = false; 
        this.news = JSON.parse(res.data.data).data.news;
        this.total = JSON.parse(res.data.data).data.total_num;
        console.log(this.news)
        this.news.map((index,item)=>{
        this.news[item].image1=this.news[item].image.split(',')[0];
         this.news[item].image2=this.news[item].image.split(',')[1];
        this.news[item].image3=this.news[item].image.split(',')[2];
        })
      
        //NProgress.done();
      });
    },
    //删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { id: row.id };
          removeUser(para).then(res => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getNewsList();
          });
        })
        .catch(() => {});
    },
    //显示编辑界面
    handleEdit: function(index, row) {
    //   this.editFormVisible = true;
    //  this.editForm = Object.assign({}, row);
    //  delete this.editForm.logined_time;
    //  delete this.editForm.status;
    //  delete this.editForm.id;
    //  this.editForm.password=this.password; 
    //  this.editForm.token=localStorage.getItem("token");
     this.$router.push({path:'../newsList/edit',query:{id:row.id}})
	  //debugger
	  console.log(this.editForm)
    },
    //跳转新增界面
    handleAdd: function() {
     // this.addFormVisible = true;
     this.$router.push({path:'../newsList/add',})
    },
    //编辑
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.editForm);
            // para.logined_time =
            //   !para.logined_time || para.logined_time == ""
            //     ? ""
            //     : util.formatDate.format(new Date(para.logined_time), "yyyy-MM-dd");
            editUser(para).then(res => {
              this.editLoading = false;
              //NProgress.done();
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["editForm"].resetFields();
              this.editFormVisible = false;
              this.getNewsList();
            });
          });
        }
      });
    },
    //新增
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.addForm);
            para.birth =
              !para.birth || para.birth == ""
                ? ""
                : util.formatDate.format(new Date(para.birth), "yyyy-MM-dd");
            addUser(para).then(res => {
              this.addLoading = false;
              //NProgress.done();
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["addForm"].resetFields();
              this.addFormVisible = false;
              this.getNewsList();
            });
          });
        }
      });
    },
    selsChange: function(sels) {
      this.sels = sels;
    },
    //批量删除
    batchRemove: function() {
      var ids = this.sels.map(item => item.id).toString();
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { ids: ids };
          batchRemoveUser(para).then(res => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getNewsList();
          });
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.getNewsList();
  }
};
</script>

<style scoped lang="scss">
.el-table thead {
  color: rebeccapurple !important;
}
</style>