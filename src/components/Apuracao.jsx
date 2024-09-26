/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";

export default function Apuracao(props) {
  const [count, setCount] = useState(null);

  const fetchCount = async () => {
    try {
      const response = await axios.get(
        `https://apinode-git-main-everson-silvas-projects-3c80baa3.vercel.app/votos/count/${props.numero}`
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
  });

  return <p>{Number(count)}</p>;
}
