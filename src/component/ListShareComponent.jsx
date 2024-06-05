import React, { useEffect, useState } from 'react'
import { listShares, getUserShares, sellUserShare, getCompanyShares, buyUserShare, getNotPurchasedShares, deleteShare } from '../service/ShareService'
import { useNavigate, useParams } from 'react-router-dom'

const ListShareComponent = () => {

    const [Shares, setShares] = useState([])

    const navigator = useNavigate();

    const { userId } = useParams();
    const { userBuyId } = useParams();
    const { companyId } = useParams();

    useEffect(() => {
        if (userId) {
            console.log(userId);
            getSharesFromUser();
        } else if (userBuyId) {
            console.log(userBuyId);
            getFreeShares(userBuyId);
        } else if (companyId) {
            console.log(companyId);
            getSharesFromCompany(companyId);
        } else {
            console.log("all");
            getAllShares();
        }
    }, [])

    function getAllShares() {
        listShares().then((response) => {
            console.log(response.data);
            setShares(response.data);
        }).catch(error => {
            if (error.response && error.response.status === 404) {
                setShares([]);
                alert('No shares found');
            } else {
                console.error(error);
            }
        })
    }

    function getSharesFromUser() {
        getUserShares(userId).then((response) => {
            console.log(response.data);
            setShares(response.data);
        }).catch(error => {
            if (error.response && error.response.status === 404) {
                setShares([]);
                alert('No shares found');
            } else {
                console.error(error);
            }
        })
    }

    function getFreeShares() {
        getNotPurchasedShares(userBuyId).then((response) => {
            console.log(response.data);
            setShares(response.data);
        }).catch(error => {
            if (error.response && error.response.status === 404) {
                setShares([]);
                alert('No shares found');
            } else {
                console.error(error);
            }
        })
    }

    function getSharesFromCompany(companyId) {
        getCompanyShares(companyId).then((response) => {
            console.log(response.data);
            setShares(response.data);
        }).catch(error => {
            if (error.response && error.response.status === 404) {
                setShares([]);
                alert('No shares found');
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

    function getCompany(shareId) {
        navigator(`/company-share/${shareId}`);
    }

    function sellShare(userId, id) {
        console.log(userId, id);
        sellUserShare(userId, id).then((response) => {
            getSharesFromUser();
            console.log(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function buyShare(userBuyId, id) {
        console.log(userBuyId, id);
        buyUserShare(userBuyId, id).then((response) => {
            getFreeShares();
            console.log(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addForm() {
        if (!userId && !companyId && !userBuyId) {
            return (
                <button style={{ backgroundColor: '#03452f', float: 'left', width: '40vh', color: 'white' }}
                    className='btn mb-3' onClick={addShare}>Add share
                </button>
            )
        }
    }

    function buttonsForm(share) {
        if (userId) {
            return (
                <td>
                    <button style={{ width: '6vw', backgroundColor: '#03452f', textSize: '14px', color: 'white' }}
                        className='btn' onClick={() => sellShare(userId, share.id)}>Sell</button>
                </td>
            )
        } else if (companyId) {
            return (<td>
                <button style={{ width: '6vw', backgroundColor: '#03452f', textSize: '14px', color: 'white' }}
                    className='btn' onClick={() => removeShare(share.id)}>Delete</button>
            </td>
            )
        } else if (userBuyId) {
            return (
                <td>
                    <button style={{ width: '6vw', backgroundColor: '#03452f', textSize: '14px', color: 'white' }}
                        className='btn' onClick={() => buyShare(userBuyId, share.id)}>Buy</button>
                </td>
            )
        } else {
            return (
                <td style={{ width: '23vw' }}>
                    <div className="button-container" style={{ width: '23vw', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                        <button style={{ width: '7vw', backgroundColor: '#03452f', textSize: '14px', color: 'white' }}
                            className='btn' onClick={() => updateShare(share.id)}>Update</button>
                        <button style={{ width: '7vw', backgroundColor: '#03452f', textSize: '14px', color: 'white' }}
                            className='btn' onClick={() => removeShare(share.id)}>Delete</button>
                        <button style={{ width: '7vw', backgroundColor: '#03452f', textSize: '14px', color: 'white' }}
                            className='btn' onClick={() => getCompany(share.id)}>Company</button>
                    </div>
                </td>
            )
        }
    }

    function titleForm() {
        if (userId) {
            return (
                <h3 className='text-center' style={{ marginTop: '5vh', marginBottom: '2vh', fontWeight: 'bold' }}>User №{userId} purchaised shares</h3>
            )
        } else if (companyId) {
            return (
                <h3 className='text-center' style={{ marginTop: '5vh', marginBottom: '2vh', fontWeight: 'bold' }}>Shares from company №{companyId}</h3>
            )
        } else if (userBuyId) {
            return (
                <h3 className='text-center' style={{ marginTop: '5vh', marginBottom: '2vh', fontWeight: 'bold' }}>Available shares</h3>
            )
        } else {
            return (
                <h3 className='text-center' style={{ marginTop: '5vh', marginBottom: '2vh', fontWeight: 'bold' }}>All shares</h3>
            )
        }
    }

    return (
        <div className='container-fluid d-flex flex-column' style={{ minHeight: '86vh', paddingBottom: '5vh' }}>

            {titleForm()}
            {addForm()}

            <table className='table table-striped table-bordered rounded overfow-hidden'
                style={{ boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', paddingLeft: '20px', paddingRight: '20px' }}>
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
                        Shares.map(share =>
                            <tr key={share.id}>
                                <td>{share.id}</td>
                                <td>{share.prevClosePrice}</td>
                                <td>{share.highPrice}</td>
                                <td>{share.lowPrice}</td>
                                <td>{share.openPrice}</td>
                                <td>{share.lastSalePrice}</td>
                                <td style={{ color: 'green' }}>{share.lastTimeUpdated}</td>
                                <td>{share.symbol}</td>
                                {buttonsForm(share)}
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListShareComponent