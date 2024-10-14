const searchInput = document.getElementById('searchInput');
const perfumes = [
    {
        id: 1,
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
let displayedPerfumes = perfumes.slice(); // Initially, all perfumes are displayed
let editingPerfume = null;


function createPerfumeCard(perfume) {
    const perfumeDiv = document.createElement('div');
    perfumeDiv.className = 'perfume-card';
    perfumeDiv.innerHTML = `
      <h3>${perfume.name}</h3>
      <p>Brand: ${perfume.brand}</p>
      <p>Price: ₴${perfume.price.toFixed(2)}</p>
      <p>Scent: ${perfume.scent}</p>
      <p>Volume: ${perfume.volume}</p>
      <button onclick="openFormToEditPerfume(${perfume.id})">Edit</button>
      <button onclick="deletePerfume(${perfume.id})">Delete</button>
    `;
    return perfumeDiv;
}

function displayPerfumes(perfumes) {
    displayedPerfumes = perfumes; // Update displayed items
    const list = document.getElementById('perfumeList');
    list.innerHTML = ''; // Clear existing content

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

// !!! LAB 4 CODE STARTS HERE !!!

function deletePerfume(id) {
    if (confirm("Are you sure you want to delete this perfume?")) {
        const index = perfumes.findIndex(perfume => perfume.id === id);
        if (index > -1) {
            perfumes.splice(index, 1);
            displayPerfumes(perfumes);
        }
    }
}

function openFormToAddPerfume() {
    editingPerfume = null;
    document.getElementById('formTitle').textContent = "Adding perfume to the store...";
    document.getElementById('createEditForm').reset();
    document.getElementById('perfumeForm').style.display = 'block';
}

function openFormToEditPerfume(id) {
    editingPerfume = perfumes.find(perfume => perfume.id === id);
    document.getElementById('formTitle').textContent = "Editing existing perfume in the store...";
    document.getElementById('perfumeId').value = editingPerfume.id;
    document.getElementById('name').value = editingPerfume.name;
    document.getElementById('brand').value = editingPerfume.brand;
    document.getElementById('price').value = editingPerfume.price;
    document.getElementById('scent').value = editingPerfume.scent;
    document.getElementById('volume').value = editingPerfume.volume;
    document.getElementById('perfumeForm').style.display = 'block';
}

document.getElementById('createEditForm').addEventListener('submit', function (submitEvent) {
    submitEvent.preventDefault();

    const name = document.getElementById('name').value.trim();
    const brand = document.getElementById('brand').value.trim();
    const price = parseFloat(document.getElementById('price').value);
    const scent = document.getElementById('scent').value.trim();
    const volume = document.getElementById('volume').value.trim();

    if (!name || !brand || isNaN(price) || price <= 0 || !scent || !volume) {
        alert("Please fill all fields with valid data.");
        return;
    }

    if (editingPerfume) {
        editingPerfume.name = name;
        editingPerfume.brand = brand;
        editingPerfume.price = price;
        editingPerfume.scent = scent;
        editingPerfume.volume = volume;
    } else {
        const newId = Math.max(...perfumes.map(p => p.id)) + 1;
        perfumes.push({ id: newId, name, brand, price, scent, volume });
    }

    displayPerfumes(perfumes);
});