import { type NextPage } from "next";
import Head from "next/head";
import { ApplicationLayout } from "../components/layout/ApplicationLayout";
import { DescriptionLayout } from "../components/layout/DescriptionLayout";
import { version as versionAtom } from '../atoms/version'
import { useAtom } from "jotai";
import { activeCharacter, characters, getDefaultCharacter } from "../atoms/characters";
import { useEffect } from "react";
import packageInfo from '../../package.json'
import { ConfigModal } from "../components/layout/ConfigModal";

const Home: NextPage = () => {
  const [version, setVersion] = useAtom(versionAtom)
  const [, setChar] = useAtom(activeCharacter)
  const [, setChars] = useAtom(characters)

  useEffect(() => {
    if (version !== packageInfo.version) {
      setChar(getDefaultCharacter())
      setChars([])
      setVersion(packageInfo.version || '0.0.1')
    }
  }, [version, setChar, setChars, setVersion])

  return (
    <>
      <Head>
        <title>T20 Atribute Calculator</title>
        <meta name="description" content="Your T20 attribute calculator" />
        <link rel="icon" href="/favicon.ico" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Hammersmith+One&family=Ubuntu&family=Ubuntu+Mono&display=swap" rel="stylesheet" />
      </Head>
      <main >
        <ConfigModal />
        <ApplicationLayout />
        <DescriptionLayout />
        <var dangerouslySetInnerHTML={{ __html: "<!-- Made by Patrick Dorneles (https://github.com/PatrickDorneles) -->" }} />
      </main>
    </>
  );
};


export async function getStaticProps({ locale }: { locale: string }) {

  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default
    }
  };
}


export default Home;
