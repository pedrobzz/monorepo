## Monorepo
Esta é uma tentativa de monorepo, onde eu utilizo o pnpm para gerenciar os pacotes.
Basicamente são 2 aplicativos, 1 front e um back-end, sendo o front feito em
NextJS e o Back-End utilizando ExpressJS (Ambos TypeScript).


## Objetivo
É um grande experimento, o principal objetivo era melhorar a organização do código (o que acabou não sendo tão possível por conta do Docker), treinar Docker, aprender GraphQL e usar o Mantine. 

# **Aplicações**:
## **DataBase**
É uma database simples, que é criada a partir do docker-compose.yaml e executa uma maquina virtual rodando o PostgreSQL. A database roda na porta 5432, se estiver em modo de produção, e 5000 no modo de desenvolvimento.

## **API**
A API roda utilizando Express e Apollo. O Express faz uma rota simples, que retorna apenas "Hello, GraphQL", e o Apollo cuida de utilizar o Type GraphQL. Tem um resolver padrão, que é o de posts, e permite você fazer um CRUD simples, para visualizar no Front-End. O Back-End roda na porta 4000

## **WEB**
O WEB é o Front-End, feito utilizando NextJS, Mantine, GraphQL, GraphQL Code Generator, Apollo e React-Query. Mantine é o style system, que utilizei para aprender. O GraphQL/Apollo são utilizados para se comunicar com os resolvers do Back-End (utilizando, também, hooks do React-Query) e o NextJS foi escolhido por questões de performance e por ser melhor que o React Puro. O Front End roda na porta 3000.


---

### Dependências
- pnpm;
- docker (opcional para rodar em container);


### Objetivos
- [x] Multiplos workspaces;
- [ ] Eslint e tsconfig compartilhados;
- [x] Execução simultânea;
- [x] Docker;
- [x] Se Conectar com a Database
- [x] Deploy na Vercel;

### Como Executar
O pnpm permite executar um ou mais aplicativos ao mesmo tempo. Para iniciar o ambiente de desenvolvimento, utilize:
```BASH
$ pnpm dev -r
```
o -r significa "recursivo", ele irá procurar todos os workspaces que contém o comando "dev" e executar;

Para executar o Docker completo clone este repositório e execute o seguinte comando:
```
$ docker-compose up -d --build
```