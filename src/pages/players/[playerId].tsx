import { GetServerSideProps } from 'next';

import Header from '@/components/Header';
import PieChart from '@/components/PieChart';
import GroupedBarChart from '@/components/GroupedBarChart';

import {
    Container,
    Player,
    PersonalInfo,
    Performance,
    Plays,
    Info,
    PointsInfo,
} from '@/styles/pages/players/player';

import positions from '@/utils/positions';
import teams from '@/utils/teams';

interface Player {
    player_id: number;
    first_name: string;
    last_name: string;
    team: string;
    position: string;
    height: number;
    weight: number;
    photo_url: string;
    jersey: number;
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

interface PlayerPageProps {
    player: Player;
    playerStats: PlayerStats;
}

export default function PlayerPage({
    player,
    playerStats,
}: PlayerPageProps): JSX.Element {
    return (
        <>
            <Header />
            <Container>
                <Player>
                    <div>
                        <div>
                            <img
                                src={player.photo_url}
                                alt={`${player.first_name} ${player.last_name}`}
                            />

                            <h1>{`${player.first_name} ${player.last_name}`}</h1>
                        </div>
                        <div>
                            <p>
                                <span>Team: </span>
                                {teams[player.team].name}
                            </p>
                            <p>
                                <span>Position: </span>
                                {positions[player.position]}
                            </p>
                        </div>
                    </div>

                    <PersonalInfo>
                        <h2>Personal info</h2>
                        <p>
                            <span>Height: </span>
                            {`${player.height} `}
                            in
                        </p>
                        <p>
                            <span>Weight: </span>
                            {`${player.weight} `}
                            lbs
                        </p>
                        <p>
                            <span>Jersey number:</span>
                            {player.jersey}
                        </p>
                        <p>
                            <span>Years on the NBA:</span>
                            {player.experience}
                        </p>
                    </PersonalInfo>
                </Player>

                <Performance>
                    <PointsInfo>
                        <h2>Performance</h2>
                        <p>
                            <span>Number of games played:</span>
                            {playerStats.games}
                        </p>
                        <p>
                            <span>Number of minutes played:</span>
                            {playerStats.minutes}
                        </p>
                        <p>
                            <span>Points made:</span>
                            {playerStats.points}
                        </p>
                    </PointsInfo>

                    <GroupedBarChart
                        series1={[
                            playerStats.field_goals_made,
                            playerStats.two_pointers_made,
                            playerStats.three_pointers_made,
                            playerStats.free_throws_made,
                        ]}
                        series2={[
                            playerStats.field_goals_attempted,
                            playerStats.two_pointers_attempted,
                            playerStats.three_pointers_attempted,
                            playerStats.free_throws_attempted,
                        ]}
                        categories={[
                            'Field goals',
                            'Two pointers',
                            'Three pointers',
                            'Free throws',
                        ]}
                        colors={[
                            `#${teams[player.team].primary_color}`,
                            `#${teams[player.team].secondary_color}`,
                        ]}
                    />
                </Performance>

                <Plays>
                    <Info>
                        <h2>Plays</h2>
                        <p>
                            <span>Number of assists:</span>
                            {playerStats.assists}
                        </p>
                        <p>
                            <span>Number of blocked shots:</span>
                            {playerStats.blocked_shots}
                        </p>
                        <p>
                            <span>Number of rebounds:</span>
                            {playerStats.rebounds}
                        </p>
                        <p>
                            <span>Number of steals:</span>
                            {playerStats.steals}
                        </p>
                        <p>
                            <span>Number of turnovers:</span>
                            {playerStats.turnovers}
                        </p>
                    </Info>

                    <PieChart
                        series={[
                            playerStats.offensive_rebounds,
                            playerStats.defensive_rebounds,
                        ]}
                        title="Types of rebounds"
                        labels={['Offensive', 'Defensive']}
                        colors={[
                            `#${teams[player.team].primary_color}`,
                            `#${teams[player.team].secondary_color}`,
                        ]}
                    />
                </Plays>
            </Container>
        </>
    );
}

export const getServerSideProps: GetServerSideProps<PlayerPageProps> = async context => {
    const { playerId } = context.params;

    let dbQuery = `SELECT player_id, first_name, last_name, team, position, height, weight, photo_url, jersey, experience
                        FROM players
                        WHERE player_id = ${playerId}`;

    let response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
        method: 'POST',
        body: dbQuery,
        headers: {
            'Content-Type': 'text/plain',
        },
    });

    const [player] = await response.json();

    const statsColumns =
        'games, minutes, rebounds, blocked_shots, points, field_goals_made, field_goals_attempted, two_pointers_made, two_pointers_attempted, three_pointers_made, three_pointers_attempted, free_throws_made, free_throws_attempted, offensive_rebounds, defensive_rebounds, assists, steals, turnovers';

    dbQuery = `SELECT ${statsColumns} 
                    FROM player_stats 
                    WHERE player_id = ${player.player_id}`;

    response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
        method: 'POST',
        body: dbQuery,
        headers: {
            'Content-Type': 'text/plain',
        },
    });

    const [playerStats] = await response.json();

    Object.keys(playerStats).map(key => {
        playerStats[key] = Number(playerStats[key]);
    });

    return {
        props: {
            player,
            playerStats,
        },
    };
};
