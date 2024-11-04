import React, { useState, useContext } from "react";
import "./Catalog.css";
import CatalogItem from "./CatalogItem";
import { PerfumeContext } from "../../context/PerfumeContext";

const Catalog = () => {
    const { perfumes } = useContext(PerfumeContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortType, setSortType] = useState("default");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortType(event.target.value);
    };

    const handleMinPriceChange = (event) => {
        setMinPrice(event.target.value);
    };

    const handleMaxPriceChange = (event) => {
        setMaxPrice(event.target.value);
    };

    const handleClearFilters = () => {
        setMinPrice("");
        setMaxPrice("");
    };

    const filteredPerfumes = perfumes
        .filter((perfume) => {
            const matchesSearchTerm =
                perfume.name.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
                perfume.scent.toLowerCase().includes(searchTerm.trim().toLowerCase());
            const matchesPriceRange =
                (minPrice === "" || perfume.price >= parseInt(minPrice)) &&
                (maxPrice === "" || perfume.price <= parseInt(maxPrice));
            return matchesSearchTerm && matchesPriceRange;
        })
        .sort((a, b) => {
            if (sortType === "asc") {
                return a.price - b.price;
            } else if (sortType === "desc") {
                return b.price - a.price;
            } else if (sortType === "volume-asc") {
                return parseInt(a.volume || 0) - parseInt(b.volume || 0);
            } else if (sortType === "volume-desc") {
                return parseInt(b.volume || 0) - parseInt(a.volume || 0);
            } else {
                return 0;
            }
        });

    return (
        <div className="catalog-wrapper">
            <h1 className="catalog-title">Perfumes Catalog</h1>

            <div className="catalog-filters">
                <input
                    type="text"
                    placeholder="Search by name or scent"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="catalog-search"
                />

                <div className="price-range-filters">
                    <input
                        type="number"
                        placeholder="From"
                        value={minPrice}
                        onChange={handleMinPriceChange}
                        className="catalog-price-input"
                    />
                    <input
                        type="number"
                        placeholder="To"
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                        className="catalog-price-input"
                    />
                    <button className="catalog-clear-btn" onClick={handleClearFilters}>
                        Clear
                    </button>
                </div>

                <select value={sortType} onChange={handleSortChange} className="catalog-sort">
                    <option value="default">Sort by Price</option>
                    <option value="asc">Price: Low to High</option>
                    <option value="desc">Price: High to Low</option>
                    <option value="volume-asc">Volume: Low to High</option>
                    <option value="volume-desc">Volume: High to Low</option>
                </select>
            </div>

            <div className="perfumes-grid">
                {filteredPerfumes.map((perfume) => (
                    <CatalogItem
                        key={perfume.id}
                        id={perfume.id}
                        image={perfume.image}
                        name={perfume.name}
                        brand={perfume.brand}
                        scent={perfume.scent}
                        volume={perfume.volume}
                        price={perfume.price}
                    />
                ))}
            </div>
        </div>
    );
};

export default Catalog;
