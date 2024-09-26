/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import styles from "./eleitoreslist.module.css";

const EleitoresList = (props) => {
  const [eleitores, setEleitores] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [erro, setErro] = useState("");
  const [dadosEleicao, setDadosEleicao] = useState(null); 
  const [coresTexto, setCoresTexto] = useState([]); 
  const refs = useRef([]); 

  useEffect(() => {
    document.title = "Lista de Eleitores";
    props.setValidacao(false);
    props.setPaginas(true);
  }, []);

  useEffect(() => {
    
    const fetchEleicao = async () => {
      try {
        const response = await axios.get("https://apinode-git-main-everson-silvas-projects-3c80baa3.vercel.app/eleicao");
        const eleicao = response.data[0]; 
        setDadosEleicao(eleicao);
      } catch (err) {
        console.error("Erro ao buscar dados da eleição:", err);
      }
    };

    const fetchEleitores = async () => {
      try {
        const responseEleitores = await axios.get(
          "https://apinode-git-main-everson-silvas-projects-3c80baa3.vercel.app/eleitores"
        );
        const eleitoresData = responseEleitores.data;

        
        eleitoresData.sort((a, b) => a.nome.localeCompare(b.nome));

        const eleitoresComStatus = await Promise.all(
          eleitoresData.map(async (eleitor) => {
            const responseVoto = await axios.get(
              `https://apinode-git-main-everson-silvas-projects-3c80baa3.vercel.app/votos/cpf/${eleitor.cpf}`
            );
            return {
              ...eleitor,
              votou: responseVoto.data.votou,
            };
          })
        );

        setEleitores(eleitoresComStatus);

        
        const novasCores = eleitoresComStatus.map((eleitor) =>
          eleitor.votou ? "blue" : "red"
        );
        setCoresTexto(novasCores);
      } catch (err) {
        setErro("Erro ao buscar eleitores.");
        console.error("Erro ao buscar eleitores:", err);
      }
    };

    fetchEleicao(); 
    fetchEleitores(); 
  }, []);

  const handleFiltroChange = (e) => {
    const value = e.target.value;

    if (/^\d+$/.test(value.replace(/\D/g, "")) || value === "") {
      if (value.replace(/\D/g, "").length <= 11) {
        setFiltro(formatarCpf(value));
      }
    } else {
      setFiltro(value);
    }
  };

  const formatarCpf = (cpf) => {
    return cpf
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const eleitoresFiltrados = eleitores.filter(
    (eleitor) =>
      eleitor.nome.toLowerCase().startsWith(filtro.toLowerCase()) ||
      eleitor.cpf.startsWith(filtro)
  );

  return (
    <div className={styles.eleitoresList}>
      <div className={styles.eleicaoInfo}>
        {dadosEleicao ? (
          <>
            <h2 className={styles.cargoEleicao}>Cargo: {dadosEleicao.cargo}</h2>
            <h3 className={styles.anoEleicao}>Ano: {dadosEleicao.ano}</h3>
            <h4 className={styles.candidato1}>
              Candidato 1: {dadosEleicao.nomecand1}
            </h4>
            <h4 className={styles.candidato2}>
              Candidato 2: {dadosEleicao.nomecand2}
            </h4>
          </>
        ) : (
          <p className={styles.semEleicao}>Não há eleições cadastradas</p>
        )}
      </div>
      <h1 className={styles.title}>Lista de Eleitores</h1>
      {erro && <p className={styles.error}>{erro}</p>}
      <div className={styles.filterContainer}>
        <input
          type="text"
          placeholder="Filtrar por nome ou CPF"
          value={filtro}
          onChange={handleFiltroChange}
          className={styles.filterInput}
        />
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>Ordem</th>
            <th className={styles.tableHeader}>Nome</th>
            <th className={styles.tableHeader}>CPF</th>
            <th className={styles.tableHeader}>Voto</th>
          </tr>
        </thead>
        <tbody>
          {eleitoresFiltrados.map((eleitor, index) => (
            <tr key={eleitor.cpf} className={styles.tableRow}>
              <td className={styles.tableCell}>{index + 1}</td>
              <td className={styles.tableCell}>{eleitor.nome}</td>
              <td className={styles.tableCell}>{eleitor.cpf}</td>
              <td
                className={styles.tableCell}
                ref={(el) => (refs.current[index] = el)}
                style={{ color: coresTexto[index], fontWeight: "bold" }}
              >
                {eleitor.votou ? "Registrado!" : "Não Registrado!"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EleitoresList;
