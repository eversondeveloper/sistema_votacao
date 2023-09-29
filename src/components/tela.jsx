/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react'
import styles from './tela.module.css'
import fotoCand1 from '../assets/img/policia.jpg'
import fotoCand1Vice from '../assets/img/outropolicia.jpg'
import fotoCand2 from '../assets/img/bandido.jpg'
import fotoCand2Vice from '../assets/img/outrobandido.jpg'

function Tela(props){

    const [estiloBorda, setEstiloBorda] = useState("")
    const [infos, setInfos] = useState("") 
    let candidato1 = 22
    let candidato2 = 11
    let totalNum = Number(props.num1 + props.num2)
    let nomeCand = ""
    let partidoCand = ""
    let nomeViceCand = ""
    let imageCand = ""
    let imageCandVice = ""

    useEffect(()=>{
        
            props.num2 != "" && totalNum == 22 || totalNum == 11 ? setInfos("#000000") : setInfos("")
            props.num2 != "" && totalNum == 22 || totalNum == 11 ? setEstiloBorda("2px solid #000000") : setEstiloBorda("")
        
    },[props.num2])
        
    if(totalNum == candidato1){
        nomeCand = "Polícia"
        partidoCand = "Patriótico"
        nomeViceCand = "Outro Polícia"
        imageCand = fotoCand1
        imageCandVice = fotoCand1Vice
    }else if(totalNum == candidato2){
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
                        <div type="text" name="numero1" className={styles.numero1}>{props.num1}</div>
                        <div type="text" name="numero2" className={styles.numero2}>{props.num2}</div>
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
        
        {totalNum == 11 || totalNum == 22 ? <div className={styles.teladir}>

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

        </div>

        <div className={styles.telarodape}>
            <p  style={{color: infos}} className={styles.ativo}>Aperte a tecla:</p>
            <p  style={{color: infos}} className={styles.ativo}>CONFIRMA para CONFIRMAR este voto</p>
            <p  style={{color: infos}} className={styles.ativo}>CORRIGE para REINICIAR este voto</p>
        </div>
    </div>
    }
    
    return telaInicial()
}

export default Tela