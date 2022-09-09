import React, { useState, useEffect } from "react";

import UserPanel from "./Panels/UserPanel";
import RestaurantPanel from "./Panels/RestaurantPanel";

const App = () => {
  const [restaurantView, setRestaurantView] = useState(true);
  const [userView, setUserView] = useState(false);

  const handleClick = e => {
    e.preventDefault();
    const {name, value} = e.target;

    if(name === "restaurant"){
      setRestaurantView(true);
      setUserView(false);
    } else {
      setUserView(true);
      setRestaurantView(false);
    }

  }

  
  return (
    <div className="container-lg">
      <h1>MegaBytes Admin</h1>
      <div className="navbar navbar-dark">
        <button onClick={handleClick} name="restaurant">Restaurants</button>
        <button onClick={handleClick} name="user">Users</button>
      </div>
        { restaurantView ? (
            <RestaurantPanel></RestaurantPanel>
          ) : (
            <UserPanel></UserPanel>
          )

        }
    </div>
  );

};

export default App;