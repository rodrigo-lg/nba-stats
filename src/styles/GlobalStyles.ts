import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color: #000000;
        color: #ffffff;
    }

    body, input, button, textarea {
        font-family: 'Roboto', sans-serif;
    }

    button {
        border-width: 0;
        cursor: pointer;
    }

    a {
        text-decoration: none;
    }
`;
