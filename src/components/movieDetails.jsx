import Loader from "./Loader";
import Rating from "./Rating";
import { useState, useEffect , useRef } from "react";
import { key } from "../App";
import { FaStar } from "react-icons/fa6";

export default function MovieDetails({ id, closeMovieDetails , addWatchedMovie , watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating , setUserRating] = useState(0);
  const countRef=useRef(0);
  const isWatched=watched.map((movie)=>movie.imdbId).includes(id);
  const watchedMovieUserRating=watched.find((movie)=>movie.imdbId === id)?.userRating;

  useEffect(()=>{
    if(userRating) countRef.current+=1;

  } , [userRating])
  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&i=${id}`);
      const data = await res.json();
      setIsLoading(false);
      setMovie(data);
    };

    fetchMovieDetails();
  }, [id]);

  const {
    Title: title,
    Year:year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(()=>{
    if(!title)return;
    document.title=`movie|${title}`
     return ()=>{document.title="usePopcorn "}
  },[title])

  //add keypress eventlistener
  useEffect(()=>{
    function callback(e){
      if(e.code === "Escape"){
        closeMovieDetails();
      }
    }
      document.addEventListener("keydown", callback);

      return ()=>document.removeEventListener("keydown" , callback);

  },[closeMovieDetails])

  const handleAddWatchedMovie=()=>{
    const newMovie={
        imdbId:id,
        title,
        year,
        poster,
        imdbRating:Number(imdbRating),
        runtime:Number(runtime.split(" ").at(0)),
        userRating:userRating,
        countRatingDecisions:countRef
    }
    addWatchedMovie(newMovie);
    closeMovieDetails();
  }
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button
              className="btn-back"
              onClick={() => {
                closeMovieDetails();
              }}
            >
              &larr;
            </button>
            <img src={poster} alt={`poster of ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>
                  <FaStar style={{ color: "gold", fontSize: "13px" }} />
                </span>
                {imdbRating} ImDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {
                isWatched? <p style={{textAlign:"center"}}>you rated this movie  <FaStar style={{color:"gold"}}/> {watchedMovieUserRating}</p> :
                <>
                    <Rating maxRating={10} messages={[]} color="gold" setUserRating={setUserRating} />
                    <button className="btn-add" onClick={()=>{handleAddWatchedMovie()}}>+ add to watchlist</button>
                </>
              }
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
