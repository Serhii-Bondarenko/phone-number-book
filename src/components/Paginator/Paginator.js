import { useSearchParams } from 'react-router-dom';

import './Paginator.css';
import { constants } from '../../config';
import { NavBtn } from './NavBtn';

const Paginator = ({ personCount }) => {
    const { query } = constants;

    const [queryParams] = useSearchParams();

    const params = {
        page: Number(queryParams.get(query.page)),
        search: queryParams.get(query.search) || ''
    };

    const { page, search } = params;
    const prevPage = `?page=${page - 1}&search=${search}`;
    const nextPage = `?page=${page + 1}&search=${search}`;

    return (
        <div className="paginator">
            <NavBtn to={prevPage} disabled={params.page === 1}>
                Prev
            </NavBtn>
            <button disabled={true}>{params.page}</button>
            <NavBtn to={nextPage} disabled={personCount < 10}>
                Next
            </NavBtn>
        </div>
    );
};

export { Paginator };
