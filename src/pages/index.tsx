import type { NextPage } from "next";
import Head from "next/head";
import Home from "./Home";

const Main: NextPage = () => {
  return (
    <>
      <Head>
        <title>Notion Clone</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-slate-50 h-full px-8 py-6">
        <Home />
      </main>
    </>
  );
};

export default Main;
