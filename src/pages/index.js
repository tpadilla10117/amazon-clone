/* Next.js = file based routing, index is '/': */

import Head from "next/head";
import { Header } from '.././utils';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Amazon 2.0</title>
      </Head>

      {/* Header */}
      <Header />

      
    </div>
  );
}
