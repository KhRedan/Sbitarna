//Ce fichier consiste à ajouter un employé
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./carteOrdonnance.css";
import Loading from "../loading/Loading";
import { useDispatch } from "react-redux";

export default function CarteOrdonnance({ id, date, nomMedecin, traitements }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); //on utilise les use states pour creer des "states" pour stocker les données du formulaire
  const history = useHistory();
  //le code suivant définit l'interface ordonnance type
  return (
    <div className="carteOrdonnanceContainer">
      {loading ? (
        <Loading color="#1369a3" />
      ) : (
        <div className="carteOrdonnanceForm">
          <div className="carteOrdonnanceHeader">
            <i className="fas fa-pills"></i>
            <div>N°{id}</div>
            <div>Sbitarna, le {date.split("T")[0]}</div>
            <div>Redigé par {nomMedecin}</div>
          </div>
          <ul>
            {traitements.map((trait, key) => {
              return (
                <li key={key}>
                  Nom : {trait.nom} | reference : {trait.reference} | quantitée
                  : {trait.quantite}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
