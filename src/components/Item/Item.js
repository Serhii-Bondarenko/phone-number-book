import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './Item.css';
import { deleteUser } from '../../store';

const Item = ({ item }) => {
    const dispatch = useDispatch();

    const removeUser = () => dispatch(deleteUser({ data: item }));

    return (
        <div className="item-wrap">
            <Link to={item.id.toString()} className="item">
                {item.name}
            </Link>
            <button onClick={removeUser} className="delete btn">
                &times;
            </button>
        </div>
    );
};

export { Item };
