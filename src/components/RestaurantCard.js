import {CDN_URL} from "../../utils/constants"
const RestaurantCard=(props)=>{
    
  
    
    // console.log(props.resData.info.cloudinaryImageId)
    return(
      
      <div className="res-card m-4 p-4 w-[350px] bg-gray-100 hover:bg-gray-200 rounded-lg">
        <div className="">
        <img className="h-1/2 w-full rounded-lg"  src={CDN_URL+props.resData.info.cloudinaryImageId}  alt="briyani-pic"/>
        </div>
        <div className="">
          {/* {console.log(props.resData.info)} */}
        <h2 className="font-bold py-3 text-xl">{props.resData.info.name}</h2>
        <h3>{props.resData.info.cuisines.map((i) => {
          // console.log(i)
          return(
            i
          )
        }).join(" , ")}</h3> 
        <h3>{props.resData.info.avgRating} Stars</h3>
        <h3>Arrive in {props.resData.info.sla.deliveryTime} Minutes</h3>
        </div>
      </div>
   
    )
  }

  export default RestaurantCard;