# weather-forecast-app
- Este projeto foi desenvolvido para visualizar a previsão do tempo dos últimos 5 dias de uma determinada cidade inserida no campo de pesquisa.
Também é possível visualizar o histórico de previsão das cidades já pesquisadas.
- A primeira vez que o app inicia, é realizada a pesquisa da cidade padrão (Viçosa).
- Se o dispositivo está sem conexão com a internet e o usuário tenta pesquisar uma cidade,
o app busca a previsão para a cidade pesquisada no histórico de cidades já pesquisadas. Caso não encontre nenhum resultado, uma mensagem é exibida abaixo do campo de pesquisa.
Este Aplicativo consome as informações da seguinte API: https://github.com/wagnerjfreitas/weather-forecast



## Instruções para inicialização
- Intalar os pacotes de dependencias
```bash
yarn
```
- Alterar o endereço IP no arquivo [./config/params.ts] informando o IP da máquina 
na qual o servidor estará rodando.
- Iniciar a API (weather-forecast) antes do app.
- Iniciar o App (weather-forecast-app) com o seguinte comando:
```bash
yarn start
```

## Desenvolvido com Expo
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
- IDE utilizada: VSCode
- Extensões que melhoram o ambiente de desenvolvimento:
  - vscode-styled-components
  - Color Highlight
  - Material Icon Theme

### configurando o tema (cores e fontes)
- adicionar um arquivo global para todas as cores do app
- usar o themeProvider do styled-componnents e setar o arquivo de tema

### Sobrescrevendo o theme do styled-componnents
- criar um arquivo styled.d.ts que sobrescreve o arquivo original dentro da pasta node_modules
Isso faz com que o auto complete do vscode passe a mostrar a nova propriedade quando estiver
montando meu estilo.

```
import 'styled-components';
import theme from './theme';

declare module 'styled-components' {
  type ThemeType = typeof theme

  export interface DefaultTheme extends ThemeType { }
}
```

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


## Bom trabalho!!! :rocket:
