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
        "https://apinode-git-main-everson-silvas-projects-3c80baa3.vercel.app/resetar-eleitores-votos"
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
      {/* Troca o ícone conforme o estado do menu */}
      <div
        className={styles.menuButton}
        style={{ display: menuOpen && "none" }}
      >
        {menuOpen ? "✖" : "☰"}
      </div>

      {menuOpen && (
        <div className={styles.menuItems}>
          {/* <button
            className={styles.btns}
            onClick={() => {
              navigate("/cadastroadm");
            }}
          >
            Cadastro Administrador
          </button>
          <button
            className={styles.btns}
            onClick={() => {
              navigate("/cadastroeleicao");
            }}
          >
            Cadastro Eleições
          </button> */}
          <button
            className={styles.btns}
            onClick={() => {
              navigate("/cadastroeleitor");
            }}
          >
            Cadastro Eleitores
          </button>
          <button
            className={styles.btns}
            onClick={() => {
              navigate("/listaeleitores");
            }}
          >
            Lista de Eleitores
          </button>
          <button
            className={styles.btns}
            onClick={() => {
              props.setValidacao(true);
              props.setPaginas(false);
              navigate("/");
            }}
          >
            Urna Eletrônica
          </button>
          <button
            className={styles.btns}
            onClick={() => {
              navigate("/superpc");
            }}
          >
            Supercomputador
          </button>
          <button
            className={styles.btns}
            style={{ backgroundColor: "red" }}
            onClick={() => {
              apagarDados();
            }}
          >
            Apagar Eleitores/Votos
          </button>
        </div>
      )}
    </div>
  );
}
