import styled from 'styled-components';

export const Cover = styled.div`
    margin-top: calc(44px + 2em);
    position: relative;
    height: 54vh;
    background-image: url('/images/nba_court.png');
    background-position: center;

    h1 {
        margin: 0 auto;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        font-family: 'Graduate', cursive;
        font-size: 3em;
        text-align: center;
        text-decoration: underline;
        color: #ffffff;
    }
`;

export const Container = styled.div`
    margin: 40px auto;
    width: 80%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    div {
        margin-bottom: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;

        div {
            margin-bottom: 0;
            width: 100%;
            display: inline-block;
            height: 3px;

            background-color: #3a3d40;
        }

        h2 {
            display: inline-block;
            margin: 0 10px;

            font-size: 1.5em;
            font-weight: 500;
            text-align: center;
            white-space: nowrap;
        }
    }

    p {
        text-align: justify;
    }
`;
