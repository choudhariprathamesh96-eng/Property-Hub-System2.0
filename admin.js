// =======================================
// Property Hub System
// Admin Dashboard JavaScript
// =======================================

console.log("Admin Dashboard Loaded");

// ===============================
// Load Data
// ===============================

let properties = JSON.parse(localStorage.getItem("properties")) || [];
let enquiries = JSON.parse(localStorage.getItem("enquiries")) || [];
let users = JSON.parse(localStorage.getItem("users")) || [];
let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

// ===============================
// Dashboard Cards
// ===============================

document.getElementById("totalProperties").textContent = properties.length;
document.getElementById("totalUsers").textContent = users.length;
document.getElementById("totalBookings").textContent = bookings.length;
document.getElementById("totalEnquiries").textContent = enquiries.length;

// ===============================
// Property Table
// ===============================

const propertyTable = document.getElementById("propertyTable");

if (propertyTable) {

    if (properties.length === 0) {

        propertyTable.innerHTML = `
        <tr>
            <td colspan="6" style="padding:25px;text-align:center;">
                No Properties Available
            </td>
        </tr>`;
    }

    properties.forEach((property, index) => {

        propertyTable.innerHTML += `

        <tr>

            <td>
                <img src="${property.image}" width="80">
            </td>

            <td>${property.title}</td>

            <td>${property.city}</td>

            <td>₹${property.price}</td>

            <td>
                <span class="status active">
                    ${property.status || "Active"}
                </span>
            </td>

            <td>

                <button class="view-btn"
                    onclick="viewProperty(${index})">
                    View
                </button>

                <button class="delete-btn"
                    onclick="deleteProperty(${index})">
                    Delete
                </button>

            </td>

        </tr>

        `;

    });

}

// ===============================
// Enquiry Table
// ===============================

const enquiryTable = document.getElementById("enquiryTable");

if (enquiryTable) {

    if (enquiries.length === 0) {

        enquiryTable.innerHTML = `
        <tr>
            <td colspan="4" style="padding:25px;text-align:center;">
                No Enquiries Found
            </td>
        </tr>`;
    }

    enquiries.forEach((enquiry) => {

        enquiryTable.innerHTML += `

        <tr>

            <td>${enquiry.name}</td>

            <td>${enquiry.property}</td>

            <td>${enquiry.visitDate}</td>

            <td>
                <span class="status pending">
                    ${enquiry.status}
                </span>
            </td>

        </tr>

        `;

    });

}

// ===============================
// Delete Property
// ===============================

function deleteProperty(index) {

    if (confirm("Are you sure you want to delete this property?")) {

        properties.splice(index, 1);

        localStorage.setItem(
            "properties",
            JSON.stringify(properties)
        );

        location.reload();

    }

}

// ===============================
// View Property
// ===============================

function viewProperty(index) {

    alert(
        "Property: " +
        properties[index].title +
        "\nCity: " +
        properties[index].city +
        "\nPrice: ₹" +
        properties[index].price
    );

}