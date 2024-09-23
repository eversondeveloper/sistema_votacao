Site de exemplo:
https://eversondeveloper.github.io/sistema_votacao/


# Sistema de Votação Eletrônica

## Introdução e Objetivos

Nas eleições de 2022, foi observado um elevado número de abstenções entre os eleitores brasileiros, o que levantou preocupações sobre o engajamento cívico e a conscientização política da população. Este problema é alarmante, pois a participação eleitoral é um dos pilares fundamentais da democracia. A ausência nas urnas afeta diretamente a representatividade e a legitimidade dos processos eleitorais. 

Diante deste contexto, surgiu a necessidade de abordar esse desafio desde a base, promovendo o ensino e a conscientização sobre a importância do voto entre as futuras gerações.

Como parte das exigências da disciplina de **Banco de Dados** do curso de **Engenharia de Software**, o projeto proposto teve como objetivo identificar um problema social relevante e desenvolver uma solução tecnológica que ajudasse a mitigar ou resolver essa questão. O foco escolhido foi a **educação eleitoral**, visando diminuir as taxas de abstenção no futuro por meio da formação de eleitores mais conscientes.

## Problema Observado

A baixa participação nas eleições brasileiras reflete a falta de engajamento político, sobretudo entre as camadas mais jovens da população. Crianças, adolescentes e jovens que ainda não atingiram a idade mínima para votar têm pouca exposição ao processo eleitoral, o que contribui para o desinteresse e, eventualmente, para a abstenção quando alcançam a idade para votar. 

A abstenção elevada nas eleições de 2022 foi o ponto de partida para a criação de uma solução que pudesse, desde cedo, educar e conscientizar os futuros eleitores sobre a importância de seu voto. Nesse contexto, foi necessário pensar em uma ferramenta interativa e acessível, capaz de simular o ambiente eleitoral e proporcionar uma experiência prática para os mais jovens.

## Solução Criada

Foi desenvolvido um **Sistema de Votação Eletrônico** que simula o processo eleitoral brasileiro, tendo como público-alvo crianças, adolescentes e jovens. O sistema permite que eles interajam com todas as fases do processo eleitoral, desde o cadastro como eleitores até a apuração dos resultados de uma eleição simulada. A ideia é promover a educação cívica e familiarizar os futuros eleitores com as etapas do processo eleitoral.

O sistema foi projetado para ser simples e intuitivo, permitindo que os usuários compreendam, na prática, como uma eleição acontece. A interface da **urna eletrônica** simula o processo de votação real, enquanto o supercomputador realiza a apuração dos votos, detalhando o número de votos para cada candidato, votos brancos, nulos e abstenções. O sistema permite o cadastro de eleitores com CPF e dados fictícios, simulando o processo real de inserção de informações no sistema eleitoral.

## Exigências da Disciplina

O projeto de extensão foi criado como parte das exigências da disciplina de **Banco de Dados**, onde foi solicitado o desenvolvimento de uma aplicação que resolvesse um problema identificado na sociedade. A aplicação deveria utilizar conceitos avançados de **modelagem de banco de dados** e **sistemas de informação**.

O sistema criado armazena os dados dos eleitores e das eleições em um banco de dados relacional, realizando consultas em tempo real para verificar se o eleitor já votou, validar as informações, registrar os votos e apurar os resultados, de forma automatizada e armazenada no banco de dados em nuvem.

## Estrutura do Sistema

O **Sistema de Votação Eletrônica** é composto por uma série de módulos, que interagem entre si e com o banco de dados para proporcionar uma simulação eleitoral completa:

- **Cadastro de Administrador**: Todo o sistema começa com o cadastro do administrador, sendo que todas as páginas ficam bloqueadas até que ele esteja registrado.
- **Cadastro de Eleições**: O administrador pode cadastrar novas eleições, incluindo informações sobre os candidatos e cargos. Os eleitores só podem votar após uma eleição ser cadastrada.
- **Cadastro de Eleitores**: Permite o registro de eleitores no banco de dados, inserindo nome, CPF e e-mail. O administrador pode cadastrar eleitores mesmo sem uma eleição ativa.
- **Validação de Eleitores**: Verifica se existe uma eleição ativa, se o eleitor está cadastrado no sistema e se já votou, evitando duplicidade de votos.
- **Urna Eletrônica**: Simula o ambiente de votação, onde o eleitor escolhe o candidato e confirma seu voto.
- **Apuração dos Votos**: Realiza a contagem dos votos registrados, calculando também votos brancos, nulos e a porcentagem de abstenções.
- **Resultados Finais**: Exibe o candidato vencedor com base na apuração dos votos.
- Todos os registros e consultas são feitos em nuvem, através do servidor de banco de dados **Tembo**, com **Postgres**, administrado pelo **PgAdmin**.

## Conclusão

O **Sistema de Votação Eletrônica** criado visa promover a conscientização política e ensinar a importância do voto desde a infância. Ao simular o processo eleitoral completo, o sistema oferece uma experiência educativa e interativa, contribuindo para a formação de eleitores mais engajados e informados. Dessa forma, espera-se que, no futuro, a abstenção nas eleições possa ser reduzida, aumentando a participação cívica e fortalecendo a democracia.
