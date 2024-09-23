/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import styles from "./propostas.module.css";

function Propostas(props) {
  return (
    <div className={styles.supercomputadorgeral}>
      <div
        className={styles.porcentagem}
        onClick={() => {
          props.setSuperPC(false);
        }}
      >
        <div className={styles.porcentagemtopo}>
          {props.candProp == 44 && (
            <div
              className={styles.porcent1}
              title="Porcentagem do candidato 1."
            >
              <div>
                <img
                  src={"./cand1.jpg"}
                  alt="Batman"
                  className={styles.imgpol}
                />
                <p>
                  {props.numCand1} -{" "}
                  {props.nomeCand1.charAt().toUpperCase() +
                    props.nomeCand1.slice(1)}
                </p>
              </div>
              <div className={styles.divtexto}>
                <h1>Batman para Líder da Liga da Justiça!</h1>
                <p>
                  <strong>Eu sou Batman</strong>, e estou me candidatando para
                  ser o líder da Liga da Justiça. Minha vida tem sido dedicada à
                  proteção, à justiça e à segurança. Agora, desejo levar esses
                  valores para o próximo nível, guiando a Liga da Justiça com
                  uma visão clara e estratégias eficazes.
                </p>
                <h2>Segurança Global</h2>
                <p>
                  Minha prioridade será garantir a segurança de nosso planeta
                  contra todas as ameaças, sejam elas terrestres ou
                  extraterrestres. Utilizarei tecnologia de ponta e táticas
                  avançadas para monitorar e neutralizar perigos antes que
                  possam causar danos significativos.
                </p>
                <h2>Coordenação e Planejamento</h2>
                <p>
                  Promoverei uma maior coordenação entre todos os membros da
                  Liga da Justiça. Cada herói trará suas habilidades únicas para
                  a mesa, e juntos formaremos estratégias robustas e eficientes.
                  Meu foco será em planejamento detalhado e execução precisa
                  para garantir o sucesso de nossas missões.
                </p>
                <h2>Tecnologia e Inovação</h2>
                <p>
                  Investirei no desenvolvimento e implementação de novas
                  tecnologias que fortalecerão nossas capacidades defensivas e
                  ofensivas. Estabelecerei parcerias com os maiores cientistas e
                  inventores do mundo, garantindo que a Liga esteja sempre na
                  vanguarda da inovação.
                </p>
                <h2>Formação e Treinamento</h2>
                <p>
                  A formação contínua é essencial. Criarei programas de
                  treinamento intensivo para todos os membros da Liga,
                  aprimorando suas habilidades e garantindo que estejam
                  preparados para enfrentar qualquer desafio. O treinamento
                  incluirá combate, estratégias de equipe e uso de tecnologia.
                </p>
                <h2>Inteligência e Informações</h2>
                <p>
                  Fortalecerei nossa rede de inteligência para garantir que
                  tenhamos acesso às informações mais recentes e precisas. A
                  coleta e análise de dados serão fundamentais para antecipar e
                  enfrentar ameaças de forma proativa.
                </p>
                <h2>Apoio e Unidade</h2>
                <p>
                  Fomentarei um ambiente de apoio mútuo e unidade entre os
                  membros da Liga. Acredito que uma equipe forte e coesa é a
                  chave para superar qualquer obstáculo. Incentivarei a
                  comunicação aberta e a colaboração entre todos.
                </p>
                <h2>Responsabilidade e Transparência</h2>
                <p>
                  Garantirei que todas as nossas ações sejam guiadas por um
                  forte senso de responsabilidade e transparência. A Liga da
                  Justiça deve ser um exemplo de integridade e justiça para o
                  mundo. Prestaremos contas de nossas ações e decisões, mantendo
                  sempre o foco no bem maior.
                </p>
                <h2>Proteção dos Inocentes</h2>
                <p>
                  Meu compromisso é proteger os inocentes acima de tudo. Lutarei
                  para garantir que cada missão da Liga priorize a segurança e o
                  bem-estar dos civis. Nossa força será usada sempre em defesa
                  dos indefesos.
                </p>
                <p>
                  Com sua confiança, liderarei a Liga da Justiça com
                  determinação, estratégia e um compromisso inabalável com a
                  justiça. Juntos, faremos do mundo um lugar mais seguro para
                  todos.
                </p>
                <p>
                  <strong>Eu sou Batman</strong>, e estou pronto para liderar a
                  Liga da Justiça.
                </p>
                <p>Obrigado.</p>
              </div>
            </div>
          )}
          {props.candProp == 11 && (
            <div
              className={styles.porcent2}
              title="Porcentagem do candidato 2."
            >
              <div>
                <img
                  src={"./cand2.jpg"}
                  alt="Superman"
                  className={styles.imglad}
                />
                <p>
                  {props.numCand2} -{" "}
                  {props.nomeCand2.charAt().toUpperCase() +
                    props.nomeCand2.slice(1)}
                </p>
              </div>
              <div className={styles.divtexto}>
                <h1>Superman para Líder da Liga da Justiça!</h1>

                <p>
                  <strong>Eu sou Superman</strong>, e estou me candidatando para
                  ser o líder da Liga da Justiça. Minha missão sempre foi
                  proteger e inspirar. Como líder da Liga, quero expandir essa
                  missão, guiando nossos heróis para garantir um futuro mais
                  seguro e justo para todos.
                </p>

                <h2>Proteção Global</h2>
                <p>
                  Minha prioridade será a proteção global contra todas as
                  ameaças, sejam elas naturais, tecnológicas ou extraterrestres.
                  Utilizarei meus poderes, combinados com a incrível capacidade
                  dos membros da Liga, para responder rapidamente a qualquer
                  crise e garantir a segurança de todos.
                </p>

                <h2>Unidade e Colaboração</h2>
                <p>
                  Promoverei a unidade e a colaboração entre todos os membros da
                  Liga da Justiça. Cada herói traz uma força única, e juntos,
                  somos mais fortes. Incentivarei a cooperação e a comunicação
                  aberta, garantindo que cada voz seja ouvida e cada talento
                  seja valorizado.
                </p>

                <h2>Justiça e Integridade</h2>
                <p>
                  A justiça e a integridade serão os pilares de minha liderança.
                  Lutarei para garantir que nossas ações sejam justas e
                  transparentes. Prestaremos contas de nossas decisões, mantendo
                  um compromisso inabalável com a verdade e o bem-estar de
                  todos.
                </p>

                <h2>Apoio às Comunidades</h2>
                <p>
                  Além de combater grandes ameaças, focarei em apoiar as
                  comunidades locais. A Liga da Justiça deve ser uma força
                  positiva em todas as áreas, ajudando em desastres naturais,
                  projetos de infraestrutura e promovendo a paz e a segurança
                  nas comunidades.
                </p>

                <h2>Desenvolvimento e Treinamento</h2>
                <p>
                  Investirei no desenvolvimento e treinamento contínuo dos
                  membros da Liga. Garantirei que todos tenham acesso aos
                  melhores recursos e treinamentos para aprimorar suas
                  habilidades e se prepararem para qualquer desafio que possam
                  enfrentar.
                </p>

                <h2>Tecnologia e Inovação</h2>
                <p>
                  A tecnologia é essencial para nosso sucesso. Promoverei o
                  desenvolvimento e a implementação de novas tecnologias que
                  fortaleçam nossas capacidades e melhorem nossa eficiência.
                  Estabelecerei parcerias com cientistas e inovadores para
                  garantir que estamos sempre na vanguarda.
                </p>

                <h2>Defesa do Meio Ambiente</h2>
                <p>
                  Como protetor do planeta, o meio ambiente será uma prioridade.
                  Lutarei para promover práticas sustentáveis e proteger nossos
                  recursos naturais. Acreditamos que um planeta saudável é
                  fundamental para a segurança e o bem-estar de todos os seus
                  habitantes.
                </p>

                <h2>Resolução Pacífica de Conflitos</h2>
                <p>
                  Sempre que possível, buscarei a resolução pacífica de
                  conflitos. Acredito na diplomacia e na negociação como
                  primeiros passos para resolver problemas. A força será usada
                  apenas quando todas as outras opções forem esgotadas.
                </p>

                <h2>Inspiração e Esperança</h2>
                <p>
                  Meu objetivo é inspirar esperança em todos. A Liga da Justiça
                  deve ser um farol de esperança, mostrando que, juntos, podemos
                  superar qualquer obstáculo. Através de nossos esforços, quero
                  que cada pessoa acredite em um futuro melhor e mais brilhante.
                </p>

                <p>
                  Com sua confiança, liderarei a Liga da Justiça com um
                  compromisso inabalável com a justiça, a verdade e a proteção
                  de todos. Juntos, faremos do mundo um lugar mais seguro e mais
                  justo para todos.
                </p>

                <p>
                  <strong>Eu sou Superman</strong>, e estou pronto para liderar
                  a Liga da Justiça.
                </p>

                <p>Obrigado.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Propostas;
