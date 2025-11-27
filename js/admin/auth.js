// BakedInAki - Admin Authentication

// Default credentials
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'bakedaki2024'
};

// Check if user is logged in
function isLoggedIn() {
    return sessionStorage.getItem('admin_logged_in') === 'true';
}

// Login
function login(username, password) {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        sessionStorage.setItem('admin_logged_in', 'true');
        sessionStorage.setItem('admin_user', username);
        return true;
    }
    return false;
}

// Logout
function logout() {
    sessionStorage.removeItem('admin_logged_in');
    sessionStorage.removeItem('admin_user');
    window.location.href = 'login.html';
}

// Protect admin pages
function requireAuth() {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Login form handler
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        // If already logged in, redirect to dashboard
        if (isLoggedIn()) {
            window.location.href = 'dashboard.html';
            return;
        }
        
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorEl = document.getElementById('login-error');
            
            if (login(username, password)) {
                window.location.href = 'dashboard.html';
            } else {
                errorEl.style.display = 'block';
                setTimeout(() => {
                    errorEl.style.display = 'none';
                }, 3000);
            }
        });
    }
});
