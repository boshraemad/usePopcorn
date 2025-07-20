import React from 'react'
 import {useEffect , useRef} from "react";
import { useKey } from '../hooks/useKey';
export default function Search({query , setQuery}) {
  //set to null when select Dom Element
  const  inputEl=useRef(null);

   //focus on element
  useEffect(()=>{
    inputEl.current.focus();
  },[])

  //listen to "Enter" keyPress
  useKey("enter" , function(){
    if(document.activeElement === inputEl) return;
    inputEl.current.focus();
    setQuery("");
  })

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
