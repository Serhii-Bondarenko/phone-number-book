import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import './Header.css';
import { ModalWindow } from '../ModalWindow/ModalWindow';

const Header = () => {
    const [isShow, setIsShow] = useState(false);
    const { uid } = useParams();
    return (
        <>
            <header className="header">
                <nav className="header__nav">
                    <Link to="/">
                        <h3>Home</h3>
                    </Link>
                    <div onClick={() => setIsShow(true)} className="open__modal">
                        {uid ? 'Edit' : 'Add person'}
                    </div>
                </nav>
                <hr />
            </header>
            {isShow && <ModalWindow setIsShow={setIsShow} />}
        </>
    );
};

export { Header };
