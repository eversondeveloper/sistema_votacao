/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./eleitoreslist.module.css";

const EleitoresList = (props) => {
  const [eleitores, setEleitores] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    document.title = "Lista de Eleitores";
    props.setValidacao(false);
    props.setPaginas(true);
  }, []);

  useEffect(() => {
    const fetchEleitores = async () => {
      try {
        const responseEleitores = await axios.get("http://localhost:3000/eleitores");
        const eleitoresData = responseEleitores.data;

        const eleitoresComStatus = await Promise.all(
          eleitoresData.map(async (eleitor) => {
            const responseVoto = await axios.get(`http://localhost:3000/votos/cpf/${eleitor.cpf}`);
            return {
              ...eleitor,
              votou: responseVoto.data.votou,
            };
          })
        );

        setEleitores(eleitoresComStatus);
      } catch (err) {
        setErro("Erro ao buscar eleitores.");
        console.error("Erro ao buscar eleitores:", err);
      }
    };

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
            <th className={styles.tableHeader}>ID</th>
            <th className={styles.tableHeader}>Nome</th>
            <th className={styles.tableHeader}>CPF</th>
            <th className={styles.tableHeader}>Situação</th>
          </tr>
        </thead>
        <tbody>
          {eleitoresFiltrados.map((eleitor) => (
            <tr key={eleitor.cpf} className={styles.tableRow}>
              <td className={styles.tableCell}>{eleitor.id}</td>
              <td className={styles.tableCell}>{eleitor.nome}</td>
              <td className={styles.tableCell}>{eleitor.cpf}</td>
              <td className={styles.tableCell}>{eleitor.votou ? "Votou" : "Não votou"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EleitoresList;
