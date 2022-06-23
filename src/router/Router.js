import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Layout } from '../components';
import { ContactsPage, NotFoundPage, UserDetailsPage } from '../pages';

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to={'contacts?page=1'} />} />
                <Route path="contacts" element={<ContactsPage />} />
                <Route path="contacts/:uid" element={<UserDetailsPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
};

export default Router;
