import styled, { css } from 'styled-components';

interface AnchorProps {
    currentPage: boolean;
    home?: boolean;
}

interface MobileMenuProps {
    showMenu: boolean;
}

export const Container = styled.header`
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;

    background-color: #1e1f21;

    nav:first-of-type {
        display: flex;
        align-items: center;

        width: fit-content;
        margin: 0 auto;
        padding: 20px;
    }

    @media (max-width: 800px) {
        nav:first-of-type {
            width: 100%;
            padding: 20px 40px;
            justify-content: space-between;
        }
    }
`;

export const Anchor = styled.a<AnchorProps>`
    margin-left: 40px;
    padding: 8px 12px;
    border-radius: 8px;

    font-size: 1.5em;
    font-weight: 500;

    color: #838384;

    transition: background-color 0.3s, color 0.3s;
    cursor: pointer;

    &:first-of-type {
        margin-left: 0;
        margin-right: 40px;

        font-size: 2em;
        font-family: 'Graduate', cursive;
        font-weight: bold;
        white-space: nowrap;

        color: white;
    }

    &:nth-child(n + 2):hover {
        background-color: #0577fb;

        color: white;
    }

    ${props =>
        props.currentPage &&
        props.home &&
        css`
            text-decoration: underline;
            text-decoration-color: #fdc031;
        `}

    ${props =>
        props.currentPage &&
        css`
            color: #fdc031;
        `}

    @media (max-width: 800px) {
        &:nth-child(n + 2) {
            display: none;
        }
    }
`;

export const Burger = styled.button`
    background-color: #1e1f21;
    display: none;

    div {
        width: 40px;
        height: 6px;
        border-radius: 8px;

        background-color: #fff;
    }

    div ~ div {
        margin-top: 8px;
    }

    @media (max-width: 800px) {
        display: inline-block;
    }
`;

export const Overlay = styled.div<MobileMenuProps>`
    position: fixed;
    top: 0;
    height: 100%;
    width: 100%;

    background-color: rgba(0, 0, 0, 0.5);

    transform: ${props => !props.showMenu && 'translateX(-100%)'};
`;

export const Menu = styled.nav<MobileMenuProps>`
    display: none;
    position: fixed;
    width: 20%;
    min-width: 300px;
    height: 100%;
    top: 0;
    right: 0;
    padding: 20px 0;

    background-color: #1e1f21;

    transition: transform 0.5s;
    transform: ${props => !props.showMenu && 'translateX(calc(105% + 36px))'};

    svg {
        position: relative;
        right: calc(36px + 5%);
    }

    @media (max-width: 800px) {
        display: block;
    }
`;

export const MobileAnchor = styled.a<AnchorProps>`
    display: block;
    margin-bottom: 15px;
    padding: 20px 0 20px 30px;

    color: white;

    font-size: 1.5em;
    font-weight: 500;

    background-color: ${props => props.currentPage && '#0577fb'};
`;
