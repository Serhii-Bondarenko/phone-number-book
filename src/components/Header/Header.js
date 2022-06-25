import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './Header.css';
import { ModalWindow } from '../ModalWindow/ModalWindow';
import { constants } from '../../config';

const Header = () => {
    const { reducer } = constants;

    const { uid } = useParams();
    const { selectedPerson } = useSelector((state) => state[reducer]);
    const [isShow, setIsShow] = useState(false);

    return (
        <>
            <header className="header">
                <nav className="header__nav">
                    <Link to="/">
                        <h3>Home</h3>
                    </Link>
                    {!(uid && !selectedPerson) && (
                        <div onClick={() => setIsShow(true)} className="open__modal">
                            {uid ? 'Edit' : 'Add person'}
                        </div>
                    )}
                </nav>
                <hr />
            </header>
            {isShow && <ModalWindow setIsShow={setIsShow} />}
        </>
    );
};

export { Header };
