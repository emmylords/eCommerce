const cartIcon = document.querySelector('.cart-icon');
const cartDropdown = document.getElementById('cart-dropdown');
const mainImage = document.getElementById('main-product-image');
const thumbnails = document.querySelectorAll('.thumbnail');
const quantityElement = document.getElementById('quantity');
const decrementBtn = document.getElementById('decrement');
const incrementBtn = document.getElementById('increment');
const addToCartBtn = document.getElementById('add-to-cart');
const cartContent = document.getElementById('cart-content');
const cartQuantityBadge = document.querySelector('.cart-quantity-badge');
const emptyCartMessage = document.querySelector('.empty-cart-message');

const lightbox = document.getElementById('lightbox');
const mainImageContainer = document.querySelector('.main-image-container');
const closeLightboxBtn = document.querySelector('.close-lightbox');
const lightboxMainImage = document.getElementById('lightbox-main-image');
const lightboxThumbnails = document.querySelectorAll('.lightbox-thumbnail');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentQuantity = 0;
let cartItems = 0;
const product = {
    name: 'Fall Limited Edition Sneakers',
    price: 125.00,
    thumbnail: 'image-product-1-thumbnail.jpg'
};

// Toggle cart dropdown visibility
cartIcon.addEventListener('click', () => {
    cartDropdown.classList.toggle('hidden');
    updateCartDropdown();
});

// Update product image from thumbnails
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        const newImageSrc = thumbnail.dataset.image;
        mainImage.src = newImageSrc;
        
        thumbnails.forEach(t => t.classList.remove('active'));
        thumbnail.classList.add('active');
    });
});

// Quantity selector functionality
incrementBtn.addEventListener('click', () => {
    currentQuantity++;
    quantityElement.textContent = currentQuantity;
});

decrementBtn.addEventListener('click', () => {
    if (currentQuantity > 0) {
        currentQuantity--;
        quantityElement.textContent = currentQuantity;
    }
});

// Add to cart functionality
addToCartBtn.addEventListener('click', () => {
    if (currentQuantity > 0) {
        cartItems += currentQuantity;
        cartQuantityBadge.textContent = cartItems;
        cartQuantityBadge.classList.remove('hidden');
        updateCartDropdown();
        currentQuantity = 0;
        quantityElement.textContent = 0;
    }
});

// Update cart dropdown UI
function updateCartDropdown() {
    if (cartItems === 0) {
        cartContent.innerHTML = '<p class="empty-cart-message">Your cart is empty.</p>';
    } else {
        const total = (product.price * cartItems).toFixed(2);
        cartContent.innerHTML = `
            <div class="cart-item">
                <img src="${product.thumbnail}" alt="${product.name}" class="cart-item-thumbnail">
                <div class="cart-item-details">
                    <p>${product.name}</p>
                    <p>$${product.price.toFixed(2)} x ${cartItems} <span class="total-price">$${total}</span></p>
                </div>
                <img src="icon-delete.svg" alt="Delete" class="delete-icon">
            </div>
            <button class="checkout-btn">Checkout</button>
        `;

        // Add event listener for delete icon
        const deleteIcon = cartContent.querySelector('.delete-icon');
        deleteIcon.addEventListener('click', () => {
            cartItems = 0;
            cartQuantityBadge.classList.add('hidden');
            updateCartDropdown();
        });
    }
}

// Lightbox functionality
mainImageContainer.addEventListener('click', () => {
    lightbox.classList.remove('hidden');
    // Sync lightbox image with main image
    lightboxMainImage.src = mainImage.src;
    // Sync lightbox thumbnails with current active thumbnail
    lightboxThumbnails.forEach(t => {
        t.classList.remove('active');
        if (t.dataset.image === mainImage.src.split('/').pop()) {
            t.classList.add('active');
        }
    });
});

closeLightboxBtn.addEventListener('click', () => {
    lightbox.classList.add('hidden');
});

lightboxThumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        const newImageSrc = thumbnail.dataset.image;
        lightboxMainImage.src = newImageSrc;
        lightboxThumbnails.forEach(t => t.classList.remove('active'));
        thumbnail.classList.add('active');
    });
});

// Navigate images with previous/next buttons
let currentImageIndex = 1;
const totalImages = 4;
prevBtn.addEventListener('click', () => {
    currentImageIndex = currentImageIndex > 1 ? currentImageIndex - 1 : totalImages;
    lightboxMainImage.src = `image-product-${currentImageIndex}.jpg`;
    updateLightboxThumbnails();
});

nextBtn.addEventListener('click', () => {
    currentImageIndex = currentImageIndex < totalImages ? currentImageIndex + 1 : 1;
    lightboxMainImage.src = `image-product-${currentImageIndex}.jpg`;
    updateLightboxThumbnails();
});

function updateLightboxThumbnails() {
    lightboxThumbnails.forEach(t => {
        t.classList.remove('active');
        if (t.dataset.image === `image-product-${currentImageIndex}.jpg`) {
            t.classList.add('active');
        }
    });
}