<template>
  <div>
    <button @click="test" v-if="false"> test </button>
    <button class="button is-info" @click="uploadHTML"> <slot>document</slot> </button>
    <!-- <input id="file" type="file"  @change="uploadfile" /> -->
  </div>
</template>

<script>
export default {
  name: 'PdfTest',
  methods:{
    test(){
      window.console.log(document.querySelector('html').outerHTML);
      fetch('http://localhost:8080/api/test',
      { 
        method:"post",
      }).then(res=>res.json()).then(json=>window.console.log(json))
    },

    uploadHTML() {
        var blob = new Blob([document.querySelector('html').outerHTML], { type: "text/html"});
        window.console.log(blob)
        let formData = new FormData();
        formData.append('test', blob);
        fetch('http://localhost:8080/api/upload', {
            method: 'POST',
            body: formData
        }).then(res=>res.json()).then(json=>window.console.log(json))
      },
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
