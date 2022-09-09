import React from "react";
import RestaurantDisplayEntry from "../Components/RestaurantDisplayEntry";

const RestaurantDisplay = (props) => {
  return (
    <div className="d-flex flex-column justify-content-center">
      {
        props.restaurants.length > 0 ? (
          props.restaurants.map (restaurant => {
            return (
              <RestaurantDisplayEntry 
              restaurant = {restaurant}
              editRestaurant = {props.editRestaurant}
              />
            )
          })
        ) : (
          <div>
            <p>No restaurants found</p>
          </div>
        )   
      }
    </div>
  )
}

export default RestaurantDisplay;