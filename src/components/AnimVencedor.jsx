/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import styles from "./AnimVencedor.module.css";

const AnimVencedor = (props) => {
  const musicVencRef = useRef(new Audio("./vencedor.mp3"));
  musicVencRef.current.volume = 1;
  musicVencRef.current.loop = true;

  useEffect(() => {
    if (props.vencedor) {
      musicVencRef.current.currentTime = 0;
      musicVencRef.current.play();
    } 
  }, [props.vencedor]);

  return (
    <div className={styles.container}>
      <div className={styles.explosion}></div>
      <div className={styles.explosion}></div>
      <div className={styles.explosion}></div>
      <div className={styles.box}>
        <div className={styles.boxInner}>
          <img
            src={props.image}
            alt="Candidato Vencedor"
            className={styles.winnerImage}
          />
        </div>
      </div>
      <div className={styles.explosion}></div>
      <div className={styles.explosion}></div>
      <div className={styles.explosion}></div>
      <button onClick={()=>{
        props.onClose()
        musicVencRef.current.pause()
      }} className={styles.closeButton}>
        Fechar
      </button>
    </div>
  );
};

export default AnimVencedor;
