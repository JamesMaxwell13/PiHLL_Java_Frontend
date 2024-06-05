import React, { useEffect, useState } from 'react'
import { getCompany } from '../service/ShareService'
import { deleteCompany } from '../service/CompanyService'
import { useNavigate, useParams } from 'react-router-dom'

const CompanyViewComponent = () => {
    const { shareId } = useParams();

    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [capitalize, setCapitalize] = useState('')
    const [adress, setAdress] = useState('')
    const [website, setWebsite] = useState('')

    const navigator = useNavigate();
    const goHome = () => navigator('/shares');

    useEffect(() => {
        if (shareId) {
            getCompany(shareId).then((response) => {
                console.log(response.data);
                setId(response.data.id)
                setName(response.data.name);
                setCapitalize(response.data.capitalize);
                setAdress(response.data.adress);
                setWebsite(response.data.website);
            }).catch(error => {
                console.error(error);
            })
        }
    }, [shareId])

    function updateCompany(id) {
        navigator(`/edit-company/${id}`);
    }

    function removeCompany(id) {
        console.log(id);

        deleteCompany(id).then((response) => {
            goHome();
            console.log(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function getShares(id) {
        navigator(`/company-shares/${id}`);
    }

    const company = { id, name, capitalize, adress, website }

    return (
        <div className='container-fluid d-flex flex-column' style={{ minHeight: '86vh', paddingBottom: '5vh' }}>

            <h3 className='text-center' style={{ marginTop: '4vh', marginBottom: '4vh', fontWeight: 'bold' }} >Company №{id}</h3>
            <div className='container-fluid d-flex flex-column justify-content-left align-items-center'>
                <table className='table table-striped table-bordered rounded overfow-hidden w-50'
                    style={{ boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
                    <thead className='table-success'>
                        <tr>
                            <th colSpan="2">Company Profile</th>
                        </tr>
                    </thead>
                    <tbody className='text-start'>
                        <tr>
                            <td>Company Id</td>
                            <td>{company.id}</td>
                        </tr>
                        <tr>
                            <td>Company Name</td>
                            <td>{company.name}</td>
                        </tr>
                        <tr>
                            <td>Capitalization</td>
                            <td>{company.capitalize}</td>
                        </tr>
                        <tr>
                            <td>Company Adress</td>
                            <td>{company.adress}</td>
                        </tr>
                        <tr>
                            <td>Website</td>
                            <td>{company.website}</td>
                        </tr>
                    </tbody>
                </table>

                <h3 className='text-center' style={{ marginTop: '2vh', marginBottom: '4vh', fontWeight: 'bold' }}>Actions</h3>
                <div className="button-container" style={{ width: '50vw', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                    <button style={{ width: '15vw', backgroundColor: '#03452f', textSize: '14px', color: 'white' }}
                        className='btn' onClick={() => updateCompany(id)}>Update</button>
                    <button style={{ width: '15vw', backgroundColor: '#03452f', textSize: '14px', color: 'white' }}
                        className='btn' onClick={() => removeCompany(id)}>Delete</button>
                    <button style={{ width: '15vw', backgroundColor: '#03452f', textSize: '14px', color: 'white' }}
                        className='btn' onClick={() => getShares(id)}>Shares</button>
                </div>
                <button className='btn mt-3' style={{
                    backgroundColor: '#03452f', width: '48.37vw',
                    textSize: '14px', color: 'white'
                }} onClick={goHome}>Home</button>
            </div>
        </div>
    )
}

export default CompanyViewComponent