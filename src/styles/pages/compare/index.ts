import styled from 'styled-components';

export const Container = styled.div`
    margin: calc(94px + 2em) auto 80px;
    width: 90%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;

    form {
        margin-bottom: 60px;
        width: 100%;

        fieldset {
            display: flex;
            flex-direction: column;
            border: none;

            legend {
                margin: 0 auto 40px;

                font-size: 1.5em;
                font-weight: bold;

                color: #fff;
            }

            select {
                padding: 12px;
                border-radius: 8px;
                margin-bottom: 20px;
                width: 100%;

                font-size: 1.2em;

                background-color: #fff;
            }

            button {
                width: 100%;
                padding: 12px;
                border-radius: 8px;

                font-size: 1.2em;

                color: #fff;
                background-color: #0577fb;

                transition: background-color 0.3s;
                outline: none;
            }

            button:hover {
                background-color: #3290fb;
            }
        }
    }
`;
