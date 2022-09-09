import React from 'react';

const UserTable = (props) => {

    let activeState = "";
    return (
        <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>enabled</th>
                    <th>userName</th>
                    <th>firstName</th>
                    <th>lastName</th>
                    <th>email</th>
                    <th>phoneNumber</th>
                    <th>birthdate</th>
                    <th>veteranStatus</th>
                    <th>emailConfirmed</th>
                    <th>accountActive</th>
                </tr>
            </thead>
            <tbody>
                { props.users.length > 0 ? (
                    props.users.map(user => {
                        const {id, userName, enabled, first_name, last_name, email, phone_number, birthdate, veteran_status, email_confirmed, account_active} = user;
                        if(account_active == "true"){
                            activeState = "Deactivate"
                        } else {
                            activeState = "Activate";
                        }
                        return (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{enabled}</td>
                                <td>{userName}</td>
                                <td>{first_name}</td>
                                <td>{last_name}</td>
                                <td>{email}</td>
                                <td>{phone_number}</td>
                                <td>{birthdate}</td>
                                <td>{veteran_status}</td>
                                <td>{email_confirmed}</td>
                                <td>{account_active}</td>
                                <td>
                                    <button onClick={() => props.deactivatingUser(user.id, user)}>{activeState}</button>
                                    <button onClick={() => props.editUser(user.id, user)}>Edit</button>
                                </td>
                            </tr>
                        )
                    })
                ) : (
                    <tr>
                        <td colSpan={4}>No users found</td>
                    </tr>
                )   
                }
            </tbody>
        </table>
    )
}

export default UserTable;