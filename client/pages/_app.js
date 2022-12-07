import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css'

import buildClient from '../api/build-client';
import NavBar from '../components/NavBar/NavBar';

const App = ({ Component, pageProps, currentUser }) => {
    return (
        <div>
            <NavBar currentUser={currentUser} />
            <Component currentUser={currentUser} {...pageProps} />;
        </div>
    );
};

App.getInitialProps = async (appContext) => {

    const client = buildClient(appContext.ctx);
    const { data } = await client.get("/api/users/currentuser");

    let pageProps = {};

    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser);
    }
    console.log(pageProps);
    return {
        ...data,
        pageProps
    };
};

export default App;