const express = require('express');
const cors = require('cors');
const multer = require("multer");
const prisma = require('../lib/prisma');
const authenticateToken = require('../functions/authenticateToken');
const REQUEST_URL  = require('./Urls');
const app = express()
require('dotenv').config({path: __dirname + '/.env'});

app.use(express.json())
app.use(express.urlencoded({extended: 'false'}))
app.use(express.json())
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

app.post("/propertyimages",  upload.array("propertyImages"), async (req, res) => {
  const files = req.files;
  if (Array.isArray(files) && files.length > 0) {
      return res.json({  message: 'uploaded' })
  } else {
    return res.json({  message: 'Please upload a file' })
  }
});
  
app.post("/multifiles/:id",  upload.array("files"), async (req, res) => {
  const id = req.params.id;
  const files = req.files;
  var carid = req.body.car_info_id;
  if (Array.isArray(files) && files.length > 0) {
    files.forEach(element => {
      let imgurl = 'assets/carimages/'+ element.filename;
      const carsimg =  carImages.create({car_info_id: carid, info_image_type: 1, image_path: imgurl, image_size: element.size});
    });
    res.json({  statusmessage: 'File Uploaded success' })
  } else {
    throw new Error("File upload unsuccessful");
  }
});

app.post('/addproperty', async (req, res) => {
  try {
    opertyAdd = await prisma.properties.create(req.body);
    return res.json(propertyAdd)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.get('/listproperty', authenticateToken,  async (req, res) => {
  try {
    const propertylist = await prisma.properties.findAll()
    return res.json(propertylist)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

app.put('/updateproperty', async (req, res) => {
  const {id } = req.body
  try {
    const updateProperty = await prisma.properties.update(req.body, { where: { 'id': id} })
    return res.json(updateProperty)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

app.put('/propertydelete', async (req, res) => {
  const {id } = req.body
  try {
    const propertiess = await prisma.properties.findOne({ where: { id } })
    await propertiess.destroy()
    res.json({ message: 'deleted!' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

module.exports = app;