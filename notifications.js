// ==========================================
// Property Hub System
// Notifications JavaScript
// ==========================================

console.log("Notifications Module Loaded");

// ===============================
// Local Storage
// ===============================

let notifications = JSON.parse(localStorage.getItem("notifications")) || [];

// Default Notifications
if (notifications.length === 0) {

    notifications = [

        {
            icon: "fa-envelope",
            title: "New Enquiry",
            message: "A customer sent an enquiry for Luxury Apartment.",
            time: new Date().toLocaleString(),
            read: false
        },

        {
            icon: "fa-calendar-check",
            title: "Booking Received",
            message: "A booking request has been received.",
            time: new Date().toLocaleString(),
            read: false
        },

        {
            icon: "fa-house-circle-check",
            title: "Property Approved",
            message: "Your property has been approved by Admin.",
            time: new Date().toLocaleString(),
            read: true
        }

    ];

    localStorage.setItem(
        "notifications",
        JSON.stringify(notifications)
    );

}

// ===============================
// Elements
// ===============================

const notificationContainer =
    document.getElementById("notificationContainer");

const notificationCount =
    document.getElementById("notificationCount");

const emptyNotification =
    document.getElementById("emptyNotification");

const markReadBtn =
    document.getElementById("markReadBtn");

const clearBtn =
    document.getElementById("clearBtn");

// ===============================
// Display Notifications
// ===============================

function displayNotifications() {

    notificationContainer.innerHTML = "";

    notificationCount.textContent = notifications.length;

    if (notifications.length === 0) {

        notificationContainer.style.display = "none";
        emptyNotification.style.display = "block";

        return;

    }

    notificationContainer.style.display = "block";
    emptyNotification.style.display = "none";

    notifications.forEach((notification, index) => {

        notificationContainer.innerHTML += `

        <div class="notification-card">

            <div class="notification-info">

                <div class="notification-icon">

                    <i class="fa-solid ${notification.icon}"></i>

                </div>

                <div class="notification-text">

                    <h3>${notification.title}</h3>

                    <p>${notification.message}</p>

                    <div class="notification-time">

                        ${notification.time}

                    </div>

                </div>

            </div>

            <div>

                <span class="badge ${notification.read ? "read" : "unread"}">

                    ${notification.read ? "Read" : "Unread"}

                </span>

                <div class="notification-actions" style="margin-top:15px;">

                    <button onclick="deleteNotification(${index})">

                        Delete

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

// ===============================
// Delete Notification
// ===============================

function deleteNotification(index) {

    if (confirm("Delete this notification?")) {

        notifications.splice(index, 1);

        localStorage.setItem(
            "notifications",
            JSON.stringify(notifications)
        );

        displayNotifications();

    }

}

// ===============================
// Mark All Read
// ===============================

markReadBtn.addEventListener("click", () => {

    notifications.forEach(notification => {

        notification.read = true;

    });

    localStorage.setItem(
        "notifications",
        JSON.stringify(notifications)
    );

    displayNotifications();

    alert("All notifications marked as read.");

});

// ===============================
// Clear All
// ===============================

clearBtn.addEventListener("click", () => {

    if (confirm("Clear all notifications?")) {

        notifications = [];

        localStorage.setItem(
            "notifications",
            JSON.stringify(notifications)
        );

        displayNotifications();

    }

});

// ===============================
// Add Notification
// (Use this function anywhere)
// ===============================

function addNotification(title, message, icon = "fa-bell") {

    notifications.unshift({

        title: title,
        message: message,
        icon: icon,
        time: new Date().toLocaleString(),
        read: false

    });

    localStorage.setItem(
        "notifications",
        JSON.stringify(notifications)
    );

    displayNotifications();

}

// ===============================
// Load
// ===============================

displayNotifications();