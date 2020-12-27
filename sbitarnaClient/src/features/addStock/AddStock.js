//Ce fichier consiste à ajouter un employé
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./AddStock.css";
import Loading from "../loading/Loading";
import { axiosInstance } from "../../App";
import { useSelector, useDispatch } from "react-redux";

export default function AddStock() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); //on utilise les use states pour creer des "states" pour stocker les données du formulaire
  const history = useHistory();
  const [reference, setReference] = useState("");
  const [quantite, setQuantite] = useState("");
  const [prix, setPrix] = useState("");
  const [dateExpiration, setDateExpiration] = useState("");

  const addStock = (event) => {
    //fonction d'ajout d utilisateur
    event.preventDefault();
    axiosInstance
      .post(
        `medicaments/stock`, //requete post au backend pour ajoute rl utilisateur
        {
          ref: reference,
          quantite: quantite,
          prix: prix,
          dateExpiration: dateExpiration,
        },
        {
          headers: {
            Authorization: window.sessionStorage.getItem("id_token"), //header pour gerer les permissions au backend
          },
        }
      )
      .then((response) => response.data)
      .then((data) => {
        if (data.err) {
          alert(data.err); //erreur au niveau du backend
        } else if (data.success) {
          alert(data.msg); //succes
        }
      })
      .catch((err) => {
        alert(err); //cas d erreur de transmission de données
      });
  };
  //le code suivant définit l'interface
  return (
    <div className="addStockContainer">
      {loading ? (
        <Loading color="#1369a3" />
      ) : (
        <form className="addStockForm" onSubmit={addStock}>
          <div>
            <label htmlFor="addStockref">Réference :</label>
            <input
              type="text"
              required
              id="addStockref"
              onChange={(e) => {
                setReference(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <label htmlFor="addStockquant">Quantitée :</label>
            <input
              type="text"
              required
              id="addStockquant"
              onChange={(e) => {
                setQuantite(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <label htmlFor="addStockdateexp">Date d'expiration :</label>
            <input
              type="date"
              required
              id="addStockdateexp"
              onChange={(e) => {
                setDateExpiration(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <label htmlFor="addStockprix">Prix :</label>
            <input
              type="text"
              required
              id="addStockprix"
              onChange={(e) => {
                setPrix(e.target.value);
              }}
            ></input>
          </div>
          <button type="submit">Ajouter</button>
        </form>
      )}
    </div>
  );
}
