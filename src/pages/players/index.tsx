import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useRef, useState, useEffect } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';

import { Container, Players, Page } from '@/styles/pages/players';

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
}

interface PlayersPageProps {
    fetchedPlayers: Player[];
    pageNumber: number;
}

export default function PlayersPage({
    fetchedPlayers,
    pageNumber,
}: PlayersPageProps): JSX.Element {
    const router = useRouter();
    const searchInputRef = useRef(null);
    const [searchedPlayers, setSearchedPlayers] = useState<Player[]>([]);
    const [resultInfo, setResultInfo] = useState('');

    useEffect(() => {
        const { search } = router.query;

        setSearchedPlayers([]);

        if (search) {
            setResultInfo('Loading...');

            const dbQuery = `SELECT player_id, first_name, last_name, team, position, height, weight, photo_url
                                FROM players
                                WHERE concat(first_name, ' ', last_name) LIKE '%${search}%'
                                ORDER BY first_name 
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
                    setSearchedPlayers(searchResult);

                    if (searchResult.length === 0) setResultInfo('No results');
                    else setResultInfo('');
                });
        }
    }, [router, pageNumber]);

    async function handleSearch() {
        if (searchInputRef.current.value) {
            const searchPlayer = searchInputRef.current.value;

            router
                .push(
                    `/players?search=${encodeURIComponent(
                        searchPlayer,
                    )}&page=1`,
                )
                .then(() => window.scrollTo(0, 0));
        }
    }

    function handleNextPage() {
        if (pageNumber < 29)
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

    function handlePlayerPage(id) {
        router.push(`/players/${id}`);
    }

    return (
        <>
            <Header />
            <Container>
                <div>
                    <SearchBar
                        placeholder="Search for a player"
                        ref={searchInputRef}
                    />
                    <button type="button" onClick={handleSearch}>
                        Search
                    </button>
                </div>
            </Container>
            <Players>
                {!searchedPlayers.length &&
                    fetchedPlayers.map(player => (
                        <div
                            key={player.player_id}
                            onClick={() => handlePlayerPage(player.player_id)}
                        >
                            <img
                                src={player.photo_url}
                                alt={`${player.first_name} ${player.last_name}`}
                            />

                            <ul>
                                <li>
                                    <span>Name:</span>
                                    {`${player.first_name} ${player.last_name}`}
                                </li>
                                <li>
                                    <span>Team:</span>
                                    {teams[player.team].name}
                                </li>
                                <li>
                                    <span>Position:</span>
                                    {positions[player.position]}
                                </li>
                                <li>
                                    <span>Height:</span>
                                    {`${player.height} `}
                                    in
                                </li>
                                <li>
                                    <span>Weight:</span>
                                    {`${player.weight} `}
                                    lbs
                                </li>
                            </ul>
                        </div>
                    ))}
                {!!searchedPlayers.length &&
                    searchedPlayers.map(player => (
                        <div
                            key={player.player_id}
                            onClick={() => handlePlayerPage(player.player_id)}
                        >
                            <img
                                src={player.photo_url}
                                alt={`${player.first_name} ${player.last_name}`}
                            />

                            <ul>
                                <li>
                                    <span>Name:</span>
                                    {`${player.first_name} ${player.last_name}`}
                                </li>
                                <li>
                                    <span>Team:</span>
                                    {teams[player.team].name}
                                </li>
                                <li>
                                    <span>Position:</span>
                                    {positions[player.position]}
                                </li>
                                <li>
                                    <span>Height:</span>
                                    {`${player.height} `}
                                    in
                                </li>
                                <li>
                                    <span>Weight:</span>
                                    {`${player.weight} `}
                                    lbs
                                </li>
                            </ul>
                        </div>
                    ))}
                {!!resultInfo && <span>{resultInfo}</span>}
            </Players>
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

export const getServerSideProps: GetServerSideProps<PlayersPageProps> = async context => {
    const { page = 1, search } = context.query;

    const pageNumber = Number(page);

    let fetchedPlayers: Player[] = [];

    if (!search) {
        const dbQuery = `SELECT player_id, first_name, last_name, team, position, height, weight, photo_url
                        FROM players
                        ORDER BY first_name
                        LIMIT 18
                        OFFSET ${(pageNumber - 1) * 18}`;

        const response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
            method: 'POST',
            body: dbQuery,
            headers: {
                'Content-Type': 'text/plain',
            },
        });

        fetchedPlayers = await response.json();
    }

    return {
        props: {
            fetchedPlayers,
            pageNumber,
        },
    };
};
