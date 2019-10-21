<template>
  <div>
    <button @click="test" v-if="false"> test </button>
    <button class="button is-info" @click="uploadHTML"> <slot>document</slot> </button>
    <button class="button is-info" @click="csvTest"> csv </button>
    <button class="button is-info" @click="downloadHTML"> dkHTML </button>
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
    csvTest(){
      //https://chaika.hatenablog.com/entry/2018/12/23/090000
      const str = "星宮いちご, 霧矢あおい, 紫吹蘭\n大空あかり, 氷上すみれ, 新条ひなき\n";
      // Blobでファイルを作成
      const file = new Blob([str, "神崎美月, 夏樹みくる"], {
        type: "text/csv;charset=utf-8"
      });

      // ダウンロード
      const a = document.createElement('a');
      // ダウンロードされるファイル名
      a.download = 'aikatsu.csv';
      a.href = URL.createObjectURL(file);
      // ダウンロード開始
      a.click();
    },
    downloadHTML() {
      var blob = new Blob([document.querySelector('html').outerHTML], 
      { type: "text/html"});
      const a = document.createElement('a');
      // ダウンロードされるファイル名
      a.download = 'test.html';
      a.href = URL.createObjectURL(blob);
      // ダウンロード開始
      a.click();
    },
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
