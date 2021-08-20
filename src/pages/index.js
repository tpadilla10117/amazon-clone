/* Next.js = file based routing, index is '/': */

import { getSession } from "next-auth/client";
import Head from "next/head";
import { Header, Banner, ProductFeed } from '.././utils';

export default function Home( {products} ) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>

      {/* Header */}
      <Header />

      <main className="max-w-screen-2xl mx-auto">

        <Banner />

        <ProductFeed products={products} />

      </main>

      
    </div>
  );
}

/* This function tells Next.js to implement Server-side rendering: */

  export async function getServerSideProps(context) {
    const session = await getSession(context);
    const products = await fetch("https://fakestoreapi.com/products").then( 
      (res) => res.json() 
    );

    /* Pass fetched data as props to component: */
    return { props: {
      products,
      session
      },
    };
  };
