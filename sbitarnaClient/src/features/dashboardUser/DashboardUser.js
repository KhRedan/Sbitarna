import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./DashboardUser.css";
import { useDispatch } from "react-redux";
import { Route, Switch, Link } from "react-router-dom";
import NotFound from "../notFound/NotFound";
import Logo from "../../assets/People-Patient-Male-icon.png";
import MesConsultations from "../mesconsultations/MesConsultations";
import MesOrdonnances from "../mesordonnances/MesOrdonnances";
export default function DashboardUser() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [selected, setSelected] = useState(null);
  useEffect(() => {}, []);

  const signout = () => {
    //supprimer les tokens de la session pour lancer la deconnexion
    window.sessionStorage.removeItem("id_token");
    window.sessionStorage.removeItem("prenom");
    window.sessionStorage.removeItem("nom");
    window.sessionStorage.removeItem("role");
    window.sessionStorage.removeItem("expires");
    window.location.reload();
  };

  return (
    <div className="dashboardUserContainer">
      <div className="dashboardUserSidebar">
        <div className="dashboardUserLogoNameContainer">
          <div
            className="dashboardUserProjet"
            onClick={() => {
              history.push("/");
            }}
          >
            Sbitarna
          </div>
          <img className="dashboardUserLogo" src={Logo}></img>
          <div className="dashboardUserUsername">
            {window.sessionStorage.getItem("prenom") +
              " " +
              window.sessionStorage.getItem("nom")}
          </div>
        </div>
        <div className="dashboardUserMenus">
          <ul>
            <li
              className={selected == 0 ? "dashboardUserMenuSelected" : ""}
              onClick={() => {
                setSelected(0);
              }}
            >
              <Link className="dashboardUserLink" to="/reserver">
                <i className="fas fa-calendar-plus"></i>
                Réserver
              </Link>
            </li>
            <li
              className={selected == 1 ? "dashboardUserMenuSelected" : ""}
              onClick={() => {
                setSelected(1);
              }}
            >
              <Link className="dashboardUserLink" to="/mesconsultations">
                <i className="fas fa-user-clock"></i>
                Mes Consultations
              </Link>
            </li>
            <li
              className={selected == 2 ? "dashboardUserMenuSelected" : ""}
              onClick={() => {
                setSelected(2);
              }}
            >
              <Link className="dashboardUserLink" to="/mesordonnances">
                <i className="fas fa-file-medical"></i>
                Mes Ordonnances
              </Link>
            </li>
          </ul>
        </div>
        <div className="dashboardUserLogout" onClick={signout}>
          <i className="fas fa-sign-out-alt"></i>
          Deconnexion
        </div>
      </div>
      <div className="dashboardUserContent">
        <Switch>
          <Route exact path="/"></Route>
          <Route exact path="/mesordonnances">
            <MesOrdonnances />
          </Route>
          <Route exact path="/reserver"></Route>
          <Route exact path="/mesconsultations">
            <MesConsultations />
          </Route>
          <Route path="/*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
