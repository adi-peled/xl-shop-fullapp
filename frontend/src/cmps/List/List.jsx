import React, { useEffect } from 'react';
import { Preview } from '../Preview/Preview'
import './List.scss'
export function List({ items, removeItem, toggleLike }) {



    return (
        < section >
            < div className="item-list">
                {
                    items.map(item =>
                        < Preview key={item._id} item={item} toggleLike={toggleLike} removeItem={removeItem} />
                    )
                }
            </div >
        </section >
    );
}