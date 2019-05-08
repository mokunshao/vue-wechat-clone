<template>
  <div>
    <div class="isImg" v-for="(img,index) in showFileData" :key="index">
      <img :src="img" alt="img">
      <button class="remove" @click="removeImg(img)">x</button>
    </div>
    <div class="isImg img_upload" v-if="showFileData.length < 9">
      <button class="btn_upload">
        <input @change="addFile" type="file" ref="myFile" multiple="multiple" accept="image/*">
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Upload",
  data() {
    return {
      showFileData: [],
      allUploadFiles: []
    };
  },
  methods: {
    removeImg(img) {
      this.showFileData.forEach((item, index) => {
        if (img === item) {
          this.showFileData.splice(index, 1);
          this.allUploadFiles.splice(index, 1);
          this.$emit("getImgs", this.allUploadFiles);
        }
      });
    },
    addFile() {
      const files = [...this.$refs.myFile.files];
      if (this.showFileData.length + files.length > 9) {
        alert("最多发表9张图片");
        return null;
      }
      files.forEach(item => {
        this.allUploadFiles.push(item);
        const reader = new FileReader();
        reader.readAsDataURL(item);
        reader.onload = () => {
          this.showFileData.push(reader.result);
        };
      });
      this.$emit("getImgs", this.allUploadFiles);
    }
  }
};
</script>

<style lang="scss" scoped>
.isImg {
  box-sizing: border-box;
  width: 30%;
  max-height: 6rem;
  float: left;
  margin-right: 8px;
  margin-bottom: 8px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
  .remove {
    position: absolute;
    top: -8px;
    right: -5px;
    border: none;
    outline: none;
    width: 20px;
    height: 20px;
    padding: 0;
    text-align: center;
    color: white;
    background-color: #3baffd;
    line-height: 10px;
    border-radius: 50%;
  }
  .btn_upload {
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    background: url(../assets/upload.png) no-repeat;
    background-size: 100% 100%;
    input {
      display: inline-block;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }
}
</style>
