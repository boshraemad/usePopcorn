import Star from "./Star"
import { useState } from "react"
import PropTypes from 'prop-types';

export default function Rating({maxRating=5 , fontSize , color , defaultRating , messages , setUserRating }) {
    const [rating , setRating]=useState(defaultRating);
    const [tempRating,setTempRating]=useState(0);

    const handleRating=(rating)=>{
        setRating(rating);
        setUserRating(rating);
    }
    const containerStyles={
        display:"flex",
        alignItems:"center",
        gap:"2px"
    }
     
    const starsContainer={
        display:"flex",
        alignItems:"center",
        gap:"3px"
    }
    
    const RateStyle={
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        width:"100px",
        height:"100px",
        fontSize:`${fontSize}px`,
        color:color,
        fontWeight:"bold",
        lineHeight:"1"
    }

  return (
    <div style={containerStyles}>
        <div style={starsContainer}>
            {
                Array.from({length:maxRating} ,(_,i)=>{
                    return(
                        <Star full={tempRating ? tempRating >= i+1 : rating >= i+1} color={color} fontSize={fontSize} onRate={()=>{handleRating(i+1)}} onHoverIn={()=>{setTempRating(i+1)}} onHoverOut={()=>{setTempRating(0)}}>s{i+1}</Star>
                    )
                })
            }
        </div>
        <p style={RateStyle}>{messages.length === maxRating ? messages[tempRating-1] || messages[rating-1] : tempRating || rating || ""}</p>
    </div>
  )
}


//we can use Typescript instead
Rating.prototype={
    maxRating:PropTypes.number,
    color:PropTypes.string,
    messages:PropTypes.array,
    defaultRating:PropTypes.number
}
