import {useState, useEffect} from "react";

export const key="6cac85d9";
export function useMovies(query){
    const [movies, setMovies] = useState([]);
    const [isLoading , setIsLoading]=useState(false);
    const [error , setError]=useState("");

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
        //   closeMovieDetails();
          fetchMovies();
        }
    
        return ()=>controller.abort()
      },[query])

      return {movies,isLoading,error}

}