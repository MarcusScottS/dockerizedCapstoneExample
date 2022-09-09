import React from "react";
import UserDisplayEntry from "../Components/UserDisplayEntry";

const UserDisplay = (props) => {
  let activeState = "";
  return (
    <div className="d-flex flex-column justify-content-center">
      {
        props.users.length > 0 ? (
          props.users.map (user => {
            if(user.account_active === "true"){
              activeState = "Deactivate"
            } else {
              activeState = "Activate";
            }
            return (
              <UserDisplayEntry 
              user = {user}
              editUser = {props.editUser}
              deactivatingUser = {props.deactivatingUser}
              activeState = {activeState}
              />
            )
          })
        ) : (
          <div>
            <p>No users found</p>
          </div>
        )   
      }
    </div>
  )
}

export default UserDisplay;