import Router from './routes/Router';
import { GlobalStyle } from './styles/global';

function App() {
  /**
   * console.log
   */
  console.log(
    `
    %c███████╗███████╗ ██████╗  ██████╗ ██████╗  █████╗ ███╗   ██╗ ██████╗ 
    %c██╔════╝██╔════╝██╔════╝ ██╔═══██╗██╔══██╗██╔══██╗████╗  ██║██╔════╝ 
    %c███████╗█████╗  ██║  ███╗██║   ██║██████╔╝███████║██╔██╗ ██║██║  ███╗
    %c╚════██║██╔══╝  ██║   ██║██║   ██║██╔══██╗██╔══██║██║╚██╗██║██║   ██║
    %c███████║███████╗╚██████╔╝╚██████╔╝██║  ██║██║  ██║██║ ╚████║╚██████╔╝
    %c╚══════╝╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝
    %c <-- 세종대학교 커뮤니티 서비스 (by GINK-SS & Scof) -->
    `,
    'color: #f55252',
    'color: #ec9265',
    'color: #e9ac6d',
    'color: #e5c875',
    'color: #e4d278',
    'color: #ddff86',
    'color: #FFFFFF; font-size: 15px;'
  );

  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
