/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./validacaoadm.module.css"; 

const ValidarAdministrador = (props) => {
  const [cpfDigitado, setCpfDigitado] = useState("");
  const [mensagem, setMensagem] = useState("");
  

  useEffect(() => {
    if (props.valido) {
      props.onValido();  
    }
  }, [props.valido]);

  const formatarCpf = (cpf) => {
    return cpf
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const handleCpfChange = (e) => {
    const valorCpf = e.target.value;
    const cpfFormatado = formatarCpf(valorCpf);
    setCpfDigitado(cpfFormatado);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://apinode-git-main-everson-silvas-projects-3c80baa3.vercel.app/administrador/cpf/${cpfDigitado}`);
      
      if (response.data.encontrado) {
        props.setValido(true);
        setMensagem("Administrador validado com sucesso!");
      } else {
        setMensagem("CPF inválido. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao validar o CPF do administrador:", error);
      setMensagem("Erro ao validar. Verifique sua conexão e tente novamente.");
    }
  };

  return (
    !props.valido && ( 
      <div className={styles.validacaoadmgeral}>
        <div className={styles.validacaoContainer}>
        <h2>Validação do Administrador</h2>
        <form onSubmit={handleSubmit} className={styles.formValidacao}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>CPF do Administrador:</label>
            <input
              type="text"
              className={styles.input}
              value={cpfDigitado}
              autoFocus
              onChange={handleCpfChange}
              maxLength="14"
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            Validar
          </button>
        </form>
        {mensagem && <p className={styles.mensagem}>{mensagem}</p>}
      </div>
      </div>
    )
  );
};

export default ValidarAdministrador;
