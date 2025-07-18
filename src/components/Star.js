import { FaStar } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";


export default function Star({full , color , fontSize , onRate , onHoverIn , onHoverOut}) {
  const starStyle={
    display:"block",
    width:"25px",
    height:"25px",
    cursor:"pointer",
    color:color,
}
  return (
    <div>
        {
            full? <FaStar onClick={onRate} style={starStyle} onMouseEnter={onHoverIn} onMouseLeave={onHoverOut}/> : <CiStar onClick={onRate} style={starStyle} onMouseEnter={onHoverIn} onMouseLeave={onHoverOut}/>
        }
    </div>
  )
}
