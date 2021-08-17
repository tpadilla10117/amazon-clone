/* Next.js = file based routing, index is '/': */

import Head from "next/head";
import { Header, Banner } from '.././utils';

export default function Home() {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>

      {/* Header */}
      <Header />

      <main className="max-w-screen-2xl mx-auto">
        {/* Banner: */}

        <Banner />

        {/* Product Feed */}

      </main>

      
    </div>
  );
}
