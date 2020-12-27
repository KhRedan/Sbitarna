var express = require("express");
var router = express.Router();
var passport = require("passport");
var bcrypt = require("bcrypt");
var con = require("../config/dbConfig");

//get all users data (patients, doctors, admins, pharmacists) (needs admin role)
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (req.user.role == "a") {
      next();
    } else {
      res.json("vous n'avez pas la permission pour voir les utilisateurs");
    }
  },
  function (req, res, next) {
    const sql = `select * from users`;
    con.query(sql, function (err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json(
          result.map((el) => {
            return { ...el, motDePasse: null };
          })
        );
      }
    });
  }
);

//get all the users having the role passed as parameter ( needs admin role)
router.get(
  "/role/:role",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (req.user.role == "a") {
      next();
    } else {
      res.json("vous n'avez pas la permission pour voir les utilisateurs");
    }
  },
  function (req, res, next) {
    const sql = `select * from users where role='${req.params.role}'`;
    con.query(sql, function (err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json(
          result.map((el) => {
            return { ...el, motDePasse: null };
          })
        );
      }
    });
  }
);

//get the data of the user with the passed parameter(needs admin role)
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (req.user.role == "a") {
      next();
    } else {
      res.json("vous n'avez pas la permission pour voir cet utilisateur");
    }
  },
  function (req, res, next) {
    const sql = `select * from users where id=${req.params.id}`;
    con.query(sql, function (err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
  }
);

//add new patient's account
router.post(
  "/signup",
  function (req, res, next) {
    const sql = `select * from users where email='${req.body.email}'`;
    con.query(sql, function (err, result) {
      if (err) {
        res.json(err);
      } else if (result.length == 0) {
        next();
      } else {
        res.json({ err: "email existe deja" });
      }
    });
  },
  function (req, res, next) {
    bcrypt.hash(req.body.password, 10, function (err, password) {
      const sql = `insert into users (email,motDePasse,nom,prenom,numero,role) values('${req.body.email}','${password}','${req.body.nom}','${req.body.prenom}','${req.body.numero}','p')`;
      con.query(sql, function (err, result) {
        if (err) {
          res.json(err);
        } else {
          res.json({ success: true, msg: "compte cree avec succes" });
        }
      });
    });
  }
);

//add new account for one of the staff (admins, doctors, pharmacists) (needs admin role)
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (req.user.role == "a") {
      next();
    } else {
      res.json("vous n'avez pas la permission pour ajouter un utilisateur");
    }
  },
  function (req, res, next) {
    const sql = `select * from users where email='${req.body.email}'`;
    con.query(sql, function (err, result) {
      if (err) {
        res.json(err);
      } else if (result.length == 0) {
        next();
      } else {
        res.json({ err: "email existe deja" });
      }
    });
  },
  function (req, res, next) {
    bcrypt.hash(req.body.password, 10, function (err, password) {
      const sql = req.body.specialite?`insert into users (email,motDePasse,nom,prenom,numero,role,specialite) values('${req.body.email}','${password}','${req.body.nom}','${req.body.prenom}','${req.body.numero}','${req.body.role}','${req.body.specialite}')`:`insert into users (email,motDePasse,nom,prenom,numero,role) values('${req.body.email}','${password}','${req.body.nom}','${req.body.prenom}','${req.body.numero}','${req.body.role}')`;
      con.query(sql, function (err, result) {
        if (err) {
          res.json({err:err});
        } else {
          res.json({ success: true, msg: "compte ajoute avec succes" });
        }
      });
    });
  }
);

//delete user account (needs admin role)
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (req.user.role == "a") {
      next();
    } else {
      res.json("vous n'avez pas la permission pour supprimer un utilisateur");
    }
  },
  function (req, res, next) {
    const sql = `delete from users where id='${req.params.id}'`;
    con.query(sql, function (err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json("compte supprime avec succes");
      }
    });
  }
);

module.exports = router;
