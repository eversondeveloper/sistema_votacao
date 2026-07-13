/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";

const ApuraCpf = (props) => {
  const [nome, setNome] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNome = async () => {
      try {
        // Alterado para apontar para a API local na porta 3001
        const responseEleitor = await axios.get(
          `http://localhost:3001/eleitores/cpf/${props.cpf}`
        );

        if (responseEleitor.data) {
          // Alterado para apontar para a API local na porta 3001
          const responseVoto = await axios.get(
            `http://localhost:3001/votos/cpf/${props.cpf}`
          );

          if (responseVoto.data.votou) {
            setError("Eleitor já votou.");
            if (props.valid) {
              props.valid("Eleitor já votou.");
            }
          } else {
            setNome(responseEleitor.data.nome);
            if (props.valid) {
              props.valid(responseEleitor.data.nome);
            }
          }
        } else {
          setError("Eleitor não encontrado ou erro na consulta.");
          if (props.valid) {
            props.valid("Eleitor não encontrado ou erro na consulta.");
          }
        }
      } catch (err) {
        setError("Eleitor não encontrado ou erro na consulta.");
        if (props.valid) {
          props.valid("Eleitor não encontrado ou erro na consulta.");
        }
      }
    };

    fetchNome();
  }, [props.cpf]);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return <p>{nome}</p>;
};

export default ApuraCpf;