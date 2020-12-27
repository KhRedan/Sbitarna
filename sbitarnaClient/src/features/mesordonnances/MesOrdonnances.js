import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./MesOrdonnances.css";
import Loading from "../loading/Loading";
import { axiosInstance } from "../../App";
import { useDispatch } from "react-redux";
import { removeData, removeHeaders } from "../../redux/slices/tableViewSlice";
import CarteOrdonnance from "../carteOrdonnance/carteOrdonnance";
export default function MesOrdonnances() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const history = useHistory();
  useEffect(() => {
    axiosInstance
      .get("ordonnances/me", {
        headers: {
          Authorization: window.sessionStorage.getItem("id_token"),
        },
      })
      .then((respone) => respone.data)
      .then((data) => {
        setData(data);
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
    <div className="mesOrdonnancesContainer">
      <Loading color="#0e5686" />
    </div>
  ) : (
    <div className="mesOrdonnancesContainer">
      <div className="mesOrdonnancesTitle">Mes Consultations</div>
      <div className="mesOrdonnancesTableContainer">
        {data.map((el, key) => {
          return (
            <CarteOrdonnance
              id={el.id}
              key={key}
              nomMedecin={el.nomMedecin}
              traitements={el.traitements}
              date={el.date}
            />
          );
        })}
      </div>
    </div>
  );
}
