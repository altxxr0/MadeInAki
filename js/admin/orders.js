// BakedInAki - Admin Orders Management

// Protect page
if (!requireAuth()) {
    // Will redirect to login
}

document.addEventListener('DOMContentLoaded', () => {
    loadOrders();
});

// Load all orders
function loadOrders() {
    filterOrders();
}

// Filter orders
function filterOrders() {
    const statusFilter = document.getElementById('status-filter').value;
    const searchQuery = document.getElementById('search-input').value.toLowerCase();
    
    let orders = Orders.getOrders();
    
    // Filter by status
    if (statusFilter !== 'all') {
        orders = orders.filter(o => o.status === statusFilter);
    }
    
    // Filter by search
    if (searchQuery) {
        orders = orders.filter(o => 
            o.id.toLowerCase().includes(searchQuery) ||
            o.customer.name.toLowerCase().includes(searchQuery) ||
            o.customer.phone.includes(searchQuery)
        );
    }
    
    // Sort by date (newest first)
    orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    renderOrdersTable(orders);
}

// Render orders table
function renderOrdersTable(orders) {
    const tbody = document.getElementById('orders-table');
    const countEl = document.getElementById('order-count');
    
    countEl.textContent = `${orders.length} order(s)`;
    
    if (orders.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 2rem; color: #666;">
                    No orders found.
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = orders.map(order => `
        <tr>
            <td><strong>${order.id}</strong></td>
            <td>${order.customer.name}</td>
            <td>${order.customer.phone}</td>
            <td>${order.deliveryMethod === 'delivery' ? '🚗 Delivery' : '🏪 Pickup'}</td>
            <td>${formatPrice(order.total)}</td>
            <td>
                <select class="status-select" onchange="updateOrderStatus('${order.id}', this.value)" style="padding: 0.35rem; border-radius: 5px; border: 1px solid #ddd;">
                    <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>📝 Pending</option>
                    <option value="preparing" ${order.status === 'preparing' ? 'selected' : ''}>👨‍🍳 Preparing</option>
                    <option value="ready" ${order.status === 'ready' ? 'selected' : ''}>✅ Ready</option>
                    <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>🎉 Completed</option>
                    <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>❌ Cancelled</option>
                </select>
            </td>
            <td>${formatDateTime(order.createdAt)}</td>
            <td>
                <button class="action-btn btn-view" onclick="viewOrder('${order.id}')">View</button>
            </td>
        </tr>
    `).join('');
}

// Update order status
function updateOrderStatus(orderId, status) {
    Orders.updateStatus(orderId, status);
    showToast(`Order ${orderId} updated to ${status}`);
}

// View order details
function viewOrder(orderId) {
    const order = Orders.getOrderById(orderId);
    if (!order) return;
    
    document.getElementById('modal-order-id').textContent = order.id;
    
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <div class="order-detail-section">
            <h4>Customer Information</h4>
            <div class="detail-row">
                <span class="detail-label">Name</span>
                <span class="detail-value">${order.customer.name}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Phone</span>
                <span class="detail-value">${order.customer.phone}</span>
            </div>
            ${order.customer.email ? `
            <div class="detail-row">
                <span class="detail-label">Email</span>
                <span class="detail-value">${order.customer.email}</span>
            </div>
            ` : ''}
        </div>

        <div class="order-detail-section">
            <h4>Delivery Information</h4>
            <div class="detail-row">
                <span class="detail-label">Method</span>
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
        </div>

        ${order.notes ? `
        <div class="order-detail-section">
            <h4>Special Instructions</h4>
            <p style="background: #f5f5f5; padding: 1rem; border-radius: 8px;">${order.notes}</p>
        </div>
        ` : ''}

        <div class="order-detail-section">
            <h4>Items Ordered</h4>
            <div class="order-items-list">
                ${order.items.map(item => `
                    <div class="order-item-row">
                        <span>${item.image} ${item.name} × ${item.quantity}</span>
                        <span>${formatPrice(item.price * item.quantity)}</span>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="order-detail-section">
            <div class="detail-row">
                <span class="detail-label">Subtotal</span>
                <span class="detail-value">${formatPrice(order.subtotal)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Delivery Fee</span>
                <span class="detail-value">${order.deliveryFee > 0 ? formatPrice(order.deliveryFee) : 'FREE'}</span>
            </div>
            <div class="detail-row" style="font-size: 1.2rem; font-weight: bold; padding-top: 0.5rem; border-top: 2px solid #32CD32;">
                <span>Total</span>
                <span style="color: #32CD32;">${formatPrice(order.total)}</span>
            </div>
        </div>

        <div class="order-detail-section">
            <h4>Update Status</h4>
            <div class="status-update">
                <button class="status-btn ${order.status === 'pending' ? 'active' : ''}" onclick="quickUpdateStatus('${order.id}', 'pending')">📝 Pending</button>
                <button class="status-btn ${order.status === 'preparing' ? 'active' : ''}" onclick="quickUpdateStatus('${order.id}', 'preparing')">👨‍🍳 Preparing</button>
                <button class="status-btn ${order.status === 'ready' ? 'active' : ''}" onclick="quickUpdateStatus('${order.id}', 'ready')">✅ Ready</button>
                <button class="status-btn ${order.status === 'completed' ? 'active' : ''}" onclick="quickUpdateStatus('${order.id}', 'completed')">🎉 Completed</button>
                <button class="status-btn ${order.status === 'cancelled' ? 'active' : ''}" onclick="quickUpdateStatus('${order.id}', 'cancelled')">❌ Cancelled</button>
            </div>
        </div>

        <div class="order-detail-section" style="color: #666; font-size: 0.9rem;">
            <p>Order placed: ${formatDate(order.createdAt)}</p>
            ${order.updatedAt ? `<p>Last updated: ${formatDate(order.updatedAt)}</p>` : ''}
        </div>
    `;
    
    document.getElementById('order-modal').classList.add('open');
}

// Quick update status from modal
function quickUpdateStatus(orderId, status) {
    Orders.updateStatus(orderId, status);
    viewOrder(orderId); // Refresh modal
    filterOrders(); // Refresh table
    showToast(`Order ${orderId} updated to ${status}`);
}

// Close modal
function closeModal() {
    document.getElementById('order-modal').classList.remove('open');
}

// Format date time
function formatDateTime(dateString) {
    const options = { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-PH', options);
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
