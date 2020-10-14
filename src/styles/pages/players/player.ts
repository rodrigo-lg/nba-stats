import styled from 'styled-components';

export const Container = styled.div`
    margin: calc(94px + 2em) auto 80px;
    width: 80%;
    display: flex;
    padding: 48px;
    border-radius: 16px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    background-color: #1e1f21;

    @media (max-width: 1400px) {
        flex-direction: column;
        align-items: center;
    }
`;

export const Player = styled.div`
    display: flex;
    width: 100%;
    margin: 0 auto 60px;
    justify-content: center;
    align-items: flex-end;

    div:first-child {
        margin-right: 40px;

        div:first-child {
            display: flex;
            flex-direction: row;
            align-items: flex-end;
            margin-bottom: 20px;

            h1 {
                margin-left: 20px;

                font-size: 2em;
                font-weight: bold;
            }
        }

        div + div {
            display: flex;
            flex-direction: column;

            p {
                font-size: 1.2em;

                span {
                    font-weight: 500;
                }
            }

            p + p {
                margin-top: 10px;
            }
        }
    }

    @media (max-width: 800px) {
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }
`;

export const PersonalInfo = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;

    h2 {
        font-size: 1.5em;
        font-weight: bold;
        margin-bottom: 20px;
    }

    p {
        span {
            margin-right: 5px;

            font-weight: 500;
        }
    }

    p + p {
        margin-top: 10px;
    }

    @media (max-width: 800px) {
        margin-top: 30px;
    }
`;

export const Performance = styled.div`
    width: 45%;
    margin-bottom: 60px;

    @media (max-width: 1400px) {
        width: 100%;
    }
`;

export const Plays = styled.div`
    display: flex;
    align-items: center;
    width: 45%;
    justify-content: space-between;
    margin-bottom: 60px;

    @media (max-width: 1400px) {
        width: 100%;
        justify-content: space-around;
    }

    @media (max-width: 800px) {
        flex-direction: column;
    }
`;

export const Info = styled.div`
    h2 {
        font-size: 1.5em;
        font-weight: bold;
        margin-bottom: 20px;
    }

    p {
        span {
            margin-right: 5px;

            font-weight: 500;
        }
    }

    p + p {
        margin-top: 10px;
    }

    @media (max-width: 800px) {
        margin-bottom: 20px;
    }
`;

export const PointsInfo = styled.div`
    margin: 0 0 10px 15%;

    h2 {
        font-size: 1.5em;
        font-weight: bold;
        margin-bottom: 20px;
    }

    p {
        span {
            margin-right: 5px;

            font-weight: 500;
        }
    }

    p + p {
        margin-top: 10px;
    }
`;

export const Error = styled.p`
    width: 100%;

    text-align: center;
    font-size: 1.5em;
`;
