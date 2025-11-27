// BakedInAki - Order Page JavaScript

const DELIVERY_FEE = 50;

document.addEventListener('DOMContentLoaded', () => {
    const cart = Cart.getCart();
    
    // Check if cart is empty
    if (cart.length === 0) {
        document.getElementById('order-container').style.display = 'none';
        document.getElementById('empty-cart').style.display = 'block';
        return;
    }
    
    // Load order items and summary
    loadOrderItems();
    updateSummary();
    
    // Delivery option handlers
    const deliveryOptions = document.querySelectorAll('input[name="delivery"]');
    deliveryOptions.forEach(option => {
        option.addEventListener('change', (e) => {
            // Update selected styles
            document.querySelectorAll('.delivery-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            e.target.closest('.delivery-option').classList.add('selected');
            
            // Show/hide address field
            const addressGroup = document.getElementById('address-group');
            const addressInput = document.getElementById('address');
            
            if (e.target.value === 'delivery') {
                addressGroup.style.display = 'block';
                addressInput.required = true;
            } else {
                addressGroup.style.display = 'none';
                addressInput.required = false;
            }
            
            updateSummary();
        });
    });
    
    // Payment option handlers
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    paymentOptions.forEach(option => {
        option.addEventListener('change', (e) => {
            document.querySelectorAll('input[name="payment"]').forEach(opt => {
                opt.closest('.delivery-option').classList.remove('selected');
            });
            e.target.closest('.delivery-option').classList.add('selected');
        });
    });
    
    // Place order button
    document.getElementById('place-order-btn').addEventListener('click', placeOrder);
});

// Load order items
function loadOrderItems() {
    const cart = Cart.getCart();
    const orderItems = document.getElementById('order-items');
    
    orderItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">${item.image}</div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${formatPrice(item.price)} each</div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateOrderItem(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateOrderItem(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </div>
            <div style="text-align: right;">
                <div style="font-weight: bold;">${formatPrice(item.price * item.quantity)}</div>
                <button class="remove-item" onclick="removeOrderItem(${item.id})" style="margin-top: 0.5rem;">Remove</button>
            </div>
        </div>
    `).join('');
}

// Update summary
function updateSummary() {
    const cart = Cart.getCart();
    const isDelivery = document.querySelector('input[name="delivery"]:checked').value === 'delivery';
    
    // Summary items
    const summaryItems = document.getElementById('summary-items');
    summaryItems.innerHTML = cart.map(item => `
        <div class="summary-item">
            <span>${item.name} × ${item.quantity}</span>
            <span>${formatPrice(item.price * item.quantity)}</span>
        </div>
    `).join('');
    
    // Calculate totals
    const subtotal = Cart.getTotal();
    const deliveryFee = isDelivery ? DELIVERY_FEE : 0;
    const total = subtotal + deliveryFee;
    
    document.getElementById('subtotal').textContent = formatPrice(subtotal);
    document.getElementById('delivery-fee').textContent = isDelivery ? formatPrice(deliveryFee) : 'FREE';
    document.getElementById('total').textContent = formatPrice(total);
}

// Update order item quantity
function updateOrderItem(productId, quantity) {
    if (quantity <= 0) {
        removeOrderItem(productId);
        return;
    }
    
    Cart.updateQuantity(productId, quantity);
    
    // Check if cart is now empty
    if (Cart.getCart().length === 0) {
        document.getElementById('order-container').style.display = 'none';
        document.getElementById('empty-cart').style.display = 'block';
        return;
    }
    
    loadOrderItems();
    updateSummary();
}

// Remove order item
function removeOrderItem(productId) {
    Cart.removeItem(productId);
    
    // Check if cart is now empty
    if (Cart.getCart().length === 0) {
        document.getElementById('order-container').style.display = 'none';
        document.getElementById('empty-cart').style.display = 'block';
        return;
    }
    
    loadOrderItems();
    updateSummary();
    showToast('Item removed from order');
}

// Place order
function placeOrder() {
    const form = document.getElementById('order-form');
    
    // Validate form
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const cart = Cart.getCart();
    if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
    }
    
    // Get form data
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const deliveryMethod = document.querySelector('input[name="delivery"]:checked').value;
    const address = document.getElementById('address').value;
    const notes = document.getElementById('notes').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    // Calculate totals
    const subtotal = Cart.getTotal();
    const deliveryFee = deliveryMethod === 'delivery' ? DELIVERY_FEE : 0;
    const total = subtotal + deliveryFee;
    
    // Create order
    const orderData = {
        customer: {
            name,
            phone,
            email
        },
        items: cart,
        deliveryMethod,
        address: deliveryMethod === 'delivery' ? address : 'Pickup at store',
        notes,
        paymentMethod,
        subtotal,
        deliveryFee,
        total
    };
    
    const order = Orders.createOrder(orderData);
    
    // Clear cart
    Cart.clear();
    
    // Show success modal
    document.getElementById('order-number').textContent = order.id;
    document.getElementById('success-modal').classList.add('open');
}
