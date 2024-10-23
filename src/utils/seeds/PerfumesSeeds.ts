import {Perfume} from "../../entities/Perfume";
import {DeepPartial} from "typeorm";

export const seedPerfumes: Array<DeepPartial<Perfume>> = [
    {
        name: "Suu...",
        brand: "Masaki Matsushima",
        price: 1171,
        scent: "Floral",
        volume: "80ml"
    },
    {
        name: "Mat.",
        brand: "Masaki Matsushima",
        price: 985,
        scent: "Floral, Fruity",
        volume: "40ml"
    },
    {
        name: "Marry Me!",
        brand: "Lanvin",
        price: 1007,
        scent: "Floral, Fruity",
        volume: "30ml"
    },
    {
        name: "Parfum dEte",
        brand: "Kenzo",
        price: 2428,
        scent: "Floral, Green",
        volume: "75ml"
    },
    {
        name: "Noa",
        brand: "Cacharel",
        price: 909,
        scent: "Floral, Aldehyde",
        volume: "30ml"
    }
];
