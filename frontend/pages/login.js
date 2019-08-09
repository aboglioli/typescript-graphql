import React, { useState } from 'react';
import Link from 'next/link';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { login } from '../lib/auth';
import Container from '../components/Container';

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
        email
        name
      }
    }
  }
`;

const Login = () => {
  const [data, setData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const [mutation, { loading }] = useMutation(LOGIN_MUTATION, {
    variables: data,
    onError: () => {
      setError('Invalid username or password');
    },
    onCompleted: data => {
      if (data && data.login) {
        const { token } = data.login;
        login(token);
      }
    },
  });

  const onChange = e => {
    if (e && e.target) {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  return (
    <Container title="Login">
      <h2>Login</h2>
      {error}
      <div>
        <input
          name="username"
          value={data.username}
          onChange={onChange}
          type="text"
          placeholder="Username"
        />
        <input
          name="password"
          value={data.password}
          onChange={onChange}
          type="password"
          placeholder="Password"
        />
      </div>
      <div>
        <Link href="/signup">
          <a>Sign up</a>
        </Link>
        <button disabled={loading} onClick={mutation}>
          Log in
        </button>
      </div>
    </Container>
  );
};

export default Login;
