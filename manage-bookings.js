// ==========================================
// Property Hub System
// manage-bookings.js
// ==========================================

console.log("Manage Bookings Loaded");

// Dummy Booking Data

let bookings = [

{
    id: 1,
    customer: "Rahul Sharma",
    property: "Luxury Apartment",
    bookingDate: "10-07-2026",
    visitDate: "15-07-2026",
    status: "Pending"
},

{
    id: 2,
    customer: "Priya Patel",
    property: "Modern Villa",
    bookingDate: "11-07-2026",
    visitDate: "18-07-2026",
    status: "Approved"
},

{
    id: 3,
    customer: "Amit Verma",
    property: "Commercial Office",
    bookingDate: "12-07-2026",
    visitDate: "20-07-2026",
    status: "Rejected"
},

{
    id: 4,
    customer: "Sneha Joshi",
    property: "Studio Apartment",
    bookingDate: "13-07-2026",
    visitDate: "22-07-2026",
    status: "Pending"
}

];

// Table Body

const bookingTable = document.getElementById("bookingTable");

// ==========================================
// Display Bookings
// ==========================================

function loadBookings(data = bookings) {

    bookingTable.innerHTML = "";

    data.forEach((booking) => {

        let statusClass = "";

        if (booking.status === "Pending") {

            statusClass = "pending";

        } else if (booking.status === "Approved") {

            statusClass = "approved";

        } else {

            statusClass = "rejected";

        }

        bookingTable.innerHTML += `

        <tr>

            <td>${booking.id}</td>

            <td>${booking.customer}</td>

            <td>${booking.property}</td>

            <td>${booking.bookingDate}</td>

            <td>${booking.visitDate}</td>

            <td class="${statusClass}">
                ${booking.status}
            </td>

            <td>

                <button class="approve-btn"
                onclick="approveBooking(${booking.id})">

                <i class="fa-solid fa-check"></i>

                </button>

                <button class="reject-btn"
                onclick="rejectBooking(${booking.id})">

                <i class="fa-solid fa-xmark"></i>

                </button>

                <button class="delete-btn"
                onclick="deleteBooking(${booking.id})">

                <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

}

loadBookings();

// ==========================================
// Approve Booking
// ==========================================

function approveBooking(id) {

    bookings = bookings.map((booking) => {

        if (booking.id === id) {

            booking.status = "Approved";

        }

        return booking;

    });

    loadBookings();

}

// ==========================================
// Reject Booking
// ==========================================

function rejectBooking(id) {

    bookings = bookings.map((booking) => {

        if (booking.id === id) {

            booking.status = "Rejected";

        }

        return booking;

    });

    loadBookings();

}

// ==========================================
// Delete Booking
// ==========================================

function deleteBooking(id) {

    if (confirm("Are you sure you want to delete this booking?")) {

        bookings = bookings.filter((booking) => booking.id !== id);

        loadBookings();

    }

}

// ==========================================
// Search Booking
// ==========================================

const searchInput = document.getElementById("searchBooking");

searchInput.addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase();

    const filtered = bookings.filter((booking) =>

        booking.customer.toLowerCase().includes(keyword) ||

        booking.property.toLowerCase().includes(keyword) ||

        booking.status.toLowerCase().includes(keyword)

    );

    loadBookings(filtered);

});

console.log("Manage Bookings Ready");