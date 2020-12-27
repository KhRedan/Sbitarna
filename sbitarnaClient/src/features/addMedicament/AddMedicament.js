//Ce fichier consiste à ajouter un employé
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./AddMedicament.css";
import Loading from "../loading/Loading";
import { axiosInstance } from "../../App";
import { useSelector, useDispatch } from "react-redux";
import {
  setHeaders,
  addRow,
  removeRow,
  setData,
  removeData,
  removeHeaders,
  setSelected,
  selectHeaders,
  selectData,
  selectSelected,
} from "../../redux/slices/tableViewSlice";
import TableView from "../tableView/TableView";
import { setUsername } from "../../redux/slices/userSlice";

export default function AddMedicament() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); //on utilise les use states pour creer des "states" pour stocker les données du formulaire
  const history = useHistory();
  const [reference, setReference] = useState("");
  const [nom, setNom] = useState("");

  const addMedicament = (event) => {
    //fonction d'ajout d utilisateur
    event.preventDefault();
    axiosInstance
      .post(
        `medicaments/`, //requete post au backend pour ajoute rl utilisateur
        {
          reference: reference,
          nom: nom,
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
        } else {
          console.log(data);
        }
      })
      .catch((err) => {
        alert(err); //cas d erreur de transmission de données
      });
  };
  //le code suivant définit l'interface
  return (
    <div className="addMedicamentContainer">
      {loading ? (
        <Loading color="#1369a3" />
      ) : (
        <form className="addMedicamentForm" onSubmit={addMedicament}>
          <div>
            <label htmlFor="addMedicamentref">Réference :</label>
            <input
              type="text"
              required
              id="addMedicamentref"
              onChange={(e) => {
                setReference(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <label htmlFor="addMedicamentname">Nom :</label>
            <input
              type="text"
              required
              id="addMedicamentname"
              onChange={(e) => {
                setNom(e.target.value);
              }}
            ></input>
          </div>
          <button type="submit">Ajouter</button>
        </form>
      )}
    </div>
  );
}
