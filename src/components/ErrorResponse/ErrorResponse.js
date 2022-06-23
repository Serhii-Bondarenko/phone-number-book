import React from 'react';

import './ErrorResponse.css';

const ErrorResponse = ({ errorMessage }) => {
    return <h2 className="error">{errorMessage}</h2>;
};

export { ErrorResponse };
