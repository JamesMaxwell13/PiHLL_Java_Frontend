import React, { useEffect, useState } from 'react'
import { listUsers, createUser, getUser, updateUser, deleteUser } from '../service/UserService'
import { useNavigate } from 'react-router-dom'

const ListUserComponent = () => {

    const [users, setUsers] = useState([])

    const navigator = useNavigate();

    useEffect(() => {
        getAllUsers();
    }, [])

    function getAllUsers() {
        listUsers().then((response) => {
            console.log(response.data); 
            setUsers(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addUser() {
        navigator('/add-user')
    }

    function updateUser(id) {
        navigator(`/edit-user/${id}`);
    }

    function removeUser(id) {
        console.log(id);

        deleteUser(id).then((response) => {
            getAllUsers();
            console.log(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function getShares(id) {
        navigator(`/edit-user/${id}`);
    }

  return (
    <div className='container-fluid d-flex flex-column' style={{minHeight: '87vh', paddingBottom: '5vh'}}> 

        <h3 className='text-center'  style={{marginTop: '5vh', marginBottom: '5vh', fontWeight: 'bold'}} >Registered users</h3>

        <button style={{ backgroundColor: '#03452f', float: 'left', width: '40vh' }} 
            className='btn btn-primary mb-2' onClick={addUser}>Add user
        </button>

        <table className='table table-striped table-bordered rounded overfow-hidden'
                style={{ boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', paddingLeft: '20px', paddingRight: '20px'}}>
            <thead className='table-success'>
                <tr>
                    <th>User Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map(user => 
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.phoneNumber}</td>
                            <td style={{ width: '20vw' }}>
                                <div className="button-container">
                                    <button style={{ width: '6vw', backgroundColor: '#03452f', textSize: '14px', color: 'white'}} 
                                    className='btn btn-info' onClick={() => updateUser(user.id)}>Update</button>
                                    <button style={{ width: '6vw', backgroundColor: '#03452f', textSize: '14px', color: 'white'}} 
                                    className='btn btn-danger' onClick={() => removeUser(user.id)}>Delete</button>
                                    <button style={{ width: '6vw', backgroundColor: '#03452f', textSize: '14px', color: 'white'}} 
                                    className='btn btn-info' onClick={() => updateUser(user.id)}>Shares</button>
                                </div>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListUserComponent