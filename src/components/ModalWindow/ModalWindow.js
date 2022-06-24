import React from 'react';

import './ModalWindow.css';
import { PhoneHandlerForm } from '../PhoneHandlerForm/PhoneHandlerForm';

const ModalWindow = ({ setIsShow }) => {
    const closeModal = () => setIsShow(false);

    return (
        <div className="modal">
            <div className="close__modal" onClick={closeModal}>
                &times;
            </div>
            <PhoneHandlerForm closeModal={closeModal} />
        </div>
    );
};

export { ModalWindow };
