const express = require('express')
const app = express()
const fs = require('fs')
var session = require('express-session');
var bodyParser = require('body-parser');
const Joi = require('joi')

/*
var user=[]
fs.writeFileSync("./user.json",JSON.stringify(user))*/

//const userFile = require('./user.json')

app.use(express.json())
const router = express.Router();


router.get("/", (req, res) => {
  res.render("index");
});

router.get("/pizza", (req, res) => {
  res.render("pizza.ejs");
});

router.post("/create", (req, res) => {
  const schema = {
    name: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required()
  }
  const validation = Joi.validate(req.body,schema)
  if(validation.error){
    res.status(400).send(validation.error)
    return
  }else{
    let data = fs.readFileSync('./user.json')
    let obj = JSON.parse(data)
    let exist = obj.find(function(e){
      return e.name === req.body.name
    })
    if(!exist){
      const newuser = {
        id: obj.length+1,
        name: req.body.name,
        password: req.body.password,
        mail: req.body.email
      }
      obj.push(newuser)
      fs.writeFile("./user.json", JSON.stringify(obj),(err, data) => {
        if(err){
          console.log(err)
        }
      })
      res.send(newuser)
    }
    else{
      res.status(409).send("User already existing")
    }
  }
})

router.post('/login',(req, res)=>{
  const schema = {
    name: Joi.string().required(),
    password: Joi.string().required(),
  }
  const validation = Joi.validate(req.body, schema)
  if(validation.error){
    res.status(400).send(validation.error)
    return
  }else{
    let data = fs.readFileSync('./user.json')
    let obj = JSON.parse(data)
    let index = obj.findIndex(function(e){
      return e.name === req.body.name
    })
    if(index===-1){
      res.status(401).send("User not found")
    }else{
      if(req.body.password===obj[index].password){
        res.send("Connected")
      }else{
        res.status(401).send("Invalid password")
      }
    }
  }
})

export default router;
