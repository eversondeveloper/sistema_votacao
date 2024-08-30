/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export default function Cronom(props) {
  const [min, setMin] = useState(props.minInicial);
  const [seg, setSeg] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setSeg((prevSeg) => {
        if (prevSeg === 0) {
          if (min === 0) {
            window.location.reload();
            return 0;
          } else {
            setMin((prevMin) => prevMin - 1);
            return 59;
          }
        } else {
          return prevSeg - 1;
        }
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [min]);

  return (
    <div>
      Atualiza em {min < 10 ? `0${min}` : min}:{seg < 10 ? `0${seg}` : seg}
    </div>
  );
}
