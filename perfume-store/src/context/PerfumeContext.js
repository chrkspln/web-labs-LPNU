import React, { createContext, useState } from 'react';

const perfumesData = [
    {
        id: 1,
        image: "https://u.makeup.com.ua/n/ni/ni7ihjitae9n.jpg",
        name: "Suu...",
        brand: "Masaki Matsushima",
        scent: "Floral",
        detailedDescription: 'Masaki Matsushima\'s Suu... like a breath of fresh air, it transcends you to a zen state of mind. ' +
            'The fragrance begins with an energetic burst of exotic, juicy fruits, creating a lively opening. ' +
            'As it evolves, the heart of the perfume unfolds into a delicate breath of extremely feminine flowers. ',
        characteristics: {
            Top: "Pear, Carambola, Pomelo",
            Heart: "Lotus, Jasmine, Magnolia",
            Base: "Cedar, Musk"
        },
        volume: 80,
        price: 1171.00
    },
    {
        id: 2,
        image: "https://u.makeup.com.ua/i/ia/iaieny15lffq.jpg",
        name: "Mat.",
        brand: "Masaki Matsushima",
        scent: "Floral, Fruity",
        detailedDescription: 'Masaki Matsushima\'s Mat. encapsulates the perfect reflection of a post-modern style, transcending time. ' +
            'The top note boasts an inventive blend, marrying the wisdom of ancestral Bamboo’s green aquatic freshness ' +
            'with the impertinent explosion of Mango pulp, inspiring further exploration into the world of “mat;”. ',
        characteristics: {
            Top: "Bamboo, Tea, Watermelon",
            Heart: "Lotus, Mint, Rose, Jasmine, Black Currant",
            Base: "Musk"
        },
        volume: 40,
        price: 985.00,
    },
    {
        id: 3,
        image: "https://u.makeup.com.ua/2/2i/2ilsfzqdamz8.jpg",
        name: "Marry Me!",
        brand: "Lanvin",
        scent: "Floral, Fruity",
        detailedDescription: 'Lanvin\'s Marry Me! is a floral and fruity fragrance, with a blend of ' +
            'sweet and fresh notes. A fresh and optimistic affirmation of a joyful state of mind. ' +
            'An elixir of true love combining sensual jasmine with the vivacity of bitter orange.',
        characteristics: {
            Top: "Bitter Orange, Peach, Freesia",
            Heart: "Jasmine, Rose, Magnolia",
            Base: "Amber, Musk"
        },
        volume: 30,
        price: 1007.00,
    },
    {
        id: 4,
        image: "https://u.makeup.com.ua/l/lb/lb3pc4dvmtni.jpg",
        name: "Parfum d'Ete",
        brand: "Kenzo",
        scent: "Floral, Green",
        detailedDescription: 'Kenzo\'s Parfum d\'Ete. A pure, simple and limpid bottle in the shape of a leaf holds ' +
            'a green floral fragrance in which crisp Lily of the Valley Leaf announces a heart of Peony, ' +
            'Jasmine and Hyacinth over a delicate Sandalwood base. A trail infused with nature. ',
        characteristics: {
            Top: "Lily of the Valley, Green Leaves",
            Heart: "Peony, Jasmine, Hyacinth",
            Base: "Sandalwood, Musk"
        },
        volume: 75,
        price: 2428.00,
    },
    {
        id: 5,
        image: "https://u.makeup.com.ua/n/nw/nwn0ywjtkcse.jpg",
        name: "Noa",
        brand: "Cacharel",
        scent: "Floral, Aldehyde",
        detailedDescription: 'Cacharel\'s Noa is a small planet in your hand with a pearl inside. ' +
            'This fragrance is like a tender whisper, feminine and subtle, weightless, but with a noticeable presence. ' +
            'Tender powdery top notes of freesia, peach skin, peony, and musk lead to a floral heart of white flowers, ' +
            'ylang-ylang, and rose. The base is woodsy and transparent with coffee and incense touches. ',
        characteristics: {
            Top: "Freesia, Peach Skin, Peony, Musk",
            Heart: "White Flowers, Ylang-Ylang, Rose",
            Base: "Coffee, Incense"
        },
        volume: 30,
        price: 909.00,
    },
    {
        id: 6,
        image: "https://u.makeup.com.ua/x/x8/x8z4nepptnlu.jpg",
        name: "Equus Pour Homme",
        brand: "Lalique",
        scent: "Woody, Spicy",
        detailedDescription: 'Lalique\'s Equus Pour Homme plays with the freshness and masculinity of noble spices coupled ' +
            'with the subtle sparkle of citrus and woody notes. After the fresh blend of noble Spices and subtle ' +
            'sparkle of Citrus, come the notes belonging to a resolutely masculine fragrance combining the refinement ' +
            'of Precious Woods with the sensuality of a potent base with Leathery and Musky qualities. ',
        characteristics: {
            Top: "Bergamot, Lemon, Citrus",
            Heart: "Noble Spices, Woody Notes",
            Base: "Leather, Musk"
        },
        volume: 100,
        price: 1976.00,
    },
    {
        id: 7,
        image: "https://u.makeup.com.ua/l/lu/lubnk6it3zmu.jpg",
        name: "Terre d'Hermès",
        brand: "Hermès",
        scent: "Woody, Mineral",
        detailedDescription: 'A mineral, woody fragrance, Terre d\'Hermès combines the strength of cedar and the radiance of ' +
            'grapefruit with a vibrant touch of flint. At its base, the bottle rests on an orange H, leaving its ' +
            'imprint on the earth. At the top, the light is reflected by metal shoulders. ',
        characteristics: {
            Top: "Grapefruit, Orange",
            Heart: "Pepper, Pelargonium",
            Base: "Cedar, Vetiver"
        },
        volume: 100,
        price: 2695.00,
    },
    {
        id: 8,
        image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQQfGZ9qAW8slpgCTCEEYl1na0p875WkN1IAWYzaPoyl45bYYrqMYoIc8w-yhZykgQ_t-S0YiTnU3bTljHMK5rEcqOPa8hwDgCDKhA_tkuOuaZm6HPiLrIEHA&usqp=CAE",
        name: "Armani Code",
        brand: "Giorgio Armani",
        scent: "Woody, Aromatic",
        detailedDescription: 'Armani Code Parfum rewrites the code of a timeless masculine fragrance, infusing the powerful and seductive signature ' +
            'Tonka Bean with fresh notes of iris, sage, and bergamot, to create a woody aromatic blend that is ' +
            'long-lasting and uniquely distinctive.',
        characteristics: {
            Top: "Bergamot, Mandarin",
            Heart: "Tonka Bean, Lavender",
            Base: "Guaic Wood, Tonka Bean"
        },
        volume: 60,
        price: 1742.00,
    }
];

export const PerfumeContext = createContext(undefined);

export const PerfumeProvider = ({ children }) => {
    const [perfumes] = useState(perfumesData);

    return (
        <PerfumeContext.Provider value={{ perfumes }}>
            {children}
        </PerfumeContext.Provider>
    );
};