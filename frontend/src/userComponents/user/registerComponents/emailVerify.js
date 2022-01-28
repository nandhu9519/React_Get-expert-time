import axios from 'axios';
import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from 'react-router-dom';
import { Card } from "react-bootstrap";

import Header from '../../Header';
import './emailVerify.css'

function EmailVerify() {
    const [validUrl, setValidUrl] = useState(false);
    const param = useParams();
    const navigate = useNavigate()
    useEffect(() => {
        const verifyEmail= async() =>{
            try{
                const url = `http://localhost:5000/users/api/${param.id}/verify/${param.token}`;
                console.log(url);
                const {data} = await axios.get(url)
                console.log(data);
                setValidUrl(true);
            }
            catch(error){
                console.log('roro',error);
                setValidUrl(false)
            }
        }
        verifyEmail();
    }, [param]);
    
  return (
  <>
  {validUrl ? ( 
                <div>
                    <Header />
				<div className="display_area">
                  
					<img src="https://www.clipartmax.com/png/middle/84-842675_green-check-mark-in-circle-free-clip-art-green-verified-check-mark.png" alt="none" className="success_img" />
					<h1>Email verified successfully</h1>
					
						<button className="green_btn" onClick={()=>{navigate('/login')}}>Login</button>
                    
				</div>
                </div>
			) : (
				<h1>404 Not Found</h1>
			)}
  </>);
}

export default EmailVerify;
