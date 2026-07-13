import { type NextPage } from "next";
import Head from "next/head";
import { ApplicationLayout } from "../components/layout/ApplicationLayout";
import { DescriptionLayout } from "../components/layout/DescriptionLayout";
import { version as versionAtom } from '../atoms/version'
import { useAtom } from "jotai";
import { activeCharacter, characters, getDefaultCharacter } from "../atoms/characters";
import { useEffect } from "react";
import packageInfo from '../../package.json'
import { useRouter } from 'next/router'
import LZString from 'lz-string'

const Home: NextPage = () => {
  const router = useRouter()
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

  useEffect(() => {
    if (!router.isReady) return

    const charData = router.query.char as string
    if (charData) {
      try {
        const decompressed = LZString.decompressFromEncodedURIComponent(charData)
        if (decompressed) {
          const char = JSON.parse(decompressed)
          setChar(char)
        }
      } catch (err) {
        console.error("Failed to load character from URL", err)
      }
    }
  }, [router.isReady, router.query, setChar])

  return (

    <>
      <Head>
        <title>T20 Atribute Calculator</title>
        <meta name="description" content="Your T20 attribute calculator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
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
