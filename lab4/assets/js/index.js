const searchInput = document.getElementById('searchInput');
const nameSortButton = document.getElementById('nameSortButton');
const priceSortButton = document.getElementById('priceSortButton');
const calculateTotalPriceButton = document.getElementById('calculateTotalPriceButton');
const createPage = document.getElementById("createPage");
const editPage = document.getElementById("editPage");
const newForm = document.getElementById("newForm");

const nameInput = document.getElementById("nameInput");
const destinationInput = document.getElementById("destinationInput");
const brandInput = document.getElementById("brandInput");
const orderDateInput = document.getElementById("orderDateInput");
const priceInput = document.getElementById("priceInput");

const editNameInput = document.getElementById("editNameInput");
const editDestinationInput = document.getElementById("editDestinationInput");
const editBrandInput = document.getElementById("editBrandInput");
const editOrderDateInput = document.getElementById("editOrderDateInput");
const editPriceInput = document.getElementById("editPriceInput");

const submitNewForButton = document.getElementById("submitNewFormButton");
const editFormButton = document.getElementById("editFormButton");


const perfumes = [
    {   id: 1,
        name: "Suu...",
        brand: "Masaki Matsushima",
        price: 1171,
        scent: "Floral",
        volume: "80ml"
    },
    {
        id: 2,
        name: "Mat.",
        brand: "Masaki Matsushima",
        price: 985,
        scent: "Floral, Fruity",
        volume: "40ml"
    },
    {
        id: 3,
        name: "Marry Me!",
        brand: "Lanvin",
        price: 1007,
        scent: "Floral, Fruity",
        volume: "30ml"
    },
    {
        id: 4,
        name: "Parfum d`Ete",
        brand: "Kenzo",
        price: 2428,
        scent: "Floral, Green",
        volume: "75ml"
    },
    {
        id: 5,
        name: "Noa",
        brand: "Cacharel",
        price: 909,
        scent: "Floral, Aldehyde",
        volume: "30ml"
    }
];
let displayedPerfumes = perfumes.slice();


function createPerfumeCard(perfume) {
    const perfumeDiv = document.createElement('div');
    perfumeDiv.className = 'perfume-card';
    perfumeDiv.innerHTML = `
        <h3>${perfume.name}</h3>
        <h5>Brand: ${perfume.brand}</h5>
        <h5>Price: ₴${perfume.price.toFixed(2)}</h5>
        <h5>Scent: ${perfume.scent}</h5>
        <h5>Volume: ${perfume.volume}</h5>
        <div class="block_btn">
            <button id="editFormButton" type="button" class="btn-primary btn_card" onclick="clickEdit(${id})">Edit</button>
            <button type="button" id="deleteFormButton" class="btn_card_cansel" onclick="clickDelete(${id})">Delete</button>
        </div>
    `;
    return perfumeDiv;
}

function displayPerfumes(perfumes) {
    displayedPerfumes = perfumes;
    const list = document.getElementById('perfumeList');
    list.innerHTML = '';

    perfumes.forEach(perfume => {
        const perfumeCard = createPerfumeCard(perfume);
        list.appendChild(perfumeCard);
    });
}

function sortPerfumes(criterion) {
    const sortedPerfumes = displayedPerfumes.slice().sort((a, b) => {
        if (criterion === 'name') return a.name.localeCompare(b.name);
        else if (criterion === 'price') return a.price - b.price;
    });
    displayPerfumes(sortedPerfumes);
}

function sortByName() {
    sortPerfumes('name');
}

function sortByPrice() {
    sortPerfumes('price');
}

function filterPerfumesByName(searchTerm) {
    const trimmedTerm = searchTerm.trim().toLowerCase();
    return perfumes.filter(perfume =>
        perfume.name.toLowerCase().includes(trimmedTerm)
    );
}

function handleSearchInput() {
    const searchTerm = searchInput.value;
    const filteredPerfumes = filterPerfumesByName(searchTerm);
    displayPerfumes(filteredPerfumes);
}

searchInput.addEventListener('input', handleSearchInput);

function calculateTotal() {
    const total = displayedPerfumes.reduce((sum, perfume) => sum + perfume.price, 0);
    document.getElementById('totalPrice').textContent = total.toFixed(2);
}

document.addEventListener("DOMContentLoaded", () => {
    displayPerfumes(perfumes);
});
