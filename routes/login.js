var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var issueJWT = require("../utils/issueJWT");
var con = require("../config/dbConfig");

router.post("/", function (req, res, next) {//login handling
  const sql = `select * from users where email='${req.body.email}'`;
  con.query(sql, function (err, result) {
    console.log(err)
    if (err) {
      res.json(err);
    } else if (result[0]) {
      bcrypt.compare(
        req.body.password,
        result[0].motDePasse,
        function (err, compRes) {
          if (err) {
            res.json(err);
          } else {
            if (compRes) {
              res.json({...issueJWT(result[0]),email:req.body.email,role:result[0].role,nom:result[0].nom,prenom:result[0].prenom});
            } else {
              res.json({ err: "email ou mot de passe incorrect" });
            }
          }
        }
      );
    } else {
      res.json({ err: "email ou mot de passe incorrect" });
    }
  });
});

module.exports = router;
