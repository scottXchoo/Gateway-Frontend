import Head from "next/head";
import About from "@/components/About";
import Hero from "@/components/Hero";
import Main from "@/components/Main";

export default function Home() {
  return (
    <>
      <Head>
        <title>Gateway | Rewards for Everything</title>
        <meta
          name="description"
          content="Gateway on Archway, Rewards for Everything"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <Hero />
        <Main />
        <About />
      </>
    </>
  );
}
