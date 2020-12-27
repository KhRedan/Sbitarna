var express = require("express");
var router = express.Router();
var passport = require("passport");
var bcrypt = require("bcrypt");
var con = require("../config/dbConfig");

//get all the consultations (needs admin role)
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (req.user.role == "a") {
      next();
    } else {
      res.json("vous n'avez pas la permission pour voir les consultations");
    }
  },
  function (req, res, next) {
    const sql = `select c.id, c.idMedecin, CONCAT(u.nom, ' ', u.prenom) as nomMedecin,c.idPatient, c.dateConsultation, c.tarifs, c.status as statut from consultations c,users u where c.idMedecin=u.id`;
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

//get connected patient consultations
router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    const sql = `select c.id, c.idMedecin, CONCAT(u.nom, ' ', u.prenom) as nomMedecin,c.idPatient, c.dateConsultation, c.tarifs, c.status as statut from consultations c,users u where c.idMedecin=u.id and c.idPatient=${req.user.id}`;
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

//get connected doctor consultations
router.get(
  "/docme",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    const sql = `select c.id, c.idMedecin, CONCAT(u.nom, ' ', u.prenom) as nomPatient,c.idPatient, c.dateConsultation, c.tarifs, c.status as statut from consultations c,users u where c.idPatient=u.id and c.idMedecin=${req.user.id}`;
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

//cancel patient's consultation with the parameter id
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    const sql = `select status from consultations where id='${req.params.id}'`;
    con.query(sql, function (err, result) {
      if (err) {
        res.json(err);
      } else {
        if (result[0].status == "p") {
          const sql = `update consultations set status='a' where id='${req.params.id}'`;
          con.query(sql, function (err, result) {
            if (err) {
              res.json(err);
            } else {
              res.json({
                success:true,
                msg:"consultation annulee avec succes"
              });
            }
          });
        }else{
          res.json({
            err:"cette consultation ne peut pas etre annulee"
          })
        }
      }
    });
  }
);

//set current doctor's consultation with the parameter id as passed already
router.delete(
  "/rea/:id",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (req.user.role == "d") {
      next();
    } else {
      res.json("vous n'avez pas la permission pour valider les consultations");
    }
  },
  function (req, res, next) {
    const sql = `select status from consultations where id='${req.params.id}'`;
    con.query(sql, function (err, result) {
      if (err) {
        res.json(err);
      } else {
        if (result[0].status == "p") {
          const sql = `update consultations set status='d' where id='${req.params.id}'`;
          con.query(sql, function (err, result) {
            if (err) {
              res.json(err);
            } else {
              res.json({
                success:true,
                msg:"consultation complete avec succes"
              });
            }
          });
        }else{
          res.json({
            err:"cette consultation ne peut pas etre validee"
          })
        }
      }
    });
  }
);

module.exports = router;
