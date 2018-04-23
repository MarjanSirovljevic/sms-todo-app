import React from 'react';

const User = (props) => {
    console.log(props);
    console.log(typeof props.id)
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.email}</td>
            <td>
                <a href="http://b92.net">Details</a>
            </td>
        </tr>
    );
};

export default User;