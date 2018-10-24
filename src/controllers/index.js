import express from "express";
const router = express.Router();



router.get("/", (req, res) => {
  res.render("index");
});

router.get("/pizza", (req, res) => {
  res.render("pizza.ejs");
});

export default router;
