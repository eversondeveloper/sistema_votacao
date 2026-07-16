/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./btnspags.module.css";
import axios from "axios";

export default function BtnsPags(props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const apagarDados = async () => {
    try {
      const resposta = await axios.delete(
        "http://localhost:3001/resetar-eleitores-votos"
      );
      alert(resposta.data.mensagem);
    } catch (error) {
      console.error("Erro ao apagar dados:", error);
      alert("Erro ao apagar dados das tabelas eleitores e votos.");
    }
  };

  return (
    <div
      className={styles.menuContainer}
      onMouseEnter={() => setMenuOpen(true)}
      onMouseLeave={() => setMenuOpen(false)}
    >
      <div className={`${styles.menuButton} ${menuOpen ? styles.active : ""}`}>
        <span className={styles.icon}>{menuOpen ? "✕" : "☰"}</span>
      </div>

      {menuOpen && (
        <div className={styles.menuItems}>
          <div className={styles.menuHeader}>CONEXÕES SISTEMA</div>
          
          <button
            className={styles.btns}
            onClick={() => navigate("./cadastroeleitor")}
          >
            Cadastro Eleitores
          </button>
          
          <button
            className={styles.btns}
            onClick={() => navigate("./listaeleitores")}
          >
            Lista de Eleitores
          </button>
          
          <button
            className={styles.btns}
            onClick={() => {
              props.setValidacao(true);
              props.setPaginas(false);
              navigate("./");
            }}
          >
            Urna Eletrônica
          </button>
          
          <button
            className={`${styles.btns} ${styles.btnHighlight}`}
            onClick={() => navigate("./superpc")}
          >
            Supercomputador
          </button>
        </div>
      )}
    </div>
  );
}