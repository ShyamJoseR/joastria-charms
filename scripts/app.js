// Product data
const productData = {
    '1': { id: 1, name: "Pink Silk Scrunchie", price: 15.00, image: "https://placehold.co/400x400/F4CBE7/B88E5E?text=Product+1" },
    '2': { id: 2, name: "Classic Scrunchie", price: 12.50, image: "https://placehold.co/400x400/F4CBE7/B88E5E?text=Product+2" },
    '3': { id: 3, name: "Mint Scrunchie", price: 15.00, image: "https://placehold.co/400x400/F4CBE7/B88E5E?text=Product+3" },
    '4': { id: 4, name: "Ocean Blue Scrunchie", price: 18.00, image: "https://placehold.co/400x400/F4CBE7/B88E5E?text=Product+4" },
    '5': { id: 5, name: "Crimson Scrunchie", price: 15.00, image: "https://placehold.co/400x400/F4CBE7/B88E5E?text=Product+5" },
    '6': { id: 6, name: "Golden Scrunchie", price: 19.50, image: "https://placehold.co/400x400/F4CBE7/B88E5E?text=Product+6" },
    '7': { id: 7, name: "Lavender Scrunchie", price: 16.00, image: "https://placehold.co/400x400/F4CBE7/B88E5E?text=Product+7" },
    '8': { id: 8, name: "Emerald Scrunchie", price: 17.50, image: "https://placehold.co/400x400/F4CBE7/B88E5E?text=Product+8" },
    '9': { id: 9, name: "Linen Headband", price: 22.00, image: "https://placehold.co/400x400/E8D2C6/B88E5E?text=Product+A" },
    '10': { id: 10, name: "Patterned Band", price: 25.00, image: "https://placehold.co/400x400/E8D2C6/B88E5E?text=Product+B" },
    '11': { id: 11, name: "Wide Silk Band", price: 28.00, image: "https://placehold.co/400x400/E8D2C6/B88E5E?text=Product+C" },
    '12': { id: 12, name: "Turban Headband", price: 30.00, image: "https://placehold.co/400x400/E8D2C6/B88E5E?text=Product+D" },
    '13': { id: 13, name: "Ribbon Hair Bow", price: 18.00, image: "https://placehold.co/400x400/CFB8D8/B88E5E?text=Product+I" },
    '14': { id: 14, name: "Satin Bow Set", price: 25.00, image: "https://placehold.co/400x400/CFB8D8/B88E5E?text=Product+J" },
    '15': { id: 15, name: "Embroidered Pouch", price: 35.00, image: "https://placehold.co/400x400/D4B891/B88E5E?text=Product+X" },
    '16': { id: 16, name: "Floral Embroidery Kit", price: 42.00, image: "https://placehold.co/400x400/D4B891/B88E5E?text=Product+Y" },
};

let wishlist = [];
let cart = [];

// Initialize state from localStorage
function initStore() {
    try {
        const storedCart = localStorage.getItem('cart');
        const storedWishlist = localStorage.getItem('wishlist');
        cart = storedCart ? JSON.parse(storedCart) : [];
        wishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        cart = [];
        wishlist = [];
    }
}

// Save state to localStorage
function saveState() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Modal functions
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        if (modalId === 'cart-modal') renderCart();
        if (modalId === 'wishlist-modal') renderWishlist();
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Wishlist functions
function renderWishlist() {
    const container = document.getElementById('wishlist-items');
    const emptyMessage = document.getElementById('empty-wishlist-message');
    container.innerHTML = '';

    if (wishlist.length === 0) {
        emptyMessage.classList.remove('hidden');
    } else {
        emptyMessage.classList.add('hidden');
        wishlist.forEach(item => {
            const itemHtml = createWishlistItemHtml(item);
            container.insertAdjacentHTML('beforeend', itemHtml);
        });
    }
}

function addToWishlist(product) {
    if (!wishlist.some(item => item.id === product.id)) {
        wishlist.push(product);
        saveState();
    }
}

function removeFromWishlist(productId) {
    wishlist = wishlist.filter(item => item.id !== productId);
    saveState();
    renderWishlist();
}

// Cart functions
function renderCart() {
    const container = document.getElementById('cart-items');
    const emptyMessage = document.getElementById('empty-cart-message');
    container.innerHTML = '';

    if (cart.length === 0) {
        emptyMessage.classList.remove('hidden');
    } else {
        emptyMessage.classList.add('hidden');
        cart.forEach(item => {
            const itemHtml = createCartItemHtml(item);
            container.insertAdjacentHTML('beforeend', itemHtml);
        });
    }
}

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveState();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveState();
    renderCart();
}

// Button toggle functions
function toggleWishlist(buttonElement) {
    const productCard = buttonElement.closest('.p-4');
    const productId = productCard.dataset.productId;
    const product = productData[productId];

    if (wishlist.some(item => item.id === product.id)) {
        removeFromWishlist(product.id);
    } else {
        addToWishlist(product);
    }

    const icon = buttonElement.querySelector('i');
    if (icon) {
        icon.classList.toggle('fas');
        icon.classList.toggle('far');
    }
}

function toggleCart(buttonElement) {
    const productCard = buttonElement.closest('.p-4');
    const productId = productCard.dataset.productId;
    const product = productData[productId];

    addToCart(product);
    
    const icon = buttonElement.querySelector('i');
    if (icon) {
        icon.classList.remove('far');
        icon.classList.add('fas');
    }
}

// Image modal functions
function showImageModal(src) {
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    modalImage.src = src;
    modal.classList.remove('hidden');
}

function hideImageModal() {
    const modal = document.getElementById('image-modal');
    modal.classList.add('hidden');
}

// Contact form function
function sendContactEmail() {
    const phoneNumber = document.getElementById('contact-phone').value;
    const message = document.getElementById('contact-message').value;
    const subject = "Inquiry about my JoAstria Charms Wishlist and Cart";

    const wishlistItems = wishlist.length > 0 
        ? wishlist.map(item => `${item.name} - $${item.price}`).join('\n')
        : 'No items in wishlist';

    const cartItems = cart.length > 0
        ? cart.map(item => `${item.name} (Quantity: ${item.quantity}) - $${item.price * item.quantity}`).join('\n')
        : 'No items in cart';

    let body = `Hello JoAstria Charms,\n\nI would like to inquire about the following items from my wishlist and shopping cart.`;
    
    if (phoneNumber) {
        body += `\n\nYou can reach me at: ${phoneNumber}`;
    }

    if (message) {
        body += `\n\nAdditional message:\n${message}`;
    }

    body += `\n\n--- Wishlist Items ---\n${wishlistItems}\n\n--- Cart Items ---\n${cartItems}\n\nI look forward to hearing from you.\n\nBest regards,`;

    const mailtoUrl = `mailto:joastrianna@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    hideModal('contact-modal');
}

// Initialize on page load
window.onload = function() {
    initStore();
    
    // Add event listener to close image modal when clicking outside
    document.getElementById('image-modal').addEventListener('click', function(event) {
        if (event.target === this) {
            hideImageModal();
        }
    });
};
