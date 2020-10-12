import { GetServerSideProps } from 'next';

import Header from '@/components/Header';
import PieChart from '@/components/PieChart';
import GroupedBarChart from '@/components/GroupedBarChart';

import {
    Container,
    Team,
    Games,
    Points,
    Plays,
    Info,
    PointsInfo,
} from '@/styles/pages/teams/team';

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

interface TeamPageProps {
    team: Team;
    teamStats: TeamStats;
}

export default function TeamPage({
    team,
    teamStats,
}: TeamPageProps): JSX.Element {
    return (
        <>
            <Header />
            <Container>
                <Team>
                    <img
                        src={team.wikipedia_logo_url}
                        alt={`${team.name} logo`}
                    />

                    <div>
                        <h1>{team.name}</h1>
                        <p>
                            <span>City:</span>
                            {team.city}
                        </p>
                        <p>
                            <span>Conference:</span>
                            {team.conference}
                        </p>
                        <p>
                            <span>Division:</span>
                            {team.division}
                        </p>
                    </div>
                </Team>

                <Games>
                    <Info>
                        <h2>Games</h2>
                        <p>
                            <span>Number of games played:</span>
                            {teamStats.games}
                        </p>
                    </Info>

                    <PieChart
                        series={[teamStats.wins, teamStats.losses]}
                        title="Win/Loss game rate"
                        labels={['Wins', 'Losses']}
                        colors={[
                            `#${team.primary_color}`,
                            `#${team.secondary_color}`,
                        ]}
                    />
                </Games>

                <Points>
                    <PointsInfo>
                        <h2>Points</h2>
                        <p>
                            <span>Number of points:</span>
                            {teamStats.points}
                        </p>
                    </PointsInfo>

                    <GroupedBarChart
                        series1={[
                            teamStats.field_goals_made,
                            teamStats.two_pointers_made,
                            teamStats.three_pointers_made,
                            teamStats.free_throws_made,
                        ]}
                        series2={[
                            teamStats.field_goals_attempted,
                            teamStats.two_pointers_attempted,
                            teamStats.three_pointers_attempted,
                            teamStats.free_throws_attempted,
                        ]}
                        categories={[
                            'Field goals',
                            'Two pointers',
                            'Three pointers',
                            'Free throws',
                        ]}
                        colors={[
                            `#${team.primary_color}`,
                            `#${team.secondary_color}`,
                        ]}
                    />
                </Points>

                <Plays>
                    <Info>
                        <h2>Plays</h2>
                        <p>
                            <span>Number of assists:</span>
                            {teamStats.assists}
                        </p>
                        <p>
                            <span>Number of rebounds:</span>
                            {teamStats.rebounds}
                        </p>
                        <p>
                            <span>Number of steals:</span>
                            {teamStats.steals}
                        </p>
                        <p>
                            <span>Number of turnovers:</span>
                            {teamStats.turnovers}
                        </p>
                    </Info>

                    <PieChart
                        series={[
                            teamStats.offensive_rebounds,
                            teamStats.defensive_rebounds,
                        ]}
                        title="Types of rebounds"
                        labels={['Offensive', 'Defensive']}
                        colors={[
                            `#${team.primary_color}`,
                            `#${team.secondary_color}`,
                        ]}
                    />
                </Plays>
            </Container>
        </>
    );
}

export const getServerSideProps: GetServerSideProps<TeamPageProps> = async context => {
    const { teamName } = context.params;

    let dbQuery = `SELECT team_id, city, name, conference, division, wikipedia_logo_url, primary_color, secondary_color
                        FROM teams 
                        WHERE name = '${teamName}'`;

    let response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
        method: 'POST',
        body: dbQuery,
        headers: {
            'Content-Type': 'text/plain',
        },
    });

    const [team] = await response.json();

    const statsColumns =
        'games, wins, losses, rebounds, points, field_goals_made, field_goals_attempted, two_pointers_made, two_pointers_attempted, three_pointers_made, three_pointers_attempted, free_throws_made, free_throws_attempted, offensive_rebounds, defensive_rebounds, assists, steals, turnovers';

    dbQuery = `SELECT ${statsColumns} 
                    FROM team_stats 
                    WHERE team_id = ${team.team_id}`;

    response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
        method: 'POST',
        body: dbQuery,
        headers: {
            'Content-Type': 'text/plain',
        },
    });

    const [teamStats] = await response.json();

    Object.keys(teamStats).map(key => {
        teamStats[key] = Number(teamStats[key]);
    });

    return {
        props: {
            team,
            teamStats,
        },
    };
};
