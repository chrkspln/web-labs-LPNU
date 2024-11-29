import axios from 'axios';

const API_DOMAIN = 'http://localhost:6156/';
const API_URL = 'http://localhost:6156/api/products';

export const getPerfumes = (searchTerm = '', minPrice = '', maxPrice = '', sortType = '') => {
    return axios.get(`${API_URL}`, {
        params: {
            search_term: searchTerm || undefined, // Only include parameter if it has a value
            min_price: minPrice || undefined,
            max_price: maxPrice || undefined,
            sort: sortType || undefined,
        },
    })
        .then((response) => response) // Return the full response object
        .catch((error) => {
            console.error('Error fetching perfumes:', error);
            throw error; // Propagate error to the calling code for better error handling
        });
};

export const getPerfumeById = (id) => {
    if (!id) {
        throw new Error("ID is required to fetch perfume details.");
    }

    return axios.get(`${API_URL}/${id}`) // Assuming the API uses `/id` for individual items
        .then((response) => response) // Return the full response object
        .catch((error) => {
            console.error(`Error fetching perfume with ID ${id}:`, error);
            throw error;
        });
};

export const signupUser = (email, username, password) => {
    return axios.post(`${API_DOMAIN}api/auth/signup`, { email, username, password });
};