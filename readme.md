## Monorepo
Esta é uma tentativa de monorepo, onde eu utilizo o pnpm para gerenciar os pacotes.
Basicamente são 2 aplicativos, 1 front e um back-end, sendo o front feito em
NextJS e o Back-End utilizando ExpressJS (Ambos TypeScript).

### Dependências
- pnpm;

### Como Executar
O pnpm permite executar um ou mais aplicativos ao mesmo tempo. Para iniciar o ambiente de desenvolvimento, utilize:
```BASH
$ pnpm dev -r
```
o -r significa "recursivo", ele irá procurar todos os workspaces que contém o comando "dev" e executar