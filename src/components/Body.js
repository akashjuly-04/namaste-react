import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./shimmer";
import { Link } from "react-router-dom";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurant] = useState([]);
  const [filteredRest, setFilteredRest] = useState([]);
  const [searchText, setSearchText] = useState("");
  console.log(listOfRestaurants);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.8076844&lng=80.22581149999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    console.log("Api fetched data Not converted to json", data);
    const json = await data.json();
    console.log("Data Fetched from Api after converted to JSON", json);
    setListOfRestaurant(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRest(
      json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants
    );
    // console.log(json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants);
  };

  if (listOfRestaurants.length === 0) {
    return (
      <>
        <Shimmer />
        <Shimmer />
        <Shimmer />
        <Shimmer />
        <Shimmer />
        <Shimmer />
      </>
    );
  }

  return (
    <div className="body">
      <div className="filter flex">
        <div className="search-container p-4 m-4">
          <input
            type="text"
            className="border border-solid border-black"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          ></input>
          <button
            className="px-4 py-2 bg-green-100 m-2 rounded-lg"
            onClick={() => {
              const filteredRestaurants = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText)
              );
              console.log(filteredRestaurants);
              setFilteredRest(filteredRestaurants);
            }}
          >
            Search
          </button>
        </div>
        <div className="p-4 m-4 flex items-center ">
        <button
          className="px-4 py-2 bg-gray-100 rounded-lg"
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (res) => res.info.avgRating > 4
            );
            console.log(filteredList);
            setFilteredRest(filteredList);
          }}
        >
          Top Rated Restaurant
        </button>
        </div>
      </div>

      <div className="res-container flex flex-wrap">
        {filteredRest.map((restaurant) => (
          <Link to={"/restaurants/" + restaurant.info.id}>
            <RestaurantCard key={restaurant.info.id} resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
