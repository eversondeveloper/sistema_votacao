/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./validacao.module.css";
import ApuraCpf from "./ApuraCpf";
import somTeclas from "../assets/audio/tecla1.mp3";

export default function Validacao(props) {
  const [cpf, setCpf] = useState("");
  const [cpfTrat, setCpfTrat] = useState("");
  const [valRetorno, setValRetorno] = useState("");
  const [eleicaoExistente, setEleicaoExistente] = useState(true);

  useEffect(() => {
    if (cpf !== "") sonsTeclasNum();
  }, [cpf]);

  const valid = (val) => {
    setValRetorno(val);
  };

  let sonsTeclasNum = () => {
    let teclaNum = new Audio(somTeclas);
    teclaNum.volume = 1;
    teclaNum.play();
  };

  const preencheNumeros = (e) => {
    if (cpf.length < 11) {
      const novoCpf = cpf + e.target.value;
      setCpf(novoCpf);
      setCpfTrat(formatarCpf(novoCpf));
    }
  };

  const formatarCpf = (cpf) => {
    const cpfFormatado = cpf
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return cpfFormatado;
  };

  useEffect(() => {
    const numPressionado = (e) => {
      if (/\d/.test(e.key)) {
        const novoCpf = cpf + e.key;
        if (cpf.length < 11) {
          setCpf(novoCpf);
          setCpfTrat(formatarCpf(novoCpf));
        }
      } else if (e.key === "Enter") {
        confirmBtn();
      } else if (e.key === "Delete") {
        setCpf("");
        setCpfTrat("");
      } else if (e.key === "Backspace") {
        const novoCpf = cpf.slice(0, -1);
        setCpf(novoCpf);
        setCpfTrat(formatarCpf(novoCpf));
      }
    };

    window.addEventListener("keydown", numPressionado);

    return () => {
      window.removeEventListener("keydown", numPressionado);
    };
  });

  
  useEffect(() => {
    const verificarEleicao = async () => {
      try {
        const response = await axios.get("http://localhost:3000/eleicao");
        if (response.data.length === 0) {
          setEleicaoExistente(false);
        } else {
          setEleicaoExistente(true);
        }
      } catch (error) {
        console.error("Erro ao verificar eleição:", error);
        setEleicaoExistente(false); 
      }
    };

    verificarEleicao();
  }, []);

  const confirmBtn = () => {
    if (!eleicaoExistente) {
      setValRetorno("Não há eleição cadastrada no momento.");
      return;
    }
    if (cpf !== "") sonsTeclasNum();
    if (
      valRetorno !== "Eleitor não encontrado ou erro na consulta." &&
      valRetorno !== "Eleitor já votou." &&
      valRetorno !== "Não há eleição cadastrada no momento." &&
      valRetorno !== ""
    ) {
      props.setValidacao(false);
      props.setCpfAtual(cpfTrat);
      props.somHeroicoRef.current.play();
    }
  };

  return (
    <div className={styles.validgeral}>
      <div className={styles.botaoganhador1}>
        <button
          className={styles.botaoganhador2}
          onClick={() => {
            props.setVencedor(true);
          }}
        >
          Ganhador
        </button>
      </div>
      <div
        className={styles.btnproposta}
        onClick={() => {
          props.setSuperPC(true);
          props.setCandProp(44);
        }}
      ></div>
      <div className={styles.telabtns}>
        <div className={styles.tela}>
          <div className={styles.cpf}>{cpfTrat}</div>
          <div className={styles.nome}>
            {!eleicaoExistente ? (
              <div className={styles.error}>Não há eleição cadastrada no momento.</div>
            ) : (
              cpf.length === 11 && <ApuraCpf cpf={cpfTrat} valid={valid} />
            )}
          </div>
        </div>
        <div className={styles.botoescontainer}>
          <div className={styles.botoes}>
            <div className={styles.btn1}>
              <input
                type="button"
                value="1"
                className={styles.btns}
                onClick={preencheNumeros}
                title="Tecla 1"
              />
              <input
                type="button"
                value="2"
                className={styles.btns}
                onClick={preencheNumeros}
                title="Tecla 2"
              />
              <input
                type="button"
                value="3"
                className={styles.btns}
                onClick={preencheNumeros}
                title="Tecla 3"
              />
              <input
                type="button"
                value="4"
                className={styles.btns}
                onClick={preencheNumeros}
                title="Tecla 4"
              />
              <input
                type="button"
                value="5"
                className={styles.btns}
                onClick={preencheNumeros}
                title="Tecla 5"
              />
              <input
                type="button"
                value="6"
                className={styles.btns}
                title="Tecla 6"
                onClick={preencheNumeros}
              />
              <input
                type="button"
                value="7"
                className={styles.btns}
                onClick={preencheNumeros}
                title="Tecla 7"
              />
              <input
                type="button"
                value="8"
                className={styles.btns}
                onClick={preencheNumeros}
                title="Tecla 8"
              />
              <input
                type="button"
                value="9"
                className={styles.btns}
                onClick={preencheNumeros}
                title="Tecla 9"
              />

              <input
                type="button"
                value="Corrige"
                className={styles.corrig}
                onClick={() => {
                  if (cpf !== "") sonsTeclasNum();
                  setCpf("");
                  setCpfTrat("");
                }}
                title="Tecla Corrige"
              />

              <input
                type="button"
                value="0"
                className={styles.btns}
                onClick={preencheNumeros}
                title="Tecla 0"
              />
              <input
                type="button"
                value="Confirma"
                className={styles.confi}
                onClick={confirmBtn}
                title="Tecla Confirma"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className={styles.btnproposta}
        onClick={() => {
          props.setSuperPC(true);
          props.setCandProp(11);
        }}
      ></div>
    </div>
  );
}
