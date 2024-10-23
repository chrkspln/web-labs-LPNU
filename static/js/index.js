const searchInput = document.getElementById('searchInput');
let editingPerfume = null;
const apiBaseUrl = 'http://localhost:8080';


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

async function fetchPerfumes(searchTerm = '', sorted = false) {
  try {
    const response = await fetch(`${apiBaseUrl}/perfumes?sorted=${sorted}&searchTerm=${encodeURIComponent(searchTerm)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch perfumes');
    }
    const perfumes = await response.json();
    displayPerfumes(perfumes);
    return perfumes;
  } catch (error) {
    console.error('Error fetching perfumes:', error.message);
    alert('Error fetching perfumes');
  }
}

function displayPerfumes(perfumes) {
  const list = document.getElementById('perfumeList');
  list.innerHTML = '';

  perfumes.forEach(perfume => {
    const perfumeCard = createPerfumeCard(perfume);
    list.appendChild(perfumeCard);
  });
}

function handleSearchInput() {
  const searchTerm = searchInput.value.trim();
  fetchPerfumes(searchTerm);
}

// add sorting

function filterPerfumesByName(searchTerm) {
  const trimmedTerm = searchTerm.trim().toLowerCase();
  return fetchPerfumes().filter(perfume =>
    perfume.name.toLowerCase().includes(trimmedTerm)
  );
}

searchInput.addEventListener('input', handleSearchInput);

async function calculateTotal() {
  const perfumes = await fetchPerfumes();
  const total = perfumes.reduce((sum, perfume) => sum + perfume.price, 0);
  document.getElementById('totalPrice').textContent = total.toFixed(2);
}

async function deletePerfume(id) {
  if (confirm("Are you sure you want to delete this perfume?")) {
    try {
      const response = await fetch(`${apiBaseUrl}/perfumes/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete perfume');
      await fetchPerfumes();
    } catch (error) {
      console.error('Error deleting perfume:', error.message);
      alert('Error deleting perfume');
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
  fetchPerfumes().then(perfumes => {
    editingPerfume = perfumes.find(perfume => perfume.id === id);
  });
  document.getElementById('formTitle').textContent = "Editing existing perfume in the store...";
  document.getElementById('perfumeId').value = editingPerfume.id;
  document.getElementById('name').value = editingPerfume.name;
  document.getElementById('brand').value = editingPerfume.brand;
  document.getElementById('price').value = editingPerfume.price;
  document.getElementById('scent').value = editingPerfume.scent;
  document.getElementById('volume').value = editingPerfume.volume;
  document.getElementById('perfumeForm').style.display = 'block';
}

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

  try {
    if (editingPerfume) {
      // Update existing perfume
      const response = await fetch(`${apiBaseUrl}/perfumes/${editingPerfume.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(perfumeData),
      });

      if (!response.ok) throw new Error('Failed to update perfume');

    } else {
      // Create new perfume
      const response = await fetch('${apiBaseUrl}/perfumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(perfumeData),
      });

      if (!response.ok) throw new Error('Failed to create perfume');
    }

    await fetchPerfumes();
    document.getElementById('perfumeForm').style.display = 'none';

  } catch (error) {
    console.error('Error saving perfume:', error.message);
    alert('Error saving perfume');
  }
});

  document.addEventListener("DOMContentLoaded", () => {
    fetchPerfumes();
  });
