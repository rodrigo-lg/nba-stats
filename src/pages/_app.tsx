import Head from 'next/head';
import { AppProps } from 'next/app';

import GlobalStyle from '@/styles/GlobalStyles';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <title>NBA Stats</title>
            </Head>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    );
}
