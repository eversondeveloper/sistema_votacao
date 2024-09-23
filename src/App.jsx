/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import Urna from "./components/Urna";
import Rodape from "./components/Rodape";
import { useEffect, useRef, useState } from "react";
import Propostas from "./components/Propostas";
import { Route, Routes, useLocation } from "react-router-dom"; // Importando useLocation
import SuperPC from "./components/pages/SuperPC";
import Validacao from "./components/Validacao";
import TitEleitor from "./components/pages/TitEleitor";
import EleitoresList from "./components/pages/EleitoresList";
import AnimVencedor from "./components/AnimVencedor";
import Apuracao from "./components/Apuracao";
import ApuraEleitores from "./components/ApuraEleitores";
import CadastroEleicao from "./components/pages/CadastroEleicao";
import CadastroAdministrador from "./components/pages/CadastroAdministrador";
import ValidarAdministrador from "./components/ValidarAdministrador";

function App() {
  const [tempoAtualiz, setTempoAtualize] = useState(10);
  const [tipoEleicao, setTipoEleicao] = useState(
    "Líder da Liga da Justiça / 2024"
  );
  const [cargo, setCargo] = useState("Líder da Liga da Justiça");
  const [nomeCand1, setNomeCand1] = useState("batman");
  const [nomeCand2, setNomeCand2] = useState("superman");
  const [numCand1, setNumCand1] = useState(44);
  const [numCand2, setNumCand2] = useState(11);

  const [num1Digit, setNum1Digit] = useState("");
  const [num2Digit, setNum2Digit] = useState("");
  const [btnBranco, setBtnBranco] = useState(false);
  const [quantVBrancos, setQuantVBrancos] = useState(0);
  const [quantVNulos, setQuantVNulos] = useState(0);
  const [candidato1, setCandidato1] = useState(0);
  const [candidato2, setCandidato2] = useState(0);
  const [totalVotosReal, setTotalVotosReal] = useState(100);
  const [porcentCand1, setPorcentCand1] = useState(0);
  const [porcentCand2, setPorcentCand2] = useState(0);
  const [porcentCand1Real, setPorcentCand1Real] = useState(51);
  const [porcentCand2Real, setPorcentCand2Real] = useState(
    100 - porcentCand1Real
  );
  const [candProp, setCandProp] = useState(11);
  const [superPC, setSuperPC] = useState(false);
  const [comSom, setComSom] = useState(true);
  const [superPCAt, setSuperPCAt] = useState(false);

  const [validacao, setValidacao] = useState(true);
  const [paginas, setPaginas] = useState(false);

  const [cpfAtual, setCpfAtual] = useState("");
  const [imageVenc, setImageVenc] = useState("./cand1.jpg");
  const [vencedor, setVencedor] = useState(false);

  const [valido, setValido] = useState(false); // Verifica se o administrador foi validado

  const location = useLocation(); // Hook para pegar a localização atual

  const somCompRuidoRef = useRef(null);

  const somHeroicoRef = useRef(new Audio(`./somheroico4.mp3`));
  somHeroicoRef.current.volume = 0.3;
  somHeroicoRef.current.loop = true;

  const somCand1 = useRef(new Audio(`./supermanmusic.mp3`));
  somCand1.current.volume = 1;
  somCand1.current.loop = true;

  const somCand2 = useRef(new Audio(`./batmanmusic.mp3`));
  somCand2.current.volume = 1;
  somCand2.current.loop = true;

  useEffect(() => {
    if (candProp == 11 && superPC == true) {
      somCand1.current.currentTime = 0;
      somCand1.current.play();
      somCand2.current.pause();
    } else if (candProp == 44 && superPC == true) {
      somCand2.current.currentTime = 0;
      somCand2.current.play();
      somCand1.current.pause();
    } else {
      somCand1.current.pause();
      somCand2.current.pause();
    }
  }, [candProp, superPC]);

  const [v1, setV1] = useState(0);
  const [v2, setV2] = useState(0);
  const [v3, setV3] = useState(0);
  const [v4, setV4] = useState(0);
  const [v5, setV5] = useState(0);

  const pegarValorRet1 = (count) => {
    setV1(Number(count));
  };

  const pegarValorRet2 = (count) => {
    setV2(Number(count));
  };

  const pegarValorRet3 = (count) => {
    setV3(Number(count));
  };

  const pegarValorRet4 = (count) => {
    setV4(Number(count));
  };

  const pegarValorRet5 = (count) => {
    setV5(Number(count));
  };

  useEffect(() => {
    if (v1 > v2) {
      setImageVenc("./cand1.jpg");
    }
    if (v1 < v2) {
      setImageVenc("./cand2.jpg");
    }
    if (v1 == v2) {
      setImageVenc("./empate.jpg");
    }
  }, [v1, v2]);

  const fecharAnimacao = () => {
    setVencedor(false);
  };

  return (
    <div>
      {!valido && location.pathname !== "/cadastroadm" && ( // Valida o administrador exceto na página de cadastro de admin
        <ValidarAdministrador
          valido={valido}
          setValido={setValido}
          onValido={() => console.log("Administrador validado!")}
        />
      )}

      {valido || location.pathname === "/cadastroadm" ? ( // Permite acesso ao cadastro de admin sem validação
        <>
          {vencedor && (
            <AnimVencedor
              image={imageVenc}
              vencedor={vencedor}
              onClose={fecharAnimacao}
            />
          )}

          {!vencedor && (
            <>
              <Routes>
                <Route
                  path="/cadastroadm"
                  element={
                    <CadastroAdministrador
                      validacao={validacao}
                      setValidacao={setValidacao}
                      paginas={paginas}
                      setPaginas={setPaginas}
                      somHeroicoRef={somHeroicoRef}
                    />
                  }
                />
                <Route
                  path="/cadastroeleicao"
                  element={
                    <CadastroEleicao
                      validacao={validacao}
                      setValidacao={setValidacao}
                      paginas={paginas}
                      setPaginas={setPaginas}
                      somHeroicoRef={somHeroicoRef}
                    />
                  }
                />
                <Route
                  path="/superpc"
                  element={
                    <SuperPC
                      num1Digit={num1Digit}
                      setNum1Digit={setNum1Digit}
                      num2Digit={num2Digit}
                      setNum2Digit={setNum2Digit}
                      btnBranco={btnBranco}
                      setBtnBranco={setBtnBranco}
                      quantVBrancos={quantVBrancos}
                      setQuantVBrancos={setQuantVBrancos}
                      candidato1={candidato1}
                      setCandidato1={setCandidato1}
                      candidato2={candidato2}
                      setCandidato2={setCandidato2}
                      quantVNulos={quantVNulos}
                      setQuantVNulos={setQuantVNulos}
                      totalVotosReal={totalVotosReal}
                      setTotalVotosReal={setTotalVotosReal}
                      porcentCand1Real={porcentCand1Real}
                      setPorcentCand1Real={setPorcentCand1Real}
                      porcentCand2Real={porcentCand2Real}
                      setPorcentCand2Real={setPorcentCand2Real}
                      comSom={comSom}
                      setComSom={setComSom}
                      porcentCand1={porcentCand1}
                      setPorcentCand1={setPorcentCand1}
                      porcentCand2={porcentCand2}
                      setPorcentCand2={setPorcentCand2}
                      superPC={superPC}
                      setSuperPC={setSuperPC}
                      superPCAt={superPCAt}
                      setSuperPCAt={setSuperPCAt}
                      tempoAtualiz={tempoAtualiz}
                      setTempoAtualize={setTempoAtualize}
                      tipoEleicao={tipoEleicao}
                      setTipoEleicao={setTipoEleicao}
                      nomeCand1={nomeCand1}
                      setNomeCand1={setNomeCand1}
                      nomeCand2={nomeCand2}
                      setNomeCand2={setNomeCand2}
                      numCand1={numCand1}
                      setNumCand1={setNumCand1}
                      numCand2={numCand2}
                      setNumCand2={setNumCand2}
                      cargo={cargo}
                      setCargo={setCargo}
                      validacao={validacao}
                      setValidacao={setValidacao}
                      paginas={paginas}
                      setPaginas={setPaginas}
                      somHeroicoRef={somHeroicoRef}
                      vencedor={vencedor}
                      setImageVenc={setImageVenc}
                      v1={v1}
                      v2={v2}
                      v3={v3}
                      v4={v4}
                      v5={v5}
                      somCompRuidoRef={somCompRuidoRef}
                    />
                  }
                />
                <Route
                  path="/cadastroeleitor"
                  element={
                    <TitEleitor
                      validacao={validacao}
                      setValidacao={setValidacao}
                      paginas={paginas}
                      setPaginas={setPaginas}
                      somHeroicoRef={somHeroicoRef}
                    />
                  }
                />
                <Route
                  path="/listaeleitores"
                  element={
                    <EleitoresList
                      validacao={validacao}
                      setValidacao={setValidacao}
                      paginas={paginas}
                      setPaginas={setPaginas}
                      somHeroicoRef={somHeroicoRef}
                    />
                  }
                />
              </Routes>

              <div style={{ display: "none" }}>
                <Apuracao numero={44} valorRet={pegarValorRet1} />
                <Apuracao numero={11} valorRet={pegarValorRet2} />
                <Apuracao numero={0} valorRet={pegarValorRet3} />
                <Apuracao numero={1} valorRet={pegarValorRet4} />
                <ApuraEleitores pegarValorRet5={pegarValorRet5} />
              </div>

              {validacao === true && paginas === false && (
                <Validacao
                  validacao={validacao}
                  setValidacao={setValidacao}
                  cpfAtual={cpfAtual}
                  setCpfAtual={setCpfAtual}
                  paginas={paginas}
                  setPaginas={setPaginas}
                  somHeroicoRef={somHeroicoRef}
                  v1={v1}
                  v2={v2}
                  v3={v3}
                  v4={v4}
                  v5={v5}
                  setVencedor={setVencedor}
                  candProp={candProp}
                  setCandProp={setCandProp}
                  superPC={superPC}
                  setSuperPC={setSuperPC}
                />
              )}

              {validacao === false && paginas === false && (
                <Urna
                  num1Digit={num1Digit}
                  setNum1Digit={setNum1Digit}
                  num2Digit={num2Digit}
                  setNum2Digit={setNum2Digit}
                  btnBranco={btnBranco}
                  setBtnBranco={setBtnBranco}
                  quantVBrancos={quantVBrancos}
                  setQuantVBrancos={setQuantVBrancos}
                  candidato1={candidato1}
                  setCandidato1={setCandidato1}
                  candidato2={candidato2}
                  setCandidato2={setCandidato2}
                  quantVNulos={quantVNulos}
                  setQuantVNulos={setQuantVNulos}
                  totalVotosReal={totalVotosReal}
                  setTotalVotosReal={setTotalVotosReal}
                  porcentCand1Real={porcentCand1Real}
                  setPorcentCand1Real={setPorcentCand1Real}
                  porcentCand2Real={porcentCand2Real}
                  setPorcentCand2Real={setPorcentCand2Real}
                  comSom={comSom}
                  setComSom={setComSom}
                  porcentCand1={porcentCand1}
                  setPorcentCand1={setPorcentCand1}
                  porcentCand2={porcentCand2}
                  setPorcentCand2={setPorcentCand2}
                  superPC={superPC}
                  setSuperPC={setSuperPC}
                  superPCAt={superPCAt}
                  setSuperPCAt={setSuperPCAt}
                  tempoAtualiz={tempoAtualiz}
                  setTempoAtualize={setTempoAtualize}
                  tipoEleicao={tipoEleicao}
                  setTipoEleicao={setTipoEleicao}
                  nomeCand1={nomeCand1}
                  setNomeCand1={setNomeCand1}
                  nomeCand2={nomeCand2}
                  setNomeCand2={setNomeCand2}
                  numCand1={numCand1}
                  setNumCand1={setNumCand1}
                  numCand2={numCand2}
                  setNumCand2={setNumCand2}
                  cargo={cargo}
                  setCargo={setCargo}
                  validacao={validacao}
                  setValidacao={setValidacao}
                  cpfAtual={cpfAtual}
                  setCpfAtual={setCpfAtual}
                  paginas={paginas}
                  setPaginas={setPaginas}
                  somHeroicoRef={somHeroicoRef}
                />
              )}

              {superPC === true && paginas === false ? (
                <Propostas
                  num1Digit={num1Digit}
                  setNum1Digit={setNum1Digit}
                  num2Digit={num2Digit}
                  setNum2Digit={setNum2Digit}
                  btnBranco={btnBranco}
                  setBtnBranco={setBtnBranco}
                  quantVBrancos={quantVBrancos}
                  setQuantVBrancos={setQuantVBrancos}
                  candidato1={candidato1}
                  setCandidato1={setCandidato1}
                  candidato2={candidato2}
                  setCandidato2={setCandidato2}
                  quantVNulos={quantVNulos}
                  setQuantVNulos={setQuantVNulos}
                  totalVotosReal={totalVotosReal}
                  setTotalVotosReal={setTotalVotosReal}
                  porcentCand1Real={porcentCand1Real}
                  setPorcentCand1Real={setPorcentCand1Real}
                  porcentCand2Real={porcentCand2Real}
                  setPorcentCand2Real={setPorcentCand2Real}
                  comSom={comSom}
                  setComSom={setComSom}
                  porcentCand1={porcentCand1}
                  setPorcentCand1={setPorcentCand1}
                  porcentCand2={porcentCand2}
                  setPorcentCand2={setPorcentCand2}
                  superPC={superPC}
                  setSuperPC={setSuperPC}
                  superPCAt={superPCAt}
                  setSuperPCAt={setSuperPCAt}
                  tempoAtualiz={tempoAtualiz}
                  setTempoAtualize={setTempoAtualize}
                  tipoEleicao={tipoEleicao}
                  setTipoEleicao={setTipoEleicao}
                  nomeCand1={nomeCand1}
                  setNomeCand1={setNomeCand1}
                  nomeCand2={nomeCand2}
                  setNomeCand2={setNomeCand2}
                  numCand1={numCand1}
                  setNumCand1={setNumCand1}
                  numCand2={numCand2}
                  setNumCand2={setNumCand2}
                  cargo={cargo}
                  setCargo={setCargo}
                  paginas={paginas}
                  setPaginas={setPaginas}
                  somHeroicoRef={somHeroicoRef}
                  candProp={candProp}
                  setCandProp={setCandProp}
                />
              ) : (
                ""
              )}
            </>
          )}

          {validacao === false && paginas === false && <Rodape />}
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
