import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import withAuth from '../lib/with-auth';
import Container from '../components/Container';

const Home = () => {
  return (
    <Container title="Home">
      <b>
        <FontAwesomeIcon icon="home" />
      </b>
      Home
    </Container>
  );
};

export default withAuth(Home);
