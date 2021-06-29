import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';

import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  let pageProps = {};

  try {
    const { data } = await client.get('/api/users/current-user');

    if (appContext.Component.getInitialProps) {
      pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }

    return {
      pageProps,
      ...data,
    };
  } catch (error) {
    console.log('Error in _app');
    console.log(error.message);

    return {
      pageProps,
    };
  }
};

export default AppComponent;
