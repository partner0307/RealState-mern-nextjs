const express = require('express');
const cors = require('cors');
const multer = require("multer");
const prisma = require('../lib/prisma');
const REQUEST_URL  = require('./Urls');
const app = express()
require('dotenv').config({path: __dirname + '/.env'});

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', REQUEST_URL);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(cors());
app.options('*', cors());
app.get('/', function (req, res) {
  return res.send({ error: true, message: 'hello' })
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });   
app.post('/bannerimages', upload.single('bannerImg'), (req, res) => {
  const bannerImg = req.file;
  if (!bannerImg) {
    return res.json({  message: 'Please upload a file' })
  }
  return res.json({  message: 'uploaded' })
});  

app.post("/developmentimages",  upload.array("developmentImage"), async (req, res) => {
    const files = req.files;
    if (Array.isArray(files) && files.length > 0) {
        return res.json({  message: 'uploaded' })
    } else {
      return res.json({  message: 'Please upload a file' })
    }
  });

app.post('/adddevelopment', async (req, res) => {
  try {
    const developmentAdd = await prisma.development.create(req.body);
    return res.json(developmentAdd)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.get('/development', async (req, res) => {
  try {
    const developmentlist = await prisma.development.findAll()
    return res.json(developmentlist)
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

app.put('/updatedevelopment', async (req, res) => {
  const {id } = req.body
  try {
    const updatedevelopment = await prisma.development.update(req.body, { where: { 'id': id} })
    return res.json(updatedevelopment)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

app.put('/developmentdelete', async (req, res) => {
  const {id } = req.body
  try {
    const developmentdelete = await prisma.development.findOne({ where: { id } })
    await developmentdelete.destroy()
    res.json({ message: 'User deleted!' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})
  
module.exports = app;