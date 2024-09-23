/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import styles from "./urna.module.css";
import { useEffect, useState } from "react";
import somTeclas from "../assets/audio/tecla1.mp3";
import somComfirma from "../assets/audio/confirma.mp3";
import imageLogo from "../assets/img/fundobtnnome.png";
import axios from "axios";
import Apuracao from "./Apuracao";

function Urna(props) {
  const [estiloBorda, setEstiloBorda] = useState("");
  const [infos, setInfos] = useState("");
  const [infos2, setInfos2] = useState("");
  const cpf = props.cpfAtual;

  let candidatoNumero = Number(props.num1Digit + props.num2Digit);
  let nomeCand = "";
  let partidoCand = "";
  let nomeViceCand = "";
  let imageCand = "";
  let imageCandVice = "";

  useEffect(() => {
    props.setCandidato1(<Apuracao numero={props.numCand1} />);
    props.setCandidato2(<Apuracao numero={props.numCand2} />);
    props.setQuantVNulos(<Apuracao numero={1} />);
    props.setQuantVBrancos(<Apuracao numero={0} />);
  }, []);

  const enviarVoto = async (number, cpf) => {
    try {
      const response = await axios.post("http://localhost:3000/votos", {
        number: number,
        cpf: cpf,
      });

      console.log("Voto registrado:", response.data);
    } catch (error) {
      console.error("Erro ao registrar voto:", error);
    }
  };

  let sonsTeclasNum = () => {
    let teclaNum = new Audio(somTeclas);
    teclaNum.volume = 1;
    teclaNum.play();
  };

  let sonsConfirme = () => {
    let confirme = new Audio(somComfirma);
    confirme.volume = 1;
    confirme.play();
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (/\d/.test(e.key)) {
        preencheNumeros(e.key);
      } else if (e.key === "Enter") {
        btnConfirma();
      } else if (e.key === "Backspace") {
        if (props.num2Digit !== "" || props.num1Digit !== "") {
          props.setNum2Digit("");
          props.setNum1Digit("");
        }

        if (props.btnBranco === true) {
          props.setBtnBranco(false);
        }
      } else if (e.key === "-" || e.key === "+") {
        if (
          props.num2Digit == "" &&
          props.num1Digit == "" &&
          props.btnBranco !== true
        ) {
          votosBrancos();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [props.num1Digit, props.num2Digit, props.btnBranco, candidatoNumero]);

  useEffect(() => {
    if (props.num1Digit || props.num2Digit) {
      sonsTeclasNum();
    }
  }, [props.num1Digit, props.num2Digit]);

  const preencheNumeros = (value) => {
    if (props.num1Digit === "") {
      return props.setNum1Digit(value);
    } else if (props.num1Digit !== "" && props.num2Digit === "") {
      return props.setNum2Digit(value);
    }
  };

  const votosBrancos = () => {
    props.setBtnBranco(true);
  };

  useEffect(() => {
    (props.num2Digit !== "" && candidatoNumero === props.numCand1) ||
    candidatoNumero === Number(props.numCand2)
      ? setInfos("#000000")
      : setInfos("");
    (props.num2Digit !== "" && candidatoNumero === props.numCand1) ||
    candidatoNumero === Number(props.numCand2)
      ? setEstiloBorda("2px solid #000000")
      : setEstiloBorda("");
    props.btnBranco === true || props.num2Digit !== ""
      ? setInfos2("#000000")
      : setInfos2("");
    props.btnBranco === true || props.num2Digit !== ""
      ? setEstiloBorda("2px solid #000000")
      : setEstiloBorda("");
  }, [props.num2Digit, props.btnBranco]);

  useEffect(() => {
    if (Number(props.candidato1 + props.candidato2) !== 0) {
      props.setPorcentCand1(
        (
          Number(
            parseFloat(props.candidato1) /
              Number(props.candidato1 + props.candidato2)
          ) * 100
        ).toFixed(2)
      );
    }

    if (Number(props.candidato1 + props.candidato2) !== 0) {
      props.setPorcentCand2(
        (
          Number(
            parseFloat(props.candidato2) /
              Number(props.candidato1 + props.candidato2)
          ) * 100
        ).toFixed(2)
      );
    }
  }, [props.candidato1, props.candidato2, props.porcentCand1]);

  if (candidatoNumero === props.numCand1) {
    nomeCand =
      props.nomeCand1.charAt().toUpperCase() + props.nomeCand1.slice(1);
    partidoCand = "PV - Partido da Vigilância";
    nomeViceCand = "Aquaman";
    imageCand = "./cand1.jpg";
    imageCandVice = "./vicecand1.jpg";
  } else if (candidatoNumero === props.numCand2) {
    nomeCand =
      props.nomeCand2.charAt().toUpperCase() + props.nomeCand2.slice(1);
    partidoCand = "PE - Partido da Esperança";
    nomeViceCand = "Mulher Maravilha";
    imageCand = "./cand2.jpg";
    imageCandVice = "./vicecand2.jpg";
  }

  const telaInicial = () => {
    return (
      <div className={styles.telageral}>
        <div className={styles.tela1} style={{ borderBottom: estiloBorda }}>
          <div className={styles.tela1esq}>
            <div className={styles.frasetopo}>
              <p style={{ color: infos }} className={styles.ativo}>
                Seu voto para
              </p>
            </div>

            <div className={styles.cargo}>
              <h1>{props.cargo}</h1>
            </div>

            <div className={styles.inputs}>
              <div>
                <div className={styles.numeropalavra}>
                  <p style={{ color: infos }} className={styles.ativo}>
                    Número:
                  </p>
                </div>
                <div className={styles.numerocandidato}>
                  <div type="text" name="numero1" className={styles.numero1}>
                    {props.num1Digit}
                  </div>
                  <div type="text" name="numero2" className={styles.numero2}>
                    {props.num2Digit}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.votoembranco1}>
              <div className={styles.nomecandidato}>
                <p style={{ color: infos }} className={styles.ativo}>
                  Nome: {nomeCand}
                </p>
              </div>
              <div className={styles.partido}>
                <p style={{ color: infos }} className={styles.ativo}>
                  Partido: {partidoCand}
                </p>
              </div>
              <div className={styles.vicepresidente}>
                <p style={{ color: infos }} className={styles.ativo}>
                  Vice-Líder: {nomeViceCand}
                </p>
              </div>
            </div>
          </div>

          {candidatoNumero === props.numCand2 ||
          candidatoNumero === props.numCand1 ? (
            <div className={styles.teladir}>
              <div className={styles.fotopresidente}>
                <div className={styles.fotops}>
                  <img src={imageCand} alt="Foto Líder" />
                </div>
                <p style={{ color: infos }} className={styles.ativo}>
                  Líder
                </p>
              </div>

              <div className={styles.fotovicepresidente}>
                <div className={styles.fotoviceps}>
                  <img src={imageCandVice} alt="Foto Vice Líder" />
                </div>

                <p style={{ color: infos }} className={styles.ativo}>
                  Vice-Líder
                </p>
              </div>
            </div>
          ) : (
            ""
          )}

          {props.num2Digit != "" &&
          props.num2Digit != 4 &&
          props.num2Digit != 1 &&
          props.btnBranco == false ? (
            <div className={styles.votonulo}>Voto Nulo</div>
          ) : (
            ""
          )}

          {props.num2Digit !== props.numCand1.toString().charAt(0) &&
          props.num2Digit !== props.numCand2.toString().charAt(1) &&
          props.btnBranco === true ? (
            <div className={styles.votonulo}>Voto Branco</div>
          ) : (
            ""
          )}
        </div>

        <div className={styles.telarodape}>
          <p
            style={{
              color:
                props.btnBranco === true || props.num2Digit !== ""
                  ? infos2
                  : infos,
            }}
            className={styles.ativo}
          >
            Aperte a tecla:
          </p>
          <p
            style={{
              color:
                props.btnBranco === true || props.num2Digit !== ""
                  ? infos2
                  : infos,
            }}
            className={styles.ativo}
          >
            CONFIRMA para CONFIRMAR este voto
          </p>
          <p
            style={{
              color:
                props.btnBranco === true || props.num2Digit !== ""
                  ? infos2
                  : infos,
            }}
            className={styles.ativo}
          >
            CORRIGE para REINICIAR este voto
          </p>
        </div>
      </div>
    );
  };

  const btnConfirma = () => {
    if (props.num1Digit !== "" && props.num2Digit !== "") sonsConfirme();
    if (
      props.num1Digit === "" &&
      props.num2Digit === "" &&
      props.btnBranco === false
    ) {
      alert("Você ainda não digitou nenhum número.");
      props.somHeroicoRef.current.currentTime = 0;
      props.somHeroicoRef.current.pause();
    } else if (props.btnBranco === true) {
      enviarVoto(0, cpf);
      sonsConfirme();
      props.somHeroicoRef.current.currentTime = 0;
      props.somHeroicoRef.current.pause();
    } else if (
      props.num1Digit === props.numCand1.toString().charAt(0) &&
      props.num2Digit === props.numCand1.toString().charAt(1)
    ) {
      enviarVoto(props.numCand1, cpf);
      props.somHeroicoRef.current.currentTime = 0;
      props.somHeroicoRef.current.pause();
    } else if (
      props.num1Digit === props.numCand2.toString().charAt(0) &&
      props.num2Digit === props.numCand2.toString().charAt(1)
    ) {
      enviarVoto(props.numCand2, cpf);
      props.somHeroicoRef.current.currentTime = 0;
      props.somHeroicoRef.current.pause();
    } else {
      if (
        props.btnBranco === false &&
        props.num1Digit !== "" &&
        props.num2Digit !== ""
      ) {
        enviarVoto(1, cpf);
        props.somHeroicoRef.current.currentTime = 0;
        props.somHeroicoRef.current.pause();
      }
    }

    props.btnBranco === true ? props.setBtnBranco(false) : "";
    props.setNum1Digit("");
    props.setNum2Digit("");
    props.setValidacao(true);
  };

  return (
    <div className={styles.corpo}>
      <div className={styles.header}>
        <div className={styles.tela}>{telaInicial()}</div>

        <div
          className={styles.adesivogeral}
          onClick={() => {
            props.setSuperPC(true);
          }}
        >
          <div className={styles.adesivo}>
            <h1>everScript</h1>
          </div>
        </div>
      </div>

      <div className={styles.botoescontainer}>
        <div className={styles.nome}>
          <div className={styles.logo}>
            <img src={imageLogo} alt="nome"></img>
          </div>
        </div>

        <div className={styles.botoes}>
          <div className={styles.btn1}>
            <input
              type="button"
              value="1"
              className={styles.bton1}
              onClick={(e) => preencheNumeros(e.target.value)}
              title="Tecla 1"
            />
            <input
              type="button"
              value="2"
              className={styles.bton2}
              onClick={(e) => preencheNumeros(e.target.value)}
              title="Tecla 2"
            />
            <input
              type="button"
              value="3"
              className={styles.bton3}
              onClick={(e) => preencheNumeros(e.target.value)}
              title="Tecla 3"
            />
            <input
              type="button"
              value="4"
              className={styles.bton4}
              onClick={(e) => preencheNumeros(e.target.value)}
              title="Tecla 4"
            />
            <input
              type="button"
              value="5"
              className={styles.bton5}
              onClick={(e) => preencheNumeros(e.target.value)}
              title="Tecla 5"
            />
            <input
              type="button"
              value="6"
              className={styles.bton6}
              title="Tecla 6"
              onClick={(e) => preencheNumeros(e.target.value)}
            />
            <input
              type="button"
              value="7"
              className={styles.bton7}
              onClick={(e) => preencheNumeros(e.target.value)}
              title="Tecla 7"
            />
            <input
              type="button"
              value="8"
              className={styles.bton8}
              onClick={(e) => preencheNumeros(e.target.value)}
              title="Tecla 8"
            />
            <input
              type="button"
              value="9"
              className={styles.bton9}
              onClick={(e) => preencheNumeros(e.target.value)}
              title="Tecla 9"
            />
            <input
              type="button"
              value="0"
              className={styles.bton0}
              onClick={(e) => preencheNumeros(e.target.value)}
              title="Tecla 0"
            />
          </div>

          <div className={styles.btn2}>
            <input
              type="button"
              value="Branco"
              className={styles.branco}
              title="Botão voto em branco"
              onClick={() => {
                votosBrancos();
              }}
            />
            <input
              type="button"
              value="corrige"
              className={styles.corrige}
              title="Botão corrige"
              onClick={() => {
                props.setNum1Digit("");
                props.setNum2Digit("");
                props.btnBranco === true ? props.setBtnBranco(false) : "";
              }}
            />
            <input
              type="button"
              value="confirma"
              className={styles.confirma}
              title="Botão confirma"
              onClick={() => {
                btnConfirma();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Urna;
