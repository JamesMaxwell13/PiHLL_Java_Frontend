import React, { useEffect, useState } from 'react'
import { listCompanies, createCompany, getCompany, updateCompany, deleteCompany } from '../service/CompanyService'
import { useNavigate } from 'react-router-dom'

const ListCompanyComponent = () => {

    const [companies, setCompanies] = useState([])

    const navigator = useNavigate();

    useEffect(() => {
        getAllCompanies();
    }, [])

    function getAllCompanies() {
        listCompanies().then((response) => {
            console.log(response.data);
            setCompanies(response.data);
        }).catch(error => {
            if (error.response && error.response.status === 404) {
                setCompanies([]);
                alert('No companies found');
            } else {
                console.error(error);
            }
        })
    }

    function addCompany() {
        navigator('/add-company')
    }

    function updateCompany(id) {
        navigator(`/edit-company/${id}`);
    }

    function removeCompany(id) {
        console.log(id);

        deleteCompany(id).then((response) => {
            getAllCompanies();
            console.log(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function getShares(companyId) {
        navigator(`/company-shares/${companyId}`);
    }

    return (
        <div className='container-fluid d-flex flex-column' style={{ minHeight: '86vh', paddingBottom: '5vh' }}>

            <h3 className='text-center' style={{ marginTop: '5vh', marginBottom: '2vh', fontWeight: 'bold' }} >All companies</h3>

            <button style={{ backgroundColor: '#03452f', float: 'left', width: '40vh' }}
                className='btn btn-primary mb-3' onClick={addCompany}>Add company
            </button>

            <table className='table table-striped table-bordered rounded overfow-hidden'
                style={{ boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', paddingLeft: '20px', paddingRight: '20px' }}>
                <thead className='table-success'>
                    <tr>
                        <th>Company Id</th>
                        <th>Company Name</th>
                        <th>Capitalization</th>
                        <th>Adress</th>
                        <th>Website</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        companies.map(company =>
                            <tr key={company.id}>
                                <td>{company.id}</td>
                                <td>{company.name}</td>
                                <td>{company.capitalize}</td>
                                <td>{company.adress}</td>
                                <td>{company.website}</td>
                                <td style={{ width: '20vw' }}>
                                    <div className="button-container" style={{ width: '20vw', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                                        <button style={{ width: '6vw', backgroundColor: '#03452f', textSize: '14px', color: 'white' }}
                                            className='btn' onClick={() => updateCompany(company.id)}>Update</button>
                                        <button style={{ width: '6vw', backgroundColor: '#03452f', textSize: '14px', color: 'white' }}
                                            className='btn' onClick={() => removeCompany(company.id)}>Delete</button>
                                        <button style={{ width: '6vw', backgroundColor: '#03452f', textSize: '14px', color: 'white' }}
                                            className='btn' onClick={() => getShares(company.id)}>Shares</button>
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

export default ListCompanyComponent