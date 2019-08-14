import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import withAuth from '../lib/with-auth';
import Container from '../components/Container';

const PROFILE_QUERY = gql`
  {
    profile {
      id
      username
      name
    }
  }
`;

const Home = () => {
  const { data, loading } = useQuery(PROFILE_QUERY);

  if (loading) {
    return 'Loading...';
  }

  const { profile } = data;

  return (
    <Container title="Home">
      <b>
        <FontAwesomeIcon icon="home" />
      </b>{' '}
      Hi {profile.username} ({profile.name})
    </Container>
  );
};

export default withAuth(Home);
