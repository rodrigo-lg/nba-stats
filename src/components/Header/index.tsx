import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { MdClear } from 'react-icons/md';

import {
    Container,
    Anchor,
    Burger,
    Overlay,
    Menu,
    MobileAnchor,
} from '@/styles/components/Header';

export default function Header(): JSX.Element {
    const { pathname } = useRouter();
    const [showMenu, setShowMenu] = useState(false);

    const isCurrentPage = {
        home: pathname === '/',
        players: pathname === '/players',
        teams: pathname === '/teams',
        highlights: pathname === '/highlights',
    };

    return (
        <Container>
            <nav>
                <Link href="/">
                    <Anchor currentPage={isCurrentPage.home} home>
                        NBA Stats
                    </Anchor>
                </Link>
                <Link href="/players">
                    <Anchor currentPage={isCurrentPage.players}>Players</Anchor>
                </Link>
                <Link href="/teams">
                    <Anchor currentPage={isCurrentPage.teams}>Teams</Anchor>
                </Link>
                <Link href="/highlights">
                    <Anchor currentPage={isCurrentPage.highlights}>
                        Highlights
                    </Anchor>
                </Link>
                <Burger onClick={() => setShowMenu(true)}>
                    <div />
                    <div />
                    <div />
                </Burger>
            </nav>
            <Overlay showMenu={showMenu} onClick={() => setShowMenu(false)} />
            <Menu showMenu={showMenu}>
                <MdClear size="36px" onClick={() => setShowMenu(false)} />
                <Link href="/players">
                    <MobileAnchor currentPage={isCurrentPage.players}>
                        Players
                    </MobileAnchor>
                </Link>

                <Link href="/teams">
                    <MobileAnchor currentPage={isCurrentPage.teams}>
                        Teams
                    </MobileAnchor>
                </Link>

                <Link href="/highlights">
                    <MobileAnchor currentPage={isCurrentPage.highlights}>
                        Highlights
                    </MobileAnchor>
                </Link>
            </Menu>
        </Container>
    );
}
