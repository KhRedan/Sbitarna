import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./LesConsultations.css";
import Loading from "../loading/Loading";
import { axiosInstance } from "../../App";
import { useSelector, useDispatch } from "react-redux";
import {
  setHeaders,
  setData,
  removeData,
  removeHeaders,
  selectSelected,
} from "../../redux/slices/tableViewSlice";
import TableView from "../tableView/TableView";

export default function LesConsultations() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const selectedUser = useSelector(selectSelected);
  const headers = [
    { name: "dateConsultation", flex: 5 },
    { name: "nomMedecin", flex: 2 },
    { name: "idPatient", flex: 2 },
    { name: "tarifs", flex: 2 },
    { name: "statut", flex: 3 },
  ];
  useEffect(() => {
    axiosInstance
      .get("consultations", {
        headers: {
          Authorization: window.sessionStorage.getItem("id_token"),
        },
      })
      .then((respone) => respone.data)
      .then((data) => {
        dispatch(setHeaders(headers));
        dispatch(
          setData(
            data.map((el) => {
              return {
                ...el,
                statut:
                  el.statut == "p"
                    ? "en attente"
                    : el.statut == "a"
                    ? "annulée"
                    : "réalisée",
                dateConsultation: el.dateConsultation
                  .split("Z")[0]
                  .split("T")
                  .join(" at ")
                  .split(".")[0],
                tarifs: el.tarifs + " DT",
              };
            })
          )
        );
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

  return loading ? (
    <div className="lesConsultationsContainer">
      <Loading color="#0e5686" />
    </div>
  ) : (
    <div className="lesConsultationsContainer">
      <div className="lesConsultationsTitle">Les Consultations</div>
      <div className="lesConsultationsTableContainer">
        <TableView />
      </div>
    </div>
  );
}
