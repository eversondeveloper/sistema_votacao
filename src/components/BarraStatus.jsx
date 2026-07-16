/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import styles from "./barrastatus.module.css";

export default function BarraStatus(props) {
  let porcentagemDeg = Number((Number(props.porcentagem / 100) * 360).toFixed(2));

  // Estado dinâmico para as cores de acento tecnológico
  const [corBarra, setCorBarra] = useState("#00f2fe"); // Ciano Neon padrão

  useEffect(() => {
    // Se a porcentagem for maior que 50%, brilha em verde esmeralda, indicando liderança
    if (Number(props.porcentagem) > 50) {
      setCorBarra("#00ff87"); 
    } else {
      setCorBarra("#00f2fe"); // Ciano para valores menores ou iguais a 50%
    }
  }, [props.porcentagem]);

  return (
    <div className={styles.barrageral}>
      <div
        className={styles.divcirculo1}
        style={{
          background: `conic-gradient(${corBarra} ${porcentagemDeg}deg, rgba(255, 255, 255, 0.05) ${porcentagemDeg}deg 360deg)`
        }}
      >
        {/* Removido o background estático para usar o efeito de vidro do CSS */}
        <div className={styles.divcirculo2}>
          <span className={styles.porcentagemTexto}>{props.porcentagem}%</span>
        </div>
      </div>
    </div>
  );
}