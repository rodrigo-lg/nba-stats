import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';

import Header from '@/components/Header';
import OpposingBarsChart from '@/components/OpposingBarsChart';

import {
    Container,
    Team,
    Player,
    Error,
} from '@/styles/pages/compare/comparison';

import positions from '@/utils/positions';
import teamsInfo from '@/utils/teams';

interface Team {
    team_id: number;
    city: string;
    name: string;
    conference: string;
    division: string;
    wikipedia_logo_url: string;
    primary_color: string;
    secondary_color: string;
}

interface TeamStats {
    games: number;
    wins: number;
    losses: number;
    field_goals_made: number;
    field_goals_attempted: number;
    points: number;
    two_pointers_made: number;
    two_pointers_attempted: number;
    three_pointers_made: number;
    three_pointers_attempted: number;
    free_throws_made: number;
    free_throws_attempted: number;
    rebounds: number;
    offensive_rebounds: number;
    defensive_rebounds: number;
    assists: number;
    steals: number;
    turnovers: number;
}

interface Player {
    player_id: number;
    first_name: string;
    last_name: string;
    team: string;
    position: string;
    height: number;
    weight: number;
    photo_url: string;
    experience: number;
}

interface PlayerStats {
    minutes: number;
    games: number;
    field_goals_made: number;
    field_goals_attempted: number;
    points: number;
    blocked_shots: number;
    two_pointers_made: number;
    two_pointers_attempted: number;
    three_pointers_made: number;
    three_pointers_attempted: number;
    free_throws_made: number;
    free_throws_attempted: number;
    rebounds: number;
    offensive_rebounds: number;
    defensive_rebounds: number;
    assists: number;
    steals: number;
    turnovers: number;
}

export default function Comparison(): JSX.Element {
    const [teams, setTeams] = useState<Team[]>([]);
    const [teamsStats, setTeamsStats] = useState<TeamStats[]>([]);
    const [players, setPlayers] = useState<Player[]>([]);
    const [playersStats, setPlayersStats] = useState<PlayerStats[]>([]);
    const [error, setError] = useState(false);
    const { query } = useRouter();

    const fetchTeamsData = useCallback(async () => {
        let dbQuery = `SELECT team_id, city, name, conference, division, wikipedia_logo_url, primary_color, secondary_color
                            FROM teams 
                            WHERE name = '${query.first}' OR name = '${query.second}'
                            ORDER BY team_id`;

        let response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
            method: 'POST',
            body: dbQuery,
            headers: {
                'Content-Type': 'text/plain',
            },
        });

        const fetchedTeams: Team[] = await response.json();

        const statsColumns =
            'games, wins, losses, rebounds, points, field_goals_made, field_goals_attempted, two_pointers_made, two_pointers_attempted, three_pointers_made, three_pointers_attempted, free_throws_made, free_throws_attempted, offensive_rebounds, defensive_rebounds, assists, steals, turnovers';

        dbQuery = `SELECT ${statsColumns} 
                FROM team_stats 
                WHERE team_id = ${fetchedTeams[0].team_id} OR team_id = ${fetchedTeams[1].team_id}
                ORDER BY team_id`;

        response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
            method: 'POST',
            body: dbQuery,
            headers: {
                'Content-Type': 'text/plain',
            },
        });

        const fetchedTeamsStats: TeamStats[] = await response.json();

        fetchedTeamsStats.forEach(team => {
            Object.keys(team).map(key => {
                team[key] = Number(team[key]);
            });
        });

        Object.keys(fetchedTeamsStats[0]).map(key => {
            fetchedTeamsStats[0][key] = -fetchedTeamsStats[0][key];
        });

        setTeams(fetchedTeams);
        setTeamsStats(fetchedTeamsStats);
    }, [query]);

    const fetchPlayersData = useCallback(async () => {
        let dbQuery = `SELECT player_id, first_name, last_name, team, position, height, weight, photo_url, experience
                            FROM players 
                            WHERE concat(first_name, ' ', last_name) = '${query.first}' OR concat(first_name, ' ', last_name) = '${query.second}'
                            ORDER BY player_id`;

        let response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
            method: 'POST',
            body: dbQuery,
            headers: {
                'Content-Type': 'text/plain',
            },
        });

        const fetchedPlayers: Player[] = await response.json();

        const statsColumns =
            'games, minutes, rebounds, blocked_shots, points, field_goals_made, field_goals_attempted, two_pointers_made, two_pointers_attempted, three_pointers_made, three_pointers_attempted, free_throws_made, free_throws_attempted, offensive_rebounds, defensive_rebounds, assists, steals, turnovers';

        dbQuery = `SELECT ${statsColumns} 
                FROM player_stats 
                WHERE player_id = ${fetchedPlayers[0].player_id} OR player_id = ${fetchedPlayers[1].player_id}
                ORDER BY player_id`;

        response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
            method: 'POST',
            body: dbQuery,
            headers: {
                'Content-Type': 'text/plain',
            },
        });

        const fetchedPlayersStats: PlayerStats[] = await response.json();

        if (fetchedPlayersStats[0] && fetchedPlayersStats[1]) {
            fetchedPlayersStats.forEach(player => {
                Object.keys(player).map(key => {
                    player[key] = Number(player[key]);
                });
            });

            Object.keys(fetchedPlayersStats[0]).map(key => {
                fetchedPlayersStats[0][key] = -fetchedPlayersStats[0][key];
            });

            setPlayers(fetchedPlayers);
            setPlayersStats(fetchedPlayersStats);
        } else setError(true);
    }, [query]);

    useEffect(() => {
        if (query.category === 'teams') fetchTeamsData();
        if (query.category === 'players') fetchPlayersData();
    }, [fetchTeamsData, fetchPlayersData, query]);

    return (
        <>
            <Header />

            {teams[0] && teamsStats[0] && (
                <Container>
                    <div>
                        <Team>
                            <img
                                src={teams[0].wikipedia_logo_url}
                                alt={`${teams[0].name} logo`}
                            />

                            <ul>
                                <li>{teams[0].name}</li>
                                <li>
                                    <span>City:</span>
                                    {teams[0].city}
                                </li>
                                <li>
                                    <span>Conference:</span>
                                    {teams[0].conference}
                                </li>
                                <li>
                                    <span>Division:</span>
                                    {teams[0].division}
                                </li>
                            </ul>
                        </Team>
                        <Team>
                            <img
                                src={teams[1].wikipedia_logo_url}
                                alt={`${teams[1].name} logo`}
                            />

                            <ul>
                                <li>{teams[1].name}</li>
                                <li>
                                    <span>City:</span>
                                    {teams[1].city}
                                </li>
                                <li>
                                    <span>Conference:</span>
                                    {teams[1].conference}
                                </li>
                                <li>
                                    <span>Division:</span>
                                    {teams[1].division}
                                </li>
                            </ul>
                        </Team>
                    </div>

                    <OpposingBarsChart
                        categories={['Games', 'Wins', 'Losses']}
                        colors={[
                            `#${teams[0].primary_color}`,
                            `#${teams[1].primary_color}`,
                        ]}
                        names={[teams[0].name, teams[1].name]}
                        series={[
                            [teamsStats[0].wins, teamsStats[0].losses],
                            [teamsStats[1].wins, teamsStats[1].losses],
                        ]}
                        title="Games comparisons"
                        height={240}
                    />

                    <OpposingBarsChart
                        categories={[
                            'Points',
                            'Field goals made',
                            'Field goals attempted',
                            'Two pointers made',
                            'Two pointers attempted',
                            'Three pointers made',
                            'Three pointers attempted',
                            'Free throws made',
                            'Free throws attempted',
                        ]}
                        colors={[
                            `#${teams[0].primary_color}`,
                            `#${teams[1].primary_color}`,
                        ]}
                        names={[teams[0].name, teams[1].name]}
                        series={[
                            [
                                teamsStats[0].points,
                                teamsStats[0].field_goals_made,
                                teamsStats[0].field_goals_attempted,
                                teamsStats[0].two_pointers_made,
                                teamsStats[0].two_pointers_attempted,
                                teamsStats[0].three_pointers_made,
                                teamsStats[0].three_pointers_attempted,
                                teamsStats[0].free_throws_made,
                                teamsStats[0].free_throws_attempted,
                            ],
                            [
                                teamsStats[1].points,
                                teamsStats[1].field_goals_made,
                                teamsStats[1].field_goals_attempted,
                                teamsStats[1].two_pointers_made,
                                teamsStats[1].two_pointers_attempted,
                                teamsStats[1].three_pointers_made,
                                teamsStats[1].three_pointers_attempted,
                                teamsStats[1].free_throws_made,
                                teamsStats[1].free_throws_attempted,
                            ],
                        ]}
                        title="Points comparisons"
                        height={440}
                    />

                    <OpposingBarsChart
                        categories={[
                            'Assists',
                            'Rebounds',
                            'Steals',
                            'Turnovers',
                            'Offensive rebounds',
                            'Defensive rebounds',
                        ]}
                        colors={[
                            `#${teams[0].primary_color}`,
                            `#${teams[1].primary_color}`,
                        ]}
                        names={[teams[0].name, teams[1].name]}
                        series={[
                            [
                                teamsStats[0].assists,
                                teamsStats[0].rebounds,
                                teamsStats[0].steals,
                                teamsStats[0].turnovers,
                                teamsStats[0].offensive_rebounds,
                                teamsStats[0].defensive_rebounds,
                            ],
                            [
                                teamsStats[1].assists,
                                teamsStats[1].rebounds,
                                teamsStats[1].steals,
                                teamsStats[1].turnovers,
                                teamsStats[1].offensive_rebounds,
                                teamsStats[1].defensive_rebounds,
                            ],
                        ]}
                        title="Plays comparisons"
                        height={440}
                    />
                </Container>
            )}

            {players[0] && playersStats[0] && !error && (
                <Container>
                    <div>
                        <Player>
                            <img
                                src={players[0].photo_url}
                                alt={`${players[0].first_name} ${players[0].last_name}`}
                            />

                            <ul>
                                <li>{`${players[0].first_name} ${players[0].last_name}`}</li>
                                <li>
                                    <span>Team:</span>
                                    {teamsInfo[players[0].team].name}
                                </li>
                                <li>
                                    <span>Position:</span>
                                    {positions[players[0].position]}
                                </li>
                                <li>
                                    <span>Height:</span>
                                    {`${players[0].height} in`}
                                </li>
                                <li>
                                    <span>Weight:</span>
                                    {`${players[0].weight} lbs`}
                                </li>
                                <li>
                                    <span>Years on the NBA:</span>
                                    {players[0].experience}
                                </li>
                            </ul>
                        </Player>
                        <Player>
                            <img
                                src={players[1].photo_url}
                                alt={`${players[0].first_name} ${players[0].last_name}`}
                            />

                            <ul>
                                <li>{`${players[1].first_name} ${players[1].last_name}`}</li>
                                <li>
                                    <span>Team:</span>
                                    {teamsInfo[players[1].team].name}
                                </li>
                                <li>
                                    <span>Position:</span>
                                    {positions[players[1].position]}
                                </li>
                                <li>
                                    <span>Height:</span>
                                    {`${players[1].height} in`}
                                </li>
                                <li>
                                    <span>Weight:</span>
                                    {`${players[1].weight} lbs`}
                                </li>
                                <li>
                                    <span>Years on the NBA:</span>
                                    {players[1].experience}
                                </li>
                            </ul>
                        </Player>
                    </div>

                    <OpposingBarsChart
                        categories={['Games played']}
                        colors={[
                            `#${teamsInfo[players[0].team].primary_color}`,
                            `#${teamsInfo[players[1].team].primary_color}`,
                        ]}
                        names={[
                            `${players[0].first_name} ${players[0].last_name}`,
                            `${players[1].first_name} ${players[1].last_name}`,
                        ]}
                        series={[
                            [playersStats[0].games],
                            [playersStats[1].games],
                        ]}
                        title="Number of games played"
                        height={180}
                    />

                    <OpposingBarsChart
                        categories={['Minutes played']}
                        colors={[
                            `#${teamsInfo[players[0].team].primary_color}`,
                            `#${teamsInfo[players[1].team].primary_color}`,
                        ]}
                        names={[
                            `${players[0].first_name} ${players[0].last_name}`,
                            `${players[1].first_name} ${players[1].last_name}`,
                        ]}
                        series={[
                            [playersStats[0].minutes],
                            [playersStats[1].minutes],
                        ]}
                        title="Number of minutes played"
                        height={180}
                    />

                    <OpposingBarsChart
                        categories={[
                            'Points made',
                            'Field goals made',
                            'Field goals attempted',
                            'Two pointers made',
                            'Two pointers attempted',
                            'Three pointers made',
                            'Three pointers attempted',
                            'Free throws made',
                            'Free throws attempted',
                        ]}
                        colors={[
                            `#${teamsInfo[players[0].team].primary_color}`,
                            `#${teamsInfo[players[1].team].primary_color}`,
                        ]}
                        names={[
                            `${players[0].first_name} ${players[0].last_name}`,
                            `${players[1].first_name} ${players[1].last_name}`,
                        ]}
                        series={[
                            [
                                // playersStats[0].games,
                                // playersStats[0].minutes,
                                playersStats[0].points,
                                playersStats[0].field_goals_made,
                                playersStats[0].field_goals_attempted,
                                playersStats[0].two_pointers_made,
                                playersStats[0].two_pointers_attempted,
                                playersStats[0].three_pointers_made,
                                playersStats[0].three_pointers_attempted,
                                playersStats[0].free_throws_made,
                                playersStats[0].free_throws_attempted,
                            ],
                            [
                                playersStats[1].points,
                                playersStats[1].field_goals_made,
                                playersStats[1].field_goals_attempted,
                                playersStats[1].two_pointers_made,
                                playersStats[1].two_pointers_attempted,
                                playersStats[1].three_pointers_made,
                                playersStats[1].three_pointers_attempted,
                                playersStats[1].free_throws_made,
                                playersStats[1].free_throws_attempted,
                            ],
                        ]}
                        title="Performance comparisons"
                        height={440}
                    />

                    <OpposingBarsChart
                        categories={[
                            'Assists',
                            'Blocked shots',
                            'Rebounds',
                            'Steals',
                            'Turnovers',
                            'Offensive rebounds',
                            'Defensive rebounds',
                        ]}
                        colors={[
                            `#${teamsInfo[players[0].team].primary_color}`,
                            `#${teamsInfo[players[1].team].primary_color}`,
                        ]}
                        names={[
                            `${players[0].first_name} ${players[0].last_name}`,
                            `${players[1].first_name} ${players[1].last_name}`,
                        ]}
                        series={[
                            [
                                playersStats[0].assists,
                                playersStats[0].blocked_shots,
                                playersStats[0].rebounds,
                                playersStats[0].steals,
                                playersStats[0].turnovers,
                                playersStats[0].offensive_rebounds,
                                playersStats[0].defensive_rebounds,
                            ],
                            [
                                playersStats[1].assists,
                                playersStats[1].blocked_shots,
                                playersStats[1].rebounds,
                                playersStats[1].steals,
                                playersStats[1].turnovers,
                                playersStats[1].offensive_rebounds,
                                playersStats[1].defensive_rebounds,
                            ],
                        ]}
                        title="Plays comparisons"
                        height={440}
                    />
                </Container>
            )}

            {error && (
                <Container>
                    <Error>
                        Some of the choosen players doesn't have any statistics
                        :(
                    </Error>
                </Container>
            )}
        </>
    );
}
