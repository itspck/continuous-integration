const express = require('express')
const app = express()
const fs = require('fs')
const formidable = require('formidable')
const Joi = require('joi')


app.use(express.json())
const router = express.Router();


router.get("/", (req, res) => {
  res.render("index");
});

router.get("/pizza", (req, res) => {
  let data = fs.readFileSync('./src/storage/pizza.json')
  let pizza = JSON.parse(data)
  res.render("pizza.ejs",{pizza: pizza});
});

router.post("/create", (req, res) => {
  if(!req.session.user){
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
      let data = fs.readFileSync('./src/storage/user.json')
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
        fs.writeFile('./src/storage/user.json', JSON.stringify(obj),(err, data) => {
          if(err){
            console.log(err)
          }
        })
        res.send(newuser)
      }
      else{
        res.status(409).send("Utilisateur déjà existant")
      }
    }
  }else{
    res.status(403).send("Vous êtes déjà connecté")
  }
})

router.post('/login',(req, res)=>{
  if(!req.session.user){
    const schema = {
      name: Joi.string().required(),
      password: Joi.string().required(),
    }
    const validation = Joi.validate(req.body, schema)
    if(validation.error){
      res.status(400).send(validation.error)
      return
    }else{
      let data = fs.readFileSync('./src/storage/user.json')
      let obj = JSON.parse(data)
      let index = obj.findIndex(function(e){
        return e.name === req.body.name
      })
      if(index===-1){
        res.status(401).send("Utilisateur inexistant")
      }else{
        if(req.body.password===obj[index].password){
          req.session.user = obj[index]
          res.send("Connected")
        }else{
          res.status(401).send("Mot de passe invalide")
        }
      }
    }
  }else{
    res.status(403).send("Vous êtes déjà connecté")
  }
})
/*
router.post('/new_pizza', (req, res)=>{
  let data = fs.readFileSync('./src/storage/pizza.json')
  let obj = JSON.parse(data)
  let exist = obj.find(function(e){
    return e.name === req.body.name
  })
  if(!exist){
    const newpizza = {
      id: obj.length+1,
      name: req.body.name,
      url: req.body.file,
      composition: [req.body.sauce, ...req.body.viande, ...req.body.fromage, ...req.body.accompagnement],
      type: "Personnalisé" 
    }


    if(req.body.piquante){
      newpizza.composition.push("Sauce piquante")
    }
    obj.push(newpizza)
    console.log(obj)
    fs.writeFile('./src/storage/pizza.json',JSON.stringify(obj),(err, data) => {
      if(err){
        console.log("erreur")
      }
    })
    res.send(newpizza)
  }
  else{
    res.status(409).send("Pizza déjà existante")
  }

})*/

function addPizza(path,req,res){
  
}

router.post('/new_pizza', (req, res)=>{
  let data = fs.readFileSync('./src/storage/pizza.json')
  let obj = JSON.parse(data)
  let exist = obj.find(function(e){
    return e.name === req.body.name
  })
  if(!exist){
    console.log(req.body.name)
    const newpizza = {
      id: obj.length+1,
      name: req.body.name,
      url: req.body.file,
      composition: [req.body.sauce, ...req.body.viande, ...req.body.fromage, ...req.body.accompagnement],
      type: "Personnalisé" 
    }
    
    obj.push(newpizza)
    console.log(obj)
    fs.writeFile('./src/storage/pizza.json',JSON.stringify(obj),(err, data) => {
      if(err){
        console.log(err)
      }
    })
    res.send(newpizza)
  }
  else{
    res.status(409).send("Pizza déjà existante")
  }

})

router.get('/dashboard', (req, res)=>{
  if(!req.session.user){
    return res.status(401).send()
  }else{
    return res.status(200).send()
  }
})

export default router;
