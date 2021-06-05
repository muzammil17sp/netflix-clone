import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useStateValue } from "../../context/StateProvider";
import { auth } from "../../firebase";
import request from "../../request";
import Banner from "../BANNER/Banner";
import Nav from "../NAV/Nav";
import Row from "../ROW/Row";
import "./home.css";
const Home = () => {
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();

 if (!user) {
   history.push("/")
 }
  return (
    <div className="home">
      <Nav />
      <Banner />
      <Row
        title="NETFLIX ORIGNAL"
        fetchUrl={request.fetchNetflixOrignal}
        isLargeRow
      />
      <Row title="Trending Now" fetchUrl={request.fetchTrending} />
      <Row title="Top Rated" fetchUrl={request.fetchTopRated} />
      <Row title="Action" fetchUrl={request.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={request.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={request.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={request.fetchRomanceMovies} />
      <Row title="Documentries" fetchUrl={request.fetchDocumentaries} />
    </div>
  );
};

export default Home;
