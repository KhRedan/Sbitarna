import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Doctors.css";
import Loading from "../loading/Loading";
import { axiosInstance } from "../../App";
import { useSelector, useDispatch } from "react-redux";
import {
  setHeaders,
  removeRow,
  setData,
  removeData,
  removeHeaders,
  selectSelected,
} from "../../redux/slices/tableViewSlice";
import TableView from "../tableView/TableView";

export default function Doctors() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const selectedUser = useSelector(selectSelected);
  const headers = [
    { name: "email", flex: 5 },
    { name: "nom", flex: 2 },
    { name: "prenom", flex: 2 },
    { name: "numero", flex: 3 },
    { name: "specialite", flex: 3 },
  ];
  useEffect(() => {
    axiosInstance
      .get("users/role/d", {
        headers: {
          Authorization: window.sessionStorage.getItem("id_token"),
        },
      })
      .then((respone) => respone.data)
      .then((data) => {
        dispatch(setHeaders(headers));
        dispatch(setData(data));
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
    return () => {
      dispatch(removeData());
      dispatch(removeHeaders());
    };
  }, []);
  const deleteUser = () => {
    axiosInstance
      .delete(`users/${selectedUser}`, {
        headers: {
          Authorization: window.sessionStorage.getItem("id_token"),
        },
      })
      .then(() => {
        dispatch(removeRow(selectedUser));
      })
      .catch((err) => {
        alert(err);
      });
  };

  return loading ? (
    <div className="doctorsContainer">
      <Loading color="#0e5686" />
    </div>
  ) : (
    <div className="doctorsContainer">
      <div className="doctorsTitle">Docteurs</div>
      <div className="doctorsTableContainer">
        <TableView />
      </div>
      <div className="doctorsDeleteContainer">
        <button onClick={deleteUser}>Effacer</button>
      </div>
    </div>
  );
}
