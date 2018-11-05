const express = require('express')
const app = express()
const fs = require('fs')
var session = require('express-session');
var bodyParser = require('body-parser');
const Joi = require('joi')

/*
var user=[]
fs.writeFileSync("../storage/user.json",JSON.stringify(user))*/

//const userFile = require('./user.json')
/*
var pizza=[{
  "id":0,
  "name":"Steak&Cheese",
  "url": "/static/images/FR_PDSC_fr_menu_2047.jpg",
  "composition": ["Sauce tomate", "mozzarella","boulettes de boeuf assaisonnées","tomates fraîches", "origan"],
  "type":"Incontournable"
},
{
  "id":1,
  "name":"Pepper beef",
  "url": "/static/images/FR_PPBF_fr_menu_2762.jpg",
  "composition": ["Sauce tomate", "mozzarella", "pommes de terre sautées", "boulettes de boeuf assaisonnées", "oignons", "assaisonnement au poivre"],
  "type":"Incontournable"
},
{
  "id":2,
  "name":"Pepperoni",
  "url": "/static/images/FR_PCHP_fr_menu_1846.jpg",
  "composition": [ "Sauce tomate", "mozzarella", "saucisson pepperoni"],
  "type":"Bon plan"
},
{
  "id":3,
  "name":"Merguez",
  "url": "/static/images/FR_PSME_fr_menu_1846.jpg",
  "composition": [ "Sauce tomate", "mozzarella", "merguez"],
  "type":"Bon plan"
},
{
  "id":4,
  "name":"Margherita",
  "url": "/static/images/FR_PMAR_fr_menu_1846.jpg",
  "composition": [ "Sauce tomate", "mozzarella"],
  "type":"Bon plan"
},
{
  "id":5,
  "name":"Chick'n Bacon",
  "url": "/static/images/FR_PPBF_fr_menu_2762.jpg",
  "composition": [ "Sauce barbecue", "mozzarella", "bacon", "poulet rôti", "oignons", "tomates fraîches", "oignons croustillants"],
  "type":"Nouveauté"
},
{
  "id":6,
  "name":"Spicy Dallas",
  "url": "/static/images/FR_PSDB_fr_menu_1836.jpg",
  "composition": [ "Sauce barbecue", "mozzarella", "saucisson pepperoni", "oignons", "boulettes de boeuf assaisonnées", "poulet rôti", "bacon", "sauce Dallas"],
  "type":"Classique"
},
{
  "id":7,
  "name":"Cannibale",
  "url": "/static/images/FR_PCAN_fr_menu_2047.jpg",
  "composition": [ "Sauce barbecue", "mozzarella", "poulet rôti", "merguez", "boulettes de boeuf assaisonnées"],
  "type":"Classique"
},
{
  "id":8,
  "name":"4 Fromages",
  "url": "/static/images/FR_P4FR_fr_menu_2142.jpg",
  "composition": [ "Sauce tomate (ou crème fraîche légère)", "mozzarella", "chèvre", "Emmental", "Fourme d’Ambert A.O.P"],
  "type":"Classique"
}]

fs.writeFileSync('./pizza.json',JSON.stringify(pizza))
*/
app.use(express.json())
const router = express.Router();


router.get("/", (req, res) => {
  res.render("index");
});

router.get("/pizza", (req, res) => {
  let data = fs.readFileSync('./pizza.json')
  let pizza = JSON.parse(data)
  console.log(pizza)
  res.render("pizza.ejs",{pizza: pizza});
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
      fs.writeFile('./user.json', JSON.stringify(obj),(err, data) => {
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
      res.status(401).send("Utilisateur inexistant")
    }else{
      if(req.body.password===obj[index].password){
        res.send("Connected")
      }else{
        res.status(401).send("Mot de passe invalide")
      }
    }
  }
})

export default router;
