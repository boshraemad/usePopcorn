import {useState , useEffect} from "react";

export function useLocalStorageState(initialValue , itemName){
    const [value, setValue] = useState(()=>{
        const storedValue=localStorage.getItem(itemName);
        return storedValue ? JSON.parse(storedValue) : initialValue;
      });

      useEffect(()=>{
        localStorage.setItem(itemName , JSON.stringify(value));
      },[value])


      return [value , setValue]
}