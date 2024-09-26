/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import styles from "./superpc.module.css";
import { useEffect, useState } from "react";
import Cronometro from "../Cronometro";
import BarraStatus from "../BarraStatus";
import axios from "axios";

function SuperPC(props) {
  const [porcentCand1SP, setPorcentCand1SP] = useState(0);
  const [porcentCand2SP, setPorcentCand2SP] = useState(0);
  const [estiCard1, setEstiCard1] = useState(false);
  const [estiCard2, setEstiCard2] = useState(false);

  const [eleicoes, setEleicoes] = useState([]);
  const [cargoEleic, setCargoEleic] = useState("");
  const [anaEleic, setAnoEleic] = useState("");
  const [noCand1, setNoCand1] = useState("");
  const [nuCand1, setNucand1] = useState("");
  const [noCand2, setNoCand2] = useState("");
  const [nuCand2, setNucand2] = useState("");

  useEffect(() => {
    const fetchEleicoes = async () => {
      try {
        const response = await axios.get("https://apinode-git-main-everson-silvas-projects-3c80baa3.vercel.app/eleicao");
        setEleicoes(response.data);
      } catch (error) {
        console.error("Erro ao buscar eleições:", error);
        setMensagem("Erro ao buscar eleições.");
      }
    };

    fetchEleicoes();
  }, []);

  useEffect(() => {
    eleicoes.map((eleicao) => {
      setCargoEleic(eleicao.cargo)
      setAnoEleic(eleicao.ano)
      setNoCand1(eleicao.nomecand1);
      setNucand1(eleicao.numcand1);
      setNoCand2(eleicao.nomecand2);
      setNucand2(eleicao.numcand2);
    });
  });

  const totalEleitores = props.v5;
  const totalVotos = props.v1 + props.v2 + props.v3 + props.v4;

  const calcPorcentAbst = () => {
    let diferenca = Math.abs(totalEleitores - totalVotos);
    let porcentagem = (diferenca / totalEleitores).toFixed(2) * 100;

    if(isNaN(porcentagem)){
      return 0
    }else{
      return porcentagem + "%";
    }
  };

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
            <div className={styles.datatipo}>Tipo: {cargoEleic} / {anaEleic}</div>
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
                    {nuCand1} - {noCand1}
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
                    {nuCand2} - {noCand2}
                  </p>
                  {props.v2}
                  {eleicoes.nomecand1}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.porcentagemtopo}>
            <div
              className={!estiCard1 ? styles.porcent1 : styles.candidatovenc}
              title="Porcentagem do candidato 1."
            >
              <div className={styles.porc1}>
                <img
                  src={"./cand1.jpg"}
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
                  {calcPorcentAbst()}
                </div>
              </div>
            </div>

            <div
              className={!estiCard2 ? styles.porcent1 : styles.candidatovenc}
              title="Porcentagem do candidato 1."
            >
              <div className={styles.porc1}>
                <img
                  src={"./cand2.jpg"}
                  alt={noCand2}
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
