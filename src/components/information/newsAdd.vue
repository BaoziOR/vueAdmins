<template>
<div>
	<el-form  :model="newsForm" label-width="80px" :rules="rules" ref="newsForm" style="margin:20px;width:60%;min-width:600px;" enctype="multipart/form-data">
        <el-form-item label="标题" prop='title'>
			<el-input v-model="newsForm.title"></el-input>
		</el-form-item>
        <el-form-item label="关键词">
			<el-input v-model="newsForm.keywords"></el-input>
		</el-form-item>
		<el-form-item label="作者">
			<el-input v-model="newsForm.author"></el-input>
		</el-form-item>
        <el-form-item label="分类">
			<!-- <el-input v-model="newsForm.channelName"></el-input> -->
        <el-select v-model="newsForm.channelName" placeholder="请选择" style="position: relative;width:100%" @change="selectChannelID">
            <el-option
            v-for="item in channelName"
            :key="item.id"
            :label="item.name"
            :value="item.id">
            </el-option>
        </el-select>
		</el-form-item>
              <el-form-item label="权重">
			<!-- <el-input v-model="newsForm.channelName"></el-input> -->
        <el-select v-model="newsForm.weight" placeholder="请选择" style="position: relative;width:100%">
            <el-option
            v-for="item in weight"
            :key="item.id"
            :label="item.id"
            :value="item.id">
            </el-option>
        </el-select>
		</el-form-item>
        <el-form-item label="评论">
			<el-input v-model="newsForm.comments"></el-input>
		</el-form-item>
        <el-form-item label="标签">
		<el-select v-model="newsForm.detail_tags" multiple placeholder="请选择"  style="position: relative;width:100%" @change="selectTagID">
          <el-option v-for="item in options" :key="item.id"  :label="item.name" :value="item.id"></el-option>
        </el-select>
		</el-form-item>
          <el-form-item label="状态">
         <el-switch v-model="newsForm.status"></el-switch><span style="margin-left:30px">开:文章显示 / 关:文章隐藏</span>
        </el-form-item>
        <el-form-item label="图片">
		  <el-upload
            class="upload-demo"
            :action="uploadimage"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="fileList2"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
		</el-form-item>
        <el-form-item label="内容">
            <div class="edit_container">
                <quill-editor 
                v-model="newsForm.content" 
                ref="myQuillEditor" 
                :options="editorOption" 
                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                @change="onEditorChange($event)">
                </quill-editor>
            </div>
          </el-form-item>
		<el-form-item>
		<el-button type="primary" @click="submitSave('newsForm')">保存</el-button>
		</el-form-item>
	</el-form>
    <el-dialog
  title="提示"
  :visible.sync="centerDialogVisible"
  width="30%"
  center>
  <span>{{message}}</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>

<script>
import fetch from "../../fetch";
import {quillEditor, Quill} from 'vue-quill-editor'
 import {quillRedefine} from 'vue-quill-editor-upload'
import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
import { getnewsChannels,getnewsTags,addnewsCreated } from "../../api/api";
  Quill.register('modules/ImageExtend', ImageExtend)
export default {

  data() {
    return {
      message:'',
      centerDialogVisible:false,
      username: localStorage.getItem("name"),
      token: localStorage.getItem("token"),
      uploadimage: "http://47.74.217.233:3000/main/admin/news/uploadimage", 
      content: '',
      editorOption: {},
      channelName:[],
      options: [],
      weight:[
          {id:1},
          {id:2},

      ],
      rules: {
        title: [
          { required: true, message: "标题不能为空", trigger: "blur" },
          { max: 15, message: "", trigger: "blur" }
        ]
      },
      fileList2: [],
      newsForm: {
        weight:'',
        author: "",
        channelName:"",
        comments: "",
        content: "",
        created_time: "",
        channelID:0,
        tagsID:{},
        imageBox: [],
        keywords: "",
        title: "",
        updated_time: "",
        views: "",
        status:true,
        statusID:1,
        image:{},
        detail_tags: []
      }
    };
  },
  methods: {
    // 获取新闻分类
    getnewsChannel() {
      var  para = {
        username: this.username,
        token: this.token
      };
      getnewsChannels(para).then(response => {
          this.channelName=JSON.parse(response.data.data).data
      });
    },
    //获取渠道ID
    selectChannelID(val){
    this.newsForm.channelID=val;
    console.log(val);
    },
    selectTagID(val){
    this.newsForm.tagsID=val.join(",");
    },
    imageBox(){
    
    },
    //获取新闻标签
    getnewsTag() {
        var  para = {
        username: this.username,
        token: this.token
      };
      getnewsTags(para).then(response => {
          this.options=JSON.parse(response.data.data).data
      });
    },
    //表单提交
    submitSave(newsForm) {
      this.newsForm.statusID=this.newsForm.status?1:0;
      this.$refs[newsForm].validate(valid => {
        if (valid) {
          var data = {
            username: this.username,
            token: this.token,                    
            channelId:this.newsForm.channelID,
            title: this.newsForm.title,
            image:this.newsForm.imageBox.join(','),
            author:this.newsForm.author,
            content: this.newsForm.content,
            weight:this.newsForm.weight,
            tags:this.newsForm.tagsID,
            keywords:this.newsForm.keywords,
            status:this.newsForm.statusID,
          }; 
          console.log(data);
           addnewsCreated(data).then((res)=>{
         var dataCode =JSON.parse(res.data.data).code
         var dataMessage=JSON.parse(res.data.data).message
         if(dataCode=="200"){
             this.$router.push({path:'/newsList'})
         }else{
             this.message=dataMessage
             this.centerDialogVisible=true;
         }
        })
         
        }
      });
    },
    onEditorBlur() {
      //失去焦点事件
    },
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange() {
      //内容改变事件
    },

    onSubmit() {
      console.log("submit!");
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleSuccess(file, fileList, response) {
      console.log(file, fileList, response);
      var imageFile=JSON.parse(file.data).data.data;
      console.log(imageFile);
      this.newsForm.imageBox.push(imageFile);

      console.log(this.newsForm.imageBox.join(','));
    }
  },

  components: {
    //使用编辑器
    quillEditor
  },
  created() {
      this.getnewsChannel();
      this.getnewsTag();
      
       this.editorOption = {
            modules: {
            ImageExtend: {
              loading: true,
              name: 'img',
              action: this.uploadimage,
              response: (res) => {
                return JSON.parse(res.data).data.data[0]
              }
            },
            toolbar: {
              container: container,
              handlers: {
                'image': function () {
                  QuillWatch.emit(this.quill.id)
                }
              }
            }
          }
            
        }
  }

};
</script>
<style lang="scss" scoped>
.edit_container {
  height: 500px;
}
.quill-editor {
  height: 345px;

  .ql-container {
    height: 100px;
  }
}
</style>
