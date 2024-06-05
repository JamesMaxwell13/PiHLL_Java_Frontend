import React, { useEffect, useState } from 'react'
import { listShares, createShare, getShare, updateShare, deleteShare } from '../service/ShareService'
import { useNavigate } from 'react-router-dom'

const ListShareComponent = () => {

    const [Shares, setShares] = useState([])

    const navigator = useNavigate();

    useEffect(() => {
        getAllShares();
    }, [])

    function getAllShares() {
        listShares().then((response) => {
            console.log(response.data); 
            setShares(response.data);
        }).catch(error => {
            if (error.response && error.response.status === 404) {
                setCompanies([]); 
                alert('No users found'); 
            } else {
                console.error(error);
            }
        })
    }

    function addShare() {
        navigator('/add-share')
    }

    function updateShare(id) {
        navigator(`/edit-share/${id}`);
    }

    function removeShare(id) {
        console.log(id);

        deleteShare(id).then((response) => {
            getAllShares();
            console.log(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function getCompany(id) {
        navigator(`/company/${id}`);
    }

  return (
    <div className='container-fluid d-flex flex-column' style={{minHeight: '86vh', paddingBottom: '5vh'}}> 

        <h3 className='text-center'  style={{marginTop: '5vh', marginBottom: '5vh', fontWeight: 'bold'}} >All shares</h3>

        <button style={{ backgroundColor: '#03452f', float: 'left', width: '40vh', color: 'white' }} 
            className='btn mb-2' onClick={addShare}>Add share
        </button>

        <table className='table table-striped table-bordered rounded overfow-hidden'
                style={{ boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', paddingLeft: '20px', paddingRight: '20px'}}>
            <thead className='table-success'>
                <tr>
                    <th>Share Id</th>
                    <th>Previous Close Price</th>
                    <th>Highest Price</th>
                    <th>Lowest Price</th>
                    <th>Open Trading Price</th>
                    <th>Last Sale Price</th>
                    <th>Last Time Update</th>
                    <th>Company Tag</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    Shares.map(Share => 
                        <tr key={Share.id}>
                            <td>{Share.id}</td>
                            <td>{Share.prevClosePrice}</td>
                            <td>{Share.highPrice}</td>
                            <td>{Share.lowPrice}</td>
                            <td>{Share.openPrice}</td>
                            <td>{Share.lastSalePrice}</td>
                            <td style={{ color: 'green' }}>{Share.lastTimeUpdated}</td>
                            <td>{Share.symbol}</td>
                            <td style={{ width: '20vw' }}>
                                <div className="button-container" style={{width: '20vw', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                                    <button style={{ width: '6vw', backgroundColor: '#03452f', textSize: '14px', color: 'white'}} 
                                    className='btn' onClick={() => updateShare(Share.id)}>Update</button>
                                    <button style={{ width: '6vw', backgroundColor: '#03452f', textSize: '14px', color: 'white'}} 
                                    className='btn' onClick={() => removeShare(Share.id)}>Delete</button>
                                    <button style={{ width: '6vw', backgroundColor: '#03452f', textSize: '14px', color: 'white'}} 
                                    className='btn' onClick={() => getCompany(Share.id)}>Company</button>
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

export default ListShareComponent