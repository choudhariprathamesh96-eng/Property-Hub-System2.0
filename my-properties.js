// =======================================
// Property Hub System
// My Properties JavaScript
// API Connected Version
// =======================================

console.log("My Properties Loaded");

const API_URL = "http://localhost:8080/properties";

// =======================================
// Elements
// =======================================

const propertyContainer =
    document.getElementById("propertyContainer");

const searchInput =
    document.getElementById("searchInput");

const typeFilter =
    document.getElementById("typeFilter");

// =======================================
// Store Properties
// =======================================

let properties = [];

// =======================================
// Load Properties
// =======================================

async function loadProperties() {

    try {

        propertyContainer.innerHTML = `
            <div class="empty">
                <i class="fa-solid fa-spinner fa-spin"></i>
                <h2>Loading Properties...</h2>
                <p>Please wait...</p>
            </div>
        `;

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(
                "Server Error: " + response.status
            );
        }

        const data = await response.json();

        console.log("Properties received:", data);

        properties = Array.isArray(data) ? data : [];

        applyFilters();

    } catch (error) {

        console.error("Error loading properties:", error);

        propertyContainer.innerHTML = `
            <div class="empty">

                <i class="fa-solid fa-triangle-exclamation"></i>

                <h2>Unable to Load Properties</h2>

                <p>
                    Please make sure your Spring Boot
                    server is running.
                </p>

                <button onclick="loadProperties()">
                    Try Again
                </button>

            </div>
        `;

    }

}

// =======================================
// Display Properties
// =======================================

function displayProperties(list) {

    propertyContainer.innerHTML = "";

    if (!list || list.length === 0) {

        propertyContainer.innerHTML = `
            <div class="empty">

                <i class="fa-solid fa-house-circle-xmark"></i>

                <h2>No Properties Found</h2>

                <p>
                    No properties match your search.
                </p>

            </div>
        `;

        return;
    }

    list.forEach(function(property) {

        const card =
            document.createElement("div");

        card.className = "property-card";

        const image =
            property.image ||
            "apartment1.png";

        const title =
            property.title ||
            "Untitled Property";

        const location =
            property.location ||
            "Location not available";

        const price =
            Number(property.price || 0)
                .toLocaleString("en-IN");

        const type =
            property.type ||
            "Property";

        const bedrooms =
            property.bedrooms || 0;

        const bathrooms =
            property.bathrooms || 0;

        const area =
            property.area || 0;

        card.innerHTML = `

            <img
                src="${image}"
                alt="${title}"
                onerror="
                    this.onerror=null;
                    this.src='apartment1.png';
                "
            >

            <div class="property-info">

                <h3>
                    ${title}
                </h3>

                <p>
                    <i class="fa-solid fa-location-dot"></i>
                    ${location}
                </p>

                <p>
                    <strong>
                        ₹${price}
                    </strong>
                </p>

                <p>
                    Type: ${type}
                </p>

                <p>
                    Bedrooms: ${bedrooms}
                </p>

                <p>
                    Bathrooms: ${bathrooms}
                </p>

                <p>
                    Area: ${area} Sq.ft
                </p>

                <span class="status">
                    Active
                </span>

                <div class="card-buttons">

                    <button
                        class="view-btn"
                        onclick="viewProperty(${property.id})"
                    >
                        <i class="fa-solid fa-eye"></i>
                        View
                    </button>

                    <button
                        class="edit-btn"
                        onclick="editProperty(${property.id})"
                    >
                        <i class="fa-solid fa-pen"></i>
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteProperty(${property.id})"
                    >
                        <i class="fa-solid fa-trash"></i>
                        Delete
                    </button>

                </div>

            </div>
        `;

        propertyContainer.appendChild(card);

    });

}

// =======================================
// Search + Filter
// =======================================

function applyFilters() {

    const searchText =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";

    const selectedType =
        typeFilter
            ? typeFilter.value
            : "All";

    const filtered =
        properties.filter(function(property) {

            const title =
                (property.title || "")
                    .toLowerCase();

            const location =
                (property.location || "")
                    .toLowerCase();

            const type =
                property.type || "";

            const matchesSearch =
                title.includes(searchText) ||
                location.includes(searchText);

            const matchesType =
                selectedType === "All" ||
                type === selectedType;

            return (
                matchesSearch &&
                matchesType
            );

        });

    displayProperties(filtered);

}

// =======================================
// Search Event
// =======================================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        applyFilters
    );

}

// =======================================
// Filter Event
// =======================================

if (typeFilter) {

    typeFilter.addEventListener(
        "change",
        applyFilters
    );

}

// =======================================
// View Property
// =======================================

function viewProperty(id) {

    if (!id) {
        alert("Property ID not found.");
        return;
    }

    window.location.href =
        "property-detail.html?id=" + id;

}

// =======================================
// Edit Property
// =======================================

function editProperty(id) {

    if (!id) {
        alert("Property ID not found.");
        return;
    }

    window.location.href =
        "add-property.html?id=" + id;

}

// =======================================
// Delete Property
// =======================================

async function deleteProperty(id) {

    if (!id) {
        alert("Property ID not found.");
        return;
    }

    const property =
        properties.find(function(item) {
            return item.id == id;
        });

    const propertyName =
        property
            ? property.title
            : "this property";

    const confirmed =
        confirm(
            "Are you sure you want to delete \"" +
            propertyName +
            "\"?"
        );

    if (!confirmed) {
        return;
    }

    try {

        const response =
            await fetch(
                API_URL + "/" + id,
                {
                    method: "DELETE"
                }
            );

        if (!response.ok) {

            throw new Error(
                "Delete failed: " +
                response.status
            );

        }

        alert(
            "Property deleted successfully!"
        );

        loadProperties();

    } catch (error) {

        console.error(
            "Delete error:",
            error
        );

        alert(
            "Unable to delete property."
        );

    }

}

// =======================================
// Initial Load
// =======================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadProperties();

    }
);
