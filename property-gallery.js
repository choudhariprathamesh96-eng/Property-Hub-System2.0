// ==========================================
// Property Hub System
// Property Gallery JavaScript
// ==========================================

console.log("Property Gallery Loaded");

// ==========================================
// Property Images
// ==========================================

const images = [
    "../../assets/images/apartment1.png",
    "../../assets/images/apartment2.png",
    "../../assets/images/apartment3.png",
    "../../assets/images/apartment4.png",
    "../../assets/images/apartment5.png"
];

// ==========================================
// Current Image
// ==========================================

let currentIndex = 0;

const mainImage = document.getElementById("mainImage");
const thumbnailContainer = document.getElementById("thumbnailContainer");
const lightbox = document.getElementById("lightbox");
const previewImage = document.getElementById("previewImage");

// ==========================================
// Load Property
// ==========================================

let property = JSON.parse(localStorage.getItem("selectedProperty"));

if (!property) {

    property = {
        title: "Luxury Apartment",
        price: "25000",
        city: "Pune",
        bedrooms: "3",
        bathrooms: "2",
        area: "1450"
    };

}

// ==========================================
// Display Property
// ==========================================

document.getElementById("propertyTitle").textContent = property.title;
document.getElementById("propertyPrice").textContent = "₹" + property.price + " / Month";
document.getElementById("propertyLocation").textContent = property.city;
document.getElementById("bedrooms").textContent = property.bedrooms + " Bedrooms";
document.getElementById("bathrooms").textContent = property.bathrooms + " Bathrooms";
document.getElementById("area").textContent = property.area + " Sq.ft";

// ==========================================
// Show Image
// ==========================================

function showImage(index) {

    currentIndex = index;

    mainImage.src = images[index];

    document.querySelectorAll(".thumbnail").forEach((thumb, i) => {

        thumb.classList.toggle("active", i === index);

    });

}

// ==========================================
// Create Thumbnails
// ==========================================

images.forEach((image, index) => {

    const div = document.createElement("div");

    div.className = "thumbnail";

    div.innerHTML = `<img src="${image}" alt="Thumbnail">`;

    div.onclick = () => showImage(index);

    thumbnailContainer.appendChild(div);

});

showImage(0);

// ==========================================
// Next Image
// ==========================================

function nextImage() {

    currentIndex++;

    if (currentIndex >= images.length) {

        currentIndex = 0;

    }

    showImage(currentIndex);

}

// ==========================================
// Previous Image
// ==========================================

function previousImage() {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = images.length - 1;

    }

    showImage(currentIndex);

}

// ==========================================
// Auto Slider
// ==========================================

let autoSlide = setInterval(() => {

    nextImage();

}, 3000);

// Pause slider on hover

mainImage.addEventListener("mouseenter", () => {

    clearInterval(autoSlide);

});

mainImage.addEventListener("mouseleave", () => {

    autoSlide = setInterval(() => {

        nextImage();

    }, 3000);

});

// ==========================================
// Keyboard Navigation
// ==========================================

document.addEventListener("keydown", (e) => {

    if (e.key === "ArrowRight") {

        nextImage();

    }

    if (e.key === "ArrowLeft") {

        previousImage();

    }

});

// ==========================================
// Full Screen Preview
// ==========================================

mainImage.addEventListener("click", () => {

    previewImage.src = mainImage.src;

    lightbox.style.display = "flex";

});

function closePreview() {

    lightbox.style.display = "none";

}

// Close when clicking outside image

lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {

        closePreview();

    }

});

// ==========================================
// Wishlist
// ==========================================

const wishlistBtn = document.getElementById("wishlistBtn");

wishlistBtn.addEventListener("click", () => {

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.some(item => item.title === property.title);

    if (!exists) {

        wishlist.push(property);

        localStorage.setItem("wishlist", JSON.stringify(wishlist));

        wishlistBtn.innerHTML = `
            <i class="fa-solid fa-heart"></i>
            Added to Wishlist
        `;

        wishlistBtn.style.background = "#198754";

    } else {

        alert("Property is already in your wishlist.");

    }

});

// ==========================================
// Share Property
// ==========================================

document.getElementById("shareBtn").addEventListener("click", async () => {

    try {

        if (navigator.share) {

            await navigator.share({

                title: property.title,
                text: "Check out this property on Property Hub!",
                url: window.location.href

            });

        } else {

            await navigator.clipboard.writeText(window.location.href);

            alert("Property link copied successfully!");

        }

    } catch (err) {

        console.log(err);

    }

});

console.log("Gallery Loaded Successfully");