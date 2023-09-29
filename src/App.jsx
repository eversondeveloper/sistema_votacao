import './App.css'
import Urna from './components/Urna'
import Rodape from './components/Rodape'
import SuperComputador from './components/SuperComputador.jsx'
import { useState } from 'react'



function App() { 

  const [num1Digit, setNum1Digit] = useState("")
  const [num2Digit, setNum2Digit] = useState("")
  const [btnBranco, setBtnBranco] = useState(false)
  const [quantVBrancos, setQuantVBrancos] = useState(0)
  const [quantVNulos, setQuantVNulos] = useState(0)
  const [candidato1, setCandidato1] = useState(0)
  const [candidato2, setCandidato2] = useState(0)
  const [totalVotosReal, setTotalVotosReal] = useState(100)
  const [porcentCand1, setPorcentCand1] = useState(0)
  const [porcentCand2, setPorcentCand2] = useState(0)
  const [porcentCand1Real, setPorcentCand1Real] = useState(51)
  const [porcentCand2Real, setPorcentCand2Real] = useState(100-porcentCand1Real)
  const [comSom, setComSom] = useState(true)

  return <div>

    <SuperComputador num1Digit={num1Digit} setNum1Digit={setNum1Digit} num2Digit={num2Digit} setNum2Digit={setNum2Digit} btnBranco={btnBranco} setBtnBranco={setBtnBranco} quantVBrancos={quantVBrancos} setQuantVBrancos={setQuantVBrancos} candidato1={candidato1} setCandidato1={setCandidato1} candidato2={candidato2} setCandidato2={setCandidato2} quantVNulos={quantVNulos} setQuantVNulos={setQuantVNulos} totalVotosReal={totalVotosReal} setTotalVotosReal= {setTotalVotosReal} porcentCand1Real={porcentCand1Real} setPorcentCand1Real={setPorcentCand1Real} porcentCand2Real={porcentCand2Real} setPorcentCand2Real={setPorcentCand2Real} comSom={comSom} setComSom={setComSom} porcentCand1={porcentCand1} setPorcentCand1={setPorcentCand1} porcentCand2={porcentCand2} setPorcentCand2={setPorcentCand2} />

    <Urna num1Digit={num1Digit} setNum1Digit={setNum1Digit} num2Digit={num2Digit} setNum2Digit={setNum2Digit} btnBranco={btnBranco} setBtnBranco={setBtnBranco} quantVBrancos={quantVBrancos} setQuantVBrancos={setQuantVBrancos} candidato1={candidato1} setCandidato1={setCandidato1} candidato2={candidato2} setCandidato2={setCandidato2} quantVNulos={quantVNulos} setQuantVNulos={setQuantVNulos} totalVotosReal={totalVotosReal} setTotalVotosReal= {setTotalVotosReal} porcentCand1Real={porcentCand1Real} setPorcentCand1Real={setPorcentCand1Real} porcentCand2Real={porcentCand2Real} setPorcentCand2Real={setPorcentCand2Real} comSom={comSom} setComSom={setComSom} porcentCand1={porcentCand1} setPorcentCand1={setPorcentCand1} porcentCand2={porcentCand2} setPorcentCand2={setPorcentCand2} />

    <Rodape />

  </div>
  
}

export default App
