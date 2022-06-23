import React from 'react';

import './List.css';
import { Item } from '../Item/Item';

const List = ({ data }) => {
    return (
        <div className="list">
            {data?.users.map((item, index) => (
                <Item key={item.id} index={index} item={item} />
            ))}
        </div>
    );
};

export { List };
