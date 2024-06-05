import React, {useEffect, useState} from 'react'
import { createShare, getShare, updateShare } from '../service/ShareService'
import { useNavigate, useParams } from 'react-router-dom'

const UserComponent = () => {
    const [prevClosePrice, setPrevClosePrice] = useState('')
    const [highPrice, setHighPrice] = useState('')
    const [lowPrice, setLowPrice] = useState('')
    const [openPrice, setOpenPrice] = useState('')
    const [lastSalePrice, setLastSalePrice] = useState('')
    const [lastTimeUpdated, setLastTimeUpdated] = useState('')
    const [symbol, setSymbol] = useState('')
    const [companyId, setCompanyId] = useState('')

    const {id} = useParams();

    const navigator = useNavigate();
    const goHome = () => navigator('/shares');

    useEffect(() => {
        if(id) {
            getShare(id).then((response) => {
                setPrevClosePrice(response.data.prevClosePrice);
                setHighPrice(response.data.highPrice);
                setLowPrice(response.data.lowPrice);
                setOpenPrice(response.data.openPrice);
                setLastSalePrice(response.data.lastSalePrice);
                setLastTimeUpdated(response.data.lastTimeUpdated);
                setSymbol(response.data.symbol);
            }).catch(error => {
                console.error(error);
            })
        }
    },[id])

    function saveShare(s) {
        s.preventDefault();

        if(validateForm()){

            if(id){
                const share = {prevClosePrice, highPrice, lowPrice, openPrice, lastSalePrice, lastTimeUpdated, symbol}
                console.log(share);
                updateShare(id, share).then((response) => {
                    console.log(response.data);
                    navigator('/shares');
                }).catch(error => {
                    console.error(error);
                })
            } else {
                const share = {prevClosePrice, highPrice, lowPrice, openPrice, lastSalePrice, lastTimeUpdated, symbol, companyId}
                console.log(share);
                createShare(share).then((response) => {
                    console.log(response.data);
                    navigator('/shares');
                })
                .catch(error => {
                    console.error(error);
                })
            }
        }
    }

    function pageTitle() {
        if(id) {
            return <h2 className='text-center' style={{ marginTop: '10px', color: '#003423', fontWeight: 'bold'}}>Edit share</h2>
        } else {
            return <h2 className='text-center' style={{ marginTop: '10px', color: '#003423', fontWeight: 'bold'}}>Add new share!</h2>
        }
    }

    function companyForm() {
        if(!id) {
            return  <div className='form-group mb-1'> 
                        <label className='form-label' style={{ float: 'left' }}>Company Id</label>
                        <input 
                            style={{ backgroundColor: '#93eabd' }}
                            type='companyId'
                            placeholder='Enter company id'
                            name='companyId'
                            value={companyId}
                            className={`form-control ${errors.companyId ? 'is-invalid': '' }`}
                            onChange={(s) => setCompanyId(s.target.value)}
                        >
                        </input>
                        {errors.companyId && <div className='invalid-feedback' style={{fontSize: '12px'}}> {errors.companyId} </div>}
                    </div>
        }
    }

    const [errors, setErrors] = useState({
        prevClosePrice: "",
        highPrice: "",
        lowPrice: "",
        openPrice: "",
        lastSalePrice: "",
        lastTimeUpdated: "",
        symbol: "",
        companyId: "",
    })

    function validateForm() {
        let valid = true;

        const errorsCopy = {... errors};

        if(prevClosePrice.toString().trim()){
            errorsCopy.prevClosePrice = '';
        } else {
            errorsCopy.prevClosePrice = 'First name is required';
            valid = false;
        }

        if(highPrice.toString().trim()){
            errorsCopy.highPrice = '';
        } else {
            errorsCopy.highPrice = 'Highest price is required';
            valid = false;
        }

        if(lowPrice.toString().trim()){
            errorsCopy.lowPrice = '';
        } else {
            errorsCopy.lowPrice = 'Lowest price is required';
            valid = false;
        }

        if(openPrice.toString().trim()){
            errorsCopy.openPrice = '';
        } else {
            errorsCopy.openPrice = 'Open trade price is required';
            valid = false;
        }
        if(lastSalePrice.toString().trim()){
            errorsCopy.lastSalePrice = '';
        } else {
            errorsCopy.lastSalePrice = 'Last sale price is required';
            valid = false;
        }

        if(lastTimeUpdated.toString().trim()){
            errorsCopy.lastTimeUpdated = '';
        } else {
            errorsCopy.lastTimeUpdated = 'Last updated time is required';
            valid = false;
        }

        if(symbol.trim()){
            errorsCopy.symbol = '';
        } else {
            errorsCopy.symbol = 'Company tag is required';
            valid = false;
        }

        if(!id) {
            if(companyId.toString().trim()){
                errorsCopy.companyId = '';
            } else {
                errorsCopy.companyId = 'Company id is required';
                valid = false;
            }
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
                            <label className='form-label' style={{ float: 'left' }}>Previous Close Price</label>
                            <input 
                                style={{ backgroundColor: '#93eabd' }}
                                type='text'
                                placeholder='Enter previuos close price'
                                name='prevClosePrice'
                                value={prevClosePrice}
                                className={`form-control ${errors.prevClosePrice ? 'is-invalid': '' }`}
                                onChange={(s) => setPrevClosePrice(s.target.value)}
                            >
                            </input>
                            {errors.prevClosePrice && <div className='invalid-feedback' style={{fontSize: '12px'}}> {errors.prevClosePrice} </div>}
                        </div>

                        <div className='form-group mb-1'> 
                            <label className='form-label' style={{ float: 'left' }}>Highest Price</label>
                            <input 
                                style={{ backgroundColor: '#93eabd' }}
                                type='text'
                                placeholder='Enter highest price'
                                name='highPrice'
                                value={highPrice}
                                className={`form-control ${errors.highPrice ? 'is-invalid': '' }`}
                                onChange={(s) => setHighPrice(s.target.value)}
                            >
                            </input>
                            {errors.highPrice && <div className='invalid-feedback' style={{fontSize: '12px',}}> {errors.highPrice} </div>}
                        </div>

                        <div className='form-group mb-1'> 
                            <label className='form-label' style={{ float: 'left' }}>Lowest Price</label>
                            <input 
                                style={{ backgroundColor: '#93eabd' }}
                                type='text'
                                placeholder='Enter lowest price'
                                name='lowPrice'
                                value={lowPrice}
                                className={`form-control ${errors.lowPrice ? 'is-invalid': '' }`}
                                onChange={(s) => setLowPrice(s.target.value)}
                            >
                            </input>
                            {errors.lowPrice && <div className='invalid-feedback' style={{fontSize: '12px',}}> {errors.lowPrice} </div>}
                        </div>

                        <div className='form-group mb-1'> 
                            <label className='form-label' style={{ float: 'left' }}>Open Trading Price</label>
                            <input 
                                style={{ backgroundColor: '#93eabd' }}
                                type='text'
                                placeholder='Enter open trade price'
                                name='openPrice'
                                value={openPrice}
                                className={`form-control ${errors.openPrice ? 'is-invalid': '' }`}
                                onChange={(s) => setOpenPrice(s.target.value)}
                            >
                            </input>
                            {errors.openPrice && <div className='invalid-feedback' style={{fontSize: '12px'}}> {errors.openPrice} </div>}
                        </div>

                        <div className='form-group mb-1'> 
                            <label className='form-label' style={{ float: 'left' }}>Last Sale Price</label>
                            <input 
                                style={{ backgroundColor: '#93eabd' }}
                                type='text'
                                placeholder='Enter last sale price'
                                name='lastSalePrice'
                                value={lastSalePrice}
                                className={`form-control ${errors.lastSalePrice ? 'is-invalid': '' }`}
                                onChange={(s) => setLastSalePrice(s.target.value)}
                            >
                            </input>
                            {errors.lastSalePrice && <div className='invalid-feedback' style={{fontSize: '12px'}}> {errors.lastSalePrice} </div>}
                        </div>

                        <div className='form-group mb-1'> 
                            <label className='form-label' style={{ float: 'left' }}>Last Time Update</label>
                            <input 
                                style={{ backgroundColor: '#93eabd' }}
                                type='text'
                                placeholder='Enter last updated date'
                                name='lastTimeUpdated'
                                value={lastTimeUpdated}
                                className={`form-control ${errors.lastTimeUpdated ? 'is-invalid': '' }`}
                                onChange={(s) => setLastTimeUpdated(s.target.value)}
                            >
                            </input>
                            {errors.lastTimeUpdated && <div className='invalid-feedback' style={{fontSize: '12px'}}> {errors.lastTimeUpdated} </div>}
                        </div>

                        <div className='form-group mb-1'> 
                            <label className='form-label' style={{ float: 'left' }}>Company Tag</label>
                            <input 
                                style={{ backgroundColor: '#93eabd' }}
                                type='text'
                                placeholder='Enter company tag'
                                name='symbol'
                                value={symbol}
                                className={`form-control ${errors.symbol ? 'is-invalid': '' }`}
                                onChange={(s) => setSymbol(s.target.value)}
                            >
                            </input>
                            {errors.symbol && <div className='invalid-feedback' style={{fontSize: '12px'}}> {errors.symbol} </div>}
                        </div>
                            {
                                companyForm()
                            }
                        <button className='btn btn-success mt-2' style={{ backgroundColor: '#003423', 
                                width: '200px' }} onClick={saveShare}>Save</button>
                    </form>
                </div>
            </div>
        </div>
        <button className='btn btn-success mt-3 mb-5' style={{ backgroundColor: '#003423', 
            width: '200px' }} onClick={goHome}>Home</button>
    </div>
  )
}

export default UserComponent