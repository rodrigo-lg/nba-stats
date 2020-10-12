import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState, useRef } from 'react';

import Header from '@/components/Header';

import { Container } from '@/styles/pages/compare';

interface ComparePageProps {
    teams: { name: string }[];
    players: { name: string }[];
}

export default function ComparePage({
    teams,
    players,
}: ComparePageProps): JSX.Element {
    const router = useRouter();

    const [teams1, setTeams1] = useState(teams);
    const [teams2, setTeams2] = useState(teams);

    const [players1, setPlayers1] = useState(players);
    const [players2, setPlayers2] = useState(players);

    const team1Ref = useRef<HTMLSelectElement>(null);
    const team2Ref = useRef<HTMLSelectElement>(null);
    const player1Ref = useRef<HTMLSelectElement>(null);
    const player2Ref = useRef<HTMLSelectElement>(null);

    function handleUpdateTeams() {
        setTeams1(teams.filter(team => team.name !== team2Ref.current.value));

        setTeams2(teams.filter(team => team.name !== team1Ref.current.value));
    }

    function handleUpdatePlayers() {
        setPlayers1(
            players.filter(player => player.name !== player2Ref.current.value),
        );

        setPlayers2(
            players.filter(player => player.name !== player1Ref.current.value),
        );
    }

    function handleCompareTeams(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (team1Ref.current.value && team2Ref.current.value)
            router.push(
                `/compare/teams?first=${encodeURIComponent(
                    team1Ref.current.value,
                )}&second=${encodeURIComponent(team2Ref.current.value)}`,
            );
    }

    function handleComparePlayers(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (player1Ref.current.value && player2Ref.current.value)
            router.push(
                `/compare/players?first=${encodeURIComponent(
                    player1Ref.current.value,
                )}&second=${encodeURIComponent(player2Ref.current.value)}`,
            );
    }

    return (
        <>
            <Header />
            <Container>
                <form onSubmit={handleCompareTeams}>
                    <fieldset>
                        <legend>Compare teams</legend>
                        <select ref={team1Ref} onChange={handleUpdateTeams}>
                            <option value="" hidden>
                                Select team
                            </option>
                            {teams1.map(team => (
                                <option value={team.name} key={team.name}>
                                    {team.name}
                                </option>
                            ))}
                        </select>
                        <select ref={team2Ref} onChange={handleUpdateTeams}>
                            <option value="" hidden>
                                Select team
                            </option>
                            {teams2.map(team => (
                                <option value={team.name} key={team.name}>
                                    {team.name}
                                </option>
                            ))}
                        </select>
                        <button type="submit">Compare</button>
                    </fieldset>
                </form>

                <form onSubmit={handleComparePlayers}>
                    <fieldset>
                        <legend>Compare players</legend>
                        <select ref={player1Ref} onChange={handleUpdatePlayers}>
                            <option value="" hidden>
                                Select player
                            </option>
                            {players1.map(player => (
                                <option value={player.name} key={player.name}>
                                    {player.name}
                                </option>
                            ))}
                        </select>
                        <select ref={player2Ref} onChange={handleUpdatePlayers}>
                            <option value="" hidden>
                                Select player
                            </option>
                            {players2.map(player => (
                                <option value={player.name} key={player.name}>
                                    {player.name}
                                </option>
                            ))}
                        </select>
                        <button type="submit">Compare</button>
                    </fieldset>
                </form>
            </Container>
        </>
    );
}

export const getServerSideProps: GetServerSideProps<ComparePageProps> = async () => {
    const teamsQuery = 'SELECT name FROM teams ORDER BY name';

    const playersQuery = `SELECT concat(first_name, ' ', last_name) AS "name" FROM players ORDER BY name`;

    let response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
        method: 'POST',
        body: teamsQuery,
        headers: {
            'Content-Type': 'text/plain',
        },
    });

    const teams = await response.json();

    response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
        method: 'POST',
        body: playersQuery,
        headers: {
            'Content-Type': 'text/plain',
        },
    });

    const players = await response.json();

    return {
        props: {
            teams,
            players,
        },
    };
};
