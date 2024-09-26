/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";

export default function ApuraEleitores(props) {
  const [count, setCount] = useState(null);

  const fetchCount = async () => {
    try {
      const response = await axios.get("https://apinode-git-main-everson-silvas-projects-3c80baa3.vercel.app/eleitores");
      setCount(response.data.length);
      if (props.pegarValorRet5) {
        props.pegarValorRet5(response.data.length);
      }
    } catch (err) {
      console.error("Erro ao buscar a contagem de eleitores", err);
    }
  };

  useEffect(() => {
    fetchCount();
  }, []);

  return <p style={{display: "none"}}>{count}</p>;
}
