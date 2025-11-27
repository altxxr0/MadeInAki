// BakedInAki - Admin Products Management

// Protect page
if (!requireAuth()) {
    // Will redirect to login
}

let deleteProductId = null;

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});

// Load all products
function loadProducts() {
    filterProducts();
}

// Filter products
function filterProducts() {
    const categoryFilter = document.getElementById('category-filter').value;
    const searchQuery = document.getElementById('search-input').value.toLowerCase();
    
    let products = getProducts();
    
    // Filter by category
    if (categoryFilter !== 'all') {
        products = products.filter(p => p.category === categoryFilter);
    }
    
    // Filter by search
    if (searchQuery) {
        products = products.filter(p => 
            p.name.toLowerCase().includes(searchQuery) ||
            p.description.toLowerCase().includes(searchQuery)
        );
    }
    
    renderProductsTable(products);
}

// Render products table
function renderProductsTable(products) {
    const tbody = document.getElementById('products-table');
    const countEl = document.getElementById('product-count');
    
    countEl.textContent = `${products.length} product(s)`;
    
    if (products.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 2rem; color: #666;">
                    No products found.
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = products.map(product => `
        <tr>
            <td style="font-size: 2rem;">${product.image}</td>
            <td>
                <strong>${product.name}</strong>
                <br>
                <small style="color: #666;">${product.description.substring(0, 50)}${product.description.length > 50 ? '...' : ''}</small>
            </td>
            <td>${formatCategoryName(product.category)}</td>
            <td><strong>${formatPrice(product.price)}</strong></td>
            <td>
                <span class="status-badge ${product.available ? 'status-ready' : 'status-cancelled'}">
                    ${product.available ? '✅ Available' : '❌ Unavailable'}
                </span>
            </td>
            <td>
                <button class="action-btn btn-edit" onclick="editProduct(${product.id})">Edit</button>
                <button class="action-btn btn-delete" onclick="deleteProductPrompt(${product.id}, '${product.name}')">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Format category name
function formatCategoryName(category) {
    const categories = {
        'breads': '🍞 Breads',
        'cakes': '🎂 Cakes',
        'pastries': '🥧 Pastries',
        'cookies': '🍪 Cookies'
    };
    return categories[category] || category;
}

// Open add modal
function openAddModal() {
    document.getElementById('modal-title').textContent = 'Add New Product';
    document.getElementById('product-form').reset();
    document.getElementById('product-id').value = '';
    document.getElementById('product-image').value = '🍞';
    document.getElementById('product-modal').classList.add('open');
}

// Edit product
function editProduct(id) {
    const product = getProductById(id);
    if (!product) return;
    
    document.getElementById('modal-title').textContent = 'Edit Product';
    document.getElementById('product-id').value = product.id;
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-category').value = product.category;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-description').value = product.description;
    document.getElementById('product-image').value = product.image;
    document.getElementById('product-available').value = product.available.toString();
    
    document.getElementById('product-modal').classList.add('open');
}

// Save product (add or update)
function saveProduct() {
    const form = document.getElementById('product-form');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const productId = document.getElementById('product-id').value;
    const productData = {
        name: document.getElementById('product-name').value,
        category: document.getElementById('product-category').value,
        price: parseFloat(document.getElementById('product-price').value),
        description: document.getElementById('product-description').value,
        image: document.getElementById('product-image').value || '🍞',
        available: document.getElementById('product-available').value === 'true'
    };
    
    if (productId) {
        // Update existing
        updateProduct(productId, productData);
        showToast('Product updated successfully!');
    } else {
        // Add new
        addProduct(productData);
        showToast('Product added successfully!');
    }
    
    closeModal();
    loadProducts();
}

// Delete product prompt
function deleteProductPrompt(id, name) {
    deleteProductId = id;
    document.getElementById('delete-product-name').textContent = name;
    document.getElementById('delete-modal').classList.add('open');
}

// Confirm delete
function confirmDelete() {
    if (deleteProductId) {
        deleteProduct(deleteProductId);
        showToast('Product deleted successfully!');
        closeDeleteModal();
        loadProducts();
    }
}

// Close modal
function closeModal() {
    document.getElementById('product-modal').classList.remove('open');
}

// Close delete modal
function closeDeleteModal() {
    document.getElementById('delete-modal').classList.remove('open');
    deleteProductId = null;
}

// Toast notification
function showToast(message) {
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.textContent = message;
    toast.style.cssText = 'position: fixed; bottom: 20px; right: 20px; background: #32CD32; color: white; padding: 15px 25px; border-radius: 10px; z-index: 3000;';
    document.body.appendChild(toast);
    
    setTimeout(() => toast.remove(), 3000);
}
