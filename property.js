// ==========================================
// Property Hub
// property-detail.js
// ==========================================

console.log("Property Detail Page Loaded");

const API_URL = "http://localhost:8080/properties";

// ==========================================
// Get Property ID
// ==========================================

const params = new URLSearchParams(window.location.search);
const propertyId = params.get("id");

console.log("Property ID:", propertyId);


// ==========================================
// Load Property
// ==========================================

function loadProperty() {

    if (!propertyId) {
        showPropertyNotFound();
        return;
    }

    fetch(`${API_URL}/${propertyId}`)

        .then(response => {

            if (!response.ok) {
                throw new Error("Property not found");
            }

            return response.json();

        })

        .then(property => {

            console.log("Property received:", property);

            // Title
            const title =
                document.getElementById("propertyTitle");

            if (title) {
                title.textContent =
                    property.title || "Property";
            }


            // Price
            const price =
                document.getElementById("propertyPrice");

            if (price) {
                price.textContent =
                    `₹${Number(property.price || 0)
                        .toLocaleString("en-IN")} / Month`;
            }


            // Location
            const location =
                document.getElementById("propertyLocation");

            if (location) {
                location.textContent =
                    property.location || "Location not available";
            }


            // Bedrooms
            const bedrooms =
                document.getElementById("bedrooms");

            if (bedrooms) {
                bedrooms.textContent =
                    property.bedrooms || 0;
            }


            // Bathrooms
            const bathrooms =
                document.getElementById("bathrooms");

            if (bathrooms) {
                bathrooms.textContent =
                    property.bathrooms || 0;
            }


            // Area
            const area =
                document.getElementById("area");

            if (area) {
                area.textContent =
                    `${property.area || 0} Sq.ft`;
            }


            // Parking
            const parking =
                document.getElementById("parking");

            if (parking) {
                parking.textContent =
                    "Available";
            }


            // Description
            const description =
                document.getElementById("propertyDescription");

            if (description) {

                description.textContent =
                    `Beautiful ${property.type || "property"} available at ${
                        property.location || "this location"
                    }. This property offers comfortable space and modern facilities.`;

            }


            // ==========================================
            // Property Image
            // ==========================================

            const image =
                document.getElementById("propertyImage");

            if (image) {

                image.src =
                    `../../assets/images/${property.image}`;

                image.alt =
                    property.title || "Property";

                image.onerror = function () {

                    console.error(
                        "Property image not found:",
                        property.image
                    );

                    this.onerror = null;

                    this.src =
                        "../../assets/images/apartment1.png";
                };

            }

        })

        .catch(error => {

            console.error(
                "Error loading property:",
                error
            );

            showPropertyNotFound();

        });

}


// ==========================================
// Property Not Found
// ==========================================

function showPropertyNotFound() {

    const container =
        document.querySelector(".property-details");

    if (container) {

        container.innerHTML = `

            <div style="
                padding:80px 20px;
                text-align:center;
            ">

                <h1>Property Not Found</h1>

                <p>
                    The property you are looking for
                    does not exist.
                </p>

                <a href="../Home/index.html">
                    ← Back to Home
                </a>

            </div>

        `;

    }

}


// ==========================================
// Start
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    loadProperty
);