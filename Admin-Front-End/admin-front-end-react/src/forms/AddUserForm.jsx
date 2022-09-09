import React, { useState, useEffect } from 'react';
import axios from 'axios';


const AddUserForm = (props) => {
    const initUser = { id: null, userName: "", password: "", enabled: "", first_name: "", last_name: "", email: "", phone_number: "", birthdate: "", veteran_status: "", email_confirmed: "", account_active: ""};

    const [user, setUser] = useState(initUser);
    const [userName, setUserName] = useState("");
    const [password] = useState("12345");
    const [enabled] = useState(true);
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [birthdate, setBirthDate] = useState("");
    const [veteran_status, setVeteranStatus] = useState(false);
    const [email_confirmed] = useState(false);
    const [communication_type_id] = useState("");
    const [account_active] = useState(true);
    const [disabledStatus, setDisabledStatus] = useState(true);

    useEffect(() => {

    }, [props])


    const handleChange= e => {
        const {name, value} = e.target;
        console.log('e.target.name: ' + name);
        console.log('e.target.value: ' + value);


        // input validation
        let validInputs = 0;
        let button = document.getElementById('submitButton');
        let userNameInput = document.getElementById('userName');
        let first_nameInput = document.getElementById('first_name');
        let last_nameInput = document.getElementById('first_name');
        let emailInput = document.getElementById('email');
        let birthdateInput = document.getElementById('birthdate');
        let veteran_statusInput = document.getElementById('veteran_status');
        console.log(veteran_statusInput);

        switch(name){
            case 'userName':
                setUserName(value);
                console.log('setting UserName');
                break;
            case 'first_name':
                setFirstName(value);
                console.log('setting firstName');
                break;
            case 'last_name':
                setLastName(value);
                console.log('setting lastName');
                break;
            case 'email':
                setEmail(value);
                console.log('setting email');
                break;
            case 'phone_number':
                setPhoneNumber(value);
                console.log('setting phoneNumber');
                break;
            case 'birthdate':
                setBirthDate(value);
                console.log('setting birthdate');
                break;
            default:
                console.log("Not a valid input option. Please try again.")
        }



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
            console.log('validInputs = met')
            button.style.opacity = "1";
            setDisabledStatus(false);
        }
        console.log('button ready to submit', button);
        
        console.log('validInputs', validInputs);
        setUser({...user, [name]: value});
    }
    


    const handleSubmit = e => {
        e.preventDefault();

        if(user.userName){
            handleChange(e, props.addUser(user));
        }
        const data = { userName, password,  enabled, first_name, last_name, email, phone_number, birthdate, veteran_status, email_confirmed, communication_type_id, account_active};
        console.log('data', data);
            axios
                .post("http://localhost:8081/user/create-user-information", {
                    userName: data.userName,
                    password: data.password,
                    enabled: data.enabled,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    phone_number: data.phone_number,
                    birthdate: data.birthdate,
                    veteran_status: data.veteran_status,
                    email_confirmed: data.email_confirmed,
                    communication_type_id: data.communication_type_id,
                    account_active: data.account_active                    
                })
                .then((response) => {
                    console.log(response);
                }).catch((error) => {
                    console.log(error);
                })

                window.location.reload();
    }

    return(
        <form>
            <label htmlFor="userName">Username</label>
            <input className="u-full-width form-control" id="userName" type="text" value={user.userName} name="userName" placeholder="Enter at least 4 characters" onChange={handleChange} />
            <label>FirstName</label>
            <input className="u-full-width" id="first_name" type="text" value={user.first_name} name="first_name" placeholder = "First Name" onChange={handleChange} />
            <label>LastName</label>
            <input className="u-full-width" id="last_name" type="text" value={user.last_name} name="last_name" placeholder = "Last Name"  onChange={handleChange} />
            <label htmlFor="email">Email</label>
            <input className="u-full-width form-control" id="email" type="email" value={user.email} name="email" placeholder = "user@mail.com"  onChange={handleChange} />
            <label>PhoneNumber</label>
            <input className="u-full-width" id="phone_number" type="text"  value={user.phone_number}  name="phone_number" placeholder = "###-###-####" onChange={handleChange} />
            <label>BirthDate</label>
            <input className="u-full-width" id="birthdate" type="text" value={user.birthdate} name="birthdate" placeholder = "YYYY-MM-DD"  onChange={handleChange} />
            <label>Veteran</label>
            <select className="u-full-width" id="veteran_status" name="veteran_status"  onChange={(e) => setVeteranStatus(e.target.value)}>
                <option value = {"false"}>False</option>
                <option value = {"true"}>True</option>
            </select>
            <button className="button-primary" id="submitButton" type="submit" style={{ opacity: 0.2 }}  onClick={handleSubmit}  disabled={disabledStatus}>Add user</button>
        </form>    
    )
}

export default AddUserForm;