import React from "react";
import Head from "next/head";
import Link from "next/link";

export default function Movie({ movie }) {
  const getStarRating = () => {
    let starAmount = (movie.vote_average / 2 / 5) * 100;
    return starAmount;
  };

  const convert = (n) =>
    ` ${(n / 60) ^ 0}`.slice(-2) + " h " + ("0" + (n % 60)).slice(-2) + " m";
  return (
    <>
      {console.log(movie)}
      <div>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            type="text/css"
            href="//use.fontawesome.com/releases/v5.7.2/css/all.css"
          />
        </Head>
      </div>
      <div className="poster-container">
        <Link href="/">
          <a className="chevron">
            <i className="fas fa-chevron-left"></i>
          </a>
        </Link>
      </div>
      <div className="container">
          <p className="movie-title">{movie.title || movie.name}</p>
          <div className="stars-overlay">
            <div
              className="stars-innerlay"
              style={{ width: `${getStarRating()}%` }}
            ></div>
          </div>
          <div className="movie-info">
            <span>{movie.release_date.slice(0, 4)}</span> |
            <span>{convert(movie.runtime)}</span> |
            <span>
              {movie.genres.map((genre, i) => {
                return movie.genres.length === i + 1
                  ? `${genre.name}`
                  : ` ${genre.name}, `;
              })}
            </span>
          </div>
          <h3>Storyline</h3>
          <p className="movie-overview">{movie.overview}</p>
        <div className="movie-watch">
          <a
            href={`https://www.justwatch.com/uk/search?q=${movie.title}`}
            target="_blank"
            className="button"
          >
            Watch movie
          </a>
        </div>
      </div>

      <style jsx>{`
        .stars-overlay {
          align-self: center;
          display: inline-block;
          position: relative;
          font-style: normal;
          width: max-content;
          margin: 2em;
        }

        .stars-overlay::before {
          font-family: "Font Awesome 5 Free";
          font-weight: 900;
          content: "\f005 \f005 \f005 \f005 \f005";
          color: #393941;
          letter-spacing: 0.4rem;
          font-size: 1.2rem;
        }

        .stars-innerlay {
          position: absolute;
          top: 0;
          left: 0;
          white-space: nowrap;
          overflow: hidden;
          width: 0;
        }

        .stars-innerlay::before {
          font-family: "Font Awesome 5 Free";
          font-weight: 900;
          content: "\f005 \f005 \f005 \f005 \f005";
          color: #ffb800;
          letter-spacing: 0.4rem;
          font-size: 1.2rem;
        }

        .poster-container {
          height: 50vh;
          width: 100vw;
          background-color: #20242b;
          background: linear-gradient(
              rgba(32, 36, 43, 0.2),
              rgba(32, 36, 43, 1)
            ),
            url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movie.backdrop_path});
          background-repeat: no-repeat;
          background-position: center top;
          object-fit: cover;
          background-size: auto 100%;
        }

        .movie-title {
          position: relative;
          font-weight: 800;
          z-index: 1;
          font-size: 2.2rem;
          width: 75%;
          margin: 0 auto;
          align-self: center;
          color: #fff;
        }

        .content {
          padding: 0em 1em;
          margin-top: -20%;
          display: flex;
          flex-direction: column;
          text-align: center;
          align-self: center;
          color: #ffffff;
        }

        .movie-info {
          margin: 1em;
          color: #a5a5a8;
          font-size: 1.2rem;
        }

        h3 {
          font-size: 2.2rem;
          margin-bottom: 0;
          color: #fff;
        }

        .movie-overview {
          padding: 0em 1em;
          font-weight: 500;
          margin-top: 0.3em;
          color: #fff;
        }

        .chevron {
          font-size: 2.2rem;
          margin: 2em 1em;
          color: #d2d2d2;
          z-index: 1000;
          position: absolute;
        }

        .movie-watch {
          display: flex;
          place-content: center;
          margin: 3em 0 5em 0;
        }

        .button {
          text-align: center;
          display: inline-block;
          font-size: 1.4rem;
          width: 55%;
          background: #ffb800;
          color: black;
          border: none;
          padding: 1em 2em;
          border-radius: 7px;
          font-weight: bold;
          text-decoration: none;
        }

        .container {
          padding: 0em 1em;
          text-align: center;
        }

        @media (min-width: 1024px) {
          .poster-container {
            background-size: cover;
          }

          .container {
            text-align: left;
            max-width: 1024px;
            margin: 3em auto 3em auto;
            display: grid;
            grid-template-columns: 3em 1fr 3em 1fr 3em;
            grid-template-rows: auto;
            grid-template-areas:
              ". title . storytitle ."
              ". rating . storytitle ."
              ". brief . storyline ."
              ". button . storyline .";
          }

          h3 {
            font-size: 3rem;
            grid-area: storytitle;
            margin-top: 0;
          }

          .movie-overview {
            font-size: 2rem;
            grid-area: storyline;
            padding-left:0;
          }

          .movie-title {
            font-size: 3rem;
            grid-area: title;
            width:100%;
          }

          .stars-overlay, .stars-innerlay {
            grid-area: rating;
            margin-left: 0;
          }

          .stars-innerlay::before,.stars-overlay::before {font-size: 1.6rem;}
      

          .movie-info {
            font-size: 1.4rem;
            grid-area: brief;
            margin-left: 0;
          }

          .movie-watch {
            grid-area: button;
            place-content: flex-start;
          }
        }
      `}</style>
    </>
  );
}
