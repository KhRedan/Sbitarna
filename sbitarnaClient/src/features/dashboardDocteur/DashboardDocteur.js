import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./DashboardDocteur.css";
import { useDispatch } from "react-redux";
import { Route, Switch, Link } from "react-router-dom";
import NotFound from "../notFound/NotFound";
import MesConsultationsDocteur from "../mesconsultationsDocteur/MesConsultationsDocteur";
import Logo from "../../assets/doctor.png";

export default function DashboardDocteur() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [selected, setSelected] = useState(null);
  useEffect(() => {}, []);

  const signout = () => {
    //supprimer les tokens de la session pour lancer la deconnexion
    window.sessionStorage.removeItem("id_token");
    window.sessionStorage.removeItem("nom");
    window.sessionStorage.removeItem("prenom");
    window.sessionStorage.removeItem("role");
    window.sessionStorage.removeItem("expires");
    window.location.reload();
  };

  return (
    <div className="dashboardDocteurContainer">
      <div className="dashboardDocteurSidebar">
        <div className="dashboardDocteurLogoNameContainer">
          <div
            className="dashboardDocteurProjet"
            onClick={() => {
              history.push("/");
            }}
          >
            Sbitarna
          </div>
          <img className="dashboardDocteurLogo" src={Logo}></img>
          <div className="dashboardDocteurUsername">
            {window.sessionStorage.getItem("prenom") +
              " " +
              window.sessionStorage.getItem("nom")}
          </div>
        </div>
        <div className="dashboardDocteurMenus">
          <ul>
            <li
              className={selected == 0 ? "dashboardDocteurMenuSelected" : ""}
              onClick={() => {
                setSelected(0);
              }}
            >
              <Link className="dashboardDocteurLink" to="/consultationsdocteur">
                <i className="fas fa-user-clock"></i>
                Mes Consultations
              </Link>
            </li>
            <li
              className={selected == 1 ? "dashboardDocteurMenuSelected" : ""}
              onClick={() => {
                setSelected(1);
              }}
            >
              <Link className="dashboardDocteurLink" to="/ajoutord">
                <i className="fas fa-file-medical"></i>
                Ecrire ordonnance
              </Link>
            </li>
          </ul>
        </div>
        <div className="dashboardDocteurLogout" onClick={signout}>
          <i className="fas fa-sign-out-alt"></i>
          Deconnexion
        </div>
      </div>
      <div className="dashboardDocteurContent">
        <div className="dashboardDocteurContent">
          <Switch>
            <Route exact path="/"></Route>
            <Route exact path="/consultationsdocteur">
              <MesConsultationsDocteur />
            </Route>
            <Route exact path="/ajoutord"></Route>
            <Route path="/*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}
