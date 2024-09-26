/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "./titeleitor.module.css";

const TitEleitor = (props) => {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  const somMensagemRef = useRef(null);
  const somMensagemRef2 = useRef(null);

  useEffect(() => {
    if (!somMensagemRef.current) {
      somMensagemRef.current = new Audio("/confirmatitulo.mp3");
      somMensagemRef.current.volume = 1;
      somMensagemRef.current.loop = false;

      somMensagemRef2.current = new Audio("/somtituloerro.mp3");
      somMensagemRef2.current.volume = 1;
      somMensagemRef2.current.loop = false;
    }

    if (mensagem == "Eleitor cadastrado com sucesso!") {
      somMensagemRef.current.play();
    }

    if (mensagem == "Erro ao cadastrar eleitor.") {
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
    document.title = "Cadastro Eleitor";
    props.setValidacao(false);
    props.setPaginas(true);

    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowSuggestions(false);
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
        setFilteredSuggestions(emailsFim);
        setShowSuggestions(true);
      } else {
        const filtered = emailsFim.filter((domain) =>
          domain.includes(domainPart)
        );
        setFilteredSuggestions(filtered);
        setShowSuggestions(filtered.length > 0);
      }
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const [localPart] = email.split("@");
    setEmail(localPart + suggestion);
    setShowSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://apinode-git-main-everson-silvas-projects-3c80baa3.vercel.app/eleitores", {
        nome,
        cpf,
        email,
      });

      if (response.status === 201) {
        setMensagem("Eleitor cadastrado com sucesso!");
        setNome("");
        setCpf("");
        setEmail("");
        setTimeout(() => {
          setMensagem("");
        }, 2000);
      }
    } catch (error) {
      setMensagem("Erro ao cadastrar eleitor.");
      console.error("Erro ao cadastrar eleitor:", error);
    }
  };

  return (
    <div className={styles.titeleitorgeral}>
      <div className={styles.containereleitor}>
        <h1 className={styles.title}>Cadastro de Eleitores</h1>
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
            {showSuggestions && (
              <ul className={styles.suggestions} ref={suggestionsRef}>
                {filteredSuggestions.map((suggestion, index) => (
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
        {mensagem && <p className={styles.message}>{mensagem}</p>}
      </div>
    </div>
  );
};

export default TitEleitor;
