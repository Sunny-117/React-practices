import React, { useEffect, useState } from 'react'

import axios from 'axios';



function Autocomplete() {
    const [data, setData] = useState({ hits: [] });
    const [query, setQuery] = useState('react');

    useEffect(() => {
        let ignore = false;

        async function fetchData() {
            const result = await axios('https://hn.algolia.com/api/v1/search?query=' + query);
            if (!ignore) setData(result.data);
        }

        fetchData();
        return () => { ignore = true; }
    }, [query]);

    return (
        <>
            <input value={query} onChange={e => setQuery(e.target.value)} />
            <ul>
                {data.hits.map((item: any) => (
                    <li key={item.objectID}>
                        <a href={item.url}>{item.title}</a>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Autocomplete