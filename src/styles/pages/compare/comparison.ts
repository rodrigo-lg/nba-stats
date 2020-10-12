import styled from 'styled-components';

export const Container = styled.div`
    margin: calc(94px + 2em) auto 80px;
    width: 90%;
    padding: 20px;
    border-radius: 16px;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    background-color: #1e1f21;

    div:first-child {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
`;

export const Team = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;

    &:first-child {
        border-right: 3px solid gray;
    }

    img {
        height: 192px;
        width: 192px;
    }

    ul {
        list-style: none;

        li:first-child {
            margin: 10px 0;

            text-align: center;
            font-size: 1.5em;
            font-weight: bold;
        }

        li {
            font-size: 1.2em;

            span {
                margin-right: 5px;

                font-weight: 500;
            }
        }
    }

    @media (max-width: 600px) {
        img {
            height: 144px;
            width: 144px;
        }

        ul {
            li:first-child {
                font-size: 1.5em;
            }

            li {
                font-size: 1em;
            }
        }
    }

    @media (max-width: 400px) {
        img {
            height: 120px;
            width: 120px;
        }
    }
`;

export const Player = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;

    &:first-child {
        border-right: 3px solid gray;
    }

    ul {
        list-style: none;

        li:first-child {
            margin: 20px 0;
            margin-left: 10px;

            text-align: center;
            font-size: 1.5em;
            font-weight: bold;
        }

        li {
            margin-left: 20px;

            font-size: 1.2em;

            span {
                margin-right: 5px;

                font-weight: 500;
            }
        }
    }

    @media (max-width: 600px) {
        ul {
            li:first-child {
                font-size: 1.2em;
            }

            li {
                font-size: 1em;
            }
        }
    }
`;
