// ==========================================
// Property Hub System
// Analytics Dashboard JavaScript
// ==========================================

console.log("Analytics Dashboard Loaded");

// ==========================================
// Get Data From Local Storage
// ==========================================

const properties = JSON.parse(localStorage.getItem("properties")) || [];
const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
const users = JSON.parse(localStorage.getItem("users")) || [];
const reviews = JSON.parse(localStorage.getItem("reviews")) || [];

// ==========================================
// Dashboard Cards
// ==========================================

document.getElementById("totalProperties").textContent = properties.length;

document.getElementById("totalUsers").textContent = users.length;

document.getElementById("totalBookings").textContent = bookings.length;

// Revenue Calculation
let revenue = 0;

bookings.forEach(booking => {

    revenue += Number(booking.price || 0);

});

document.getElementById("totalRevenue").textContent =
"₹" + revenue.toLocaleString("en-IN");

// ==========================================
// Report Table
// ==========================================

document.getElementById("propertyRecords").textContent = properties.length;

document.getElementById("bookingRecords").textContent = bookings.length;

document.getElementById("userRecords").textContent = users.length;

document.getElementById("reviewRecords").textContent = reviews.length;

// ==========================================
// Monthly Property Views Chart
// ==========================================

new Chart(document.getElementById("viewsChart"), {

    type: "line",

    data: {

        labels: [
            "Jan","Feb","Mar","Apr",
            "May","Jun","Jul","Aug",
            "Sep","Oct","Nov","Dec"
        ],

        datasets: [{

            label: "Views",

            data: [
                120,180,250,300,
                350,420,480,510,
                560,620,690,750
            ],

            borderColor: "#0d6efd",

            backgroundColor: "rgba(13,110,253,.2)",

            fill: true,

            tension: .4

        }]

    },

    options: {

        responsive: true,

        maintainAspectRatio: false

    }

});

// ==========================================
// Bookings Chart
// ==========================================

new Chart(document.getElementById("bookingChart"), {

    type: "bar",

    data: {

        labels: [
            "Jan","Feb","Mar","Apr",
            "May","Jun","Jul","Aug"
        ],

        datasets: [{

            label: "Bookings",

            data: [
                5,8,10,12,16,20,18,25
            ],

            backgroundColor: "#198754"

        }]

    },

    options: {

        responsive: true,

        maintainAspectRatio: false

    }

});

// ==========================================
// Property Types Chart
// ==========================================

let apartment = 0;
let villa = 0;
let office = 0;
let shop = 0;
let pg = 0;

properties.forEach(property => {

    switch(property.type){

        case "Apartment":
            apartment++;
            break;

        case "Villa":
            villa++;
            break;

        case "Office":
            office++;
            break;

        case "Shop":
            shop++;
            break;

        case "PG":
            pg++;
            break;

    }

});

new Chart(document.getElementById("propertyTypeChart"), {

    type: "pie",

    data: {

        labels: [
            "Apartment",
            "Villa",
            "Office",
            "Shop",
            "PG"
        ],

        datasets: [{

            data: [
                apartment,
                villa,
                office,
                shop,
                pg
            ],

            backgroundColor: [

                "#0d6efd",
                "#198754",
                "#ffc107",
                "#dc3545",
                "#6f42c1"

            ]

        }]

    },

    options: {

        responsive: true,

        maintainAspectRatio: false

    }

});

// ==========================================
// Revenue Chart
// ==========================================

new Chart(document.getElementById("revenueChart"), {

    type: "line",

    data: {

        labels: [
            "Jan","Feb","Mar","Apr",
            "May","Jun","Jul","Aug"
        ],

        datasets: [{

            label: "Revenue (₹)",

            data: [
                50000,
                85000,
                120000,
                160000,
                190000,
                250000,
                310000,
                revenue
            ],

            borderColor: "#dc3545",

            backgroundColor: "rgba(220,53,69,.2)",

            fill: true,

            tension: .4

        }]

    },

    options: {

        responsive: true,

        maintainAspectRatio: false

    }

});

// ==========================================
// Average Rating
// ==========================================

let averageRating = 0;

if(reviews.length > 0){

    let total = 0;

    reviews.forEach(review=>{

        total += Number(review.rating);

    });

    averageRating = (total/reviews.length).toFixed(1);

}

console.log("Average Rating :", averageRating);

console.log("Analytics Loaded Successfully");