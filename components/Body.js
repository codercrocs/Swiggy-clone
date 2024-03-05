import "./Body.css";
import { resData } from "../Utils/data";
import ResCard from "./ResCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
// API data

const Body = () => {
  // let listRes = [];
  let [listRes, setListRes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9815179&lng=80.2179755&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    console.log(json);
    setListRes(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  if (listRes.length === 0) {
    return <Shimmer />;
  }
  // data.cards[4].card.card.gridElements.infoWithStyle.restaurants[2].info

  // data.cards[4].card.card.gridElements.infoWithStyle.restaurants

  console.log("body Rendered");

  return (
    <>
      <div className="body-header">
        <h2>Top Picks For You</h2>
      </div>
      <hr />
      <div className="filter-button">
        <button
          className="btn btn-light"
          onClick={() => {
            const filtered = listRes.filter((rat) => {
              return rat.info.avgRating > 4.5;
            });
            setListRes(filtered);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="body">
        {listRes.map((res) => (
          <ResCard key={res.info.id} resData={res} />
        ))}
      </div>
    </>
  );
};
export default Body;
