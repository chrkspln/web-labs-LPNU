import React, {useState, useEffect} from "react";
import "./Catalog.css";
import CatalogItem from "./CatalogItem";
import {getPerfumes} from "../../service/api";
import Button from "../../utilities/Button";
import Input from "../../utilities/Input";
import Select from "../../utilities/Select";
import Loader from "../../utilities/Loader";

const Catalog = () => {
    const [perfumes, setPerfumes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortType, setSortType] = useState("asc");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const sortOptions = [
        {value: "asc", label: "Price: Low to High"},
        {value: "desc", label: "Price: High to Low"},
        {value: "volume-asc", label: "Volume: Low to High"},
        {value: "volume-desc", label: "Volume: High to Low"}
    ];

    const fetchFilteredPerfumes = (searchTerm = '', minPrice  = '', maxPrice = '', sortType = '') => {
        setLoading(true);
        getPerfumes(searchTerm, minPrice, maxPrice, sortType).then((response) => {
            setPerfumes(response.data);
            setLoading(false);
        })
            .catch((error) => {
                console.error('Error fetching data: ', error);
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchFilteredPerfumes();
    }, []);

    const handleSearchChange = () => {
        fetchFilteredPerfumes(searchTerm.trim(), minPrice, maxPrice, sortType);
    };


    const handlePriceOkClick = () => {
        fetchFilteredPerfumes(searchTerm.trim(), minPrice, maxPrice, sortType);
    };

    const handleSortChange = (e) => {
        const newSortType = e.target.value;
        setSortType(newSortType);
        fetchFilteredPerfumes(searchTerm.trim(), minPrice, maxPrice, newSortType);
    };


    const handleClearFilters = () => {
        setSearchTerm("");
        setMinPrice("");
        setMaxPrice("");
        setSortType("asc");
        fetchFilteredPerfumes();
    };

    return (
        <div className="catalog-wrapper">
            <h1 className="catalog-title">Perfumes Catalog</h1>

            <div className="catalog-filters">
                <input
                    type="text"
                    placeholder="Search by name or scent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="catalog-search"
                />
                <Button onClick={handleSearchChange} className="search-btn">
                    Search
                </Button>

                <div className="price-range-filters">
                    <Input
                        type="number"
                        placeholder="From"
                        value={minPrice}
                        onChange={(e) => {
                            const value = e.target.value;
                            setMinPrice(value === "" || value >= 0 ? value : 0);
                        }}
                        className="catalog-price-input"
                    />

                    <Input
                        type="number"
                        placeholder="To"
                        value={maxPrice}
                        className="catalog-price-input"
                        onChange={(e) => {
                            const value = e.target.value;
                            setMaxPrice(value === "" || value >= 0 ? value : 0);
                        }}
                    />
                    <Button onClick={handlePriceOkClick} className="price-ok-btn">
                        OK
                    </Button>
                </div>

                <Select
                    options={sortOptions}
                    value={sortType}
                    onChange={(e) => handleSortChange(e)}
                />

                <div className="filter-actions">
                    <Button onClick={handleClearFilters} className="catalog-clear-btn">
                        Clear Filters
                    </Button>
                </div>
            </div>

            {loading ? (
                <Loader/>
            ) : (
            <div className="perfumes-grid">
                {perfumes.map((perfume) => (
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
                )}
        </div>
    );
};

export default Catalog;
