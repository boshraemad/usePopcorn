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
import { useMovies } from "./hooks/useMovies";

export default function App() {
  const [query, setQuery] = useState("interstellar");

  //get watchedList initial value from localStorage
  const [watched, setWatched] = useState(()=>{
    const storedValue=localStorage.getItem("watchList");
    return JSON.parse(storedValue);
  });
  const [selectedId,setSelectedId]=useState(null);


  //useMovie custom hook
  const {movies , isLoading , error}=useMovies(query)


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



  //add watched movies to localStorage
  useEffect(()=>{
    localStorage.setItem("watchList" , JSON.stringify(watched));
  },[watched])

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