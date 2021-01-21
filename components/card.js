import React from "react";
import Link from "next/link";

export default function Card(props) {
  const getStarRating = () => {
    let starAmount = (props.vote_average / 2 / 5) * 100;
    return starAmount;
  };
  return (
    <>
      <Link  href={{ pathname: `/movie/${props.id}`, query: props.id}}>
        <div className="card">
          {props.poster_path !== null ? (
            <img
              className="card-poster"
              alt="movie poser"
              src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${props.poster_path}`}
            />
          ) : null}
          <p className="movie-title">{props.title || props.name}</p>
          <div className="stars-overlay">
            <div
              className="stars-innerlay"
              style={{ width: `${getStarRating()}%` }}
            ></div>
          </div>
        </div>
      </Link>
      <style jsx>{`
        .stars-overlay {
          display: inline-block;
          position: relative;
          font-style: normal;
          width: max-content;
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

        .card-poster {
          border-radius: 10px;
          width: 160px;
        }

        .movie-title {
          font-weight: 800;
        }

        .card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        @media (min-width: 1024px) {
          .card-poster {
            width: 200px;
          }
        }
      `}</style>
    </>
  );
}
