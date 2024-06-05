import React, { useEffect, useState } from 'react'
import { createUser, getUser, updateUser } from '../service/UserService'
import { useNavigate, useParams } from 'react-router-dom'

const UserComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
    })

    const { id } = useParams();

    const navigator = useNavigate();
    const goHome = () => navigator('/users');

    useEffect(() => {
        if (id) {
            getUser(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setPhoneNumber(response.data.phoneNumber);
            }).catch(error => {
                console.error(error);
            })
        }
    }, [id])

    function saveUser(u) {
        u.preventDefault();

        if (validateForm()) {

            if (id) {
                const user = { firstName, lastName, email, phoneNumber }
                updateUser(id, user).then((response) => {
                    console.log(response.data);
                    navigator('/users');
                }).catch(error => {
                    console.error(error);
                })
            } else {
                const user = { firstName, lastName, email, phoneNumber, password }
                console.log(user);
                createUser(user).then((response) => {
                    console.log(response.data);
                    navigator('/users');
                })
                    .catch(error => {
                        console.error(error);
                    })
            }
        }
    }

    function pageTitle() {
        if (id) {
            return <h2 className='text-center' style={{ marginTop: '10px', color: '#003423', fontWeight: 'bold' }}>Edit profile</h2>
        } else {
            return <h2 className='text-center' style={{ marginTop: '10px', color: '#003423', fontWeight: 'bold' }}>Sign up now!</h2>
        }
    }

    function passwordForm() {
        if (!id) {
            return <div className='form-group mb-1'>
                <label className='form-label' style={{ float: 'left' }}>Password</label>
                <input
                    style={{ backgroundColor: '#93eabd' }}
                    type='password'
                    placeholder='Enter Your password'
                    name='password'
                    value={password}
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    onChange={(u) => setPassword(u.target.value)}
                >
                </input>
                {errors.password && <div className='invalid-feedback' style={{ fontSize: '12px' }}> {errors.password} </div>}
            </div>
        }
    }

    function validateForm() {
        let valid = true;

        const errorsCopy = { ...errors };

        if (firstName.trim()) {
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = 'First name is required';
            valid = false;
        }

        if (lastName.trim()) {
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Last name is required';
            valid = false;
        }

        if (email.trim()) {
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Email is required';
            valid = false;
        }

        if (phoneNumber.trim()) {
            errorsCopy.phoneNumber = '';
        } else {
            errorsCopy.phoneNumber = 'Phone number is required';
            valid = false;
        }

        if (!id) {
            if (password.trim()) {
                errorsCopy.password = '';
            } else {
                errorsCopy.password = 'Password is required';
                valid = false;
            }
        }

        setErrors(errorsCopy);

        return valid;
    }

    return (
        <div className='container' style={{ minHeight: '86vh', paddingBottom: '5vh' }}>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset md-3 mt-4'>
                    {
                        pageTitle()
                    }
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-1'>
                                <label className='form-label' style={{ float: 'left' }}>First Name</label>
                                <input
                                    style={{ backgroundColor: '#93eabd' }}
                                    type='text'
                                    placeholder='Enter Your first name'
                                    name='firstName'
                                    value={firstName}
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    onChange={(u) => setFirstName(u.target.value)}
                                >
                                </input>
                                {errors.firstName && <div className='invalid-feedback' style={{ fontSize: '12px' }}> {errors.firstName} </div>}
                            </div>
                            <div className='form-group mb-1'>
                                <label className='form-label' style={{ float: 'left' }}>Last Name</label>
                                <input
                                    style={{ backgroundColor: '#93eabd' }}
                                    type='text'
                                    placeholder='Enter Your last name'
                                    name='lastName'
                                    value={lastName}
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    onChange={(u) => setLastName(u.target.value)}
                                >
                                </input>
                                {errors.lastName && <div className='invalid-feedback' style={{ fontSize: '12px', }}> {errors.lastName} </div>}
                            </div>
                            <div className='form-group mb-1'>
                                <label className='form-label' style={{ float: 'left' }}>Email</label>
                                <input
                                    style={{ backgroundColor: '#93eabd' }}
                                    type='text'
                                    placeholder='Enter Your email'
                                    name='email'
                                    value={email}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    onChange={(u) => setEmail(u.target.value)}
                                >
                                </input>
                                {errors.email && <div className='invalid-feedback' style={{ fontSize: '12px' }}> {errors.email} </div>}
                            </div>
                            <div className='form-group mb-1'>
                                <label className='form-label' style={{ float: 'left' }}>Phone Number</label>
                                <input
                                    style={{ backgroundColor: '#93eabd' }}
                                    type='text'
                                    placeholder='Enter Your phone number'
                                    name='phoneNumber'
                                    value={phoneNumber}
                                    className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                                    onChange={(u) => setPhoneNumber(u.target.value)}
                                >
                                </input>
                                {errors.phoneNumber && <div className='invalid-feedback' style={{ fontSize: '12px' }}> {errors.phoneNumber} </div>}
                            </div>
                            {
                                passwordForm()
                            }
                            <button className='btn btn-success mt-2' style={{
                                backgroundColor: '#003423',
                                width: '200px'
                            }} onClick={saveUser}>Save</button>
                        </form>
                    </div>
                </div>
            </div>
            <button className='btn btn-success mt-3 mb-5' style={{
                backgroundColor: '#003423',
                width: '200px'
            }} onClick={goHome}>Home</button>
        </div>
    )
}

export default UserComponent