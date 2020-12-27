//Ce fichier consiste à ajouter un employé
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./AddUser.css";
import Loading from "../loading/Loading";
import { axiosInstance } from "../../App";
import { useDispatch } from "react-redux";

export default function Adduser() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); //on utilise les use states pour creer des "states" pour stocker les données du formulaire
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [numero, setNumero] = useState("");
  const [specialite, setSpecialite] = useState("");
  const [role, setRole] = useState("");

  const addUser = (event) => {
    //fonction d'ajout d utilisateur
    event.preventDefault();
    if (password != confirmPassword) {
      alert("wrong password confirmation");
    } else if (role == "") {
      alert("please select a role first");
    } else {
      axiosInstance
        .post(
          `users/`, //requete post au backend pour ajoute rl utilisateur
          {
            email: email,
            password: password,
            nom: nom,
            prenom: prenom,
            numero: numero,
            role: role,
            specialite: specialite,
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
    }
  };
  //le code suivant définit l'interface
  return (
    <div className="addUserContainer">
      {loading ? (
        <Loading color="#1369a3" />
      ) : (
        <form className="addUserForm" onSubmit={addUser}>
          <div>
            <label htmlFor="addUserUsername">E-mail :</label>
            <input
              type="email"
              required
              id="addUserUsername"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <label htmlFor="addUserPassword">Password :</label>
            <input
              type="password"
              required
              id="addUserPassword"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <label htmlFor="addUserConfirmPassword">Confirm Password :</label>
            <input
              type="password"
              required
              id="addUserConfirmPassword"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <label htmlFor="addUserUserFname">Nom :</label>
            <input
              type="text"
              required
              id="addUserUserFname"
              onChange={(e) => {
                setNom(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <label htmlFor="addUserUserSname">Prenom :</label>
            <input
              type="text"
              required
              id="addUserUserSname"
              onChange={(e) => {
                setPrenom(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <label htmlFor="addUserUserNum">Numero :</label>
            <input
              type="text"
              required
              id="addUserUserNum"
              onChange={(e) => {
                setNumero(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <label htmlFor="addUserAdmin">Role :</label>
            <div className="addUserRadioContainer">
              <input
                type="radio"
                id="addUserAdmin"
                name="role"
                value="a"
                onChange={(e) => {
                  if (e.target.checked) {
                    setRole(e.target.value);
                    setSpecialite("");
                  }
                }}
              ></input>
              <label htmlFor="addUserAdmin">Administrateur</label>
              <input
                type="radio"
                id="addUserDoctor"
                name="role"
                value="d"
                onChange={(e) => {
                  if (e.target.checked) {
                    setRole(e.target.value);
                  }
                }}
              ></input>
              <label htmlFor="addUserDoctor">Docteur</label>
              <input
                type="radio"
                id="addUserSecretary"
                name="role"
                value="f"
                onChange={(e) => {
                  if (e.target.checked) {
                    setRole(e.target.value);
                    setSpecialite("");
                  }
                }}
              ></input>
              <label htmlFor="addUserSecretary">Pharmacien</label>
            </div>
          </div>
          {role == "d" ? (
            <div>
              <label htmlFor="addUserUserSpec">Specialite :</label>
              <select
                id="addUserUserSpec"
                value={specialite}
                onChange={(e) => {
                  setSpecialite(e.target.value);
                }}
              >
                <option value="" disabled>
                  Choisissez la specialite du Docteur
                </option>
                <option value="general">Général</option>
                <option value="dentiste">Dentiste</option>
                <option value="cardiologue">Cardiologue</option>
                <option value="ophtalmologue">Ophtalmologue</option>
              </select>
            </div>
          ) : (
            <></>
          )}

          <button type="submit">Ajouter</button>
        </form>
      )}
    </div>
  );
}
