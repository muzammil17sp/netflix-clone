import React, { useState, useEffect } from "react";
import axios from "../../axios";
import "./row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
import { useStateValue } from "../../context/StateProvider";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerURL, SettrailerUrl] = useState("");
  const base_url = "http://image.tmdb.org/t/p/original/";
  const [{detail}, dispatch] = useStateValue();
  const history = useHistory();
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);

      return request;
    }

    fetchData();
  }, [fetchUrl, history]);
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const handleClick = (movie) => {
    dispatch({ type: "DETAIL", payload: movie });
    history.push(`/movie/${movie.id}`);
    // if (trailerURL) {
    //   SettrailerUrl("");
    // } else {
    //   movieTrailer(movie?.name || "")
    //     .then((url) => {
    //       const urlParams = new URLSearchParams(new URL(url).search);
    //       SettrailerUrl(urlParams.get("v"));
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          // <Link>
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "poster_large"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
          // </Link>
        ))}
      </div>
      {trailerURL && <Youtube videoId={trailerURL} opts={opts} />}
    </div>
  );
}

export default Row;
