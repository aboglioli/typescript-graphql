import React, { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Container from '../components/Container';

const SIGNUP_MUTATION = gql`
  mutation signup($data: UserCreateInput!) {
    signup(data: $data) {
      id
      username
      email
      name
    }
  }
`;

const Signup = () => {
  const [data, setData] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
  });
  const [error, setError] = useState('');

  const [mutation, { loading }] = useMutation(SIGNUP_MUTATION, {
    variables: { data },
    onError: () => {
      setError('Invalid data');
    },
    onCompleted: data => {
      if (data && data.signup) {
        Router.push('/login');
      }
    },
  });

  const onChange = e => {
    if (e && e.target) {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  return (
    <Container title="Sign up">
      <h2>Signup</h2>
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
          className="input"
          name="password"
          value={data.password}
          onChange={onChange}
          type="password"
          placeholder="Password"
        />
        <input
          className="input"
          name="name"
          value={data.name}
          onChange={onChange}
          type="text"
          placeholder="Name"
        />
        <input
          className="input"
          name="email"
          value={data.email}
          onChange={onChange}
          type="text"
          placeholder="Email"
        />
      </div>
      <div>
        <Link href="/login">
          <a>Log in</a>
        </Link>
        <button disabled={loading} onClick={mutation}>
          Sign up
        </button>
      </div>
    </Container>
  );
};

export default Signup;
