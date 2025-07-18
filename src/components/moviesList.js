import React from 'react'

import Movie from './Movie';

export default function MoviesList({movies , setMovieId , closeMovieDetails}) {
  return (
    <ul className="list list-movies">
    {movies?.map((movie , index) => (
        <Movie key={index} movie={movie} setMovieId={setMovieId} closeMovieDetails={closeMovieDetails}/>
    ))}
  </ul>
  )
}
