// import { useEffect,useState } from "react";

// const useRestaurantMenu=(resInfo)=>{

//     const[resInfo,setResInfo]=useState(null)
//     const[menuList,setMenuList]=useState();

//     useEffect(()=>{
//         fetchMenu();
//     },[])

//     const fetchMenu=async ()=>{
//         const data=await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.8076844&lng=80.22581149999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
//         const menuItems=await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.8076844&lng=80.22581149999999&restaurantId="+resid+"&catalog_qa=undefined&submitAction=ENTER")

//         const json=await data.json();
//         console.log("First API JSON data:",json)

//         const jsonMenu=await menuItems.json();
//         console.log("Second API JSON data",jsonMenu)

//         setResInfo(json.data)
//         setMenuList(jsonMenu.data)
//     }
//     return(resInfo)
//     return(menuList)

// }

// export default useRestaurantMenu;