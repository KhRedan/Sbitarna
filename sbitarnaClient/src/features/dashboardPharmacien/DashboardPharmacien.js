import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./DashboardPharmacien.css";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch, Link } from "react-router-dom";
import NotFound from "../notFound/NotFound";
import Pharmacie from "../pharmacie/Pharmacie";
import Vendre from "../vendre/Vendre";
import AddMedicament from "../addMedicament/AddMedicament";
import AddStock from "../addStock/AddStock";
import Logo from "../../assets/png-clipart-pharmacist-pharmacy-computer-icons-medicine-health-care-pharmacy-icon-service-pharmaceutical-drug.png";

export default function DashboardPharmacien() {
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
    <div className="dashboardPharmacienContainer">
      <div className="dashboardPharmacienSidebar">
        <div className="dashboardPharmacienLogoNameContainer">
          <div
            className="dashboardPharmacienProjet"
            onClick={() => {
              history.push("/");
            }}
          >
            Sbitarna
          </div>
          <img className="dashboardPharmacienLogo" src={Logo}></img>
          <div className="dashboardPharmacienUsername">
            {window.sessionStorage.getItem("prenom") +
              " " +
              window.sessionStorage.getItem("nom")}
          </div>
        </div>
        <div className="dashboardPharmacienMenus">
          <ul>
            <li
              className={selected == 0 ? "dashboardPharmacienMenuSelected" : ""}
              onClick={() => {
                setSelected(0);
              }}
            >
              <Link className="dashboardPharmacienLink" to="/pharmacie">
                <i className="fas fa-capsules"></i>
                Pharmacie
              </Link>
            </li>
            <li
              className={selected == 1 ? "dashboardPharmacienMenuSelected" : ""}
              onClick={() => {
                setSelected(1);
              }}
            >
              <Link className="dashboardPharmacienLink" to="/ajoutmed">
                <i className="fas fa-tablets"></i>
                Ajouter Médicament
              </Link>
            </li>
            <li
              className={selected == 2 ? "dashboardPharmacienMenuSelected" : ""}
              onClick={() => {
                setSelected(2);
              }}
            >
              <Link className="dashboardPharmacienLink" to="/ajoutstock">
                <i className="fas fa-plus-circle"></i>
                Ajouter au Stock
              </Link>
            </li>
            <li
              className={selected == 3 ? "dashboardPharmacienMenuSelected" : ""}
              onClick={() => {
                setSelected(3);
              }}
            >
              <Link className="dashboardPharmacienLink" to="/vendre">
                <i className="fas fa-money-bill"></i>
                Vendre
              </Link>
            </li>
          </ul>
        </div>
        <div className="dashboardPharmacienLogout" onClick={signout}>
          <i className="fas fa-sign-out-alt"></i>
          Deconnexion
        </div>
      </div>
      <div className="dashboardPharmacienContent">
        <div className="dashboardPharmacienContent">
          <Switch>
            <Route exact path="/"></Route>
            <Route exact path="/pharmacie">
              <Pharmacie />
            </Route>
            <Route exact path="/ajoutmed">
              /<AddMedicament />
            </Route>

            <Route exact path="/ajoutstock">
              <AddStock />
            </Route>
            <Route exact path="/vendre">
              <Vendre />
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
