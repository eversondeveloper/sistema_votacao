/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import styles from "./superpc.module.css";
import { useEffect, useState } from "react";
import Cronometro from "../Cronometro";
import BarraStatus from "../BarraStatus";

function SuperPC(props) {
  const [porcentCand1SP, setPorcentCand1SP] = useState(0);
  const [porcentCand2SP, setPorcentCand2SP] = useState(0);
  const [estiCard1, setEstiCard1] = useState(false);
  const [estiCard2, setEstiCard2] = useState(false);


  useEffect(() => {
    document.title = "Super Computador";
    props.setValidacao(false);
    props.setPaginas(true);
  }, []);

  useEffect(() => {
    if (porcentCand1SP > porcentCand2SP) {
      setEstiCard1(true);
    } else {
      setEstiCard1(false);
    }

    if (porcentCand2SP > porcentCand1SP) {
      setEstiCard2(true);
    } else {
      setEstiCard2(false);
    }
  }, [porcentCand1SP, porcentCand2SP]);

  useEffect(() => {
    const intervalo = setInterval(() => {
      const segundos = new Date();
      if (segundos.getSeconds() == 30 && props.superPCAt == true) {
        window.location.reload();
      }
    }, 1000);

    return () => {
      intervalo;
    };
  });

  useEffect(() => {
    if (props.superPCAt) {
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    if (props.v1 != 0 || props.v2 != 0) {
      setPorcentCand1SP(
        (Number(props.v1 / (props.v1 + props.v2)) * 100).toFixed(2)
      );
    }

    if (props.v1 != 0 || props.v2 != 0) {
      setPorcentCand2SP(
        (Number(props.v2 / (props.v1 + props.v2)) * 100).toFixed(2)
      );
    }
  }, [props.v1, props.v2]);

  return (
    <div className={styles.supercomputadorgeral}>
      <div
        className={styles.porcentagem}
        onClick={() => {
          props.setSuperPC(false);
        }}
      >
        <div className={styles.topogeral}>
          <div className={styles.logodindin}>
            <div className={styles.logo}>
              <div className={styles.dindin}>Super Computer</div>
            </div>
            <Cronometro minInicial={Number(props.tempoAtualiz)} />
            <div className={styles.datatipo}>Tipo: {props.tipoEleicao}</div>
          </div>
        </div>
        <div className={styles.result}>
          <div className={styles.estatisticas}>
            <div className={styles.resultado}>
              <div className={styles.candidatoum}>
                <div
                  className={styles.candidatoumum}
                  title="Quantidade de votos do candidato 1."
                >
                  <p className={styles.candnumnomes}>
                    {props.numCand1} -{" "}
                    {props.nomeCand1.charAt(0).toUpperCase() +
                      props.nomeCand1.slice(1).toLowerCase()}
                  </p>

                  {props.v1}
                </div>
              </div>
              <div className={styles.candidatodois}>
                <div
                  className={styles.candidatodoisdois}
                  title="Quantidade de votos do candidato 2."
                >
                  <p className={styles.candnumnomes}>
                    {props.numCand2} -{" "}
                    {props.nomeCand2.charAt().toUpperCase() +
                      props.nomeCand2.slice(1).toLowerCase()}
                  </p>
                  {props.v2}
                </div>
              </div>
            </div>
          </div>

          {/* Porcentagem e fotos dos candidatos */}

          <div className={styles.porcentagemtopo}>
            <div
              className={!estiCard1 ? styles.porcent1 : styles.candidatovenc}
              title="Porcentagem do candidato 1."
            >
              <div className={styles.porc1}>
                <img
                  src={"/cand1.jpg"}
                  alt="Candidato Pedro"
                  className={styles.imgpol}
                />
                <div className={styles.barrastatus}>
                  <BarraStatus porcentagem={porcentCand1SP} />
                </div>
              </div>
            </div>
            <div className={styles.totalvotosvalidos}>
              <div className={styles.totalvv1}>
                <div className={styles.totalvv2}>Total de votos</div>
                <div className={styles.totalvotos} title="Total de votos">
                  {props.v1 + props.v2 + props.v3 + props.v4}
                </div>
              </div>
              <div className={styles.totalvv1}>
                <div className={styles.totalvv2}>Votos válidos</div>
                <div
                  className={styles.totalvotos}
                  title="Total de votos válidos."
                >
                  {props.v1 + props.v2}
                </div>
              </div>
              <div className={styles.totalvv1}>
                <div className={styles.totalvv2}>Votos brancos</div>
                <div className={styles.totalvotos} title="Votos Brancos.">
                  {props.v3}
                </div>
              </div>
              <div className={styles.totalvv1}>
                <div className={styles.totalvv2}>Votos nulos</div>
                <div className={styles.totalvotos} title="Votos Nulos.">
                  {props.v4}
                </div>
              </div>
              <div className={styles.totalvv1}>
                <div className={styles.totalvv2}>Abstenções</div>
                <div className={styles.totalvotos} title="Abstenções">
                  {props.v5 - (props.v1 + props.v2 + props.v3 + props.v4)}
                </div>
              </div>
            </div>

            <div
              className={!estiCard2 ? styles.porcent1 : styles.candidatovenc}
              title="Porcentagem do candidato 1."
            >
              <div className={styles.porc1}>
                <img
                  src={"/cand2.jpg"}
                  alt="Candidato Pedro"
                  className={styles.imgpol}
                />
                <div className={styles.barrastatus}>
                  <BarraStatus porcentagem={porcentCand2SP} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.rodape}>
          <p>Desenvolvido por everScript</p>
        </div>
      </div>
    </div>
  );
}

export default SuperPC;
