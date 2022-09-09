import React, { useState, useEffect } from 'react';



const AddRestaurantForm = (props) => {
    const initRestaurant = {owner_id: '', name: '', location_name: '', address: '', city: '', state: '', zip_code: ''}

    const [restaurant, setRestaurant] = useState(initRestaurant);
    
    // IDs
    const [owner_id, setOwnerId] = useState("");
    
    // Data
    const [name, setName] = useState("");

    // Address
    const [location_name, setLocationName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip_code, setZipCode] = useState("");
    //const [owner_name] = useState(props.currentRestaurant.owner_name);

    // Will probably need to set up custom selection thing for tags
    const [restaurantTags, setRestaurantTags] = useState([]);


    const handleChange= e => {
      const {name, value} = e.target;
      console.log('e.target.name: ' + name);
      console.log('e.target.value: ' + value);

      /*
      // input validation
      let validInputs = 0;
      let button = document.getElementById('submitButton');
      let userNameInput = document.getElementById('userName');
      let first_nameInput = document.getElementById('first_name');
      let last_nameInput = document.getElementById('first_name');
      let emailInput = document.getElementById('email');
      // let phone_numberInput = document.getElementById('phone_number');
      let birthdateInput = document.getElementById('birthdate');
      let veteranCheckbox = document.getElementById('veteranCheckBox');
      console.log(veteranCheckbox);
      let emailConfirmedCheckBox = document.getElementById('emailConfirmedCheckBox');
      console.log(emailConfirmedCheckBox);
      */

      switch(name){
        case 'name':
          setName(value);
          break;
        case 'location_name':
          setLocationName(value);
          break;
        case 'address':
          setAddress(value);
          break;
        case 'city':
          setCity(value);
          break;
        case 'state':
          setState(value);
          break;
        case 'zip_code':
          setZipCode(value);
          break;
        case 'owner_id':
          setOwnerId(value);
          break
        default:
          console.log("Not a valid input option. Please try again.")
      }


      /*
      if(userNameInput.value > 3)
        validInputs++;

      if(first_nameInput.value != '')
        validInputs++;

      if(last_nameInput.value != '')
        validInputs++;

      if(emailInput.value != '')
        for(let s of emailInput.value){
          if(s == '@')
          validInputs++;
        }

      if(birthdateInput.value != '')
        validInputs++;

      if(validInputs > 3){
        console.log('validInputs = green')
        button.style.backgroundColor = "Green";
        button.disabled = false;
      }
      */
      // console.log('validInputs', validInputs);
      setRestaurant({...restaurant, [name]: value});
    }
    


    const handleSubmit = e => {
        e.preventDefault();
        if(restaurant.name){
            handleChange(e, props.addRestaurant(restaurant));
        }
        const data = {owner_id, name, location_name, address, city, state, zip_code};
        console.log('data', data);
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            };
            fetch("http://localhost:8080/restaurant-service/restaurant", requestOptions)
            .then(response => response.json())
            .then(res => console.log(res));
    
            window.location.reload(false);
    }

    return(
        <form>
            <label>Name</label>
            <input className="u-full-width" id="name" type="text" value={restaurant.name} name="name" placeholder="Name" onChange={handleChange} />

            <label>Location Name</label>
            <input className="u-full-width" id="location_name" type="text" value={restaurant.location_name} name="location_name" placeholder = "Location Name" onChange={handleChange} />

            <label>Address</label>
            <input className="u-full-width" id="address" type="text" value={restaurant.address} name="address" placeholder = "Address"  onChange={handleChange} />

            <label>City</label>
            <input className="u-full-width" id="city" type="text" value={restaurant.city} name="city" placeholder = "City"  onChange={handleChange} />

            <label>State</label>
            <input className="u-full-width" id="state" type="text"  value={restaurant.state}  name="state" placeholder = "State" onChange={handleChange} />

            <label>Zip Code</label>
            <input className="u-full-width" id="zip_code" type="text" value={restaurant.zip_code} name="zip_code" placeholder = "Zip Code"  onChange={handleChange} />

            <label>Owner Id</label>
            <input className="u-full-width" id="owner_id" type="text" value={restaurant.owner_id} name="owner_id" placeholder = "Owner User ID"  onChange={handleChange} />

            <button className="button-primary" id="submitButton" type="submit" style={{ backgroundColor: 'red' }}  onClick={handleSubmit}  >Add Restaurant</button>
        </form>    
    )
}

export default AddRestaurantForm;