import Header from '@/components/Header';

import { Cover, Container } from '@/styles/pages';

export default function Home(): JSX.Element {
    return (
        <>
            <Header />
            <Cover>
                <h1>
                    NBA 2019
                    <br />
                    CHAMPIONSHIP
                </h1>
            </Cover>
            <Container>
                <div>
                    <div />
                    <h2>How was the season?</h2>
                    <div />
                </div>

                <p>
                    The year 2019 marked the end of the 73rd season of the NBA
                    and the begin of the 74th. Over 1000 games were played from
                    coast to coast. If you want to know anything about the 510
                    players and 30 teams that made part of the championship, you
                    can view detailed data about their games, score and much
                    more during the period of 2019 and even compare their
                    performance!
                </p>
            </Container>
        </>
    );
}
