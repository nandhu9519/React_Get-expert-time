import Header from './Header';
import './User.css';
import React  from 'react';


function User() {
  return (
    <div className="User"> 
    <Header />
    <main>
    <img alt= "none" src='https://thumbs.dreamstime.com/b/expertise-expert-consulting-knowledge-advice-business-development-concept-businessman-pressing-button-virtual-screen-206759881.jpg' style={{width:'100%',height:'40rem'}}></img>
    
    </main>
    </div>
  );
}

export default User;
