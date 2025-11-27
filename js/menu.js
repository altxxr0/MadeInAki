// BakedInAki - Menu Page JavaScript

let currentCategory = 'all';
let searchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
    const productsGrid = document.getElementById('products-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Load all products initially
    loadProducts('all');
    
    // Category filter click handlers
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Load filtered products
            currentCategory = btn.dataset.category;
            loadProducts(currentCategory);
        });
    });
});

// Search products
function searchProducts() {
    const searchInput = document.getElementById('search-input');
    searchQuery = searchInput.value.toLowerCase().trim();
    loadProducts(currentCategory);
}

// Load and display products
function loadProducts(category) {
    const productsGrid = document.getElementById('products-grid');
    let products = getProductsByCategory(category);
    
    // Apply search filter
    if (searchQuery) {
        products = products.filter(p => 
            p.name.toLowerCase().includes(searchQuery) || 
            p.description.toLowerCase().includes(searchQuery) ||
            p.category.toLowerCase().includes(searchQuery)
        );
    }
    
    if (products.length === 0) {
        productsGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <div class="empty-state-icon">🍞</div>
                <p>${searchQuery ? 'No products found matching "' + searchQuery + '"' : 'No products found in this category'}</p>
                <button class="btn btn-secondary" style="margin-top: 1rem;" onclick="clearSearch()">Clear Search</button>
            </div>
        `;
        return;
    }
    
    // Sort: featured/signature items first
    products.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        if (a.category === 'signature' && b.category !== 'signature') return -1;
        if (a.category !== 'signature' && b.category === 'signature') return 1;
        return 0;
    });
    
    productsGrid.innerHTML = products.map((product, index) => `
        <div class="product-card fade-in" data-category="${product.category}" style="animation-delay: ${index * 0.05}s">
            <div class="product-image" style="position: relative;">
                ${product.image}
                ${product.badge ? `<span class="badge ${product.badge === 'Signature' ? 'badge-bestseller' : 'badge-new'}" style="position: absolute; top: 10px; left: 10px;">${product.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <span class="product-category">${formatCategory(product.category)}</span>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">${formatPrice(product.price)}</span>
                    <button class="add-to-cart" onclick='addToCart(${JSON.stringify(product)})'>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Clear search
function clearSearch() {
    document.getElementById('search-input').value = '';
    searchQuery = '';
    loadProducts(currentCategory);
}

// Format category name for display
function formatCategory(category) {
    const categories = {
        'breads': '🍞 Breads',
        'cakes': '🎂 Cakes',
        'pastries': '🥧 Pastries',
        'cookies': '🍪 Cookies & Snacks',
        'signature': '⭐ Signature'
    };
    return categories[category] || category;
}

// Add to cart (wrapper function for onclick)
function addToCart(product) {
    Cart.addItem(product);
}
