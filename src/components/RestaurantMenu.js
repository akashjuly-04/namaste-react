import { useEffect, useState } from "react";
import Shimmer from "./shimmer";
import { useParams } from "react-router-dom";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const [menuList, setMenuList] = useState();
  const [showIndex,setShowIndex]=useState();

  const params = useParams();
  console.log("params:", params);
  console.log("rsid:" + params.resId);

  const resid = params.resId;

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.8076844&lng=80.22581149999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const menuItems = await fetch(
      "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.8076844&lng=80.22581149999999&restaurantId=" +
        resid +
        "&catalog_qa=undefined&submitAction=ENTER"
    );

    const json = await data.json();
    console.log("First API JSON data:", json);

    const jsonMenu = await menuItems.json();
    console.log("Second API JSON data", jsonMenu);

    setResInfo(json.data);
    setMenuList(jsonMenu.data);
  };

  if (resInfo === null) return <Shimmer />;

  const json1 =
    resInfo?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
  resNamesObj = null;
  console.log("type:" + typeof json1);

  json1.forEach((element) => {
    const id = element.info.id;
    if (id === resid) {
      resNamesObj = element.info;
      console.log(resNamesObj.name);
    }
    console.log(element.info.id);
  });

  console.log("Restaurant Name Obj:", resNamesObj);
  let resItemList = [];
  const itemList =
    menuList?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
  console.log("itemList", itemList);
  itemList.forEach((el) => {
    let some = el?.card?.card?.categories;
    if (some != null) resItemList.push(some);
  });
  console.log("For Each's/Geetham Resitem", resItemList);

  //    const{name,cuisines,costForTwo}=resInfo?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants[i].info;
  const { name, cuisines, costForTwo } = resNamesObj;
  const { itemCards } =
    menuList?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
      ?.card;
  console.log(itemCards);

  const categories =
    menuList?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ==
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
  console.log("All categories", categories);

  console.log("resNamesobj.Name is:", name);

  return (
    <div className="Menu text-center ">
      <h1 className="text-2xl font-bold m-2 p-2"> {name}</h1>
      <p className="text-lg font-bold">
        {cuisines.join(",")}-{costForTwo}
      </p>

      <ul>
        <li>
          {categories.map((category,index) => (
            <RestaurantCategory data={category.card.card} showItems={index==showIndex?true:false} setShowIndex={()=>setShowIndex(index)} />
          ))}

          {/* {itemCards!=null ?itemCards.map(item=> <li key={item?.card?.info?.id}>{item?.card?.info?.name}-Rs.{item?.card?.info?.price/100 || item?.card?.info?.defaultPrice/100}</li>):""} */}
        </li>
      </ul>
    </div>
  );
};

export default RestaurantMenu;
