// =====================================
// Property Hub System
// bookings.js
// =====================================

let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

const table = document.getElementById("bookingTable");

function loadBookings() {

    table.innerHTML = "";

    if (bookings.length === 0) {

        table.innerHTML = `
        <tr>
            <td colspan="8" style="text-align:center;padding:30px;">
                No Booking Requests Yet
            </td>
        </tr>
        `;

        return;
    }

    bookings.forEach((booking, index) => {

        table.innerHTML += `

        <tr>

            <td>${index + 1}</td>

            <td>${booking.name}</td>

            <td>${booking.phone}</td>

            <td>${booking.email}</td>

            <td>${booking.property}</td>

            <td>${booking.date}</td>

            <td>

                <span class="active-status">

                    ${booking.status}

                </span>

            </td>

            <td>

                <button class="edit"
                    onclick="approveBooking(${index})">

                    Approve

                </button>

                <button class="delete"
                    onclick="deleteBooking(${index})">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}

function approveBooking(index){

    bookings[index].status = "Approved";

    localStorage.setItem("bookings", JSON.stringify(bookings));

    loadBookings();

}

function deleteBooking(index){

    if(confirm("Delete this booking?")){

        bookings.splice(index,1);

        localStorage.setItem("bookings", JSON.stringify(bookings));

        loadBookings();

    }

}

loadBookings();