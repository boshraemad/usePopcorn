import React from 'react'
import WatchedMovie from './WatchedMovie'

export default function WatchList({watched , removeMovieFromWatchList}) {
  return (
    <ul className="list">
    {watched.map((movie , index) => (
        <WatchedMovie key={index} movie={movie} removeMovieFromWatchList={removeMovieFromWatchList}/>
    ))}
  </ul>
  )
}
