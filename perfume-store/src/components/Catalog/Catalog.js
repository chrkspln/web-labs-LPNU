import React, { useState } from "react";
import "./Catalog.css";
import CatalogItem from "./CatalogItem";

const perfumesData = [
    {
        id: 1,
        image: "https://u.makeup.com.ua/n/ni/ni7ihjitae9n.jpg",
        name: "Suu...",
        brand: "Masaki Matsushima",
        scent: "Floral",
        volume: 80,
        price: 1171.00
    },
    {
        id: 2,
        image: "https://u.makeup.com.ua/i/ia/iaieny15lffq.jpg",
        name: "Mat.",
        brand: "Masaki Matsushima",
        scent: "Floral, Fruity",
        volume: 40,
        price: 985.00,
    },
    {
        id: 3,
        image: "https://u.makeup.com.ua/2/2i/2ilsfzqdamz8.jpg",
        name: "Marry Me!",
        brand: "Lanvin",
        scent: "Floral, Fruity",
        volume: 30,
        price: 1007.00,
    },
    {
        id: 4,
        image: "https://u.makeup.com.ua/l/lb/lb3pc4dvmtni.jpg",
        name: "Parfum d'Ete",
        brand: "Kenzo",
        scent: "Floral, Green",
        volume: 75,
        price: 2428.00,
    },
    {
        id: 5,
        image: "https://u.makeup.com.ua/n/nw/nwn0ywjtkcse.jpg",
        name: "Noa",
        brand: "Cacharel",
        scent: "Floral, Aldehyde",
        volume: 30,
        price: 909.00,
    },
    {
        id: 6,
        image: "https://u.makeup.com.ua/x/x8/x8z4nepptnlu.jpg",
        name: "Equus Pour Homme",
        brand: "Lalique",
        scent: "Woody, Spicy",
        volume: 100,
        price: 1976.00,
    },
    {
        id: 7,
        image: "https://u.makeup.com.ua/l/lu/lubnk6it3zmu.jpg",
        name: "Terre d'Hermès",
        brand: "Hermès",
        scent: "Woody, Mineral",
        volume: 100,
        price: 2695.00,
    },
    {
        id: 8,
        image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQQfGZ9qAW8slpgCTCEEYl1na0p875WkN1IAWYzaPoyl45bYYrqMYoIc8w-yhZykgQ_t-S0YiTnU3bTljHMK5rEcqOPa8hwDgCDKhA_tkuOuaZm6HPiLrIEHA&usqp=CAE",
        name: "Armani Code",
        brand: "Giorgio Armani",
        scent: "Woody, Aromatic",
        volume: 60,
        price: 1742.00,
    }
]

const Catalog = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortType, setSortType] = useState("default");

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortType(event.target.value);
    };

    const filteredPerfumes = perfumesData
        .filter(
            (perfumes) =>
                perfumes.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                perfumes.scent.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortType === "asc") {
                return a.price - b.price;
            } else if (sortType === "desc") {
                return b.price - a.price;
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
                <select value={sortType} onChange={handleSortChange} className="catalog-sort">
                    <option value="default">Sort by Price</option>
                    <option value="asc">Price: Low to High</option>
                    <option value="desc">Price: High to Low</option>
                </select>
            </div>

            <div className="perfumes-grid">
                {filteredPerfumes.map((perfumes) => (
                    <CatalogItem key={perfumes.id} image={perfumes.image} name={perfumes.name} brand={perfumes.brand} scent={perfumes.scent} volume={perfumes.volume} price={perfumes.price} />
                ))}
            </div>
        </div>
    );
};

export default Catalog;
