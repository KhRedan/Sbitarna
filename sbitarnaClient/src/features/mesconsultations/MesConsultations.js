import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./MesConsultations.css";
import Loading from "../loading/Loading";
import { axiosInstance } from "../../App";
import { useSelector, useDispatch } from "react-redux";
import {
  setHeaders,
  setRow,
  setData,
  removeData,
  removeHeaders,
  selectSelected,
} from "../../redux/slices/tableViewSlice";
import TableView from "../tableView/TableView";

export default function MesConsultations() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const selectedConsultation = useSelector(selectSelected);
  const headers = [
    { name: "dateConsultation", flex: 5 },
    { name: "nomMedecin", flex: 2 },
    { name: "idPatient", flex: 2 },
    { name: "tarifs", flex: 2 },
    { name: "statut", flex: 3 },
  ];
  useEffect(() => {
    axiosInstance
      .get("consultations/me", {
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
                    : "réalisée", //formater le statut de la consultation
                dateConsultation: el.dateConsultation
                  .split("Z")[0]
                  .split("T")
                  .join(" at ")
                  .split(".")[0],
                tarifs: el.tarifs + " DT", // formater le text de la consultation
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
  const Annulermaconsultation = () => {
    axiosInstance
      .delete(`consultations/${selectedConsultation}`, {
        headers: {
          Authorization: window.sessionStorage.getItem("id_token"),
        },
      })
      .then((response) => response.data)
      .then((data) => {
        if (data.err) {
          alert(data.err);
        } else if (data.success) {
          dispatch(
            setRow({ id: selectedConsultation, content: { statut: "annulée" } })
          );
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return loading ? (
    <div className="mesConsultationsContainer">
      <Loading color="#0e5686" />
    </div>
  ) : (
    <div className="mesConsultationsContainer">
      <div className="mesConsultationsTitle">Mes Consultations</div>
      <div className="mesConsultationsTableContainer">
        <TableView />
      </div>
      <div className="mesConsultationsDeleteContainer">
        <button onClick={Annulermaconsultation}>Annuler</button>
      </div>
    </div>
  );
}
