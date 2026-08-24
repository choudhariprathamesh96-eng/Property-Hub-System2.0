// ==========================================
// Property Hub - Customer Home
// home.js
// ==========================================

console.log("Home Page Loaded");

// ==========================================
// API
// ==========================================

// IMPORTANT:
// Put your DEPLOYED Spring Boot backend URL here.
// Do NOT put your Netlify frontend URL here.
// Do NOT use localhost for the deployed Netlify website.

const API_URL = "YOUR_SPRING_BOOT_BACKEND_URL/properties";

// ==========================================
// Load Properties
// ==========================================

function loadProperties() {

    fetch(API_URL)

        .then(response => {

            if (!response.ok) {
                throw new Error(
                    "API Error: " + response.status
                );
            }

            return response.json();
        })

        .then(properties => {

            console.log(
                "Properties received from API:",
                properties
            );

            const container =
                document.getElementById("propertyContainer");

            if (!container) {
                console.error(
                    "propertyContainer not found in HTML"
                );
                return;
            }

            container.innerHTML = "";

            if (!properties || properties.length === 0) {

                container.innerHTML = `
                    <div style="
                        width:100%;
                        text-align:center;
                        padding:40px;
                    ">
                        <h2>No Properties Available</h2>
                        <p>Please check again later.</p>
                    </div>
                `;

                return;
            }

            // ==========================================
            // Create Property Cards
            // ==========================================

            properties.forEach(property => {

                const card =
                    document.createElement("div");

                card.className = "property-card";

                card.innerHTML = `

                    <div class="property-image-wrapper">

                        <span class="property-status">
                            ${property.type || "Property"}
                        </span>

                        <button
                            class="wishlist-btn"
                            onclick="addToWishlist(${property.id})"
                            title="Add to Wishlist">

                            <i class="fa-solid fa-heart"></i>

                        </button>

                        <img
                            src="${property.image || 'apartment1.png'}"
                            alt="${property.title || 'Property'}"
                            class="property-image"
                            onerror="this.src='apartment1.png'">

                    </div>

                    <div class="property-content">

                        <h3>
                            ${property.title || "Untitled Property"}
                        </h3>

                        <p class="location">

                            <i class="fa-solid fa-location-dot"></i>

                            ${property.location || "Location unavailable"}

                        </p>

                        <div class="property-info">

                            <span>
                                <i class="fa-solid fa-bed"></i>
                                ${property.bedrooms || 0} BHK
                            </span>

                            <span>
                                <i class="fa-solid fa-bath"></i>
                                ${property.bathrooms || 0} Bath
                            </span>

                            <span>
                                <i class="fa-solid fa-ruler-combined"></i>
                                ${property.area || 0} Sq.ft
                            </span>

                        </div>

                        <h2 class="price">

                            ₹${Number(property.price || 0)
                                .toLocaleString("en-IN")}

                            <span>/ Month</span>

                        </h2>

                        <div class="property-buttons">

                            <button
                                class="details-btn"
                                onclick="viewProperty(${property.id})">

                                <i class="fa-solid fa-eye"></i>

                                View Details

                            </button>

                        </div>

                        <button
                            class="contact-btn"
                            onclick="contactOwner(${property.id})">

                            <i class="fa-solid fa-phone"></i>

                            Contact Owner

                        </button>

                    </div>

                `;

                container.appendChild(card);

            });

        })

        .catch(error => {

            console.error(
                "Unable to load properties:",
                error
            );

            const container =
                document.getElementById("propertyContainer");

            if (container) {

                container.innerHTML = `

                    <div style="
                        width:100%;
                        text-align:center;
                        padding:50px;
                    ">

                        <h2 style="color:red;">
                            Unable to load properties
                        </h2>

                        <p>
                            Unable to connect to the
                            Property Hub server.
                        </p>

                    </div>

                `;
            }

        });
}


// ==========================================
// View Property Details
// ==========================================

function viewProperty(id) {

    window.location.href =
        `../Customer/property-detail.html?id=${id}`;

}


// ==========================================
// Contact Owner
// ==========================================

function contactOwner(id) {

    window.location.href =
        `../Customer/contact-owner.html?propertyId=${id}`;

}


// ==========================================
// Wishlist
// ==========================================

function addToWishlist(id) {

    let wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];

    if (!wishlist.includes(id)) {

        wishlist.push(id);

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

        alert("❤️ Property added to wishlist!");

    } else {

        alert("Property is already in your wishlist.");

    }

}


// ==========================================
// Start
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    loadProperties
);
