// BakedInAki - Product Data
// Sample products for the bakery

const PRODUCTS = [
    // Breads
    {
        id: 1,
        name: "Pandesal",
        description: "Classic Filipino bread roll, soft and fluffy. Perfect for breakfast!",
        price: 5,
        category: "breads",
        image: "🥖",
        available: true
    },
    {
        id: 2,
        name: "Spanish Bread",
        description: "Sweet rolled bread with buttery sugar filling",
        price: 12,
        category: "breads",
        image: "🍞",
        available: true
    },
    {
        id: 3,
        name: "Ensaymada",
        description: "Soft brioche-style bread topped with butter and sugar",
        price: 25,
        category: "breads",
        image: "🧈",
        available: true
    },
    {
        id: 4,
        name: "Cheese Bread",
        description: "Savory bread filled with melted cheese",
        price: 20,
        category: "breads",
        image: "🧀",
        available: true
    },
    {
        id: 5,
        name: "Ube Pandesal",
        description: "Purple yam flavored pandesal, uniquely Filipino!",
        price: 10,
        category: "breads",
        image: "🟣",
        available: true
    },
    {
        id: 6,
        name: "Monay",
        description: "Dense, slightly sweet traditional Filipino bread",
        price: 8,
        category: "breads",
        image: "🥯",
        available: true
    },

    // Cakes
    {
        id: 7,
        name: "Ube Cake (Whole)",
        description: "Rich purple yam cake with creamy ube frosting",
        price: 450,
        category: "cakes",
        image: "🎂",
        available: true
    },
    {
        id: 8,
        name: "Chocolate Cake (Whole)",
        description: "Moist chocolate cake with chocolate ganache",
        price: 500,
        category: "cakes",
        image: "🍫",
        available: true
    },
    {
        id: 9,
        name: "Mango Cake (Whole)",
        description: "Light chiffon cake layered with fresh mangoes",
        price: 550,
        category: "cakes",
        image: "🥭",
        available: true
    },
    {
        id: 10,
        name: "Cake Slice - Ube",
        description: "Single slice of our famous ube cake",
        price: 65,
        category: "cakes",
        image: "🍰",
        available: true
    },
    {
        id: 11,
        name: "Cake Slice - Chocolate",
        description: "Single slice of rich chocolate cake",
        price: 70,
        category: "cakes",
        image: "🍰",
        available: true
    },
    {
        id: 12,
        name: "Cheesecake Slice",
        description: "Creamy New York style cheesecake",
        price: 85,
        category: "cakes",
        image: "🧁",
        available: true
    },

    // Pastries
    {
        id: 13,
        name: "Egg Pie",
        description: "Classic Filipino custard pie with flaky crust",
        price: 35,
        category: "pastries",
        image: "🥧",
        available: true
    },
    {
        id: 14,
        name: "Buko Pie",
        description: "Young coconut pie, a Filipino favorite",
        price: 150,
        category: "pastries",
        image: "🥥",
        available: true
    },
    {
        id: 15,
        name: "Empanada",
        description: "Savory meat-filled pastry",
        price: 25,
        category: "pastries",
        image: "🥟",
        available: true
    },
    {
        id: 16,
        name: "Hopia - Ube",
        description: "Flaky pastry filled with sweet ube",
        price: 18,
        category: "pastries",
        image: "🟣",
        available: true
    },
    {
        id: 17,
        name: "Hopia - Monggo",
        description: "Flaky pastry filled with mung bean",
        price: 18,
        category: "pastries",
        image: "🟢",
        available: true
    },
    {
        id: 18,
        name: "Siopao - Asado",
        description: "Steamed bun with sweet pork filling",
        price: 35,
        category: "pastries",
        image: "🥟",
        available: true
    },

    // Cookies & Snacks
    {
        id: 19,
        name: "Polvoron",
        description: "Powdery shortbread cookies, melt in your mouth",
        price: 10,
        category: "cookies",
        image: "🍪",
        available: true
    },
    {
        id: 20,
        name: "Otap",
        description: "Crispy oval-shaped puff pastry",
        price: 15,
        category: "cookies",
        image: "🥨",
        available: true
    },
    {
        id: 21,
        name: "Uraro",
        description: "Delicate arrowroot cookies",
        price: 12,
        category: "cookies",
        image: "⚪",
        available: true
    },
    {
        id: 22,
        name: "Choco Chip Cookies",
        description: "Classic chocolate chip cookies, soft and chewy",
        price: 25,
        category: "cookies",
        image: "🍪",
        available: true
    },
    {
        id: 23,
        name: "Brownies",
        description: "Fudgy chocolate brownies",
        price: 35,
        category: "cookies",
        image: "🟫",
        available: true
    },
    {
        id: 24,
        name: "Cupcake",
        description: "Vanilla cupcake with buttercream frosting",
        price: 40,
        category: "cookies",
        image: "🧁",
        available: true
    },

    // Signature Items
    {
        id: 25,
        name: "Cheese Matcha Bliss Bites",
        description: "Our signature creation! Creamy cheese meets earthy matcha in perfectly portioned bliss bites. A unique BakedInAki exclusive!",
        price: 45,
        category: "signature",
        image: "🍵",
        available: true,
        featured: true,
        badge: "Signature"
    },
    {
        id: 26,
        name: "Ube Cheese Pandesal",
        description: "Best of both worlds - purple yam pandesal stuffed with creamy cheese",
        price: 15,
        category: "signature",
        image: "🟣",
        available: true,
        featured: true,
        badge: "New"
    },
    {
        id: 27,
        name: "Matcha Ensaymada",
        description: "Classic ensaymada with a matcha twist, topped with butter and sugar",
        price: 35,
        category: "signature",
        image: "🍵",
        available: true,
        badge: "New"
    },
    {
        id: 28,
        name: "Cheese Rolls (6pcs)",
        description: "Soft bread rolls filled with creamy cheese, perfect for merienda",
        price: 60,
        category: "breads",
        image: "🧀",
        available: true
    },
    {
        id: 29,
        name: "Banana Bread Loaf",
        description: "Moist and flavorful banana bread made with ripe saba bananas",
        price: 120,
        category: "breads",
        image: "🍌",
        available: true
    },
    {
        id: 30,
        name: "Red Velvet Cake (Whole)",
        description: "Rich red velvet cake with cream cheese frosting",
        price: 650,
        category: "cakes",
        image: "❤️",
        available: true
    },
    {
        id: 31,
        name: "Leche Flan",
        description: "Classic Filipino caramel custard, creamy and smooth",
        price: 150,
        category: "pastries",
        image: "🍮",
        available: true
    },
    {
        id: 32,
        name: "Brazo de Mercedes",
        description: "Soft meringue roll filled with rich custard",
        price: 180,
        category: "pastries",
        image: "🥮",
        available: true
    }
];

// Initialize products in localStorage if not exists
function initializeProducts() {
    if (!localStorage.getItem('bakery_products')) {
        localStorage.setItem('bakery_products', JSON.stringify(PRODUCTS));
    }
}

// Get all products
function getProducts() {
    initializeProducts();
    return JSON.parse(localStorage.getItem('bakery_products'));
}

// Get product by ID
function getProductById(id) {
    const products = getProducts();
    return products.find(p => p.id === parseInt(id));
}

// Get products by category
function getProductsByCategory(category) {
    const products = getProducts();
    if (category === 'all') return products.filter(p => p.available);
    return products.filter(p => p.category === category && p.available);
}

// Get featured products
function getFeaturedProducts() {
    const products = getProducts();
    return products.filter(p => p.featured && p.available);
}

// Get signature products
function getSignatureProducts() {
    const products = getProducts();
    return products.filter(p => p.category === 'signature' && p.available);
}

// Save products (for admin)
function saveProducts(products) {
    localStorage.setItem('bakery_products', JSON.stringify(products));
}

// Add new product (for admin)
function addProduct(product) {
    const products = getProducts();
    product.id = Math.max(...products.map(p => p.id)) + 1;
    products.push(product);
    saveProducts(products);
    return product;
}

// Update product (for admin)
function updateProduct(id, updatedProduct) {
    const products = getProducts();
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        saveProducts(products);
        return products[index];
    }
    return null;
}

// Delete product (for admin)
function deleteProduct(id) {
    const products = getProducts();
    const filtered = products.filter(p => p.id !== parseInt(id));
    saveProducts(filtered);
}
