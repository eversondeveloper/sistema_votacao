/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";

export default function Apuracao(props) {
  const [count, setCount] = useState(null);

  const fetchCount = async () => {
    try {
      // Alterado para apontar para a API local na porta 3001
      const response = await axios.get(
        `http://localhost:3001/votos/count/${props.numero}`
      );
      setCount(response.data.count);
      if (props.valorRet) {
        props.valorRet(response.data.count);
      }
    } catch (err) {
      console.error("Erro ao buscar a contagem", err);
    }
  };

  useEffect(() => {
    fetchCount();
  }, [props.numero]); // Adicionada a dependência para rodar de forma segura e eficiente

  return <p>{Number(count)}</p>;
}