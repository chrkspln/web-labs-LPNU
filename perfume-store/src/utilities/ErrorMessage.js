import React from 'react';

const ErrorMessage = ({ message }) => {
    const styles = {
        color: 'red',
        fontSize: '0.9em',
        marginTop: '5px',
    };

    return <div style={styles}>{message}</div>;
};

export default ErrorMessage;
