import styled, { css } from 'styled-components';

interface ContainerProps {
    isFocused: boolean;
}

export const Container = styled.div<ContainerProps>`
    border-radius: 8px;
    padding: 12px;
    display: flex;
    align-items: center;

    background-color: #fff;

    transition: box-shadow 0.2s;

    input {
        width: 100%;
        margin-left: 5px;
        border: none;
        outline: none;

        font-size: 1.2em;
    }

    ${props =>
        props.isFocused &&
        css`
            box-shadow: 0 0 0 4px #fdc031;
        `}
`;
