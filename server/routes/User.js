const express = require('express');
const cors = require('cors');
const multer = require("multer");
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const prisma = require("../lib/prisma");
const authenticateToken = require('../functions/authenticateToken')
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

app.post('/upload', upload.single('employee_photo'), (req, res) => {
  const employee_photo = req.file;
  if (!employee_photo) {
    return res.json({  message: 'Please upload a file' })
  }
    return res.json({  message: 'uploaded' })
});   

app.post('/register', async (req, res) => {
  let password = await bcrypt.hash(req.body.password, 8)
  const { firstName, contact, email, userType, username, authenticated } = req.body
  try {
    const defaultUser = {
      lastName: '',
      status: '',
      address: '',
      designation: '',
      experience: '',
      sales: '',
      specialities: '',
      aboutyou: '',
      employee_photo: '',
    }
    const userdeata = await prisma.user.create({
      data: {
        firstName,
        contact,
        email,
        userType,
        username,
        password,
        authenticated,
        ...defaultUser,
      }
    });
    return res.json(userdeata)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.post('/registeradmin', async (req, res) => {
  let password = await bcrypt.hash(req.body.password, 8)
  const { firstName, lastName, aboutyou, employee_photo, contact, email, address, designation, experience, sales, specialities, userType, username, authenticated } = req.body
  try {
    const userdeata = await prisma.user.create({password, aboutyou, firstName, lastName, employee_photo, contact, email, address, designation, experience, sales, specialities, userType, username, authenticated });
    return res.json(userdeata)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.post('/login', async (req, res) => {
  console.log("reqqq", req.body)
  const username = req.body.username;   
  try {
    const userdata = await prisma.user.findUnique({
      where: { username },
    })

    console.log("userdatauserdata", userdata)
    if (userdata) {
      if (userdata.authenticated == 'Yes') {
        if (bcrypt.compareSync(req.body.password, userdata.password)) {
          const accessToken = generateAccessToken(username)
          const refreshToken = jwt.sign(username, process.env.REFRESH_TOKEN_SECRET)
          return res.json({ accessToken: accessToken, refreshToken: refreshToken, username: userdata.username, message: 'Logged in successful', userid: userdata.id, usertype: userdata.userType, data:userdata })
        } else {
          res.json({  message: 'failed' })
        }
      }  else {
        res.json({  message: 'unauthenticated' })
      }
    } else {
      res.json({  message: 'usernamenotexist' })
    } 
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
}

app.get('/users', authenticateToken, async (req, res) => {
  try {
    const userss = await prisma.user.findMany()
    return res.json(userss)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

app.put('/usersupdate', async (req, res) => {
  const {id,  authenticated } = req.body
  try {
    const userdata = await prisma.user.findUnique({ where: { 'id': id} })
    userdata.authenticated = authenticated
    await userdata.save()
    return res.json(userdata)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

app.put('/updateUserprofile', async (req, res) => {
  try {
  let password = await bcrypt.hash(req.body.password, 15)
  const { id, firstName, lastName, aboutyou, employee_photo, contact, email, address, designation, experience, sales, specialities, authenticated } = req.body
console.log("server id", Number(id))
const _id = Number(id);
  const userss = await prisma.user.update({
    // password, firstName, lastName, aboutyou, employee_photo, contact, email, address, designation, experience, sales, specialities, authenticated 
      data: {
        password, 
        firstName, 
        lastName, 
        aboutyou, 
        employee_photo, 
        contact, 
        email, 
        address, 
        designation, 
        experience, 
        sales, 
        specialities, 
        authenticated,
      },
      where: {
        'id': _id,
      }
  })
  return res.json(userss)
} catch (err) {
  console.log(err)
  return res.status(500).json({ error: 'Something went wrong' })
}
})

app.put('/userdelete', async (req, res) => {
  const {id } = req.body
  try {
    const userss = await prisma.user.findUnique({ where: { id } })
    await userss.destroy()
    res.json({ message: 'User deleted!' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

module.exports = app;