import React, { useEffect, useState } from "react";
import axios from "../../axios";
import requests from "../../request";
import "./banner.css";
import { useStateValue } from "../../context/StateProvider";
import { useHistory } from "react-router";
function Banner() {
  const [movie, setMovie] = useState({});
  const [{detail}, dispatch] = useStateValue();
const history = useHistory()
 
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  const setDetailScreen = (movie) => {
    dispatch({ type: "DETAIL", payload: movie });
    history.push(`/movie/${movie.id}`);
  };
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOrignal);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
    }
    fetchData();
  }, []);
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(http://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_content">
        <h1 className="banner_heading">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_btn">
          <button onClick={() => setDetailScreen(movie)} className="btn">
            Play
          </button>
          <button onClick={() => setDetailScreen(movie)} className="btn">
            My List
          </button>
        </div>
        <h1 className="description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner-fade" />
    </header>
  );
}

export default Banner;
