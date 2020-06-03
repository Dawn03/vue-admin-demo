<template>
  <div>
    <Editor id="tinymce" v-model="richTxt" :init="editorInit"></Editor>
  </div>
</template>
<script>
import tinymce from "tinymce/tinymce";
// import "tinymce/themes/modern/theme";
import "tinymce/themes/silver/theme";

import Editor from "@tinymce/tinymce-vue";
import "tinymce/plugins/image";
import "tinymce/plugins/link";
import "tinymce/plugins/code";
import "tinymce/plugins/lists";
import "tinymce/plugins/contextmenu";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/textcolor";
export default {
  components: { Editor },
  data() {
    return {
      richTxt: "",
      editorInit: {
        // language_url: "/static/tinymce/zh_CN.js",
        // language: "zh_CN",
        skin_url: "/tinymce/skins/lightgray",
        height: 300
      }
    };
  },
  mounted() {
    // 富文本编辑器初始化
    tinymce.init({
      selector: "#tinymce", // change this value according to your html
      block_formats:
        "Paragraph=div;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;Preformatted=pre"
    });
  }
};
</script>
