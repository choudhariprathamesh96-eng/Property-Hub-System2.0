// ==========================================
// Property Hub - Customer Home
// home.js
// ==========================================

console.log("Home Page Loaded");

// ==========================================
// API
// ==========================================

// LOCAL TESTING
const API_URL = "http://localhost:8080/properties";


// ==========================================
// Load Properties
// ==========================================

async function loadProperties() {

    const container =
        document.getElementById("propertyContainer");

    if (!container) {
        console.error("propertyContainer not found");
        return;
    }

    try {

        console.log("Loading properties from:", API_URL);

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(
                "API Error: " + response.status
            );
        }

        const properties = await response.json();

        console.log("Loaded properties:", properties);

        // Clear existing cards
        container.innerHTML = "";

        // ==========================================
        // No properties
        // ==========================================

        if (
            !Array.isArray(properties) ||
            properties.length === 0
        ) {

            container.innerHTML = `
                <div class="no-properties">
                    <h2>No Properties Available</h2>
                    <p>No properties have been added yet.</p>
                </div>
            `;

            return;
        }


        // ==========================================
        // Show ONLY loaded properties
        // ==========================================

        properties.forEach(property => {

            const card =
                document.createElement("div");

            card.className = "property-card";

            const image =
                property.image &&
                property.image.trim() !== ""
                    ? property.image
                    : "apartment1.png";

            const title =
                property.title || "Untitled Property";

            const type =
                property.type || "Property";

            const location =
                property.location || "Location unavailable";

            const bedrooms =
                property.bedrooms ?? 0;

            const bathrooms =
                property.bathrooms ?? 0;

            const area =
                property.area ?? 0;

            const price =
                Number(property.price || 0);


            card.innerHTML = `

                <div class="property-image-wrapper">

                    <span class="property-status">
                        ${type}
                    </span>

                    <button
                        type="button"
                        class="wishlist-btn"
                        onclick="addToWishlist(${property.id})"
                        title="Add to Wishlist"
                    >
                        <i class="fa-solid fa-heart"></i>
                    </button>

                    <img
                        src="${image}"
                        alt="${title}"
                        class="property-image"
                        onerror="
                            this.onerror=null;
                            this.src='apartment1.png';
                        "
                    >

                </div>


                <div class="property-content">

                    <h3>
                        ${title}
                    </h3>

                    <p class="location">

                        <i class="fa-solid fa-location-dot"></i>

                        ${location}

                    </p>


                    <div class="property-info">

                        <span>
                            <i class="fa-solid fa-bed"></i>
                            ${bedrooms} BHK
                        </span>

                        <span>
                            <i class="fa-solid fa-bath"></i>
                            ${bathrooms} Bath
                        </span>

                        <span>
                            <i class="fa-solid fa-ruler-combined"></i>
                            ${area} Sq.ft
                        </span>

                    </div>


                    <h2 class="price">

                        ₹${price.toLocaleString("en-IN")}

                        <span>
                            / Month
                        </span>

                    </h2>


                    <div class="property-buttons">

                        <button
                            type="button"
                            class="details-btn"
                            onclick="viewProperty(${property.id})"
                        >

                            <i class="fa-solid fa-eye"></i>

                            View Details

                        </button>

                    </div>


                    <button
                        type="button"
                        class="contact-btn"
                        onclick="contactOwner(${property.id})"
                    >

                        <i class="fa-solid fa-phone"></i>

                        Contact Owner

                    </button>

                </div>

            `;

            container.appendChild(card);

        });

    }

    catch (error) {

        console.error(
            "Unable to load properties:",
            error
        );

        container.innerHTML = `
            <div class="no-properties">

                <h2>
                    Unable to Load Properties
                </h2>

                <p>
                    Please make sure the Spring Boot
                    backend is running.
                </p>

            </div>
        `;

    }

}


// ==========================================
// View Property
// ==========================================

function viewProperty(id) {

    if (!id) {
        return;
    }

    window.location.href =
        `property-detail.html?id=${encodeURIComponent(id)}`;

}


// ==========================================
// Contact Owner
// ==========================================

function contactOwner(id) {

    if (!id) {
        return;
    }

    window.location.href =
        `contact-owner.html?propertyId=${encodeURIComponent(id)}`;

}


// ==========================================
// Wishlist
// ==========================================

function addToWishlist(id) {

    if (!id) {
        return;
    }

    let wishlist = [];

    try {

        wishlist =
            JSON.parse(
                localStorage.getItem("wishlist")
            ) || [];

    }
    catch (error) {

        wishlist = [];

    }

    const propertyId = Number(id);

    if (!wishlist.includes(propertyId)) {

        wishlist.push(propertyId);

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

        alert("❤️ Property added to wishlist!");

    }
    else {

        alert(
            "Property is already in your wishlist."
        );

    }

}


// ==========================================
// Start
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    loadProperties
);
