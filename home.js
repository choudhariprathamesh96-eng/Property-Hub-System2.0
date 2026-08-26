// ==========================================
// Property Hub - Customer Home
// home.js
// ==========================================

console.log("Home Page Loaded");

// ==========================================
// API CONFIGURATION
// ==========================================

// IMPORTANT:
// Replace this with your DEPLOYED Spring Boot backend URL.
//
// Example:
// const API_URL = "https://your-backend.onrender.com/properties";
//
// DO NOT use:
// http://localhost:8080/properties
//
// DO NOT use your Netlify frontend URL.

const API_URL = "http://localhost:8080/properties";


// ==========================================
// Load Properties
// ==========================================

function loadProperties() {

    console.log("Loading properties from:", API_URL);

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
                    "ERROR: propertyContainer not found in HTML."
                );

                return;
            }

            // Clear old properties
            container.innerHTML = "";


            // ==========================================
            // No Properties
            // ==========================================

            if (
                !properties ||
                !Array.isArray(properties) ||
                properties.length === 0
            ) {

                container.innerHTML = `
                    <div style="
                        width:100%;
                        text-align:center;
                        padding:40px;
                    ">

                        <h2>No Properties Available</h2>

                        <p>
                            Please check again later.
                        </p>

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


                // ==========================================
                // Property Values
                // ==========================================

                const propertyId =
                    property.id;

                const title =
                    property.title ||
                    "Untitled Property";

                const type =
                    property.type ||
                    "Property";

                const location =
                    property.location ||
                    "Location unavailable";

                const bedrooms =
                    property.bedrooms || 0;

                const bathrooms =
                    property.bathrooms || 0;

                const area =
                    property.area || 0;

                const price =
                    Number(property.price || 0);

                const image =
                    property.image ||
                    "apartment1.png";


                // ==========================================
                // Property Card HTML
                // ==========================================

                card.innerHTML = `

                    <!-- =================================
                         PROPERTY IMAGE
                    ================================== -->

                    <div class="property-image-wrapper">

                        <span class="property-status">
                            ${type}
                        </span>


                        <!-- Wishlist Button -->

                        <button
                            type="button"
                            class="wishlist-btn"
                            onclick="addToWishlist(${propertyId})"
                            title="Add to Wishlist"
                        >

                            <i class="fa-solid fa-heart"></i>

                        </button>


                        <!-- Property Image -->

                        <img
                            src="${image}"
                            alt="${title}"
                            class="property-image"
                            onerror="this.onerror=null; this.src='apartment1.png';"
                        >

                    </div>


                    <!-- =================================
                         PROPERTY CONTENT
                    ================================== -->

                    <div class="property-content">


                        <!-- Property Title -->

                        <h3>
                            ${title}
                        </h3>


                        <!-- Location -->

                        <p class="location">

                            <i class="fa-solid fa-location-dot"></i>

                            ${location}

                        </p>


                        <!-- Property Information -->

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


                        <!-- Price -->

                        <h2 class="price">

                            ₹${price.toLocaleString("en-IN")}

                            <span>
                                / Month
                            </span>

                        </h2>


                        <!-- Buttons -->

                        <div class="property-buttons">


                            <!-- View Details -->

                            <button
                                type="button"
                                class="details-btn"
                                onclick="viewProperty(${propertyId})"
                            >

                                <i class="fa-solid fa-eye"></i>

                                View Details

                            </button>

                        </div>


                        <!-- Contact Owner -->

                        <button
                            type="button"
                            class="contact-btn"
                            onclick="contactOwner(${propertyId})"
                        >

                            <i class="fa-solid fa-phone"></i>

                            Contact Owner

                        </button>

                    </div>

                `;


                // Add card to container

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

                        <p style="
                            color:#666;
                            margin-top:10px;
                        ">
                            Please check that the
                            backend server is running
                            and the API URL is correct.
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

    if (!id) {

        console.error(
            "Property ID is missing."
        );

        return;
    }


    // If property-detail.html is in the
    // same Customer folder as home.html

    window.location.href =
        `property-detail.html?id=${encodeURIComponent(id)}`;

}


// ==========================================
// Contact Owner
// ==========================================

function contactOwner(id) {

    if (!id) {

        console.error(
            "Property ID is missing."
        );

        return;
    }


    // If contact-owner.html is in the
    // same Customer folder as home.html

    window.location.href =
        `contact-owner.html?propertyId=${encodeURIComponent(id)}`;

}


// ==========================================
// Wishlist
// ==========================================

function addToWishlist(id) {

    if (!id) {

        console.error(
            "Property ID is missing."
        );

        return;
    }


    // Get existing wishlist

    let wishlist = [];

    try {

        wishlist =
            JSON.parse(
                localStorage.getItem("wishlist")
            ) || [];

    } catch (error) {

        console.error(
            "Unable to read wishlist:",
            error
        );

        wishlist = [];

    }


    // Make sure IDs are compared consistently

    const propertyId =
        Number(id);


    // ==========================================
    // Add Property
    // ==========================================

    if (!wishlist.includes(propertyId)) {

        wishlist.push(propertyId);


        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );


        alert(
            "❤️ Property added to wishlist!"
        );


        console.log(
            "Wishlist:",
            wishlist
        );

    }


    // ==========================================
    // Already Added
    // ==========================================

    else {

        alert(
            "Property is already in your wishlist."
        );

    }

}


// ==========================================
// Start Application
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "Customer Home DOM Loaded"
        );

        loadProperties();

    }
);
