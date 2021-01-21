import React, { useState, useEffect } from "react";
import Card from "./card";

export default function SearchMovies() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [inCinema, setInCinema] = useState([]);

  useEffect(() => {
    const trendingUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=301fea267f554470429f50bff9e67513`;
    const upcomingUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=301fea267f554470429f50bff9e67513&language=en-GB&page=1&region=GB`;
    const inCinemaUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=301fea267f554470429f50bff9e67513&language=en-GB&page=1&region=GB`;
    const fetchTrending = async () => {
      try {
        const response = await fetch(trendingUrl);
        const data = await response.json();
        setTrending(data.results);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTrending();
    const fetchUpcoming = async () => {
      try {
        const response = await fetch(upcomingUrl);
        const data = await response.json();
        setUpcoming(data.results);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUpcoming();
    const fetchInCinemas = async () => {
      try {
        const response = await fetch(inCinemaUrl);
        const data = await response.json();
        setInCinema(data.results);
      } catch (err) {
        console.error(err);
      }
    };
    fetchInCinemas();
  }, []);

  const searchMovies = async (e) => {
    e.preventDefault();

    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=301fea267f554470429f50bff9e67513&language=en-GB&query=${query}&page=1&include_adult=false`;
    if (query.match(/[a-z,A-Z,\d]/g)) {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setMovies(data.results);
      } catch (err) {
        console.error(err);
      }
    }
  };

  function handleChange(e) {
    const value = e.currentTarget.value;
    setQuery(value);
  }

  return (
    <>
      <form className="form" onSubmit={searchMovies}>
        <label className="label" htmlFor="query">
          Movie Name
        </label>
        <input
          type="text"
          name="query"
          placeholder="i.e Star Wars"
          className="input"
          value={query}
          onChange={handleChange}
          required
        ></input>
        <button className="button" type="submit">
          Search
        </button>
      </form>
      {movies.length > 1 && movies.length !== undefined ? (
        <div className="card-list">
          {movies
            .filter((movie) => movie.vote_count > 30)
            .sort((a, b) => Number(a.id) - b.id)
            .map((movie) => (
              <Card key={movie.id} {...movie} />
            ))}
        </div>
      ) : null}
      <h1>Trending</h1>
      <div className="card-list">
        {trending.map((movie) => (
            <Card key={movie.id} {...movie} />
        ))}
      </div>
      <h1>Now in Cinemas</h1>
      <div className="card-list">
        {inCinema.map((movie) =>
          movie.poster_path ? <Card key={movie.id} {...movie} /> : null
        )}
      </div>
      <h1>Coming Soon</h1>
      <div className="card-list">
        {upcoming.map((movie) =>
          movie.poster_path ? <Card key={movie.id} {...movie} /> : null
        )}
      </div>

      <style jsx>{`
        *:focus {
          outline: none;
        }

        .form {
          display: grid;
        }

        .label {
          position: absolute !important;
          height: 1px;
          width: 1px;
          overflow: hidden;
          clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
          clip: rect(1px, 1px, 1px, 1px);
        }

        .input {
          font-size: 1.6rem;
          padding: 0.5rem 2rem;
          line-height: 2.8rem;
          border-radius: 20px;
          border: 1px solid #d9d9da;
          margin-bottom: 1rem;
        }

        .button {
          background: rgba(255, 184, 0, 0.85);
          color: #111727;
          padding: 1rem 2rem;
          border: 1px solid rgba(255, 184, 0, 0.85);
          border-radius: 20px;
          font-size: 1.4rem;
          cursor: pointer;
          transition: background-color 250ms;
          font-weight: 900;
        }

        .button:hover {
          background: rgba(255, 184, 0, 1);
        }

        .card-list {
          display: flex;
          gap: 1rem;
          margin: 2em 0em;
          overflow-x: scroll;
        }

        .card-list::-webkit-scrollbar {
          width: 0;
        }

        @media (min-width: 786px) {
          .form {
            grid-template-columns: 7fr 1fr auto;
            gap: 1rem;
            align-items: center;
          }

          .input {
            margin-bottom: 0;
          }

          .form {
            margin-bottom: 2em;
          }
        }

        @media (min-width: 1024px) {
          .card-list {
            scrollbar-width: normal;
            scrollbar-color: rgba(255, 184, 0, 0.85) transparent;
            position: relative;
            top: -17px;
            padding: 20px 0px 20px 0px;
            overflow-y: hidden;
            gap: 2rem;
          }

          .card-list::-webkit-scrollbar {
            width: 25px;
            height: 25px;
          }

          .card-list::-webkit-scrollbar-track {
            background: transparent;
          }

          .card-list::-webkit-scrollbar-thumb {
            background-color: rgba(255, 184, 0, 0.85);
            border-radius: 40px 10px 40px 10px;
            border-top: solid 7px #20242b;
            border-bottom: solid 7px #20242b;
            border-right: solid 0px rgba(255, 184, 0, 0.85);
            border-left: solid 0px rgba(255, 184, 0, 0.85);
          }

          .card-list::-webkit-scrollbar-thumb:hover {
            cursor: pointer;
          }
        }
      `}</style>
    </>
  );
}
