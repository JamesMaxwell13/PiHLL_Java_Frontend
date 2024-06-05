import React, {useEffect, useState} from 'react'
import { createCompany, getCompany, updateCompany } from '../service/CompanyService'
import { useNavigate, useParams } from 'react-router-dom'

const CompanyComponent = () => {

    const [name, setName] = useState('')
    const [capitalize, setCapitalize] = useState('')
    const [adress, setAdress] = useState('')
    const [website, setWebsite] = useState('')

    const [errors, setErrors] = useState({
        name: "",
        capitalize: "",
        adress: "",
        website: "",
    })

    const {id} = useParams();

    const navigator = useNavigate();
    const goHome = () => navigator('/companies');

    useEffect(() => {
        if(id) {
            getCompany(id).then((response) => {
                setName(response.data.name);
                setCapitalize(response.data.capitalize);
                setAdress(response.data.adress);
                setWebsite(response.data.website);
            }).catch(error => {
                console.error(error);
            })
        }
    },[id])

    function saveCompany(c) {
        c.preventDefault();

        if(validateForm()){

            const company = {name, capitalize, adress, website}
            if(id){
                updateCompany(id, company).then((response) => {
                    console.log(response.data);
                    navigator('/companies');
                }).catch(error => {
                    console.error(error);
                })
            } else {
                createCompany(company).then((response) => {
                    console.log(response.data);
                    navigator('/companies');
                })
                .catch(error => {
                    console.error(error);
                })
            }
        }
    }

    function pageTitle() {
        if(id) {
            return <h2 className='text-center' style={{ marginTop: '10px', color: '#003423', fontWeight: 'bold'}}>Edit company</h2>
        } else {
            return <h2 className='text-center' style={{ marginTop: '10px', color: '#003423', fontWeight: 'bold'}}>Add company now!</h2>
        }
    }

    function validateForm() {
        let valid = true;

        const errorsCopy = {... errors};

        if(name.trim()){
            errorsCopy.name = '';
        } else {
            errorsCopy.name = 'Company name is required';
            valid = false;
        }

        if(capitalize.toString().trim()){
            errorsCopy.capitalize = '';
        } else {
            errorsCopy.capitalize = 'Capital is required';
            valid = false;
        }

        if(adress.trim()){
            errorsCopy.adress = '';
        } else {
            errorsCopy.adress = 'Company adress is required';
            valid = false;
        }

        if(website.trim()){
            errorsCopy.website = '';
        } else {
            errorsCopy.website = 'Website is required';
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }

  return (
    <div className='container' style={{minHeight: '86vh', paddingBottom: '5vh'}}>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset md-3 mt-4'>
                {
                    pageTitle()
                }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-1'> 
                            <label className='form-label' style={{ float: 'left' }}>Company Name</label>
                            <input 
                                style={{ backgroundColor: '#93eabd' }}
                                type='text'
                                placeholder='Enter company name'
                                name='Name'
                                value={name}
                                className={`form-control ${errors.name ? 'is-invalid': '' }`}
                                onChange={(c) => setName(c.target.value)}
                            >
                            </input>
                            {errors.name && <div className='invalid-feedback' style={{fontSize: '12px'}}> {errors.name} </div>}
                        </div>
                        <div className='form-group mb-1'> 
                            <label className='form-label' style={{ float: 'left' }}>Capitalization</label>
                            <input 
                                style={{ backgroundColor: '#93eabd' }}
                                type='text'
                                placeholder='Enter company capitalization in $'
                                name='capitalize'
                                value={capitalize}
                                className={`form-control ${errors.capitalize ? 'is-invalid': '' }`}
                                onChange={(c) => setCapitalize(c.target.value)}
                            >
                            </input>
                            {errors.capitalize && <div className='invalid-feedback' style={{fontSize: '12px',}}> {errors.capitalize} </div>}
                        </div>
                        <div className='form-group mb-1'> 
                            <label className='form-label' style={{ float: 'left' }}>Adress</label>
                            <input 
                                style={{ backgroundColor: '#93eabd' }}
                                type='text'
                                placeholder='Enter company adress'
                                name='adress'
                                value={adress}
                                className={`form-control ${errors.adress ? 'is-invalid': '' }`}
                                onChange={(c) => setAdress(c.target.value)}
                            >
                            </input>
                            {errors.adress && <div className='invalid-feedback' style={{fontSize: '12px'}}> {errors.adress} </div>}
                        </div>
                        <div className='form-group mb-1'> 
                            <label className='form-label' style={{ float: 'left' }}>Website</label>
                            <input 
                                style={{ backgroundColor: '#93eabd' }}
                                type='text'
                                placeholder='Enter company website'
                                name='website'
                                value={website}
                                className={`form-control ${errors.website ? 'is-invalid': '' }`}
                                onChange={(c) => setWebsite(c.target.value)}
                            >
                            </input>
                            {errors.website && <div className='invalid-feedback' style={{fontSize: '12px'}}> {errors.website} </div>}
                        </div>
                        <button className='btn btn-success mt-2' style={{ backgroundColor: '#003423', 
                                width: '200px' }} onClick={saveCompany}>Save</button>
                    </form>
                </div>
            </div>
        </div>
        <button className='btn btn-success mt-3 mb-5' style={{ backgroundColor: '#003423', 
            width: '200px' }} onClick={goHome}>Home</button>
    </div>
  )
}

export default CompanyComponent