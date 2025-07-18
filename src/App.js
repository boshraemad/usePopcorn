import { useState , useEffect } from "react";
import Nav from "./components/nav";
import Search from "./components/search";
import ResultsNumber from "./components/resultsNumber";
import Main from "./components/main";
import Box from "./components/Box";
import MoviesList from "./components/moviesList";
import SummaryBox from "./components/SummaryBox";
import WatchList from "./components/WatchList";
import Loader from "./components/Loader";
import Error from "./components/Error";
import MovieDetails from "./components/movieDetails";
export const key="6cac85d9";

export default function App() {
  const [query, setQuery] = useState("interstellar");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [selectedId,setSelectedId]=useState(null);
  const [isLoading , setIsLoading]=useState(false);
  const [error , setError]=useState("");


  const handleMovieSelect=(id)=>{
    setSelectedId((selectedId)=>selectedId === id ? null :id)
  }

  const closeMovieDetails=()=>{
    setSelectedId(null)
  }

  const addWatchedMovie=(movie)=>{

      setWatched((watched)=>[...watched,movie])
  }

  const removeMovieFromWatchList=(id)=>{
    setWatched((watched)=>watched.filter((movie)=>movie.imdbId !== id))
  }

  useEffect(()=>{
    const controller=new AbortController();

    async function fetchMovies(){
      try{
        setIsLoading(true);
        setError("");
        const response = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${key}&s=[${query}]` , {signal:controller.signal});
        if(!response.ok) throw new Error("something wend wrong while fetching data");

        const data = await response.json();
        if(data.Response === "False") throw new Error("movies not found");

        setMovies(data.Search);
        setError("");
      }catch(err){
        if(err.name !== "AbortError"){
          setError(err.message);
        }
      }finally{
        setIsLoading(false);
      }
    }

    if(query.length < 3){    
      setMovies([]);
      setIsLoading(false);
      setError(false);
    }else{
      closeMovieDetails();
      fetchMovies();
    }

    return ()=>controller.abort()
  },[query])

  return (
    <>
      <Nav>
        <Search query={query} setQuery={setQuery}/>
        <ResultsNumber movies={movies}/>
      </Nav>
      <Main>
        <Box>
          {isLoading && <Loader/>}
          {!isLoading && !error && <MoviesList movies={movies} setMovieId={handleMovieSelect}/>}
          {error && <Error message={error}/>}
        </Box>
        <Box>
              {
                selectedId ? <MovieDetails id={selectedId} closeMovieDetails={closeMovieDetails} addWatchedMovie={addWatchedMovie} watched={watched}/> :
                <>
                  <SummaryBox watched={watched}/>
                  <WatchList watched={watched} removeMovieFromWatchList={removeMovieFromWatchList}/>
                </>
              }
        </Box>
      </Main>
    </>
  );
}