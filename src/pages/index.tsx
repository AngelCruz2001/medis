import type { NextPage } from "next";
import Head from "next/head";
import { GetServerSideProps } from 'next'
import { getPatient, queryClient } from "api/api";
import { dehydrate, useQuery } from 'react-query';
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {

  const { data } = useQuery(['patient'], () => getPatient());

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>
        {JSON.stringify(data)}
      </h1>

    </div>
  );
};


export const getServerSideProps: GetServerSideProps = async (ctx) => {

  await queryClient.prefetchQuery('patient', () => getPatient());
  // const data = await queryClient.fetchQuery('patient', () => getPatient());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    }
  }

}

export default Home;
