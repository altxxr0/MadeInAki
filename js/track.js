// BakedInAki - Track Order JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Check if order ID is in URL
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('id');
    
    if (orderId) {
        document.getElementById('order-id-input').value = orderId;
        trackOrder();
    }
    
    // Enter key to track
    document.getElementById('order-id-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            trackOrder();
        }
    });
});

// Track order by ID
function trackOrder() {
    const orderId = document.getElementById('order-id-input').value.trim().toUpperCase();
    
    if (!orderId) {
        showToast('Please enter an order number');
        return;
    }
    
    const order = Orders.getOrderById(orderId);
    
    if (!order) {
        document.getElementById('order-status').style.display = 'none';
        document.getElementById('order-not-found').style.display = 'block';
        return;
    }
    
    // Show order status
    document.getElementById('order-not-found').style.display = 'none';
    document.getElementById('order-status').style.display = 'block';
    
    displayOrderStatus(order);
}

// Display order status
function displayOrderStatus(order) {
    // Order ID
    document.getElementById('display-order-id').textContent = order.id;
    
    // Status badge
    const statusBadge = document.getElementById('status-badge');
    statusBadge.textContent = formatStatus(order.status);
    statusBadge.className = `status-badge status-${order.status}`;
    
    // Update timeline
    updateTimeline(order.status);
    
    // Order details
    const details = document.getElementById('order-details');
    details.innerHTML = `
        <div class="detail-row">
            <span class="detail-label">Customer</span>
            <span class="detail-value">${order.customer.name}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Phone</span>
            <span class="detail-value">${order.customer.phone}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Delivery Method</span>
            <span class="detail-value">${order.deliveryMethod === 'delivery' ? '🚗 Delivery' : '🏪 Pickup'}</span>
        </div>
        ${order.deliveryMethod === 'delivery' ? `
        <div class="detail-row">
            <span class="detail-label">Address</span>
            <span class="detail-value">${order.address}</span>
        </div>
        ` : ''}
        <div class="detail-row">
            <span class="detail-label">Payment</span>
            <span class="detail-value">${order.paymentMethod === 'gcash' ? '📱 GCash' : '💵 Cash'}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Order Date</span>
            <span class="detail-value">${formatDate(order.createdAt)}</span>
        </div>
        ${order.notes ? `
        <div class="detail-row">
            <span class="detail-label">Notes</span>
            <span class="detail-value">${order.notes}</span>
        </div>
        ` : ''}
    `;
    
    // Order items
    const itemsList = document.getElementById('order-items-list');
    itemsList.innerHTML = order.items.map(item => `
        <div class="order-item-row">
            <span>${item.image} ${item.name} × ${item.quantity}</span>
            <span>${formatPrice(item.price * item.quantity)}</span>
        </div>
    `).join('');
    
    // Totals
    document.getElementById('track-subtotal').textContent = formatPrice(order.subtotal);
    document.getElementById('track-delivery-fee').textContent = order.deliveryFee > 0 ? formatPrice(order.deliveryFee) : 'FREE';
    document.getElementById('track-total').textContent = formatPrice(order.total);
}

// Update timeline based on status
function updateTimeline(currentStatus) {
    const statuses = ['pending', 'preparing', 'ready', 'completed'];
    const currentIndex = statuses.indexOf(currentStatus);
    
    const steps = document.querySelectorAll('.status-step');
    steps.forEach((step, index) => {
        step.classList.remove('completed', 'current');
        
        if (index < currentIndex) {
            step.classList.add('completed');
        } else if (index === currentIndex) {
            step.classList.add('current');
        }
    });
}

// Format status text
function formatStatus(status) {
    const statusMap = {
        'pending': 'Pending',
        'preparing': 'Preparing',
        'ready': 'Ready for Pickup/Delivery',
        'completed': 'Completed',
        'cancelled': 'Cancelled'
    };
    return statusMap[status] || status;
}
