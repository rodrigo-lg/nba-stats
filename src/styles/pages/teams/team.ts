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

    @media (max-width: 600px) {
        width: 90%;
    }
`;

export const Team = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45%;
    margin-bottom: 60px;

    img {
        height: 192px;
    }

    div {
        display: flex;
        flex-direction: column;
        margin-left: 30px;

        h1 {
            margin-bottom: 20px;

            font-size: 2em;
            font-weight: bold;
        }

        p {
            font-size: 1.2em;

            span {
                margin-right: 5px;

                font-weight: 500;
            }
        }

        p + p {
            margin-top: 10px;
        }
    }

    @media (max-width: 1400px) {
        width: 100%;
    }

    @media (max-width: 600px) {
        img {
            height: 144px;
        }

        div {
            margin-left: 15px;
            h1 {
                font-size: 1.5em;
            }

            p {
                font-size: 1em;
            }
        }
    }

    @media (max-width: 400px) {
        img {
            height: 120px;
        }
    }
`;

export const Games = styled.div`
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

export const Points = styled.div`
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

    @media (max-width: 600px) {
        h2 {
            font-size: 1.2em;
        }
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

    @media (max-width: 600px) {
        h2 {
            font-size: 1.2em;
        }
    }
`;
