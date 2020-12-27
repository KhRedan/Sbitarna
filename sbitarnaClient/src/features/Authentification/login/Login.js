import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";
import Loading from "../../loading/Loading";
import { axiosInstance } from "../../../App";
import { useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();
  useEffect(() => {
    if (window.sessionStorage.getItem("id_token")) {
      history.push("/");
    } else {
      setLoading(false);
    }
  }, []);

  const login = (event) => {
    event.preventDefault();
    setLoading(true);
    axiosInstance
      .post("/login", {
        email: email,
        password: password,
      })
      .then((response) => response.data)
      .then((data) => {
        if (data.err) {
          setLoading(false);
          alert(data.err);
        } else {
          //on va ajouter notre token dans la session du navigateur pour utiliser les permissions au niveau du backend pour la protection des informations
          window.sessionStorage.setItem("id_token", data.token);
          window.sessionStorage.setItem("expires", data.expires);
          window.sessionStorage.setItem("role", data.role);
          window.sessionStorage.setItem("nom", data.nom);
          window.sessionStorage.setItem("prenom", data.prenom);
          setTimeout(() => {
            window.sessionStorage.removeItem("id_token");
          }, data.expires);
          alert("Connection faite avec succés");
          history.push("/");
        }
      })
      .catch((err) => {
        alert(err);
        setLoading(false);
      });
  };
  return (
    <div className="loginContainer">
      {loading ? (
        <Loading color="#0e5686" />
      ) : (
        <form className="loginForm" onSubmit={login}>
          <span>Bienvenu</span>
          <div>
            <label htmlFor="loginUsername">E-mail :</label>
            <input
              type="text"
              required
              id="loginUsername"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="loginPassword">Mot de passe :</label>
            <input
              type="password"
              required
              id="loginPassword"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <button type="submit">Se Connecter</button>
          <div className="logininscriptiontext">
            Vous n'avez pas encore de compte?
            <button
              type="button"
              onClick={() => {
                history.push("signup");
              }}
            >
              Inscrivez vous
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
