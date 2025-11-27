// BakedInAki - Main JavaScript
// Common functionality for the website

// Cart Management
const Cart = {
    // Get cart from localStorage
    getCart() {
        return JSON.parse(localStorage.getItem('bakery_cart')) || [];
    },

    // Save cart to localStorage
    saveCart(cart) {
        localStorage.setItem('bakery_cart', JSON.stringify(cart));
        this.updateCartCount();
    },

    // Add item to cart
    addItem(product, quantity = 1) {
        const cart = this.getCart();
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }

        this.saveCart(cart);
        showToast(`${product.name} added to cart!`);
    },

    // Remove item from cart
    removeItem(productId) {
        const cart = this.getCart();
        const filtered = cart.filter(item => item.id !== productId);
        this.saveCart(filtered);
    },

    // Update item quantity
    updateQuantity(productId, quantity) {
        const cart = this.getCart();
        const item = cart.find(item => item.id === productId);
        
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.saveCart(cart);
            }
        }
    },

    // Get total items count
    getItemCount() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + item.quantity, 0);
    },

    // Get cart total
    getTotal() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    // Clear cart
    clear() {
        localStorage.removeItem('bakery_cart');
        this.updateCartCount();
    },

    // Update cart count badge
    updateCartCount() {
        const countElements = document.querySelectorAll('.cart-count');
        const count = this.getItemCount();
        countElements.forEach(el => {
            el.textContent = count;
            el.style.display = count > 0 ? 'block' : 'none';
            // Add bounce animation
            if (count > 0) {
                el.classList.add('bounce');
                setTimeout(() => el.classList.remove('bounce'), 300);
            }
        });
    }
};

// Order Management
const Orders = {
    // Get all orders
    getOrders() {
        return JSON.parse(localStorage.getItem('bakery_orders')) || [];
    },

    // Save orders
    saveOrders(orders) {
        localStorage.setItem('bakery_orders', JSON.stringify(orders));
    },

    // Create new order
    createOrder(orderData) {
        const orders = this.getOrders();
        const order = {
            id: this.generateOrderId(),
            ...orderData,
            status: 'pending',
            createdAt: new Date().toISOString()
        };
        orders.push(order);
        this.saveOrders(orders);
        return order;
    },

    // Generate order ID (e.g., AKI-20251127-001)
    generateOrderId() {
        const date = new Date();
        const dateStr = date.getFullYear().toString() +
            (date.getMonth() + 1).toString().padStart(2, '0') +
            date.getDate().toString().padStart(2, '0');
        const orders = this.getOrders();
        const todayOrders = orders.filter(o => o.id && o.id.includes(dateStr));
        const num = (todayOrders.length + 1).toString().padStart(3, '0');
        return `AKI-${dateStr}-${num}`;
    },

    // Get order by ID
    getOrderById(orderId) {
        const orders = this.getOrders();
        return orders.find(o => o.id.toLowerCase() === orderId.toLowerCase());
    },

    // Update order status
    updateStatus(orderId, status) {
        const orders = this.getOrders();
        const order = orders.find(o => o.id === orderId);
        if (order) {
            order.status = status;
            order.updatedAt = new Date().toISOString();
            this.saveOrders(orders);
            return order;
        }
        return null;
    },

    // Get orders by status
    getOrdersByStatus(status) {
        const orders = this.getOrders();
        if (status === 'all') return orders;
        return orders.filter(o => o.status === status);
    },

    // Get today's orders
    getTodayOrders() {
        const orders = this.getOrders();
        const today = new Date().toDateString();
        return orders.filter(o => new Date(o.createdAt).toDateString() === today);
    },

    // Delete order (for admin)
    deleteOrder(orderId) {
        const orders = this.getOrders();
        const filtered = orders.filter(o => o.id !== orderId);
        this.saveOrders(filtered);
    }
};

// Toast Notification
function showToast(message, duration = 3000) {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Create new toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);

    // Hide toast
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Format price in Philippine Peso
function formatPrice(price) {
    return `₱${price.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`;
}

// Format date
function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-PH', options);
}

// Mobile menu toggle
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
    }
}

// Cart Sidebar
function initCartSidebar() {
    const cartIcon = document.querySelector('.cart-icon');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const closeCart = document.querySelector('.close-cart');
    const cartOverlay = document.querySelector('.cart-overlay');

    if (cartIcon && cartSidebar) {
        cartIcon.addEventListener('click', () => {
            cartSidebar.classList.add('open');
            cartOverlay.classList.add('open');
            renderCartSidebar();
        });

        closeCart?.addEventListener('click', () => {
            cartSidebar.classList.remove('open');
            cartOverlay.classList.remove('open');
        });

        cartOverlay?.addEventListener('click', () => {
            cartSidebar.classList.remove('open');
            cartOverlay.classList.remove('open');
        });
    }
}

// Render cart sidebar content
function renderCartSidebar() {
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total-amount');
    const cart = Cart.getCart();

    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🛒</div>
                <p>Your cart is empty</p>
                <a href="menu.html" class="btn btn-primary" style="margin-top: 1rem;">Browse Menu</a>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.image}</div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${formatPrice(item.price)}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateCartItem(${item.id}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateCartItem(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeCartItem(${item.id})">×</button>
            </div>
        `).join('');
    }

    if (cartTotal) {
        cartTotal.textContent = formatPrice(Cart.getTotal());
    }
}

// Update cart item (called from sidebar)
function updateCartItem(productId, quantity) {
    Cart.updateQuantity(productId, quantity);
    renderCartSidebar();
}

// Remove cart item (called from sidebar)
function removeCartItem(productId) {
    Cart.removeItem(productId);
    renderCartSidebar();
    showToast('Item removed from cart');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    Cart.updateCartCount();
    initMobileMenu();
    initCartSidebar();
});
