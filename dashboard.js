// =======================================
// Property Hub System
// Owner Dashboard JavaScript
// =======================================

console.log("Dashboard Loaded");

// =======================================
// LOAD LOGGED-IN USER
// =======================================

function loadLoggedInUser() {

    const userData = localStorage.getItem("loggedInUser");

    if (!userData) {

        console.log("No logged-in user found.");

        // Change this path if your login file has a different name
        window.location.href = "../Home/login.html";

        return;
    }

    try {

        const user = JSON.parse(userData);

        const userName = user.fullname || "User";

        // Sidebar username
        const sidebarUserName =
            document.getElementById("sidebarUserName");

        if (sidebarUserName) {
            sidebarUserName.textContent = userName;
        }

        // Top-right username
        const topUserName =
            document.getElementById("topUserName");

        if (topUserName) {
            topUserName.textContent = userName;
        }

        // Welcome username
        const welcomeUserName =
            document.getElementById("welcomeUserName");

        if (welcomeUserName) {
            welcomeUserName.textContent = userName;
        }

        console.log("Logged-in user:", userName);

    } catch (error) {

        console.error(
            "Invalid logged-in user data:",
            error
        );

        localStorage.removeItem("loggedInUser");

        window.location.href = "../Home/login.html";
    }
}


// =======================================
// API
// =======================================

const PROPERTY_API =
    "http://localhost:8080/properties";


// =======================================
// DASHBOARD ELEMENTS
// =======================================

const totalProperties =
    document.getElementById("totalProperties");

const rentProperties =
    document.getElementById("rentProperties");

const saleProperties =
    document.getElementById("saleProperties");

const tableBody =
    document.getElementById("propertyTableBody");


// =======================================
// LOAD PROPERTIES FROM MYSQL
// =======================================

async function loadProperties() {

    try {

        console.log("Loading properties from MySQL...");

        const response =
            await fetch(PROPERTY_API);

        if (!response.ok) {

            throw new Error(
                "Unable to load properties. Status: " +
                response.status
            );

        }

        const properties =
            await response.json();

        console.log(
            "Properties loaded:",
            properties
        );

        updateCards(properties);

        displayProperties(properties);

    } catch (error) {

        console.error(
            "Property loading error:",
            error
        );

        if (tableBody) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="7"
                        style="padding:40px;text-align:center;">

                        <i class="fa-solid fa-triangle-exclamation"
                           style="font-size:45px;color:#e74c3c;">
                        </i>

                        <br><br>

                        <strong>
                            Unable to load properties
                        </strong>

                        <br><br>

                        Please make sure Spring Boot is running.

                    </td>
                </tr>
            `;

        }

    }

}


// =======================================
// UPDATE DASHBOARD CARDS
// =======================================

function updateCards(properties) {

    if (!Array.isArray(properties)) {
        properties = [];
    }

    // Total properties
    if (totalProperties) {

        totalProperties.textContent =
            properties.length;

    }


    // ===================================
    // Count Rent / Sale
    // ===================================

    let rent = 0;
    let sale = 0;

    properties.forEach(property => {

        const status =
            String(property.status || "")
                .toLowerCase();

        if (status.includes("rent")) {

            rent++;

        } else if (status.includes("sale")) {

            sale++;

        }

    });


    if (rentProperties) {

        rentProperties.textContent =
            rent;

    }


    if (saleProperties) {

        saleProperties.textContent =
            sale;

    }

}


// =======================================
// DISPLAY PROPERTIES
// =======================================

function displayProperties(properties) {

    if (!tableBody) {
        return;
    }

    tableBody.innerHTML = "";


    // ===================================
    // No Properties
    // ===================================

    if (!properties || properties.length === 0) {

        tableBody.innerHTML = `
            <tr>

                <td colspan="7"
                    style="
                        padding:40px;
                        text-align:center;
                    ">

                    <i class="fa-solid fa-house-circle-xmark"
                       style="
                           font-size:50px;
                           color:#999;
                       ">
                    </i>

                    <br><br>

                    <strong>
                        No Properties Added Yet
                    </strong>

                    <br><br>

                    <a href="add-property.html"
                       class="action-btn">

                        + Add First Property

                    </a>

                </td>

            </tr>
        `;

        return;
    }


    // ===================================
    // Display Properties
    // ===================================

    properties.forEach(property => {

        const image =
            property.image
                ? `../../assets/images/${property.image}`
                : "../../assets/images/apartment1.png";

        const status =
            property.status || "Active";

        const location =
            property.location || "-";

        const price =
            Number(property.price || 0)
                .toLocaleString("en-IN");


        tableBody.innerHTML += `

            <tr>

                <!-- IMAGE -->

                <td>

                    <img
                        src="${image}"
                        alt="${property.title || "Property"}"
                        width="90"
                        height="65"
                        style="
                            object-fit:cover;
                            border-radius:8px;
                        "
                        onerror="
                            this.src='../../assets/images/apartment1.png';
                        "
                    >

                </td>


                <!-- PROPERTY -->

                <td>

                    ${property.title || "-"}

                </td>


                <!-- CITY -->

                <td>

                    ${location}

                </td>


                <!-- PRICE -->

                <td>

                    ₹${price}

                </td>


                <!-- STATUS -->

                <td>

                    <span class="active-status">

                        ${status}

                    </span>

                </td>


                <!-- VIEWS -->

                <td>

                    0

                </td>


                <!-- ACTIONS -->

                <td>

                    <button
                        class="edit"
                        onclick="editProperty(${property.id})">

                        <i class="fa-solid fa-pen"></i>
                        Edit

                    </button>


                    <button
                        class="delete"
                        onclick="deleteProperty(${property.id})">

                        <i class="fa-solid fa-trash"></i>
                        Delete

                    </button>

                </td>

            </tr>

        `;

    });

}


// =======================================
// EDIT PROPERTY
// =======================================

function editProperty(id) {

    if (!id) {

        alert("Invalid property ID.");

        return;
    }

    window.location.href =
        `add-property.html?id=${id}`;

}


// =======================================
// DELETE PROPERTY
// =======================================

async function deleteProperty(id) {

    if (!id) {

        alert("Invalid property ID.");

        return;
    }


    const confirmDelete =
        confirm(
            "Are you sure you want to delete this property?"
        );


    if (!confirmDelete) {
        return;
    }


    try {

        console.log(
            "Deleting property:",
            id
        );


        const response =
            await fetch(
                `${PROPERTY_API}/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            const errorText =
                await response.text();

            throw new Error(
                "Delete failed. Status: " +
                response.status +
                " " +
                errorText
            );

        }


        alert(
            "✅ Property deleted successfully!"
        );


        // Reload properties
        loadProperties();


    } catch (error) {

        console.error(
            "Delete Property Error:",
            error
        );


        alert(
            "❌ Unable to delete property.\n\n" +
            error.message
        );

    }

}


// =======================================
// DATE
// =======================================

function updateDate() {

    const todayDate =
        document.getElementById("todayDate");

    if (todayDate) {

        todayDate.textContent =
            new Date().toDateString();

    }

}


// =======================================
// INITIALIZE DASHBOARD
// =======================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "Initializing Owner Dashboard..."
        );

        // Load logged-in user's name
        loadLoggedInUser();

        // Show current date
        updateDate();

        // Load properties from MySQL
        loadProperties();

    }
);