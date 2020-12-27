import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./MesConsultationsDocteur.css";
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

export default function MesConsultationsDocteur() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const selectedConsultation = useSelector(selectSelected);
  const headers = [
    { name: "dateConsultation", flex: 5 },
    { name: "nomPatient", flex: 2 },
    { name: "tarifs", flex: 2 },
    { name: "statut", flex: 3 },
  ];
  useEffect(() => {
    axiosInstance
      .get("consultations/docme", {
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
  const RealiserMaConsultation = () => {
    axiosInstance
      .delete(`consultations/rea/${selectedConsultation}`, {
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
            setRow({
              id: selectedConsultation,
              content: { statut: "réalisée" },
            })
          );
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return loading ? (
    <div className="mesConsultationsDocteurContainer">
      <Loading color="#0e5686" />
    </div>
  ) : (
    <div className="mesConsultationsDocteurContainer">
      <div className="mesConsultationsDocteurTitle">Mes Consultations</div>
      <div className="mesConsultationsDocteurTableContainer">
        <TableView />
      </div>
      <div className="mesConsultationsDocteurDeleteContainer">
        <button onClick={RealiserMaConsultation}>Réaliser</button>
      </div>
    </div>
  );
}
