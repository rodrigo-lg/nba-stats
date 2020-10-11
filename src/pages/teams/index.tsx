import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useRef, useState, useEffect } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';

import { Container, Teams, Page } from '@/styles/pages/teams';

interface Team {
    team_id: number;
    city: string;
    name: string;
    conference: string;
    division: string;
    wikipedia_logo_url: string;
}

interface TeamsPageProps {
    fetchedTeams: Team[];
    pageNumber: number;
}

export default function TeamsPage({
    fetchedTeams,
    pageNumber,
}: TeamsPageProps): JSX.Element {
    const router = useRouter();
    const searchInputRef = useRef(null);
    const [searchedTeams, setSearchedTeams] = useState<Team[]>([]);
    const [resultInfo, setResultInfo] = useState('');

    useEffect(() => {
        const { search } = router.query;

        setSearchedTeams([]);

        if (search) {
            setResultInfo('Loading...');

            const dbQuery = `SELECT team_id, city, name, conference, division, wikipedia_logo_url
                            FROM teams
                            WHERE name LIKE '%${search}%'
                            LIMIT 18
                            OFFSET ${(pageNumber - 1) * 18}`;

            fetch(process.env.NEXT_PUBLIC_API_URL, {
                method: 'POST',
                body: dbQuery,
                headers: {
                    'Content-Type': 'text/plain',
                },
            })
                .then(response => response.json())
                .then(searchResult => {
                    setSearchedTeams(searchResult);

                    if (searchResult.length === 0) setResultInfo('No results');
                    else setResultInfo('');
                });
        }
    }, [router, pageNumber]);

    async function handleSearch() {
        if (searchInputRef.current.value) {
            const searchTeam = searchInputRef.current.value;

            router
                .push(`/teams?search=${encodeURIComponent(searchTeam)}&page=1`)
                .then(() => window.scrollTo(0, 0));
        }
    }

    function handleNextPage() {
        if (pageNumber < 2)
            router
                .push({
                    pathname: router.pathname,
                    query: { ...router.query, page: pageNumber + 1 },
                })
                .then(() => window.scrollTo(0, 0));
    }

    function handlePreviousPage() {
        if (pageNumber > 1)
            router
                .push({
                    pathname: router.pathname,
                    query: { ...router.query, page: pageNumber - 1 },
                })
                .then(() => window.scrollTo(0, 0));
    }

    function handleTeamPage(name) {
        router.push(`/teams/${name}`);
    }

    return (
        <>
            <Header />
            <Container>
                <div>
                    <SearchBar
                        placeholder="Search for a team"
                        ref={searchInputRef}
                    />
                    <button type="button" onClick={handleSearch}>
                        Search
                    </button>
                </div>
            </Container>
            <Teams>
                {!searchedTeams.length &&
                    fetchedTeams.map(team => (
                        <div
                            key={team.team_id}
                            onClick={() => handleTeamPage(team.name)}
                        >
                            <img
                                src={team.wikipedia_logo_url}
                                alt={`${team.name} logo`}
                            />

                            <ul>
                                <li>
                                    <span>Name:</span>
                                    {team.name}
                                </li>
                                <li>
                                    <span>City:</span>
                                    {team.city}
                                </li>
                                <li>
                                    <span>Conference:</span>
                                    {team.conference}
                                </li>
                                <li>
                                    <span>Division:</span>
                                    {team.division}
                                </li>
                            </ul>
                        </div>
                    ))}
                {!!searchedTeams.length &&
                    searchedTeams.map(team => (
                        <div
                            key={team.team_id}
                            onClick={() => handleTeamPage(team.name)}
                        >
                            <img
                                src={team.wikipedia_logo_url}
                                alt={`${team.name} logo`}
                            />

                            <ul>
                                <li>
                                    <span>Name:</span>
                                    {team.name}
                                </li>
                                <li>
                                    <span>City:</span>
                                    {team.city}
                                </li>
                                <li>
                                    <span>Conference:</span>
                                    {team.conference}
                                </li>
                                <li>
                                    <span>Division:</span>
                                    {team.division}
                                </li>
                            </ul>
                        </div>
                    ))}
                {!!resultInfo && <span>{resultInfo}</span>}
            </Teams>
            <Page>
                <button type="button" onClick={handlePreviousPage}>
                    <MdKeyboardArrowLeft size="1.5em" />
                    Anterior
                </button>
                <span>{pageNumber}</span>
                <button type="button" onClick={handleNextPage}>
                    Próxima
                    <MdKeyboardArrowRight size="1.5em" />
                </button>
            </Page>
        </>
    );
}

export const getServerSideProps: GetServerSideProps<TeamsPageProps> = async context => {
    const { page = 1, search } = context.query;

    const pageNumber = Number(page);

    let fetchedTeams: Team[] = [];

    if (!search) {
        const dbQuery = `SELECT team_id, city, name, conference, division, wikipedia_logo_url 
                        FROM teams 
                        ORDER BY name 
                        LIMIT 18 
                        OFFSET ${(pageNumber - 1) * 18}`;

        const response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
            method: 'POST',
            body: dbQuery,
            headers: {
                'Content-Type': 'text/plain',
            },
        });

        fetchedTeams = await response.json();
    }

    return {
        props: {
            fetchedTeams,
            pageNumber,
        },
    };
};
