//affect each router to its route

var express = require("express");
var router = express.Router();

router.use("/login",require("./login"));//handle login
router.use("/users",require("./users"));// users CRUD (patients, doctors, admins, pharmacists)
router.use("/medicaments",require("./medicaments"));// medicaments CRUD
router.use("/consultations",require("./consultations"));//consultations CRUD
router.use("/ordonnances",require("./ordonnances"));//prescriptions CRUD

module.exports = router;