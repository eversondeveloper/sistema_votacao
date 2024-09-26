/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./cadastroeleicao.module.css";

const CadastroEleicao = (props) => {
  const [cargo, setCargo] = useState("");
  const [ano, setAno] = useState("");
  const [nomeCand1, setNomeCand1] = useState("");
  const [nomeCand2, setNomeCand2] = useState("");
  const [numCand1, setNumCand1] = useState("");
  const [numCand2, setNumCand2] = useState("");
  const [numBranco, setNumBranco] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [eleicoes, setEleicoes] = useState([]);

  useEffect(() => {
    document.title = "Cadastro de Eleição";
    props.setValidacao(false);
    props.setPaginas(true);

    const fetchEleicoes = async () => {
      try {
        const response = await axios.get("https://apinode-git-main-everson-silvas-projects-3c80baa3.vercel.app/eleicao");
        setEleicoes(response.data);
      } catch (error) {
        console.error("Erro ao buscar eleições:", error);
        setMensagem("Erro ao buscar eleições.");
      }
    };

    fetchEleicoes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://apinode-git-main-everson-silvas-projects-3c80baa3.vercel.app/eleicao", {
        cargo,
        ano,
        nomecand1: nomeCand1,
        nomecand2: nomeCand2,
        numcand1: numCand1,
        numcand2: numCand2,
        numbranco: numBranco,
      });

      if (response.status === 201) {
        setMensagem("Dados da eleição cadastrados com sucesso!");
        setCargo("");
        setAno("");
        setNomeCand1("");
        setNomeCand2("");
        setNumCand1("");
        setNumCand2("");
        setNumBranco("");
        setTimeout(() => {
          setMensagem("");
        }, 2000);

        const fetchEleicoes = async () => {
          const response = await axios.get("https://apinode-git-main-everson-silvas-projects-3c80baa3.vercel.app/eleicao");
          setEleicoes(response.data);
        };
        fetchEleicoes();
      } else if (response.status === 200) {
        setMensagem("Dados da eleição atualizados com sucesso!");
        setTimeout(() => {
          setMensagem("");
        }, 2000);
      }
    } catch (error) {
      setMensagem("Erro ao cadastrar dados da eleição.");
      console.error("Erro ao cadastrar dados da eleição:", error);
    }
  };

  return (
    <div className={styles.cadastroEleicaoGeral}>
      <div className={styles.containerEleicao}>
        <h1 className={styles.title}>Cadastro de Eleição</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Cargo:</label>
            <input
              type="text"
              className={styles.input}
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Ano:</label>
            <input
              type="text"
              className={styles.input}
              value={ano}
              onChange={(e) => setAno(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Nome Candidato 1:</label>
            <input
              type="text"
              className={styles.input}
              value={nomeCand1}
              onChange={(e) => setNomeCand1(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Nome Candidato 2:</label>
            <input
              type="text"
              className={styles.input}
              value={nomeCand2}
              onChange={(e) => setNomeCand2(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Número Candidato 1:</label>
            <input
              type="text"
              className={styles.input}
              value={numCand1}
              onChange={(e) => setNumCand1(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Número Candidato 2:</label>
            <input
              type="text"
              className={styles.input}
              value={numCand2}
              onChange={(e) => setNumCand2(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Número Voto em Branco:</label>
            <input
              type="text"
              className={styles.input}
              value={numBranco}
              onChange={(e) => setNumBranco(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            Cadastrar Eleição
          </button>
        </form>
        {mensagem && <p className={styles.message}>{mensagem}</p>}

      </div>
      <div className={styles.divdados}>
        {/* Tabela de Eleições no formato vertical */}
        <div className={styles.divdados}>
          <h2 className={styles.title}>Dados das Eleições</h2>
          <div className={styles.tabelaEleicao}>
            {eleicoes.map((eleicao) => (
              <div key={eleicao.ano} className={styles.tabelaItem}>
                <h3>
                  {eleicao.cargo} - {eleicao.ano}
                </h3>
                <p>
                  <strong>Candidato 1:</strong> {eleicao.nomecand1}
                </p>
                <p>
                  <strong>Candidato 2:</strong> {eleicao.nomecand2}
                </p>
                <p>
                  <strong>Número Candidato 1:</strong> {eleicao.numcand1}
                </p>
                <p>
                  <strong>Número Candidato 2:</strong> {eleicao.numcand2}
                </p>
                <p>
                  <strong>Votos em Branco:</strong> {eleicao.numbranco}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroEleicao;
