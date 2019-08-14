import React from 'react';
import Head from 'next/head';

import config from '../lib/config';

const Container = ({ title, children }) => (
  <>
    <Head>
      <title>{title ? `${title} | ${config.title}` : config.title}</title>
    </Head>
    {children}
  </>
);

export default Container;
