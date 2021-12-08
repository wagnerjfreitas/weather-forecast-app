# weather-forecast-api

Para criar o projeto foi executado o seguinte comando
```bash
expo init
```
### Componentes instalados
```bash
yarn add styled-component
yarn add @types/styled-components-react-native -D
yarn add expo-font @expo-google-fonts/poppins
expo install expo-app-loading
yarn add moment
yarn add axios
yarn add expo-sqlite
expo install expo-file-system expo-asset
```

### Ambiente de desenvolvimento
- instalar no vscode o componente vscode-styled-components

### configurando o tema (cores e fontes)
- adicionar um arquivo global para todas as cores do app
- usar o themeProvider do styled-componnents e setar o arquivo de tema

### Sobrescrevendo o theme do styled-componnents
- criar um arquivo styled.d.ts que sobrescreve o arquivo original dentro da pasta node_modules
Isso faz com que o auto complete do vscode passe a mostrar a nova propriedade quando estiver
montando meu estilo.

### Importação e instalação de fontes do projetos
- Buscar uma fonte de interesse no site do google fonts e instalar no projeto
- yarn add expo-font @expo-google-fonts/poppins
- carregar as fonts no arquivo de inicialização do app. No caso App.ts

### Intalar componente de loading
- expo install expo-app-loading para lidar com o carregamento das fonts, ou seja,
não abre a tela inicial até que as fontes estejam carregadas.

### Importando componente de densidade de pixels
- Este componente ajusta o layout da aplicação de acordo com a densidade de pixels de cada dispositivo ajustando as proporcoes
- yarn add react-native-responsive-fontsize

### Adicao de pacote para formatar datetime
- yarn add moment

### Biblioteca para utilização de icones
- @expo/vector-icons
- Essa biblioteca ja vem instalada por padrão nos projetos criados com expo
- Para escolher o icone acessar o site https://icons.expo.fyi/

### Axios para a comunicação com API
- yarn add axios
- Responsável por fazer a comunicação via protocolo http com API REST

### SQLite para persistencia em banco de dados
- yarn add expo-sqlite
- expo install expo-file-system expo-asset
- https://docs.expo.dev/versions/latest/sdk/sqlite/

### UUID para geração de chave primaria dos registros
- `yarn add uuid`
- `yarn add @types/uuid`
- Para gerar chaves randomicas é necessário adicionar também a seguinte lib 
- `yarn add react-native-get-random-values`

### Componente para obter o estado de conexão com a internet
- expo install @react-native-community/netinfo

### Proximas tarefas
- Verificar se existe registros para a cidade e se tiver deve excluir todos e inserir os novos
- Se não tem a cidade insere os 5 registros.
- Na lista de historico exibir todos os registros de todas as cidades
- Ao selecionar uma cidade deve carregar todos os registros dessa cidade no dashboard

