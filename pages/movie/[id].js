import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Movie from "../../components/movie"

export default function Movieid() {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const {id} = router.query;
  const movieId = id;

  useEffect(() => {
    if(id != undefined) {
      const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=301fea267f554470429f50bff9e67513`;
    const fetchMovie = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setMovie(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovie();
    }
  }, [id]);

  return(
    <>
    {loading? `loading`: <Movie movie={movie}/>}</>
  )
}