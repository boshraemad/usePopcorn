import React from 'react'
 import {useEffect , useRef} from "react";
export default function Search({query , setQuery}) {
  //set to null when select Dom Element
  const  inputEl=useRef(null);

   //focus on element
  useEffect(()=>{
    inputEl.current.focus();
  },[])

  //listen to "Enter" keyPress
  useEffect(()=>{
    if(document.activeElement === inputEl) return;
    const callback=(e)=>{
      if(e.code === "Enter"){
        inputEl.current.focus();
        setQuery("");
      }
    }
    document.addEventListener("keydown",callback);
  },[setQuery])

  return (
    <input
    className="search"
    type="text"
    placeholder="Search movies..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    ref={inputEl}
  />
  )
}
