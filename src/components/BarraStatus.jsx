/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import styles from "./barrastatus.module.css";

export default function BarraStatus(props) {

  let porcentagem = Number((Number(props.porcentagem / 100) * 360).toFixed(2))

  const [corBarra, setCorBarra] = useState("#3398db");
  const [corFundoBarra, setCorFundoBarra] = useState("#44444400");
  const [corCentro, setCorCentro] = useState("#1d1d1d");

  return (
    <div className={styles.barrageral}>
      <div
        className={styles.divcirculo1}
        style={{
          background: `conic-gradient(${corBarra} ${porcentagem}deg, ${corFundoBarra} ${porcentagem}deg ${porcentagem}deg)`
        }}
      >
        <div className={styles.divcirculo2} style={{ background: corCentro }}>
          {props.porcentagem}%
        </div>
      </div>
    </div>
  );
}
