/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import styles from './supercomputador.module.css'
import imgPolicia1 from "../assets/img/policia.jpg"
import imgLadrao1 from "../assets/img/bandido.jpg"
import imgBonequinho from "../assets/img/running.gif"
import imgBonequinho2 from "../assets/img/running.png"
import { useEffect, useState } from 'react'
import corruptionMoney from '../assets/audio/money.mp3'
import festaPolicia from '../assets/audio/somfestapoliciageral.mp3'
import festaLadrao from '../assets/audio/somfestaladraogeral.mp3'
import vitPolicia from '../assets/img/seloPolicia.png'
import vitLadrao from '../assets/img/seloladrao.png'



function SuperComputador(props){
     
    const[candidato1SP, setCandidato1SP] = useState(0)
    const[candidato2SP, setCandidato2SP] = useState(0)
    const[porcentCand1SP, setPorcentCand1SP] = useState(0)
    const[porcentCand2SP, setPorcentCand2SP] = useState(0)
    const[corPorcent1, setCorPorcent1] = useState("white")
    const[corPorcent2, setCorPorcent2] = useState("white")
    const[corruption, setCorruption] = useState(false)
    let limiteSP = props.totalVotosReal
    let porcentGeralSP = parseInt((Number(candidato1SP+candidato2SP)/limiteSP)*100)

    let imagemFinal = () => {

        let imagemF = ""

        if(porcentGeralSP == 100 && porcentCand1SP > 50){
            imagemF = vitPolicia
        }else if(porcentGeralSP == 100 && porcentCand2SP > 50){
            imagemF = vitLadrao
        }

        return <div className={styles.imagemfinal}>
            <img src={imagemF} alt="" />
        </div>
    }

    
    let sonsCorruption = () => {
        let corruptionMoneySom = new Audio(corruptionMoney)
        corruptionMoneySom.volume = 1
        corruptionMoneySom.play()

    }

    useEffect(()=>{
        if(corruption == true){
            sonsCorruption()
        }
    },[corruption])

    let somFP = () =>{
        let somfestaP = new Audio(festaPolicia)
        somfestaP.volume = 1
        somfestaP.play()
    }

    let somFL = () =>{
        let somfestaL = new Audio(festaLadrao)
        somfestaL.volume = 1
        somfestaL.play()
    }

    useEffect(()=>{
        if(porcentGeralSP == 100){
            if(porcentCand1SP > porcentCand2SP){
                setTimeout(() => {
                    somFP()
                }, 500);
            }if(porcentCand1SP < porcentCand2SP){
                setTimeout(() => {
                    somFL()
                }, 500);
            }else{
                ""
            }
        }
    },[porcentCand1SP])



    useEffect(()=>{
                
        if(props.candidato1 != 0){
            
            if(porcentCand2SP < 52.00 && corruption == true){
                setCandidato2SP(candidato2SP+1)
            }else{
                setCandidato1SP(candidato1SP+1)
            }

        }

    },[props.candidato1])

    useEffect(()=>{
        
        if(props.candidato2 != 0){

            setCandidato2SP(candidato2SP+1)
        }


    },[props.candidato2])

    useEffect(()=>{
        if(candidato1SP != 0 || candidato2SP != 0){            

            setPorcentCand1SP((Number(parseFloat(candidato1SP)/Number(candidato1SP + candidato2SP))*100).toFixed(2))        
            

        }

        if(candidato2SP != 0 || candidato1SP != 0){
            
            setPorcentCand2SP((Number(parseFloat(candidato2SP)/Number(candidato1SP + candidato2SP))*100).toFixed(2))

        }


    },[candidato1SP, candidato2SP])

    useEffect(()=>{

        if(porcentCand1SP>50){
            setCorPorcent1("yellow")
        }else{
            setCorPorcent1("white")
        }

    },[porcentCand1SP,])

    useEffect(()=>{

        if(porcentCand2SP>50){
            setCorPorcent2("yellow")
        }else{
            setCorPorcent2("white")
        }

    },[porcentCand2SP,])


    return <div className={styles.porcentagem}>

    <div className={styles.result}>
        <div className={styles.logodindin}>

            <div className={styles.logo} onClick={()=>{corruption == false ? setCorruption(true) : setCorruption(false)}}><div className={styles.dindin} style={{color: corruption == true ? "red" : ""}}>$UPER</div>Computer</div>
            
        </div>
        <div className={styles.estatisticas}>
            
            <div className={styles.resultado}>                
                
                <div className={styles.vbrancos}>
                    <p>Brancos <strong className={styles.vbrancos2}title='Quantidade de votos brancos.'>{props.quantVBrancos}</strong></p>
                </div>
                <div className={styles.vnulos}>
                    <p>Nulos <strong className={styles.vnulos2} title='Quantidade de votos nulos.'>{props.quantVNulos}</strong></p>
                </div>
                <div className={styles.candidatoum}>
                    <p>Polícia <strong className={styles.candidatoumum} title='Quantidade de votos do candidato 1.'>{candidato1SP}</strong></p>
                </div>
                <div className={styles.candidatodois}>
                    <p>Ladrão <strong className={styles.candidatodoisdois} title='Quantidade de votos do candidato 2.'>{candidato2SP}</strong></p>
                </div>
                <div className={styles.totalvotosvalidos}>
                    <p>T. Válidos <strong className={styles.totalvotos} title='Total de votos válidos.'>{candidato1SP+candidato2SP}</strong></p>
                </div>

            </div>            

        </div>

        <div className={styles.porcentagemtopo}>
        
            <div className={styles.porcent1} title='Porcentagem do candidato 1.'>
                <div><img src={imgPolicia1} alt="Candidato Polícia" className={styles.imgpol} />
                </div>
                <div style={{color: corPorcent1}}>
                    <p>Nº44 - Polícia <strong className={styles.por1} >{porcentCand1SP}</strong>%</p>
                </div>
            </div>
            <div className={styles.porcent2} title='Porcentagem do candidato 2.'>
                <div><img src={imgLadrao1} alt="Candidato Ladrão" className={styles.imglad} />
                </div>
                <div style={{color: corPorcent2}}>
                    <p>Nº11 - Ladrão <strong className={styles.por2} >{porcentCand2SP}</strong>%</p>
                </div>
            </div>
            
        </div>

    </div>

    <div className={styles.barra1}>
        <div className={styles.barra2} style={{width: `${porcentGeralSP}%`, backgroundColor: porcentCand1SP > 50 ? "green" : porcentCand1SP == 50 ? "gray" : "red", transition: "1000ms"}}>
            <div className={styles.bonequinho}>{porcentGeralSP}%<img src={porcentGeralSP != 100 ? imgBonequinho : imgBonequinho2} alt="" /></div>
            <div className={styles.porcentagembarra} ></div>
        </div>
    </div>
    {imagemFinal()}

</div>
}

export default SuperComputador