var express = require("express");
var router = express.Router();
var passport = require("passport");
var bcrypt = require("bcrypt");
var con = require("../config/dbConfig");

//get current user's prescriptions
router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    var data = [];
    const sql = `select o.id, c.dateConsultation as date, CONCAT(u.nom,' ',u.prenom) as nomMedecin from ordonnances o,consultations c, users u where o.idConsultation=c.id and c.idMedecin=u.id and o.idPatient=${req.user.id} order by c.dateConsultation desc`;
    con.query(sql, function (err, result) {
      if (err) {
        res.json(err);
      } else {
        data = [...result].map((el) => {
          return { ...el };
        });
        const n = data.length;
        const select = (i, n) => {
          if (i == n) {
            res.json(data);
          } else {
            const sql = `select t.id, m.reference, m.nom, t.quantite from traitements t, medicaments m where t.idOrdonnance=${data[i].id} and t.refMedicament=m.id`;
            con.query(sql, (err, result2) => {
              if (err) {
                res.json(err);
              } else {
                data[i]["traitements"] = [
                  ...[...result2].map((el) => {
                    return { ...el };
                  }),
                ];
                select(i + 1, n);
              }
            });
          }
        };
        select(0, n);
      }
    });
  }
);

//get the prescription with the parameter id(needs pharmacist role)
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (req.user.role == "f") {
      next();
    } else {
      res.json("vous n'avez pas la permission pour voir cette ordonnance");
    }
  },
  function (req, res, next) {
    console.log(req.params.id);
    const sql = `select o.id, c.dateConsultation as date, CONCAT(u.nom,' ',u.prenom) as nomMedecin from ordonnances o,consultations c, users u where o.idConsultation=c.id and c.idMedecin=u.id and o.id=${req.params.id} order by c.dateConsultation desc`;
    con.query(sql, function (err, result) {
      if (err) {
        res.json(err);
      } else {
        console.log(result);
        if (result[0]) {
          data = { ...result[0] };
          const sql = `select t.id, m.reference, m.nom, t.quantite from traitements t, medicaments m where t.idOrdonnance=${data.id} and t.refMedicament=m.id`;
          con.query(sql, (err, result2) => {
            if (err) {
              res.json(err);
            } else {
              data["traitements"] = [
                ...[...result2].map((el) => {
                  return { ...el };
                }),
              ];
              res.json({success:true,...data})
            }
          });
        }else{
          res.json({err:"ordonnance pas trouvee"})
        }
      }
    });
  }
);

//validate the prescription with the parameter id after giving the medicaments to the patient and then calculate the total aamount of money needed(needs pharmacist role)
router.post(
  "/valider/:id",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (req.user.role == "f") {
      next();
    } else {
      res.json("vous n'avez pas la permission pour valider cette ordonnance");
    }
  },
  function (req, res, next) {
    console.log(req.params.id);
    const sql = `select o.id, c.dateConsultation as date, CONCAT(u.nom,' ',u.prenom) as nomMedecin from ordonnances o,consultations c, users u where o.idConsultation=c.id and c.idMedecin=u.id and o.id=${req.params.id} order by c.dateConsultation desc`;
    con.query(sql, function (err, result) {
      if (err) {
        res.json(err);
      } else {
        if (result[0]) {
          data = { ...result[0] };
          const sql = `select distinct t.id, m.reference , m.nom, t.quantite, s.prix, s.quantite as valable from traitements t, medicaments m, stock s where m.reference=s.ref and t.idOrdonnance=${data.id} and t.refMedicament=m.id`;
          con.query(sql, (err, result2) => {
            if (err) {
              res.json(err);
            } else {
              data["traitements"] = [
                ...[...result2].map((el) => {
                  return { ...el };
                }),
              ];
              var s=0;
              console.log(data.traitements);
              for (let i of data.traitements){
                s+= i.quantite*i.prix
                console.log(i);
                const sql = `update stock set quantite=${i.valable-i.quantite} where ref='${i.reference}'`;
                con.query(sql,(err,result)=>{
                  console.log(i.valable-i.quantite)
                })
              }
              res.json({success:true,montant:s})
            }
          });
        }else{
          res.json({err:"ordonnance pas trouvee"})
        }
      }
    });
  }
);

module.exports = router;
