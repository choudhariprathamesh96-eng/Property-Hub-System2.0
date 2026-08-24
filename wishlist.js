// ==========================================
// Property Hub System
// Wishlist JavaScript
// ==========================================

console.log("Wishlist Loaded");

// Get Wishlist
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// Elements
const wishlistContainer = document.getElementById("wishlistContainer");
const wishlistCount = document.getElementById("wishlistCount");
const emptyWishlist = document.getElementById("emptyWishlist");

// ==========================================
// Fix Image Path
// ==========================================

function getImagePath(image) {

    if (!image) {
        return "../../assets/images/apartment1.jpg"; // Default image if none provided
    }

    // Keep full URLs and data URLs unchanged
    if (
        image.startsWith("http://") ||
        image.startsWith("https://") ||
        image.startsWith("data:") ||
        image.startsWith("/")
    ) {
        return image;
    }

    // Remove old relative path
    let cleanPath = image.replace(/^(\.\.\/)+/, "");

    // If stored as assets/images/...
    if (cleanPath.startsWith("assets/")) {
        return "../../" + cleanPath;
    }

    // If stored as images/...
    if (cleanPath.startsWith("images/")) {
        return "../../assets/" + cleanPath;
    }

    // If only filename was stored
    if (!cleanPath.includes("/")) {
        return "../../assets/images/" + cleanPath;
    }

    return image;
}

// ==========================================
// Display Wishlist
// ==========================================

function displayWishlist() {

    wishlistContainer.innerHTML = "";

    wishlistCount.textContent = wishlist.length;

    if (wishlist.length === 0) {

        wishlistContainer.style.display = "none";
        emptyWishlist.style.display = "block";

        return;
    }

    wishlistContainer.style.display = "grid";
    emptyWishlist.style.display = "none";

    wishlist.forEach((property, index) => {

        const imagePath = getImagePath(property.image);

        wishlistContainer.innerHTML += `

        <div class="property-card">

            <img
                src="${imagePath}"
                alt="${property.title}"
                onerror="this.onerror=null; this.src='../../assets/images/default-property.jpg';"
            >

            <div class="card-content">

                <h3>${property.title}</h3>

                <div class="price">
                    ₹${property.price}
                </div>

                <div class="city">
                    <i class="fa-solid fa-location-dot"></i>
                    ${property.city}
                </div>

                <div class="details">

                    <div>
                        🛏 ${property.bedrooms || "-"} Beds
                    </div>

                    <div>
                        🛁 ${property.bathrooms || "-"} Baths
                    </div>

                    <div>
                        📐 ${property.area || "-"} Sq.ft
                    </div>

                    <div>
                        🚗 ${property.parking || "N/A"}
                    </div>

                </div>

                <div class="actions">

                    <a
                        href="property-detail.html"
                        class="view-btn">

                        View Details

                    </a>

                    <button
                        class="remove-btn"
                        onclick="removeWishlist(${index})">

                        Remove

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

// ==========================================
// Remove Property
// ==========================================

function removeWishlist(index) {

    if (confirm("Remove this property from Wishlist?")) {

        wishlist.splice(index, 1);

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

        displayWishlist();

    }

}

// ==========================================
// Add Property to Wishlist
// ==========================================

function addToWishlist(property) {

    const exists = wishlist.some(item =>
        item.title === property.title
    );

    if (exists) {

        alert("Property already exists in Wishlist.");
        return;

    }

    wishlist.push(property);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    alert("❤️ Property Added to Wishlist");

    displayWishlist();

}

// ==========================================
// Load Wishlist
// ==========================================

displayWishlist();