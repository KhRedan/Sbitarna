import React, { useState, useEffect } from "react";
import "./Users.css";
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

export default function Users() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const selectedUser = useSelector(selectSelected);
  const headers = [
    { name: "email", flex: 5 },
    { name: "nom", flex: 2 },
    { name: "prenom", flex: 2 },
    { name: "numero", flex: 3 },
  ];
  useEffect(() => {
    axiosInstance
      .get("users/role/p", {
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
    <div className="usersContainer">
      <Loading color="#0e5686" />
    </div>
  ) : (
    <div className="usersContainer">
      <div className="usersTitle">Patients</div>
      <div className="usersTableContainer">
        <TableView />
      </div>
      <div className="usersDeleteContainer">
        <button onClick={deleteUser}>effacer</button>
      </div>
    </div>
  );
}
