import React, { useState, useEffect } from "react";
import "./Vendre.css";
import Loading from "../loading/Loading";
import { axiosInstance } from "../../App";
import CarteOrdonnance from "../carteOrdonnance/carteOrdonnance";

export default function Vendre() {
  const [loading, setLoading] = useState(false);
  const [num, setNum] = useState(null);
  const [date, setDate] = useState("");
  const [medecin, setMedecin] = useState("");
  const [traitements, setTraitements] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {}, []);
  const getOrdo = () => {
    if (num >= 0) {
      setLoading(true);
      axiosInstance
        .get(`ordonnances/${num}`, {
          headers: {
            Authorization: window.sessionStorage.getItem("id_token"), //header pour gerer les permissions au backend
          },
        })
        .then((response) => response.data)
        .then((data) => {
          if (data.err) {
            alert(data.err); //erreur au niveau du backend
            setLoading(false);
          } else if (data.success) {
            setDate(data.date);
            setMedecin(data.nomMedecin);
            setTraitements(data.traitements);
            setLoading(false);
            setShow(true);
          }
        })
        .catch((err) => {
          alert(err); //cas d erreur de transmission de données
          setLoading(false);
        });
    }
  };
  const envoyer = () => {
    setLoading(true);
    axiosInstance
      .post(
        `ordonnances/valider/${num}`,
        {},
        {
          headers: {
            Authorization: window.sessionStorage.getItem("id_token"), //header pour gerer les permissions au backend
          },
        }
      )
      .then((response) => response.data)
      .then((data) => {
        if (data.err) {
          alert(data.err); //erreur au niveau du backend
          setLoading(false);
        } else if (data.success) {
          setLoading(false);
          alert("Le client doit payer " + data.montant + " DT");
          setShow(false);
        }
      })
      .catch((err) => {
        alert(err); //cas d erreur de transmission de données
        setLoading(false);
      });
  };

  return loading ? (
    <div className="vendreContainer">
      <Loading color="#0e5686" />
    </div>
  ) : (
    <div className="vendreContainer">
      <div className="vendreTitle">Ordonnance à Servir</div>
      <div className="vendreInputContainer">
        {!show ? (
          <form className="vendreForm" onSubmit={getOrdo}>
            <div>
              <label htmlFor="vendreNum">Numero d'ordonnance :</label>
              <input
                type="number"
                required
                id="vendreNum"
                onChange={(e) => {
                  setNum(e.target.value);
                }}
              ></input>
            </div>

            <button type="submit">submit</button>
          </form>
        ) : (
          <>
            <CarteOrdonnance
              id={num}
              date={date}
              nomMedecin={medecin}
              traitements={traitements}
            />
            <button type="button" onClick={envoyer}>
              Valider
            </button>
          </>
        )}
      </div>
    </div>
  );
}
