// ==========================================
// Property Hub
// property-detail.js
// ==========================================

console.log("Property Detail Page Loaded");


// ==========================================
// API
// ==========================================

const API_URL = "http://localhost:8080/properties";


// ==========================================
// Get Property ID
// ==========================================

const params =
    new URLSearchParams(window.location.search);

const propertyId =
    params.get("id");

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

                throw new Error(
                    "Property not found"
                );

            }

            return response.json();

        })

        .then(property => {

            console.log(
                "Property received:",
                property
            );


            // ==========================================
            // Property Information
            // ==========================================

            const title =
                document.getElementById("propertyTitle");

            const price =
                document.getElementById("propertyPrice");

            const location =
                document.getElementById("propertyLocation");

            const description =
                document.getElementById("propertyDescription");

            const bedrooms =
                document.getElementById("bedrooms");

            const bathrooms =
                document.getElementById("bathrooms");

            const area =
                document.getElementById("area");

            const parking =
                document.getElementById("parking");

            const image =
                document.getElementById("propertyImage");


            // ==========================================
            // Fill Data
            // ==========================================

            if (title)
                title.textContent =
                    property.title;

            if (price)
                price.textContent =
                    `₹${Number(property.price).toLocaleString("en-IN")} / Month`;

            if (location)
                location.textContent =
                    property.location;

            if (bedrooms)
                bedrooms.textContent =
                    property.bedrooms || 0;

            if (bathrooms)
                bathrooms.textContent =
                    property.bathrooms || 0;

            if (area)
                area.textContent =
                    `${property.area || 0} Sq.ft`;

            if (parking)
                parking.textContent =
                    "Available";


            // ==========================================
            // Description
            // ==========================================

            if (description) {

                description.textContent =
                    `Experience premium living in this ${property.type || "property"} located in ${property.location}. This property offers comfortable space, modern facilities and convenient access to nearby locations.`;

            }


            // ==========================================
            // Image
            // ==========================================

            if (image) {

                image.src =
                    `../../assets/images/${property.image}`;

                image.alt =
                    property.title;


                image.onerror = function () {

                    console.error(
                        "Property image not found:",
                        property.image
                    );

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
                text-align:center;
                padding:80px 20px;
            ">

                <h1>
                    Property Not Found
                </h1>

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