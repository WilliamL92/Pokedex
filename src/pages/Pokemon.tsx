import React from 'react';
import { useLocation } from "react-router-dom"

const Pokemon = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const id = query.get('id')
    return (
        <div>
            {id}
        </div>
    );
};

export default Pokemon;