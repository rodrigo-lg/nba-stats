interface IMyApp {
    Component: React.ComponentType;
    pageProps: unknown;
}

export default function MyApp({ Component, pageProps }: IMyApp): JSX.Element {
    return <Component {...pageProps} />;
}
