import React, { useState, useEffect } from 'react';

const EditRestaurantForm = (props) => {

    useEffect(() => {
        setRestaurant(props.currentRestaurant)
    }, [props])
    

    const [restaurant, setRestaurant] = useState(props.currentRestaurant);
    // IDs
    const [restaurantId] = useState(props.currentRestaurant.id);
    const [location_id, setLocationId] = useState(props.currentRestaurant.location_id);
    const [owner_id, setOwnerId] = useState(props.currentRestaurant.owner_id);
    // Data
    const [name, setName] = useState(props.currentRestaurant.name);
    const [location_name, setLocationName] = useState(props.currentRestaurant.location_name);

    // Either need to update endpoint or limit what you can update here
    // const [address, setAddress] = useState(props.currentRestaurant.address);
    // const [city, setCity] = useState(props.currentRestaurant.city);
    // const [state, setState] = useState(props.currentRestaurant.state);
    // const [zip_code, setZipCode] = useState(props.currentRestaurant.zip_code);
    // const [owner_name] = useState(props.currentRestaurant.owner_name);

    // Will probably need to set up custom selection thing for tags
    const [restaurantTags, setRestaurantTags] = useState(props.currentRestaurant.restaurantTags);


    const handleChange = e => {
      const {name, value} = e.target;

      console.log('e.target.name: ' + name);
      console.log('e.target.value: ' + value);

      // input validation, need to ask marcus about this...
      let button = document.getElementById('submitButton');
      let nameInput = document.getElementById('first_name');
      let location_nameInput = document.getElementById('first_name');
      let addressInput = document.getElementById('email');
      let birthdateInput = document.getElementById('birthdate');

      switch(name){
        case 'name':
          setName(value);
          break;
        case 'owner_id':
          setOwnerId(value);
          break;
        case 'location_id':
          setLocationId(value);
          break;
        default:
          console.log("Not a valid input option. Please try again.")
      }


      setRestaurant({...restaurant, [name]: value});
    }

    const handleSubmit = e => {
      e.preventDefault();
      if (restaurant.name) props.updateRestaurant(restaurant);
      const data = { restaurantId, location_id, owner_id, name, /*location_name, address, city, state, zip_code, owner_name, restaurantTags*/};

      console.log('data', data);

      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      };

      fetch("http://localhost:8080/restaurant-service/restaurant/" + restaurantId, requestOptions)
      .then(response => response.json())
      .then(response => console.log(response));
      window.location.reload(false);
    }

    return (
      <form>
        <label>Name</label>
        <input className="u-full-width" id="name" type="text" value={restaurant.name} name="name" placeholder = "Name" onChange={handleChange} />

        <label>Owner ID</label>
        <input className="u-full-width" id="owner_id" type="text" value={restaurant.owner_id} name="owner_id" placeholder = "Owner ID" onChange={handleChange} />

        <label>Location ID</label>
        <input className="u-full-width" id="location_id" type="text" value={restaurant.location_id} name="location_id" placeholder = "Location ID" onChange={handleChange} />

        <div className='d-flex'>
          <button className="button-primary" id="submitButton" type="submit" onClick={handleSubmit} >Save Restaurant</button>
          <div className='flex-fill'></div>
          <button type="submit" onClick={() => props.setEditing(false)} >Cancel</button>
        </div>
        
      </form>
    )
}

export default EditRestaurantForm;