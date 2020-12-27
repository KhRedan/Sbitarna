var express = require("express");
var router = express.Router();
var passport = require("passport");
var bcrypt = require("bcrypt");
var con = require("../config/dbConfig");

//get current medicaments stock (needs admin or pharmacist's role)
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (req.user.role == "a" || req.user.role=="f") {
      next();
    } else {
      res.json("vous n'avez pas la permission pour voir le stock des medicaments");
    }
  },
  function (req, res, next) {
    const sql = `select * from medicaments,stock where reference=ref`;
    con.query(sql, function (err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json(
          result.map((el) => {
            return { ...el };
          })
        );
      }
    });
  }
);

//add new medicaments category (needs pharmacist role)
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (req.user.role == "f") {
      next();
    } else {
      res.json("vous n'avez pas la permission pour ajouter des nouveaux medicaments");
    }
  },
  function (req, res, next) {
    const sql = `select * from medicaments where reference='${req.body.reference}'`;
    con.query(sql, function (err, result) {
      if (err) {
        res.json({err:err});
      } else if (result.length == 0) {
        next();
      } else {
        res.json({ err: "reference existe deja" });
      }
    });
  },
  function (req, res, next) {
    const sql = `insert into medicaments(reference,nom) values('${req.body.reference}','${req.body.nom}')`;
    con.query(sql, function (err, result) {
      if (err) {
        res.json({err:err});
      } else {
        res.json({success:true,msg:"medicament ajoute avec succes"});
      }
    });
  }
);

//add a specific quantity of medicaments to stock (needs pharmacist role)
router.post(
  "/stock",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (req.user.role == "f") {
      next();
    } else {
      res.json("vous n'avez pas la permission pour ajouter au stock des medicaments");
    }
  },
  function (req, res, next) {
    const sql = `insert into stock(ref,quantite,dateExpiration,prix) values('${req.body.ref}','${req.body.quantite}','${req.body.dateExpiration}','${req.body.prix}')`;
    con.query(sql, function (err, result) {
      if (err) {
        res.json({err:err});
      } else {
        res.json({success:true,msg:"medicament ajoute avec succes"});
      }
    });
  }
);

module.exports = router;
