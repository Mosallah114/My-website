
const products = [
    // Clothes
    { id: 1, name: "Blue Shirt", price: 25, category: "Clothes", image: "shirt-1.jpg" },
    { id: 2, name: "Red Shirt", price: 30, category: "Clothes", image: "shirt-2.jpg" },
    { id: 3, name: "Winter Jacket", price: 80, category: "Clothes", image: "jacket-1.jpg" },
    { id: 4, name: "Leather Jacket", price: 120, category: "Clothes", image: "jacket-2.jpg" },
    { id: 5, name: "Casual Jacket", price: 75, category: "Clothes", image: "jacket-3.jpg" },
    { id: 6, name: "Hooded Jacket", price: 90, category: "Clothes", image: "jacket-4.jpg" },
    { id: 7, name: "Denim Jacket", price: 100, category: "Clothes", image: "jacket-5.jpg" },
    { id: 8, name: "Sports Jacket", price: 85, category: "Clothes", image: "jacket-6.jpg" },
    { id: 9, name: "Clothes 1", price: 40, category: "Clothes", image: "clothes-1.jpg" },
    { id: 10, name: "Clothes 2", price: 45, category: "Clothes", image: "clothes-2.jpg" },
    { id: 11, name: "Clothes 3", price: 50, category: "Clothes", image: "clothes-3.jpg" },
    { id: 12, name: "Clothes 4", price: 55, category: "Clothes", image: "clothes-4.jpg" },

    // Shoes
    { id: 13, name: "Running Shoe", price: 60, category: "Shoes", image: "shoe-1.jpg" },
    { id: 14, name: "Black Shoe", price: 65, category: "Shoes", image: "shoe-2.jpg" },
    { id: 15, name: "Sport Shoe", price: 70, category: "Shoes", image: "shoe-3.jpg" },
    { id: 16, name: "Comfort Shoe", price: 55, category: "Shoes", image: "shoe-4.jpg" },
    { id: 17, name: "Elegant Shoe", price: 80, category: "Shoes", image: "shoe-5.jpg" },
    { id: 18, name: "Shoe Extra 1", price: 50, category: "Shoes", image: "shoe-1_1.jpg" },
    { id: 19, name: "Shoe Extra 2", price: 52, category: "Shoes", image: "shoe-2_1.jpg" },

    // Accessories
    { id: 20, name: "Leather Belt", price: 20, category: "Accessories", image: "belt.jpg" },
    { id: 21, name: "Jewellery Set 1", price: 150, category: "Accessories", image: "jewellery-1.jpg" },
    { id: 22, name: "Jewellery Set 2", price: 160, category: "Accessories", image: "jewellery-2.jpg" },
    { id: 23, name: "Jewellery Set 3", price: 170, category: "Accessories", image: "jewellery-3.jpg" },
    { id: 24, name: "Watch 1", price: 200, category: "Accessories", image: "watch-1.jpg" },
    { id: 25, name: "Watch 2", price: 210, category: "Accessories", image: "watch-2.jpg" },
    { id: 26, name: "Watch 3", price: 220, category: "Accessories", image: "watch-3.jpg" },
    { id: 27, name: "Watch 4", price: 230, category: "Accessories", image: "watch-4.jpg" },

    // Electronics
    { id: 28, name: "Electronics Banner 1", price: 0, category: "Electronics", image: "electronics-banner-1.jpg" },
    { id: 29, name: "Electronics Banner 2", price: 0, category: "Electronics", image: "electronics-banner-2.jpg" },

    // Beauty
    { id: 30, name: "Perfume", price: 45, category: "Beauty", image: "perfume.jpg" },
    { id: 31, name: "Shampoo", price: 15, category: "Beauty", image: "shampoo.jpg" },
    { id: 32, name: "Party Wear 1", price: 70, category: "Beauty", image: "party-wear-1.jpg" },
    { id: 33, name: "Party Wear 2", price: 75, category: "Beauty", image: "party-wear-2.jpg" }
];

const productsContainer = document.getElementById("products");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");

const popup = document.getElementById("popup");
const popupImage = document.getElementById("popupImage");
const popupName = document.getElementById("popupName");
const popupPrice = document.getElementById("popupPrice");
const popupClose = document.getElementById("popupClose");
const orderBtn = document.getElementById("orderBtn");

let currentFilter = "all";
let currentSearch = "";

function renderProducts() {
    productsContainer.innerHTML = "";

    const filteredProducts = products.filter(product => {
        const matchesCategory = currentFilter === "all" || product.category === currentFilter;
        const matchesSearch = product.name.toLowerCase().includes(currentSearch.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if(filteredProducts.length === 0){
        productsContainer.innerHTML = "<p style='grid-column: 1/-1; text-align:center;'>No products found.</p>";
        return;
    }

    filteredProducts.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.setAttribute("data-id", product.id);
        card.setAttribute("data-category", product.category);

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img" />
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">$${product.price}</p>
            </div>
        `;

        card.addEventListener("click", () => {
            openPopup(product);
        });

        productsContainer.appendChild(card);
    });
}

function openPopup(product) {
    popupImage.src = product.image;
    popupName.textContent = product.name;
    popupPrice.textContent = "$" + product.price;
    orderBtn.onclick = () => {
        const message = encodeURIComponent(`Hello, I want to order: ${product.name} for $${product.price}`);
        window.open(`https://wa.me/2616980?text=${message}`, "_blank");
    };
    popup.classList.remove("hidden");
}

popupClose.addEventListener("click", () => {
    popup.classList.add("hidden");
});

window.addEventListener("click", (e) => {
    if (e.target === popup) {
        popup.classList.add("hidden");
    }
});

searchInput.addEventListener("input", (e) => {
    currentSearch = e.target.value;
    renderProducts();
});

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        currentFilter = button.getAttribute("data-category");
        renderProducts();
    });
});

renderProducts();
