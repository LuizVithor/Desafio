import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    height: 100dvh;
    font-family: system-ui, sans-serif;
    transition: background-color 0.5s linear;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active{
      -webkit-box-shadow: 0 0 0 30px ${({ theme }) => theme.background} inset !important;
  }

*::-webkit-scrollbar {
  height: 10px;
  width: 10px;
}
*::-webkit-scrollbar-track {
  border-radius: 5px;
  background-color: ${({ theme }) => theme.background};
}

*::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #1C355C;
}

*::-webkit-scrollbar-thumb:hover {
  background-color: ${({ theme }) => theme.primary};
}

*::-webkit-scrollbar-thumb:active {
  background-color: #0D192C;
}

`