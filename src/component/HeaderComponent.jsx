import React from 'react'
import { useNavigate } from 'react-router-dom'

export const HeaderComponent = () => {

    const navigator = useNavigate();

    return (
        <div>
            <header>
                <nav>
                    <a href="http://localhost:5173">SHARES APP</a>
                    <div className="button-container" style={{
                        float: 'right', width: '35vw', display: 'flex', flexWrap: 'wrap',
                        alignItems: 'center', justifyContent: 'space-around'
                    }}>
                        <button style={{ height: '40px', width: '10vw', backgroundColor: '#03452f', fontWeight: 'bold', textSize: '18px', color: 'white' }}
                            className='btn' onClick={() => navigator('/users')}>Users</button>
                        <button style={{ height: '40px', width: '10vw', backgroundColor: '#03452f', fontWeight: 'bold', textSize: '20px', color: 'white' }}
                            className='btn' onClick={() => navigator('/shares')}>Shares</button>
                        <button style={{ height: '40px', width: '10vw', backgroundColor: '#03452f', fontWeight: 'bold', textSize: '20px', color: 'white' }}
                            className='btn' onClick={() => navigator('/companies')}>Companies</button>
                    </div>
                </nav>
            </header>
        </div>
    )
}
