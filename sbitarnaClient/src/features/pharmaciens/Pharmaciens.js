import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Pharmaciens.css";
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

export default function Pharmacien() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const selectedUser = useSelector(selectSelected);
  const headers = [
    { name: "email", flex: 5 },
    { name: "nom", flex: 2 },
    { name: "prenom", flex: 2 },
    { name: "numero", flex: 3 },
  ];
  useEffect(() => {
    axiosInstance
      .get("users/role/f", {
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
    <div className="pharmacienssContainer">
      <Loading color="#0e5686" />
    </div>
  ) : (
    <div className="pharmacienssContainer">
      <div className="pharmacienssTitle">Pharmaciens</div>
      <div className="pharmacienssTableContainer">
        <TableView />
      </div>
      <div className="pharmacienssDeleteContainer">
        <button onClick={deleteUser}>effacer</button>
      </div>
    </div>
  );
}
