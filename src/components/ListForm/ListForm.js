import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import './ListForm.css';
import { constants } from '../../config';

const ListForm = () => {
    const { query } = constants;

    const [queryParams, setQueryParams] = useSearchParams();
    const { register, handleSubmit, setValue } = useForm();

    const params = {
        page: queryParams.get(query.page),
        sort: queryParams.get(query.sort),
        search: queryParams.get(query.search) || ''
    };

    useEffect(() => {
        !params.sort && setValue('sort', 'ordinary');
    }, [params.sort]);

    const searchAction = (data) => {
        if (data.search) {
            if (data.sort === 'ordinary') {
                setQueryParams({ search: data.search.replaceAll('+', ''), page: '1' });
                return;
            }
            setQueryParams({ ...data, page: '1' });
        }
    };

    const sortAction = (event) => {
        const value = event.target.value;
        if (value === 'ordinary') {
            setQueryParams({ search: params.search, page: params.page });
            return;
        }
        setQueryParams({ ...params, sort: value });
    };

    return (
        <div className="form-wrap">
            <form onSubmit={handleSubmit(searchAction)} className="form__body">
                <div className="form__body-sort">
                    <select
                        {...register('sort', {
                            onChange: (event) => sortAction(event)
                        })}
                        defaultValue={params.sort}>
                        <option value="ordinary">ordinary</option>
                        <option value="asc">asc</option>
                        <option value="desc">desc</option>
                    </select>
                </div>
                <div className="form__body-search">
                    <input
                        placeholder="enter name or number"
                        className="field"
                        defaultValue={params.search}
                        type="text"
                        {...register('search')}
                    />
                    <button className="form__search-btn">search</button>
                </div>
            </form>
        </div>
    );
};

export { ListForm };
