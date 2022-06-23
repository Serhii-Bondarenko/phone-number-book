import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import './UserDetailsPage.css';
import { constants } from '../../config';
import { getUserDetails } from '../../store';
import { ErrorResponse, Loader } from '../../components';

const UserDetailsPage = () => {
    const { reducer, error, resStatus } = constants;

    const dispatch = useDispatch();
    const { uid } = useParams();
    const { selectedPerson, status } = useSelector((state) => state[reducer]);

    useEffect(() => {
        dispatch(getUserDetails({ uid }));
    }, []);

    return (
        <div className="user__details">
            {!selectedPerson ? (
                <ErrorResponse errorMessage={error.userNotFound} />
            ) : status === resStatus.pending ? (
                <Loader />
            ) : (
                <>
                    <h1 className="user__details-name">{selectedPerson?.name}</h1>
                    <ul className="user__details__phone-numbers">
                        {selectedPerson?.phoneNumbers.map((phone, index) => (
                            <li key={phone}>
                                {index + 1}. {phone}
                                <hr />
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export { UserDetailsPage };
