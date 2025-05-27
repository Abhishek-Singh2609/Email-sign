import React from 'react'
import "./Trial.css"
import microsoftLogo from "../../assets/TrialPage/Microsoft_logo.svg.png"
import { Link } from 'react-router-dom';


function Trial() {
  return (
    <>
     <div className="container">
        <h1 className="title">Start Your <span>Free</span> Trial</h1>
        <p className="subtitle">Sign up to your free trial of Agile Mail Signature & have full access to all of our world-className features.</p>

        <div className="login-card mb-4">
            <div className="microsoft-logo">
                <svg viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#f25022" d="M1 1h10v10H1z"/>
                    <path fill="#00a4ef" d="M1 12h10v10H1z"/>
                    <path fill="#7fba00" d="M12 1h10v10H12z"/>
                    <path fill="#ffb900" d="M12 12h10v10H12z"/>
                </svg>
            </div>

            <h2 className="platform-title">Agile for Microsoft 365</h2>
            <p className="text-muted mb-4">Sign in with your Microsoft account to access Agile Mail Signature</p>

            <Link to="/login"  >
            <button  className="btn btn-microsoft">
                <img src={microsoftLogo} alt="" width="20" height="20" />
                Start Free Trial
            </button>
            </Link>
        </div>
    </div>
    </>
  )
}

export default Trial