import React, {createContext, useEffect, useState} from 'react';
import {getPerfumes} from "../service/api";

export const PerfumeContext = createContext();

export const PerfumeProvider = ({ children }) => {
    const [perfumes, setPerfumes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getPerfumes().then((response) => {
            setPerfumes(response.data);
            setLoading(false);
        })
            .catch((error) => {
                console.error('Error fetching data: ', error);
                setLoading(false);
            });
    }, []);

    return (
        <PerfumeContext.Provider value={{ perfumes, loading }}>
            {children}
        </PerfumeContext.Provider>
    );
};