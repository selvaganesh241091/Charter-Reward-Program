// src/components/Spinner.js
import React from 'react';
import './Spinner.css';

const Spinner = () => {
    return (
        <div className="spinner-container" role="status">
            <div className="spinner"></div>
        </div>
    );
};

export default Spinner;
