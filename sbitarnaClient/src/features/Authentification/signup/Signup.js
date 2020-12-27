import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Signup.css";
import Loading from "../../loading/Loading";
import { axiosInstance } from "../../../App";
import { useDispatch } from "react-redux";

export default function Signup() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [numero, setNumero] = useState("");
  const history = useHistory();
  useEffect(() => {
    if (window.sessionStorage.getItem("id_token")) {
      history.push("/");
    } else {
      setLoading(false);
    }
  }, []);

  const signup = (event) => {
    event.preventDefault();
    if (password != confirmPassword) {
      alert("wrong password confirmation"); //on va verifier le mot de passe et sa confirmation
    } else {
      axiosInstance
        .post(`/users/signup`, {
          //envois des données au serveur de back-end
          email: email,
          password: password,
          nom: nom,
          prenom: prenom,
          numero: numero,
        })
        .then((response) => response.data)
        .then((data) => {
          console.log(data);
          if (data.err) {
            alert(data.err);
          } else if (data.success) {
            alert(data.msg);
            history.push("login");
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  };
  return (
    <div className="signupContainer">
      {loading ? (
        <Loading color="#0e5686" />
      ) : (
        <form className="signupForm" onSubmit={signup}>
          <span>Bienvenu</span>
          <div>
            <label htmlFor="signupUsername">E-mail :</label>
            <input
              type="text"
              required
              id="signupUsername"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="signupPassword">Mot de passe :</label>
            <input
              type="password"
              required
              id="signupPassword"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="signupPassword">
              Confirmation du Mot de passe :
            </label>
            <input
              type="password"
              required
              id="signupPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="signupUsername">Nom</label>
            <input
              type="text"
              required
              id="signupUsername"
              onChange={(e) => setNom(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="signupUsername">Prenom</label>
            <input
              type="text"
              required
              id="signupUsername"
              onChange={(e) => setPrenom(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="signupUsername">Numéro de téléphone</label>
            <input
              type="text"
              required
              id="signupUsername"
              onChange={(e) => setNumero(e.target.value)}
            ></input>
          </div>

          <button type="submit">S'inscrire</button>
        </form>
      )}
    </div>
  );
}
