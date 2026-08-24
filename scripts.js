// =====================================
// Property Hub System
// scripts.js
// =====================================

console.log("Welcome to Property Hub System");

// =====================================
// SEARCH
// =====================================

const searchBtn = document.getElementById("searchBtn");

if (searchBtn) {

    searchBtn.addEventListener("click", () => {

        const keyword = document.getElementById("searchInput").value.toLowerCase();
        const type = document.getElementById("propertyType").value.toLowerCase();
        const bedrooms = document.getElementById("bedrooms").value;
        const price = document.getElementById("priceRange").value;

        const cards = document.querySelectorAll(".property-card");

        cards.forEach(card => {

            const text = card.textContent.toLowerCase();

            let visible = true;

            if (keyword && !text.includes(keyword))
                visible = false;

            if (type && !text.includes(type))
                visible = false;

            if (bedrooms && !text.includes(bedrooms))
                visible = false;

            if (price) {

                const propertyPrice = parseInt(
                    text.replace(/[^0-9]/g, "")
                );

                if (price == "10000" && propertyPrice >= 10000)
                    visible = false;

                if (price == "20000" &&
                    (propertyPrice < 10000 || propertyPrice > 20000))
                    visible = false;

                if (price == "50000" &&
                    (propertyPrice < 20000 || propertyPrice > 50000))
                    visible = false;

                if (price == "100000" &&
                    propertyPrice < 50000)
                    visible = false;

            }

            card.style.display = visible ? "block" : "none";

        });

    });

}

// =====================================
// PROPERTY BUTTONS
// =====================================

const propertyButtons = document.querySelectorAll(".details-btn");

propertyButtons.forEach(button => {

    button.addEventListener("click", function () {

        console.log("Opening Property Details...");

    });

});

// =====================================
// LOGIN BUTTON
// =====================================

const loginBtn = document.querySelector(".login-btn");

if (loginBtn) {

    loginBtn.addEventListener("click", () => {

        window.location.href = "login.html";

    });

}

// =====================================
// REGISTER BUTTON
// =====================================

const registerBtn = document.querySelector(".register-btn");

if (registerBtn) {

    registerBtn.addEventListener("click", () => {

        window.location.href = "register.html";

    });

}

// =====================================
// CATEGORY
// =====================================

const categories = document.querySelectorAll(".category");

categories.forEach(category => {

    category.addEventListener("click", function () {

        alert("Category : " + this.innerText);

    });

});

// =====================================
// NOTIFICATION DROPDOWN
// =====================================

const notificationBtn = document.getElementById("notificationBtn");
const notificationDropdown = document.getElementById("notificationDropdown");

if (notificationBtn && notificationDropdown) {

    notificationBtn.addEventListener("click", function (e) {

        e.stopPropagation();

        notificationDropdown.style.display =
            notificationDropdown.style.display === "block"
                ? "none"
                : "block";

    });

    window.addEventListener("click", function () {

        notificationDropdown.style.display = "none";

    });

}

// =====================================
// PAGE LOADED
// =====================================

console.log("Property Hub Loaded Successfully");