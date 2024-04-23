## Teste de Cadastro com Confirmação de E-mail via Mailosaur na Netshoes

Este caso de teste executa um processo de cadastro de um novo usuário, com dados válidos, no site da Netshoes e, subsequentemente, realiza a confirmação do código enviado via e-mail. Foi utilizado o framework Cypress e a biblioteca do Mailosaur e a linguagem execução ocorreu em JavaScript. Para interceptação das respostas de algumas requisições com protocolos `HTTPS` foi utilizado cy.Interceptation.

## Pré-requisitos: 
Realizar cadastro no Mailosaur e obter SERVER_ID e API_KEY 

## Execução do teste:
1 - Instalação das dependências: npm install;

2 - Criação do arquivo [cypressexemplo.env.json](./cypress/support/cypressexemplo.env.json) com SERVER_ID e API_KEY do Mailosaur; 

3 - Execução do teste: npm test;

4 - Para execução da interface gráfica do cypss: npx cypress open.

## Cenário de teste:   
Cadastro de usuário 

## Caso de teste:
Realização de cadastro com credenciais válidas e confirmação de código por e-mail via Mailosaur

1.0 Acessar e-commerce da Netshoes 
   
    1.1 Acessar tela de login
    1.2  Prosseguir com cadastro de novo usuário

2.0 - Prenchendo campos obrigatórios na tela de cadastro direcionado a pessoa física

    2.1 Nome
    2.1 Sobrenome
    2.3 Sexo
    2.4 Data de nascimento 
        2.4.1 Selecionar dia
        2.4.2 Selecionar mês 
        2.4.3 Selecionar ano
    2.5 CPF
    2.6 Celular
    2.7 CEP
    2.8 Tipo de endereço
    2.9 Endereço
    2.10 Número
    2.11 Bairro
    2.12 Cidade
    2.13 Estado

3.0 Preenchendo campos relativos a sua conta 

    3.1 E-mail
    3.2 Senha
    3.3 Desmarcando preenchimento para recebimento de oferta via e-mail
    3.4 Concordando com termos de política e privacidade
    3.5 Continuar para finalizar etapa de dados 

4.0 Confirmando código verificador via e-mail para conclusão do processo de cadastro

    4.1 Preenchimento dos código de 6 dígitos
    4.2 Realizando validação do cadastro sendo concluído com sucesso


  ## Contato
  
  Linkedin: 
 
  [Gabriel Logan](https://www.linkedin.com/in/gabriel-logan/) 
  

   [Hiago Gil](https://www.linkedin.com/in/hiago-gil-b94169166/) 

 Email(s):  

 gabriellogan.0804@gmail.com 

 hiagoqagil@gmail.com 

