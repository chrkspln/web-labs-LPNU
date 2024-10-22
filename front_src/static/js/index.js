const apiBaseUrl = "http://localhost:3000/perfumes";
const searchInput = document.getElementById('searchInput');
let displayedPerfumes = [];
let editingPerfume = null;
let editingPerfumeId = null;

// Get a perfume by ID
async function getPerfumeById(perfumeId) {
  try {
    const response = await fetch(`${apiBaseUrl}/${perfumeId}`);
    const perfume = await response.json();
    if (!response.ok) throw new Error(perfume.message);
    console.log("Perfume fetched:", perfume);
  } catch (error) {
    console.error("Error fetching perfume:", error.message);
  }
}

// Get all perfumes with search and sorting options
async function getPerfumes() {
  try {
    const response = await fetch(`${apiBaseUrl}/get-all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const perfumes = await response.json();
    if (!response.ok) throw new Error(perfumes.message);
    console.log("Perfumes fetched:", perfumes);
  } catch (error) {
    console.error("Error fetching perfumes:", error.message);
  }
}

// Create a new perfume
async function createPerfume(perfumeData) {
  try {
    const response = await fetch(apiBaseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(perfumeData),
    });
    const newPerfume = await response.json();
    if (!response.ok) throw new Error(newPerfume.message);
    console.log("Perfume created:", newPerfume);
  } catch (error) {
    console.error("Error creating perfume:", error.message);
  }
}

// Update an existing perfume
async function updatePerfume(perfumeId, perfumeData) {
  try {
    const response = await fetch(`${apiBaseUrl}/${perfumeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(perfumeData),
    });
    const updatedPerfume = await response.json();
    if (!response.ok) throw new Error(updatedPerfume.message);
    console.log("Perfume updated:", updatedPerfume);
  } catch (error) {
    console.error("Error updating perfume:", error.message);
  }
}

// Delete a perfume by ID
async function deletePerfume(perfumeId) {
  try {
    const response = await fetch(`${apiBaseUrl}/${perfumeId}`, {
      method: "DELETE",
    });
    if (response.status === 204) {
      console.log("Perfume deleted successfully");
    } else {
      const result = await response.json();
      throw new Error(result.message);
    }
  } catch (error) {
    console.error("Error deleting perfume:", error.message);
  }
}

// Sort perfumes by name
async function sortPerfumesByName() {
  try {
    const response = await fetch(`${apiBaseUrl}/sort-by-name`);
    const sortedPerfumes = await response.json();
    if (!response.ok) throw new Error(sortedPerfumes.message);
    console.log("Perfumes sorted by name:", sortedPerfumes);
  } catch (error) {
    console.error("Error sorting perfumes by name:", error.message);
  }
}

// Sort perfumes by price
async function sortPerfumesByPrice() {
  try {
    const response = await fetch(`${apiBaseUrl}/sort-by-price`);
    const sortedPerfumes = await response.json();
    if (!response.ok) throw new Error(sortedPerfumes.message);
    console.log("Perfumes sorted by price:", sortedPerfumes);
  } catch (error) {
    console.error("Error sorting perfumes by price:", error.message);
  }
}

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

async function displayPerfumes() {
  let perfumes = await getPerfumes();
  const list = document.getElementById('perfumeList');
  list.innerHTML = '';
  displayedPerfumes = perfumes;

  perfumes.forEach(perfume => {
    const perfumeCard = createPerfumeCard(perfume);
    list.appendChild(perfumeCard);
  });
}

async function filterPerfumesByName(searchTerm) {
  const trimmedTerm = searchTerm.trim().toLowerCase();
  let perfumes = await getPerfumes();
  return perfumes.filter(perfume =>
    perfume.name.toLowerCase().includes(trimmedTerm)
  );
}

function handleSearchInput() {
  const searchTerm = searchInput.value;
  const filteredPerfumes = filterPerfumesByName(searchTerm);
  displayPerfumes(filteredPerfumes).then(r => {});
}

searchInput.addEventListener('input', handleSearchInput);

function calculateTotal() {
  const total = displayedPerfumes.reduce((sum, perfume) => sum + perfume.price, 0);
  document.getElementById('totalPrice').textContent = total.toFixed(2);
}

function openFormToAddPerfume() {
  editingPerfume = null;
  document.getElementById('formTitle').textContent = "Adding perfume to the store...";
  document.getElementById('createEditForm').reset();
  document.getElementById('perfumeForm').style.display = 'block';
}

async function openFormToEditPerfume(id) {
  let perfumes = await getPerfumes();
  document.getElementById('formTitle').textContent = "Editing existing perfume in the store...";
  editingPerfumeId = id;
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
    updatePerfume(editingPerfumeId, editingPerfume).then(r => {});
  } else {
    const newPerfume = {
      name,
      brand,
      price,
      scent,
      volume
    };
    createPerfume(newPerfume).then(r => {});
  }
});

document.addEventListener("DOMContentLoaded", () => {
  displayPerfumes().then(r => {});
});
