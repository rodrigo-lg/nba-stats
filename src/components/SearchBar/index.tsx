import { forwardRef, useState } from 'react';
import { MdSearch } from 'react-icons/md';

import { Container } from '@/styles/components/SearchBar';

interface SearchBarProps {
    placeholder: string;
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
    ({ placeholder }, ref) => {
        const [isFocused, setIsFocused] = useState(false);

        function handleFocusAndBlur() {
            setIsFocused(!isFocused);
        }

        return (
            <Container isFocused={isFocused}>
                <MdSearch size="1.5em" color="#000000" />
                <input
                    type="text"
                    placeholder={placeholder}
                    ref={ref}
                    onFocus={handleFocusAndBlur}
                    onBlur={handleFocusAndBlur}
                />
            </Container>
        );
    },
);

export default SearchBar;
