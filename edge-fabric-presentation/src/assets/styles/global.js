import { createGlobalStyle } from 'styled-components';
import colors from './variables/colors';
import typography from './variables/typography';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
    background: ${colors.background};
    color: ${colors.textPrimary};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: ${typography.fontBody};
    overflow: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${typography.fontDisplay};
    font-weight: ${typography.weightBold};
    line-height: ${typography.lineHeight.tight};
    color: ${colors.textPrimary};
  }

  p {
    font-family: ${typography.fontBody};
    color: ${colors.textSubtitle};
  }

  a  { text-decoration: none; color: inherit; }
  ul { list-style: none; }
  button { cursor: pointer; border: none; background: none; font-family: inherit; }
`;

export default GlobalStyle;
