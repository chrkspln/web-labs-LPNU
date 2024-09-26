const perfumes = [
    { id: 1, name: "Acqua Di Gio", brand: "Armani", price: 75.99, scent: "Citrus", volume: "100ml" },
    { id: 2, name: "Bleu de Chanel", brand: "Chanel", price: 89.99, scent: "Woody", volume: "150ml" },
    { id: 3, name: "Eros", brand: "Versace", price: 80.99, scent: "Fresh", volume: "100ml" },
    { id: 4, name: "La Vie Est Belle", brand: "Lancôme", price: 95.50, scent: "Floral", volume: "75ml" },
    { id: 5, name: "Dior Sauvage", brand: "Dior", price: 120.00, scent: "Spicy", volume: "200ml" }
];

function displayPerfumes(perfumes) {
    const list = document.getElementById('perfumeList');
    list.innerHTML = '';

    perfumes.forEach(perfume => {
        const perfumeDiv = document.createElement('div');
        perfumeDiv.className = 'perfume-card';

        perfumeDiv.innerHTML = `
      <h3>${perfume.name}</h3>
      <p>Brand: ${perfume.brand}</p>
      <p>Price: $${perfume.price.toFixed(2)}</p>
      <p>Scent: ${perfume.scent}</p>
      <p>Volume: ${perfume.volume}</p>
    `;

        list.appendChild(perfumeDiv);
    });
}

function sortByName() {
    const sorted = perfumes.slice().sort((a, b) => a.name.localeCompare(b.name));
    displayPerfumes(sorted);
}

function sortByPrice() {
    const sorted = perfumes.slice().sort((a, b) => a.price - b.price);
    displayPerfumes(sorted);
}

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase();
    const filtered = perfumes.filter(perfume => perfume.name.toLowerCase().includes(searchTerm));
    displayPerfumes(filtered);
});

function calculateTotal() {
    const total = perfumes.reduce((sum, perfume) => sum + perfume.price, 0);
    document.getElementById('totalPrice').textContent = total.toFixed(2);
}

displayPerfumes(perfumes);
