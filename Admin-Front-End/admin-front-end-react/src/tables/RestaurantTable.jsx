import React from 'react';

const RestaurantTable = (props) => {

    //let activeState = "";
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Location ID</th>
                    <th>Owner ID</th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>State</th>
                    <th>ZIP Code</th>
                    <th>Owner Name</th>
                    <th>Restaurant Tags</th>
                </tr>
            </thead>
            <tbody>
                { props.restaurants.length > 0 ? (
                    props.restaurants.map(restaurant => {
                        const {id, location_id, owner_id, name, location_name, address, city, state, zip_code, owner_name, restaurantTags} = restaurant;
                        /*if(account_active == "true"){
                            activeState = "Deactivate"
                        } else {
                            activeState = "Activate";
                        }*/
                        return (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{location_id}</td>
                                <td>{owner_id}</td>
                                <td>{name}</td>
                                <td>{location_name}</td>
                                <td>{address}</td>
                                <td>{city}</td>
                                <td>{state}</td>
                                <td>{zip_code}</td>
                                <td>{owner_name}</td>
                                <td>{restaurantTags.join(', ')}</td>
                                <td>
                                    <button onClick={() => props.editRestaurant(restaurant.id, restaurant)}>Edit</button>
                                </td>
                            </tr>
                        )
                    })
                ) : (
                    <tr>
                        <td colSpan={4}>No restaurants found</td>
                    </tr>
                )   
                }
            </tbody>
        </table>
    )
}

export default RestaurantTable;