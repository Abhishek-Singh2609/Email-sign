import React from 'react';
import './SignatureAction.css';

const SignatureAction = () => {
  return (
    <div className="signature-assignment-container">
      <div className="header">
        <h2>Choose Who Gets the Signature</h2>
        <p className="subtitle">Apply signatures to individuals or entire teams.</p>
        <p className="subtitle">Keep your brand consistent across users.</p>
      </div>

      <div className="button-group">
        <button className="btn btn-remove">Remove For All</button>
        <button className="btn btn-apply">Apply For All</button>
      </div>
    </div>
  );
};

export default SignatureAction;