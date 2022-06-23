import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import './ContactsPage.css';
import { constants } from '../../config';
import { getData } from '../../store';
import { ErrorResponse, List, ListForm, Loader, Paginator } from '../../components';

const ContactsPage = () => {
    const { reducer, error, query, resStatus } = constants;

    const [queryParams, setQueryParams] = useSearchParams();
    const dispatch = useDispatch();
    const { data, selectedPerson, status } = useSelector((state) => state[reducer]);

    useEffect(() => {
        if (!queryParams.get(query.page)) setQueryParams({ page: '1' });
        const params = {
            page: queryParams.get(query.page),
            sort: queryParams.get(query.sort),
            search: queryParams.get(query.search) || ''
        };
        dispatch(getData(params));
    }, [queryParams, selectedPerson]);

    return (
        <div className="contacts">
            {!data?.users.length ? (
                <ErrorResponse errorMessage={error.emptyData} />
            ) : status === resStatus.pending ? (
                <Loader />
            ) : (
                <>
                    <ListForm />
                    <List data={data} />
                </>
            )}
            <Paginator personCount={data?.users.length} />
        </div>
    );
};

export { ContactsPage };
