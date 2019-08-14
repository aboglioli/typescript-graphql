import React, { ReactNode } from 'react';
import Head from 'next/head';

import config from '../lib/config';

interface ContainerProps {
  title: string;
  children: ReactNode;
}

const Container = ({ title, children }: ContainerProps) => (
  <>
    <Head>
      <title>{title ? `${title} | ${config.title}` : config.title}</title>
    </Head>
    {children}
  </>
);

export default Container;
