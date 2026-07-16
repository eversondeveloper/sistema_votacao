/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
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
        const response = await axios.get("http://localhost:3001/eleicao");
        const eleicao = response.data[0]; 
        setDadosEleicao(eleicao);
      } catch (err) {
        console.error("Erro ao buscar dados da eleição:", err);
      }
    };

    const fetchEleitores = async () => {
      try {
        const responseEleitores = await axios.get(
          "http://localhost:3001/eleitores"
        );
        const eleitoresData = responseEleitores.data;

        eleitoresData.sort((a, b) => a.nome.localeCompare(b.nome));

        const eleitoresComStatus = await Promise.all(
          eleitoresData.map(async (eleitor) => {
            const responseVoto = await axios.get(
              `http://localhost:3001/votos/cpf/${eleitor.cpf}`
            );
            return {
              ...eleitor,
              votou: responseVoto.data.votou,
            };
          })
        );

        setEleitores(eleitoresComStatus);

        const novasCores = eleitoresComStatus.map((eleitor) =>
          eleitor.votou ? "#00ff87" : "#ff3b30"
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
    <div className={styles.eleitoresListGeral}>
      <div className={styles.containertabela}>
        
        {/* Painel de Informações Operacionais da Eleição */}
        <div className={styles.eleicaoInfo}>
          {dadosEleicao ? (
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>CARGO:</span>
                <span className={styles.infoValue}>{dadosEleicao.cargo}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>ANO:</span>
                <span className={styles.infoValue}>{dadosEleicao.ano}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>CANDIDATO 1:</span>
                <span className={styles.infoValue}>{dadosEleicao.nomecand1}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>CANDIDATO 2:</span>
                <span className={styles.infoValue}>{dadosEleicao.nomecand2}</span>
              </div>
            </div>
          ) : (
            <p className={styles.semEleicao}>Aguardando carga de dados da eleição...</p>
          )}
        </div>

        <h1 className={styles.title}>Lista de Eleitores</h1>
        {erro && <p className={styles.error}>{erro}</p>}

        {/* Campo de Filtro de Dados */}
        <div className={styles.filterContainer}>
          <input
            type="text"
            placeholder="Pesquisar por nome ou CPF..."
            value={filtro}
            onChange={handleFiltroChange}
            className={styles.filterInput}
          />
        </div>

        {/* Tabela de Monitoramento */}
        <div className={styles.tableResponsive}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.tableHeader}>Ordem</th>
                <th className={styles.tableHeader}>Nome</th>
                <th className={styles.tableHeader}>CPF</th>
                <th className={styles.tableHeader}>Status Operacional</th>
              </tr>
            </thead>
            <tbody>
              {eleitoresFiltrados.map((eleitor, index) => (
                <tr key={eleitor.cpf} className={styles.tableRow}>
                  <td className={styles.tableCell}>{String(index + 1).padStart(3, "0")}</td>
                  <td className={`${styles.tableCell} ${styles.tableName}`}>{eleitor.nome}</td>
                  <td className={styles.tableCell}>{eleitor.cpf}</td>
                  <td
                    className={styles.tableCell}
                    ref={(el) => (refs.current[index] = el)}
                    style={{ color: coresTexto[index], fontWeight: "bold" }}
                  >
                    <span className={eleitor.votou ? styles.badgeSuccess : styles.badgeDanger}>
                      {eleitor.votou ? "CONCLUÍDO" : "PENDENTE"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default EleitoresList;