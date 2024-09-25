/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "./titeleitor.module.css";

const CadastroAdministrador = (props) => {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);
  const [filtrarSugestoes, setFiltrarSugestoes] = useState([]);
  const [jaExisteAdministrador, setJaExisteAdministrador] = useState(false);
  const inputRef = useRef(null);
  const sugestoesRef = useRef(null);

  const somMensagemRef = useRef(null);
  const somMensagemRef2 = useRef(null);

  useEffect(() => {
    const verificarAdministrador = async () => {
      try {
        const response = await axios.get("http://localhost:3000/administrador");
        if (response.data.length > 0) {
          setJaExisteAdministrador(true);
          setMensagem("Já existe um administrador cadastrado neste sistema.");
        }
      } catch (error) {
        console.error("Erro ao verificar administrador:", error);
      }
    };

    verificarAdministrador();
  }, []);

  useEffect(() => {
    if (!somMensagemRef.current) {
      somMensagemRef.current = new Audio("/confirmatitulo.mp3");
      somMensagemRef.current.volume = 1;
      somMensagemRef.current.loop = false;

      somMensagemRef2.current = new Audio("/somtituloerro.mp3");
      somMensagemRef2.current.volume = 1;
      somMensagemRef2.current.loop = false;
    }

    if (mensagem === "Administrador cadastrado com sucesso!") {
      somMensagemRef.current.play();
    }

    if (mensagem === "Erro ao cadastrar administrador.") {
      somMensagemRef2.current.play();
    }

    return () => {
      if (somMensagemRef.current) {
        somMensagemRef.current.pause();
        somMensagemRef.current.currentTime = 0;
      }

      if (somMensagemRef2.current) {
        somMensagemRef2.current.pause();
        somMensagemRef2.current.currentTime = 0;
      }
    };
  }, [mensagem]);

  const emailsFim = [
    "@gmail.com",
    "@hotmail.com",
    "@outlook.com",
    "@yahoo.com.br",
    "@bol.com.br",
    "@uol.com.br",
    "@terra.com.br",
    "@ig.com.br",
    "@globo.com",
  ];

  useEffect(() => {
    document.title = "Cadastro Administrador";
    props.setValidacao(false);
    props.setPaginas(true);

    const handleClickOutside = (event) => {
      if (
        sugestoesRef.current &&
        !sugestoesRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setMostrarSugestoes(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMostrarSugestoes(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        handleSubmit(e);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [nome, cpf, email]);

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
    setCpf(cpfFormatado);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (value.includes("@")) {
      const [localPart, domainPart] = value.split("@");
      if (!domainPart) {
        setFiltrarSugestoes(emailsFim);
        setMostrarSugestoes(true);
      } else {
        const filtered = emailsFim.filter((domain) =>
          domain.includes(domainPart)
        );
        setFiltrarSugestoes(filtered);
        setMostrarSugestoes(filtered.length > 0);
      }
    } else {
      setMostrarSugestoes(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const [localPart] = email.split("@");
    setEmail(localPart + suggestion);
    setMostrarSugestoes(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/administrador", {
        nome,
        cpf,
        email,
      });

      if (response.status === 201) {
        setMensagem("Administrador cadastrado com sucesso!");
        setNome("");
        setCpf("");
        setEmail("");
        
        
        setJaExisteAdministrador(true);
        setTimeout(() => {
          setMensagem("Já existe um administrador cadastrado neste sistema.");
        }, 2000);
      }
    } catch (error) {
      setMensagem("Erro ao cadastrar administrador.");
      console.error("Erro ao cadastrar administrador:", error);
    }
  };

  return (
    <div className={styles.titeleitorgeral}>
      <div className={styles.containereleitor}>
        <h1 className={styles.title}>Cadastro de Administradores</h1>

        {jaExisteAdministrador ? (
          <p className={styles.message}>{mensagem}</p> 
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Nome:</label>
              <input
                type="text"
                className={styles.input}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>CPF:</label>
              <input
                type="text"
                className={styles.input}
                value={cpf}
                onChange={handleCpfChange}
                maxLength="14"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Email:</label>
              <input
                type="text"
                className={styles.input}
                value={email}
                onChange={handleEmailChange}
                maxLength="255"
                ref={inputRef}
              />
              {mostrarSugestoes && (
                <ul className={styles.suggestions} ref={sugestoesRef}>
                  {filtrarSugestoes.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={styles.suggestionItem}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button type="submit" className={styles.button}>
              Cadastrar
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CadastroAdministrador;
