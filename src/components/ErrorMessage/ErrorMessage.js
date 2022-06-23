import React from 'react';

import './ErrorMessage.css';

const ErrorMessage = ({ error }) => {
    return <span className="error__message">{error.message}</span>;
};

export { ErrorMessage };
