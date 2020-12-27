import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./DashboardAdmin.css";

import { useDispatch } from "react-redux";
import { Route, Switch, Link } from "react-router-dom";
import NotFound from "../notFound/NotFound";
import Users from "../users/Users";
import Doctors from "../doctors/Doctors";
import Pharmaciens from "../pharmaciens/Pharmaciens";
import AddUser from "../addUser/AddUser";
import Pharmacie from "../pharmacie/Pharmacie";
import LesConsultations from "../lesconsultations/LesConsultations";
import Logo from "../../assets/admin.png";

export default function DashboardAdmin() {
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
    <div className="dashboardAdminContainer">
      <div className="dashboardAdminSidebar">
        <div className="dashboardAdminLogoNameContainer">
          <div
            className="dashboardAdminProjet"
            onClick={() => {
              history.push("/");
            }}
          >
            Sbitarna
          </div>
          <img className="dashboardAdminLogo" src={Logo}></img>
          <div className="dashboardAdminUsername">
            {window.sessionStorage.getItem("prenom") +
              " " +
              window.sessionStorage.getItem("nom")}
          </div>
        </div>
        <div className="dashboardAdminMenus">
          <ul>
            <li
              className={selected == 0 ? "dashboardAdminMenuSelected" : ""}
              onClick={() => {
                setSelected(0);
              }}
            >
              <Link className="dashboardAdminLink" to="/pharmacie">
                <i className="fas fa-capsules"></i>
                Pharmacie
              </Link>
            </li>
            <li
              className={selected == 1 ? "dashboardAdminMenuSelected" : ""}
              onClick={() => {
                setSelected(1);
              }}
            >
              <Link className="dashboardAdminLink" to="/lesConsultations">
                <i className="fas fa-user-clock"></i>
                Consultations
              </Link>
            </li>
            <li
              className={selected == 2 ? "dashboardAdminMenuSelected" : ""}
              onClick={() => {
                setSelected(2);
              }}
            >
              <Link className="dashboardAdminLink" to="/users">
                <i className="fas fa-users"></i>
                Patients
              </Link>
            </li>
            <li
              className={selected == 3 ? "dashboardAdminMenuSelected" : ""}
              onClick={() => {
                setSelected(3);
              }}
            >
              <Link className="dashboardAdminLink" to="/doctors">
                <i className="fas fa-user-md"></i>
                Docteurs
              </Link>
            </li>
            <li
              className={selected == 4 ? "dashboardAdminMenuSelected" : ""}
              onClick={() => {
                setSelected(4);
              }}
            >
              <Link className="dashboardAdminLink" to="/pharmaciens">
                <i className="fas fa-prescription-bottle-alt"></i>
                Pharmaciens
              </Link>
            </li>
            <li
              className={selected == 5 ? "dashboardAdminMenuSelected" : ""}
              onClick={() => {
                setSelected(5);
              }}
            >
              <Link className="dashboardAdminLink" to="/adduser">
                <i className="fas fa-user-plus"></i>
                Ajouter un Employé
              </Link>
            </li>
          </ul>
        </div>
        <div className="dashboardAdminLogout" onClick={signout}>
          <i className="fas fa-sign-out-alt"></i>
          Deconnexion
        </div>
      </div>
      <div className="dashboardAdminContent">
        <div className="dashboardAdminContent">
          <Switch>
            <Route exact path="/"></Route>
            <Route exact path="/pharmacie">
              <Pharmacie />
            </Route>
            <Route exact path="/lesConsultations">
              <LesConsultations />
            </Route>

            <Route exact path="/doctors">
              <Doctors />
            </Route>
            <Route exact path="/pharmaciens">
              <Pharmaciens />
            </Route>
            <Route exact path="/users">
              <Users />
            </Route>
            <Route exact path="/adduser">
              <AddUser />
            </Route>
            <Route path="/*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}
