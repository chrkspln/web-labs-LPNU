let editingPerfume = null;
let perfumes = [];

// Fetch all perfumes from the backend
async function fetchPerfumes() {
    const response = await fetch('/perfumes');
    perfumes = await response.json();
    displayPerfumes(perfumes);
}

// Create perfume card element
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

// Display perfumes on the page
function displayPerfumes(perfumes) {
    const list = document.getElementById('perfumeList');
    list.innerHTML = ''; // Clear existing content

    perfumes.forEach(perfume => {
        const perfumeCard = createPerfumeCard(perfume);
        list.appendChild(perfumeCard);
    });
}

// Handle add/edit form submission
document.getElementById('createEditForm').addEventListener('submit', async function (submitEvent) {
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

    const perfumeData = { name, brand, price, scent, volume };

    if (editingPerfume) {
        // Update existing perfume
        await updatePerfume(editingPerfume.id, perfumeData);
        editingPerfume = null; // Reset after edit
    } else {
        // Add new perfume
        await addPerfume(perfumeData);
    }

    await fetchPerfumes(); // Refresh the list
});

function openFormToAddPerfume() {
    editingPerfume = null;
    document.getElementById('formTitle').textContent = "Adding perfume to the store...";
    document.getElementById('createEditForm').reset();
    document.getElementById('perfumeForm').style.display = 'block';
}

// Add a new perfume (Create)
async function addPerfume(perfumeData) {
    try {
        const response = await fetch('/perfumes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(perfumeData)
        });

        if (!response.ok) {
            alert(`Error: perfume with this name already exists!`);
        }
    } catch (error) {
        console.error('Error adding perfume:', error);
    }
}

// Update an existing perfume (Update)
async function updatePerfume(id, perfumeData) {
    await fetch(`/perfumes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(perfumeData)
    });
}

// Delete a perfume (Delete)
async function deletePerfume(id) {
    await fetch(`/perfumes/${id}`, {
        method: 'DELETE'
    });
    await fetchPerfumes(); // Refresh perfumes list after deletion
}

// Open form to edit an existing perfume
function openFormToEditPerfume(id) {
    editingPerfume = perfumes.find(perfume => perfume.id === id);
    if (!editingPerfume) return;

    // Populate the form with perfume data
    document.getElementById('name').value = editingPerfume.name;
    document.getElementById('brand').value = editingPerfume.brand;
    document.getElementById('price').value = editingPerfume.price;
    document.getElementById('scent').value = editingPerfume.scent;
    document.getElementById('volume').value = editingPerfume.volume;
    document.getElementById('formTitle').textContent = "Edit Perfume";
    document.getElementById('perfumeForm').style.display = 'block';
}

// Sort perfumes by criterion
function sortPerfumes(criterion) {
    const sortedPerfumes = perfumes.slice().sort((a, b) => {
        if (criterion === 'name') return a.name.localeCompare(b.name);
        else if (criterion === 'price') return a.price - b.price;
    });
    displayPerfumes(sortedPerfumes);
}

// Search perfumes by name
function filterPerfumesByName(searchTerm) {
    const trimmedTerm = searchTerm.trim().toLowerCase();
    const filteredPerfumes = perfumes.filter(perfume =>
        perfume.name.toLowerCase().includes(trimmedTerm)
    );
    displayPerfumes(filteredPerfumes);
}

// Handle search input event
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value;
    filterPerfumesByName(searchTerm);
});

// On page load
document.addEventListener("DOMContentLoaded", () => {
    fetchPerfumes();
});
