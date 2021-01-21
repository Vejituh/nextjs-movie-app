import Head from "next/head";
import SearchMovies from "../components/searchMovies";

export default function Home() {
  return (
    <>
      <div>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" type="text/css" href="//use.fontawesome.com/releases/v5.7.2/css/all.css" />
        </Head>

        <div className="container">
          <SearchMovies />
        </div>
      </div>
      <style jsx>{`
        .container {
          margin: 0 auto;
          max-width: 1000px;
          padding: 30px 20px;
        }
      `}</style>
    </>
  );
}
