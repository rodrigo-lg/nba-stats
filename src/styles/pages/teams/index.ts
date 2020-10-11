import styled from 'styled-components';

export const Container = styled.div`
    margin: calc(94px + 2em) auto 0;
    width: 80%;

    div {
        margin: 0 auto;
        max-width: 700px;

        display: flex;

        button {
            margin-left: 16px;
            padding: 12px 24px;
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

        div {
            width: 100%;
        }

        @media (max-width: 600px) {
            flex-direction: column;

            div {
                flex-direction: row;
            }

            button {
                margin: 16px 0 0;
            }
        }
    }
`;

export const Teams = styled.div`
    margin: 60px auto 0;
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    div {
        width: 30%;
        margin-bottom: 40px;
        padding: 24px;
        max-width: 500px;
        border-radius: 8px;
        display: flex;
        flex-direction: row;
        align-items: center;

        background-color: #1e1f21;

        cursor: pointer;

        img {
            height: 96px;
            width: 96px;
        }

        ul {
            margin-left: 32px;
            list-style: none;

            li + li {
                margin-top: 10px;
            }

            span {
                margin-right: 5px;
                font-size: 1.1em;
                font-weight: 500;
            }
        }
    }

    span {
        margin: 0 auto 50px;

        font-size: 1.5em;
        font-weight: 500;
    }

    @media (max-width: 1200px) {
        div {
            width: 40%;
        }
    }

    @media (max-width: 900px) {
        div {
            width: 90%;
        }
    }
`;

export const Page = styled.nav`
    margin: 0 auto 40px;
    display: flex;
    align-items: center;
    width: fit-content;
    padding: 12px;
    border-radius: 8px;

    background-color: #1e1f21;

    button {
        color: #fdc031;
        background-color: #1e1f21;
        display: flex;
        align-items: center;

        font-size: 1.2em;

        outline: none;
    }

    span {
        margin: 0 10px;
        background-color: #000;
        padding: 4px 8px;
        border-radius: 4px;

        color: #fdc031;

        font-size: 1.5em;
    }
`;
