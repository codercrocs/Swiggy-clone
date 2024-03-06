import "./Body.css";
import { resData } from "../Utils/data";
import ResCard from "./ResCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  // let listRes = [];
  let [listRes, setListRes] = useState([]);
  let [filteredRest, setfilteredRest] = useState([]);
  let [searchTxt, setsearchTxt] = useState("");
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9815179&lng=80.2179755&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    setListRes(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setfilteredRest(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  if (listRes.length === 0) {
    return <Shimmer />;
  }

  console.log("body rendered");

  return (
    <>
      <div className="search-cont">
        <div className="search-bar ">
          <div className="search-text">
            <input
              type="text"
              className="search-input"
              placeholder="Search for Restaurants and Foods"
              value={searchTxt}
              onChange={(e) => {
                setsearchTxt(e.target.value);
              }}
            ></input>
          </div>

          <div
            className="search-icon"
            onClick={() => {
              let filteredRes = listRes.filter((rat) => {
                return rat.info.name
                  .toLowerCase()
                  .includes(searchTxt.toLowerCase());
              });
              console.log("filteredRes" + filteredRes);
              setfilteredRest(filteredRes);
            }}
          >
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.0998 8.84232C13.0998 11.7418 10.7493 14.0922 7.84989 14.0922C4.95046 14.0922 2.6 11.7418 2.6 8.84232C2.6 5.94289 4.95046 3.59243 7.84989 3.59243C10.7493 3.59243 13.0998 5.94289 13.0998 8.84232ZM12.1431 14.1802C10.9686 15.1261 9.47534 15.6922 7.84989 15.6922C4.0668 15.6922 1 12.6254 1 8.84232C1 5.05923 4.0668 1.99243 7.84989 1.99243C11.633 1.99243 14.6998 5.05923 14.6998 8.84232C14.6998 10.4974 14.1128 12.0153 13.1357 13.1993L18.319 17.9606C18.7226 18.3313 18.7359 18.9637 18.3483 19.3511C17.9634 19.7357 17.3365 19.7254 16.9645 19.3282L12.1431 14.1802Z"
                fill="rgba(2, 6, 12, 0.6)"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="body-header">
        <h2>Top Picks For You</h2>
      </div>
      <hr />
      <div className="filter-button">
        <button
          className="btn btn-light"
          onClick={() => {
            const filtered = listRes.filter((rat) => {
              return rat.info.avgRating > 4.2;
            });
            console.log("ListRes" + { filtered });
            setListRes(filtered);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="body">
        {filteredRest.length < 9
          ? filteredRest.map((res) => (
              <ResCard key={res.info.id} resData={res} />
            ))
          : listRes.map((res) => <ResCard key={res.info.id} resData={res} />)}
      </div>
    </>
  );
};
export default Body;
