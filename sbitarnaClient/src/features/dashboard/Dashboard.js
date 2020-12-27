import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Dashboard.css";
import Loading from "../loading/Loading";
import { useSelector, useDispatch } from "react-redux";
import { setUsername, setRole, selectRole } from "../../redux/slices/userSlice";
import DashboardAdmin from "../dashboardAdmin/DashboardAdmin";
import DashboardUser from "../dashboardUser/DashboardUser";
import DashboardPharmacien from "../dashboardPharmacien/DashboardPharmacien";
import DashboardDocteur from "../dashboardDocteur/DashboardDocteur";
export default function Dashboard() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const role = useSelector(selectRole);
  useEffect(() => {
    if (!window.sessionStorage.getItem("id_token")) {
      history.push("/login");
    } else {
      setTimeout(() => {
        window.sessionStorage.removeItem("id_token");
        window.sessionStorage.removeItem("username");
        window.sessionStorage.removeItem("role");
        window.sessionStorage.removeItem("expires");
        window.location.reload();
      }, window.sessionStorage.getItem("expires"));
      dispatch(setUsername(window.sessionStorage.getItem("username")));
      dispatch(setRole(window.sessionStorage.getItem("role")));
      setLoading(false);
    }
  }, []);

  const signout = () => {
    window.sessionStorage.removeItem("id_token");
    window.sessionStorage.removeItem("username");
    window.sessionStorage.removeItem("role");
    window.sessionStorage.removeItem("expires");
    window.location.reload();
  };
  //permet le routing du compte suivant son role a : administrateur f pharmacien d docteur p patient
  return (
    <div className="dashboardContainer">
      {loading ? (
        <Loading color="#1369a3" />
      ) : role == "a" ? (
        <DashboardAdmin />
      ) : role == "f" ? (
        <DashboardPharmacien />
      ) : role == "d" ? (
        <DashboardDocteur />
      ) : (
        <DashboardUser />
      )}
    </div>
  );
}
