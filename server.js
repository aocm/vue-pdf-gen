const express = require('express');
const app = express();
var count =0
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const resJson={
    status : 200,
    code :"N-001"
}
const fetchTest=(req,res)=>{
    console.log(req.path)
    return res.json(resJson)
}
const uploadTest=(req,res)=>{
    console.log(req)
    return res.json(resJson)
}
const blobToFile=(theBlob, fileName)=>{
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
}


app.get('/', (req, res) => fetchTest(req,res));
app.get('/api', (req, res) => fetchTest(req,res));
app.post('/api/test', (req, res) => fetchTest(req,res));
app.post('/api/upload',upload.single("test"), async (req, res, next) =>{

    const { file } = req;
  if (!file) {
    res.status(500).send("NG");
    return;
  }
  console.log(file.mimetype);
  console.log(file.originalname);
//   test
var fs = require('fs');

var pdf = require('html-pdf');
var options = { format: 'Letter' };
var myFile = await blobToFile(file, "before.html");
console.log(myFile)
var html = fs.readFileSync(myFile.path, 'utf8');
await pdf.create(html, options).toFile(`./uploads/pdfs/${count++}.pdf`, function(err, res) {
    if (err) return console.log(err);
    console.log(res); // { filename: '/app/businesscard.pdf' }
  });
  res.json(resJson);
} );
app.listen(3000, () => console.log('Listening on port 3000'));
