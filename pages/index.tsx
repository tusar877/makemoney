import { useEffect } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  useEffect(() => {
    window.location.href = 'https://fusionbd.com';
  }, []);

  return null;
};

export default Home;
