import React from 'react';
import { Outlet } from 'react-router-dom';

import './Layout.css';
import { Header } from '../Header/Header';

const Layout = () => {
    return (
        <div className="wrapper">
            <Header />
            <main className="main">
                <Outlet />
            </main>
        </div>
    );
};

export { Layout };
