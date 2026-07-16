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

  const [cargoEleic, setCargoEleic] = useState("");
  const [anaEleic, setAnoEleic] = useState("");
  const [noCand1, setNoCand1] = useState("");
  const [nuCand1, setNucand1] = useState("");
  const [noCand2, setNoCand2] = useState("");
  const [nuCand2, setNucand2] = useState("");
  const [mensagem, setMensagem] = useState("");

  // Busca dados da eleição ativa
  useEffect(() => {
    const fetchEleicoes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/eleicao");
        if (response.data && response.data.length > 0) {
          const eleicaoAtiva = response.data[0]; // Pega a primeira eleição cadastrada
          setCargoEleic(eleicaoAtiva.cargo);
          setAnoEleic(eleicaoAtiva.ano);
          setNoCand1(eleicaoAtiva.nomecand1);
          setNucand1(eleicaoAtiva.numcand1);
          setNoCand2(eleicaoAtiva.nomecand2);
          setNucand2(eleicaoAtiva.numcand2);
        }
      } catch (error) {
        console.error("Erro ao buscar eleições:", error);
        setMensagem("Erro ao buscar eleições.");
      }
    };

    fetchEleicoes();
  }, []);

  const totalEleitores = props.v5;
  const totalVotos = props.v1 + props.v2 + props.v3 + props.v4;

  const calcPorcentAbst = () => {
    let diferenca = Math.abs(totalEleitores - totalVotos);
    let porcentagem = (diferenca / totalEleitores).toFixed(2) * 100;

    if (isNaN(porcentagem)) {
      return "0%";
    } else {
      return porcentagem + "%";
    }
  };

  useEffect(() => {
    document.title = "Super Computador";
    props.setValidacao(false);
    props.setPaginas(true);
  }, []);

  // Define dinamicamente o card de liderança temporária (vencedor parcial)
  useEffect(() => {
    if (Number(porcentCand1SP) > Number(porcentCand2SP)) {
      setEstiCard1(true);
      setEstiCard2(false);
    } else if (Number(porcentCand2SP) > Number(porcentCand1SP)) {
      setEstiCard1(false);
      setEstiCard2(true);
    } else {
      setEstiCard1(false);
      setEstiCard2(false);
    }
  }, [porcentCand1SP, porcentCand2SP]);

  // Atualização automática a cada segundo em segundos específicos
  useEffect(() => {
    const intervalo = setInterval(() => {
      const segundos = new Date();
      if (segundos.getSeconds() === 30 && props.superPCAt === true) {
        window.location.reload();
      }
    }, 1000);

    return () => clearInterval(intervalo);
  }, [props.superPCAt]);

  useEffect(() => {
    if (props.superPCAt) {
      window.location.reload();
    }
  }, []);

  // Calcula as porcentagens dos candidatos em cima dos votos válidos
  useEffect(() => {
    const totalValidos = props.v1 + props.v2;
    if (totalValidos > 0) {
      setPorcentCand1SP(((props.v1 / totalValidos) * 100).toFixed(2));
      setPorcentCand2SP(((props.v2 / totalValidos) * 100).toFixed(2));
    } else {
      setPorcentCand1SP(0);
      setPorcentCand2SP(0);
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
        {/* Topo Holográfico */}
        <div className={styles.topogeral}>
          <div className={styles.logodindin}>
            <div className={styles.logo}>
              <div className={styles.dindin}>Super Computer</div>
            </div>
            <Cronometro minInicial={Number(props.tempoAtualiz)} />
            <div className={styles.datatipo}>
              Tipo: {cargoEleic} / {anaEleic}
            </div>
          </div>
        </div>

        {/* Centro de Estatísticas de Votos */}
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
                </div>
              </div>
            </div>
          </div>

          {/* Painel de Avatares e Abstenções */}
          <div className={styles.porcentagemtopo}>
            {/* Card Candidato 1 */}
            <div
              className={!estiCard1 ? styles.porcent1 : styles.candidatovenc}
              title={`Porcentagem de ${noCand1}`}
            >
              <div className={styles.porc1}>
                <img
                  src="./cand1.jpg"
                  alt={noCand1}
                  className={styles.imgpol}
                />
                <div className={styles.barrastatus}>
                  <BarraStatus porcentagem={porcentCand1SP} />
                </div>
              </div>
            </div>

            {/* Painel Geral de Apuração */}
            <div className={styles.totalvotosvalidos}>
              <div className={styles.totalvv1}>
                <div className={styles.totalvv2}>Total de votos</div>
                <div className={styles.totalvotos} title="Total de votos">
                  {props.v1 + props.v2 + props.v3 + props.v4}
                </div>
              </div>
              <div className={styles.totalvv1}>
                <div className={styles.totalvv2}>Votos válidos</div>
                <div className={styles.totalvotos} title="Votos válidos">
                  {props.v1 + props.v2}
                </div>
              </div>
              <div className={styles.totalvv1}>
                <div className={styles.totalvv2}>Votos brancos</div>
                <div className={styles.totalvotos} title="Votos brancos">
                  {props.v3}
                </div>
              </div>
              <div className={styles.totalvv1}>
                <div className={styles.totalvv2}>Votos nulos</div>
                <div className={styles.totalvotos} title="Votos nulos">
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

            {/* Card Candidato 2 */}
            <div
              className={!estiCard2 ? styles.porcent1 : styles.candidatovenc}
              title={`Porcentagem de ${noCand2}`}
            >
              <div className={styles.porc1}>
                <img
                  src="./cand2.jpg"
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

        {/* Rodapé Tático */}
        <div className={styles.rodape}>
          <p>Desenvolvido por everScript</p>
        </div>
      </div>
    </div>
  );
}

export default SuperPC;