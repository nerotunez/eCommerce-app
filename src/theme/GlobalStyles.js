// globalStyles.js
import { createGlobalStyle } from 'styled-components';



const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: 'Raleway', sans-serif;
    color: #1d1f22;
  }
  body{
    padding: 0 100px;
    overflow: ${props => (props.overflow === 'show' ? 'auto' : 'hidden')};
    @media (max-width: 700px) {
   padding: 0 20px;
  }
  }
  a{
  text-decoration:none;    
  }
`;

export default GlobalStyle;