import React, { useEffect, useState } from "react";
import { useStateValue } from "../../context/StateProvider";
import movieTrailer from "movie-trailer";
import Youtube from "react-youtube";

import "./detail.css";
const Detail = () => {
  const [{ detail }, dispatch] = useStateValue();
  const [trailerURL, SettrailerUrl] = useState("");
  const playTrailer = () => {
    if (trailerURL) {
      SettrailerUrl("");
    } else {
      movieTrailer(detail?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          SettrailerUrl(urlParams.get("v"));
        })
        .catch((err) => {
          alert("Trailer  not found");
        });
    }
  };
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  return (
    detail && (
      <div
        style={{
          backgroundImage: `url(http://image.tmdb.org/t/p/original/${detail?.backdrop_path})`,
        }}
        className="detail"
      >
        <div className="detail_content">
          <h2 className="detail_heading">
            {detail?.original_name} {detail?.title}
          </h2>

          <p className="highlight">
            Popularity
            <span> {detail?.popularity}</span>⭐
          </p>
          <p className="highlight">
            Language <span>{detail?.original_language}</span>
          </p>
          <p className="highlight">
            Release Date
            <span>
              {detail?.first_air_date} {detail?.release_date}
            </span>
          </p>
          <button className="btn" onClick={playTrailer}>
            {trailerURL ? "Close Trailer " : "Play  Trailer"}
          </button>
          {trailerURL && <Youtube videoId={trailerURL} opts={opts} />}

          <div className="description">{detail?.overview}</div>
        </div>
      </div>
    )
  );
};
export default Detail;
