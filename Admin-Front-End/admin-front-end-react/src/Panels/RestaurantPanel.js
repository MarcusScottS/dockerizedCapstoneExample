import React, { useState, useEffect } from "react";

import AddRestaurantForm from "../forms/AddRestaurantForm";
import EditRestaurantForm from "../forms/EditRestaurantForm";
import DeactivateUserForm from "../forms/DeactivateUserForm";


import { GetRestaurantInformation } from "../hooks";
import RestaurantDisplay from "../tables/RestaurantDisplay";

const RestaurantPanel = () => {
  const [data, loading] = GetRestaurantInformation(0);
  const [restaurants, setRestaurants] = useState(null);

  useEffect(() => {
    if(data) {
      const formattedRestaurants = data.map((obj, i) => {
        return {
          id: obj.restaurantId,
          location_id: obj.location_id,
          owner_id: obj.owner_id,
          name: obj.name,
          location_name: obj.location_name,
          address: obj.address,
          city: obj.city,
          state: obj.state,
          zip_code: obj.zip_code,
          owner_name: obj.owner_name,
          restaurantTags: obj.restaurantTags,
        };
      });
      setRestaurants(formattedRestaurants);
    }
  }, [data]);


  const addRestaurant = (restaurant) => {
    restaurant.id = restaurants[restaurants.length-1].id + 1;
    setRestaurants([...restaurants, restaurant]);
  };

  // const deactivateUser = (id) => {
  //   setrestaurants(restaurants.filter((user) => user.id !== id));
  // };

  const [editing, setEditing] = useState(false);
  const [deactivating, setDeactivating] = useState(false);
  const initialRestaurant = { id: null, location_id: "", owner_id:"",  name: "", location_name: "", address: "", city: "", state: "", zip_code: "", owner_name: "", restaurantTags: [] };
  const [currentRestaurant, setCurrentRestaurant] = useState(initialRestaurant);

  const editRestaurant = (id, restaurant) => {
    setEditing(true);
    setCurrentRestaurant(restaurant);
  }

  const deactivatingRestaurant = (id, restaurant) => {
    setDeactivating(true);
    setCurrentRestaurant(restaurant);
  }

  const updateDeactivateRestaurant = (oldRestaurant) => {
    setRestaurants(
      restaurants.map(restaurant => (restaurant.id === currentRestaurant.id ? oldRestaurant : restaurant))
      );
      setCurrentRestaurant(initialRestaurant);
      setDeactivating(false);
  }

  const updateRestaurant = (newRestaurant) => {
    setRestaurants(
      restaurants.map(restaurant => (restaurant.id === currentRestaurant.id ? newRestaurant : restaurant))
      );
      setCurrentRestaurant(initialRestaurant);
      setEditing(false);
  };


  return (
    <div className="row">
      <div className="col-md-3">
        {deactivating ? (
          <div>
            <h2>Set Active</h2>
            <DeactivateUserForm
              currentUser={currentRestaurant}
              setDeactivating={setDeactivating}
              updateDeactivateUser={updateDeactivateRestaurant}
            />
          </div>
        ) : editing ? ( 
          <div>
            <h2>Edit Restaurant</h2>
            <EditRestaurantForm
              currentRestaurant={currentRestaurant}
              setEditing={setEditing}
              updateRestaurant={updateRestaurant}
            />
          </div>
        ): (
          <div>
            <h2>Add Restaurant</h2>
            <AddRestaurantForm addRestaurant={addRestaurant} />
          </div>
        )}
      </div>
      {loading || !restaurants ? (
        <div className="col-md-9">
          <p>Loading...</p>
        </div>
      ): (
      <div className="col-md-9">
        <h2>View restaurants</h2>
        <RestaurantDisplay
          restaurants={restaurants}
          deactivatingRestaurant={deactivatingRestaurant}
          editRestaurant={editRestaurant}
        />
      </div>
      )}
    </div>
  );
};

export default RestaurantPanel;