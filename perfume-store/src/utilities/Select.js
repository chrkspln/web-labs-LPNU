import React from 'react';
import '../../src/components/Catalog/Catalog.css';

const Select = ({ options, value, onChange }) => {
    return (
        <select
            value={value}
            onChange={onChange}
            className="catalog-sort"
        >
            {options.map((option) => (
                <option key={option.value}
                        value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Select;