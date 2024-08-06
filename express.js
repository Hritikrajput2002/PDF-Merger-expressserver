const express = require('express')
const {mergepdfss}=require('./merger')

const path=require('path')
const app = express()
const multer=require('multer')
app.use('/static',express.static('public'))
const upload=multer({dest:'uploads/'})
const port = 3001

app.get('/', (req, res) => { 
  res.sendFile(path.join(__dirname,"template/index.html"))
})

app.post('/merge', upload.array('pdfs',2), async (req,res,next)=>{
  
  mergepdfss(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path))
   await res.redirect("http://localhost:3001/static/merged.pdf")
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})  