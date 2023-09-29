/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import styles from './urna.module.css'
import imgCaveira from "../assets/img/pngegg.png"
import { useEffect, useState } from 'react'
import fotoCand1 from '../assets/img/policia.jpg'
import fotoCand1Vice from '../assets/img/outropolicia.jpg'
import fotoCand2 from '../assets/img/bandido.jpg'
import fotoCand2Vice from '../assets/img/outrobandido.jpg'
import imgBtnPlay from '../assets/img/btnplay.png'
import imgBtnPause from '../assets/img/btnpause2.png'
import imgBtnReset from '../assets/img/btnreset.png'
import somTeclas from '../assets/audio/tecla1.mp3'
import somComfirma from '../assets/audio/confirma.mp3'
import somCand1V from '../assets/audio/teclapolicia.wav'
import somCand2V from '../assets/audio/teclaladrao.wav'



function Urna(props){

    const [estiloBorda, setEstiloBorda] = useState("")
    const [infos, setInfos] = useState("") 
    const [infos2, setInfos2] = useState("")
    const[corPorcentTela1, setCorPorcentTela1] = useState("white")
    const[corPorcentTela2, setCorPorcentTela2] = useState("white")
    const[numAuto, setNumAuto] = useState(false)
    let candidatoNumero = Number(props.num1Digit + props.num2Digit)
    let nomeCand = ""
    let partidoCand = ""
    let nomeViceCand = ""
    let imageCand = ""
    let imageCandVice = ""

    let sonsTeclasNum = () => {
        let teclaNum = new Audio(somTeclas)
        teclaNum.volume = 1
        teclaNum.play()

    }

    let sonsConfirme = () => {
        let confirme = new Audio(somComfirma)
        confirme.volume = 1
        confirme.play()
    }

    let somCand1 = () => {
        let somCand1Votos = new Audio(somCand1V)
        somCand1Votos.volume = 1
        somCand1Votos.play()
    }

    let somCand2 = () => {
        let somCand2Votos = new Audio(somCand2V)
        somCand2Votos.volume = 1
        somCand2Votos.play()
    }

    useEffect(()=>{
        if(props.num1Digit == 4 && props.num2Digit == 4){
            somCand1()
        }
        if(props.num1Digit == 1 && props.num2Digit == 1){
            somCand2()
        }
    },[props.num1Digit, props.num2Digit])


    // Função que controla o preenchimento dos números

    let preencheNumeros = (e) => {

        if(props.num1Digit == "" || props.num2Digit == ""){
            sonsTeclasNum()
        }

        if(props.num1Digit == ""){
            return props.setNum1Digit(e.target.value)
        }else if(props.num1Digit != "" && props.num2Digit == ""){
            return props.setNum2Digit(e.target.value)
        }

    }

    // Função que controla o voto em branco

    let votosBrancos = () => {

        props.setBtnBranco(true)

    }


    useEffect(()=>{
        
        props.num2Digit != "" && candidatoNumero == 44 || candidatoNumero == 11 ? setInfos("#000000") : setInfos("")
        props.num2Digit != "" && candidatoNumero == 44 || candidatoNumero == 11 ? setEstiloBorda("2px solid #000000") : setEstiloBorda("")

        props.btnBranco == true || props.num2Digit != "" ? setInfos2("#000000") : setInfos2("")
        props.btnBranco == true || props.num2Digit != "" ? setEstiloBorda("2px solid #000000") : setEstiloBorda("")
    
    },[props.num2Digit, props.btnBranco])

    useEffect(()=>{


        
            if(Number(props.candidato1 + props.candidato2) != 0){

                props.setPorcentCand1((Number(parseFloat(props.candidato1)/Number(props.candidato1 + props.candidato2))*100).toFixed(2))
            
            }

            if(Number(props.candidato1 + props.candidato2) != 0){
                
                props.setPorcentCand2((Number(parseFloat(props.candidato2)/Number(props.candidato1 + props.candidato2))*100).toFixed(2))

            }
        


    },[props.candidato1, props.candidato2, props.porcentCand1])
    
    
    if(candidatoNumero == 44){
    
        nomeCand = "Polícia"
        partidoCand = "Patriótico"
        nomeViceCand = "Outro Polícia"
        imageCand = fotoCand1
        imageCandVice = fotoCand1Vice

    }else if(candidatoNumero == 11){

        nomeCand = "Ladrão"
        partidoCand = "Sociopata"
        nomeViceCand = "Outro Ladrão"
        imageCand = fotoCand2
        imageCandVice = fotoCand2Vice

    }
    
    function telaInicial(){
        
        return <div className={styles.telageral}>
        <div className={styles.tela1} style={{borderBottom: estiloBorda}}>
        
        <div className={styles.tela1esq}>

            <div className={styles.frasetopo}>
                <p  style={{color: infos}} className={styles.ativo}>Seu voto para</p>
            </div>

            <div className={styles.cargo}>
                <h1>Presidente</h1>
            </div>
            
            <div className={styles.inputs}>
                <div>
                    <div className={styles.numeropalavra}>
                        <p  style={{color: infos}} className={styles.ativo}>Número:</p>
                    </div>
                    <div className={styles.numerocandidato}>
                        <div type="text" name="numero1" className={styles.numero1}>{props.num1Digit}</div>
                        <div type="text" name="numero2" className={styles.numero2}>{props.num2Digit}</div>
                    </div>
                </div>
            </div>

            <div className={styles.votoembranco1}>
                <div className={styles.nomecandidato}>
                    <p style={{color: infos}}  className={styles.ativo}>Nome: {nomeCand}</p>
                </div>
                <div className={styles.partido}>
                    <p style={{color: infos}} className={styles.ativo}>Partido: {partidoCand}</p>
                </div>
                <div className={styles.vicepresidente}>
                    <p style={{color: infos}} className={styles.ativo}>Vice-Presidente: {nomeViceCand}</p>
                </div>
            </div>

        </div>
        
        {candidatoNumero == 11 || candidatoNumero == 44 ? <div className={styles.teladir}>

        <div className={styles.fotopresidente}>

            <div className={styles.fotops}>
                <img src={imageCand} alt="Foto Presidente" />
            </div>
            <p  style={{color: infos}} className={styles.ativo}>Presidente</p>

        </div>

        <div className={styles.fotovicepresidente}>
            
            <div className={styles.fotoviceps}>
                <img src={imageCandVice} alt="Foto Vice Presidente" />
            </div>
            
            <p  style={{color: infos}} className={styles.ativo}>Vice-Presidente</p>
        
        </div>

        </div>: ""
        }

        {props.num2Digit != "" && props.num2Digit != 4 && props.num2Digit != 1 && props.btnBranco == false?     
            
            <div className={styles.votonulo}>Voto Nulo</div>: ""

        }

        {props.num2Digit != 4 && props.num2Digit != 1 && props.btnBranco == true ?     
            
            <div className={styles.votonulo}>Voto Branco</div>: ""

        }

        </div>

        <div className={styles.telarodape}>
            <p  style={{color: props.btnBranco == true || props.num2Digit != "" ? infos2 : infos}} className={styles.ativo}>Aperte a tecla:</p>
            <p  style={{color: props.btnBranco == true || props.num2Digit != "" ? infos2 : infos}} className={styles.ativo}>CONFIRMA para CONFIRMAR este voto</p>
            <p  style={{color: props.btnBranco == true || props.num2Digit != "" ? infos2 : infos}} className={styles.ativo}>CORRIGE para REINICIAR este voto</p>
        </div>
    </div>
    }       
    
    useEffect(() => {

        if(numAuto == true && Number((props.candidato1 + props.candidato2)) < Number(props.totalVotosReal)){
            let intervalo = setInterval(()=>{
            
                if(props.porcentCand1 < Number(props.porcentCand1Real)){
                    props.setNum1Digit("4")
                    props.setNum2Digit("4")
                }else{
                    props.setNum1Digit("1")
                    props.setNum2Digit("1")
                }
                
                if(Number(props.num1Digit) == "4" && Number(props.num2Digit) == "4"){
                    
                    props.setCandidato1(props.candidato1 + 1)
                    props.setNum1Digit("")
                    props.setNum2Digit("")
                  
                }
                
                if(Number(props.num1Digit) == "1" && Number(props.num2Digit) == "1"){
                    
                    props.setCandidato2(props.candidato2 + 1)
                    props.setNum1Digit("")
                    props.setNum2Digit("")
                    
                }
                
            },500)


            return ()=>{clearInterval(intervalo)}   
        }
        

    })   
        

    let controlesVotos = () => {
        return <div className={styles.quantvotos}>
        <div className={styles.btnsplay}>

            <div className={styles.quantvotosbtn} onClick={()=>{
                numAuto == false ? setNumAuto(true) : setNumAuto(false)
                sonsTeclasNum()
                }} ><img src={numAuto == true ? imgBtnPause : imgBtnPlay} title="Botão play inicia a aplicação automática dos votos." /></div>
            {/* <div className={styles.pausevotos} ><img src={imgBtnPause} title="Botão pause pausa a contagem dos votos" /></div> */}
            <div type="button" value="Reset" className={styles.resetbtn} onClick={()=>{
                sonsTeclasNum()
                location.reload()
                }} ><img src={imgBtnReset} title="Reseta a urna." /></div>
            {/* <div className={styles.comsom} ><img src={imgSom} title="Botão play inicia a contagem dos votos" onClick={()=>{
                props.comSom == true ? props.setComSom(false) : props.setComSom(true)
                }} /></div> */}
            <div className={styles.controles}>
            Polícia<input title='Digite a porcentagem do candidato 1.' type="number" name="porcentagem" className={styles.escolherporcentagem} value={props.porcentCand1Real} onChange={(e)=>{
                props.setPorcentCand1Real(e.target.value)
                props.setPorcentCand2Real(100-e.target.value)
                
            }
        } />%   /
            Ladrão<div type="number" name="porcentagem" className={styles.escolherporcentagem2} title='Porcentagem do candidato 2.' >{props.porcentCand2Real}</div>%   
            /   Quantidade de votos<input type="number" name="limite" className={styles.escolherlimite} value={props.totalVotosReal} title="Digite o total de votos que deseja, sem os pontos." onChange={(e)=>{props.setTotalVotosReal(e.target.value)}} />
            </div>
        </div>

    </div>
    }

    useEffect(()=>{

        if(props.porcentCand1 > 50){
            setCorPorcentTela1("yellow")
        }else{
            setCorPorcentTela1("white")
        }

    },[props.porcentCand1])

    useEffect(()=>{

        if(props.porcentCand2 > 50){
            setCorPorcentTela2("yellow")
        }else{
            setCorPorcentTela2("white")
        }

    },[props.porcentCand2])

    let btnConfirma = () => {

        sonsConfirme()
            
        props.btnBranco == true ? props.setQuantVBrancos(props.quantVBrancos + 1) : ""
        
        if(Number(props.num1Digit) == "" && Number(props.num2Digit) == "" && props.btnBranco == false){

            alert("Você ainda não digitou nenhum número.")

        }else if(Number(props.num1Digit) == 4 && Number(props.num2Digit) == 4){

            props.setCandidato1(props.candidato1 + 1)

        }else if(Number(props.num1Digit) == 1 && Number(props.num2Digit) == 1){

            props.setCandidato2(props.candidato2 + 1)

        }else{

            props.btnBranco == false ? Number(props.num1Digit) != "" && Number(props.num2Digit) != "" ? props.setQuantVNulos(props.quantVNulos + 1) : "" : ""

        }

        props.btnBranco == true ? props.setBtnBranco(false) : ""

        props.setNum1Digit("")
        props.setNum2Digit("")

    }




    return <div className={styles.corpo}>

        <div className={styles.header}>

            {controlesVotos()}

                <div className={styles.tela}>

                    {telaInicial()}

                </div>

                <div className={styles.adesivogeral}>
                    <div className={styles.adesivo}>
                        <h1>ever$cript</h1>
                    </div>  
                </div>                

        </div>

        <div className={styles.totalreal}>

            <p>Brancos</p><div title='Quantidade de votos brancos.' className={styles.vbrancosreal}>{props.quantVBrancos}</div>
            
            <p>Nulos</p><div title='Quantidade de votos nulos.' className={styles.vnulosreal}>{props.quantVNulos}</div>
            
            <p>Polícia</p><div title='Quantidade de votos do candidato 1.' className={styles.cand1}>{props.candidato1}</div>
            
            <p>Ladrão</p><div  title='Quantidade de votos do candidato 2.' className={styles.cand2}>{props.candidato2}</div>
            
            <p>Total Váls.</p><div className={styles.totalcandtela} title='Total de votos válidos.' >{Number(props.candidato1) + Number(props.candidato2)}</div>

            <p>Polícia</p><div style={{backgroundColor: corPorcentTela1}} className={styles.totalporcenttela1} title='Porcentagem do candidato 1.' >{props.porcentCand1}%</div>
            
            <p>Ladrão</p><div style={{backgroundColor: corPorcentTela2}} className={styles.totalporcenttela2} title='Porcentagem do candidato 2.' >{props.porcentCand2}%</div>
        
        </div>


                <div className={styles.botoescontainer}>

                <div className={styles.nome}>

                    <div className={styles.logo}>
                        <img src={imgCaveira} alt="Caveira de pirata" />
                    </div>

                    <div className={styles.nomedaurna}>
                        <p>Pirataria</p>
                        <p>Eleitoral</p>
                    </div>

                </div>

                <div className={styles.botoes}>
                    <div className={styles.btn1}>
                    
                        <input type="button" value="1" className={styles.bton1} onClick={preencheNumeros} title='Tecla 1' />
                        <input type="button" value="2" className={styles.bton2} onClick={preencheNumeros} title='Tecla 2' />
                        <input type="button" value="3" className={styles.bton3} onClick={preencheNumeros} title='Tecla 3' />
                        <input type="button" value="4" className={styles.bton4} onClick={preencheNumeros} title='Tecla 4' />
                        <input type="button" value="5" className={styles.bton5} onClick={preencheNumeros} title='Tecla 5' />
                        <input type="button" value="6" className={styles.bton6} title='Tecla 6' onClick={preencheNumeros} />
                        <input type="button" value="7" className={styles.bton7} onClick={preencheNumeros} title='Tecla 7' />
                        <input type="button" value="8" className={styles.bton8} onClick={preencheNumeros} title='Tecla 8' />
                        <input type="button" value="9" className={styles.bton9} onClick={preencheNumeros} title='Tecla 9' />
                        <input type="button" value="0" className={styles.bton0} onClick={preencheNumeros} title='Tecla 0' />

                    </div>

                    <div className={styles.btn2}>
                        <input type="button" value="Branco" className={styles.branco} title="Botão voto em branco" onClick={()=>{
                            votosBrancos()
                        }} />
                        <input type="button" value="corrige" className={styles.corrige} title="Botão corrige" onClick={()=>{
                            props.setNum1Digit("")
                            props.setNum2Digit("")
                            props.btnBranco == true ? props.setBtnBranco(false) : ""
                            }} />
                        <input type="button" value="confirma" className={styles.confirma} title="Botão confirma" onClick={()=>{
                            btnConfirma()
                        }} />
                    </div>

                </div>
                </div>
            </div>
            
}

export default Urna