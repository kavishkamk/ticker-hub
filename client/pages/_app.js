import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css'

import buildClient from '../api/build-client';
import NavBar from '../components/NavBar/NavBar';

const App = ({ Component, pageProps, currentUser }) => {
    return (
        <div>
            <NavBar currentUser={currentUser} />
            <Component {...pageProps} />;
        </div>
    );
};

App.getInitialProps = async (appContext) => {

    const { data } = await buildClient(appContext.ctx).get("/api/users/currentuser");

    let pageProps = {};

    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }
    console.log(pageProps);
    return {
        ...data,
        pageProps
    };
};

export default App;