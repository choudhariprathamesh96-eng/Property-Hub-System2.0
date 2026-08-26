// ==========================================
// Property Hub System
// Owner Profile JavaScript
// ==========================================

"use strict";

console.log("Profile Page Loaded");

// ==========================================
// Elements
// ==========================================

const profileForm =
    document.getElementById("profileForm");

const profileImage =
    document.getElementById("profileImage");

const previewImage =
    document.getElementById("previewImage");

const nameInput =
    document.getElementById("name");

const emailInput =
    document.getElementById("email");

const mobileInput =
    document.getElementById("mobile");

const addressInput =
    document.getElementById("address");

const aboutInput =
    document.getElementById("about");

// ==========================================
// Default Image
// ==========================================

const DEFAULT_IMAGE =
    "icons/default-user.png";

// ==========================================
// Get Logged-In User
// ==========================================

function getLoggedInUser() {

    const userData =
        localStorage.getItem("loggedInUser");

    if (!userData) {

        console.log(
            "No logged-in user found."
        );

        window.location.href =
            "../Home/login.html";

        return null;
    }

    try {

        return JSON.parse(userData);

    } catch (error) {

        console.error(
            "Invalid logged-in user:",
            error
        );

        localStorage.removeItem(
            "loggedInUser"
        );

        window.location.href =
            "../Home/login.html";

        return null;
    }

}

// ==========================================
// Load Profile
// ==========================================

function loadProfile() {

    const user =
        getLoggedInUser();

    if (!user) {
        return;
    }

    console.log(
        "Current logged-in user:",
        user
    );

    // ======================================
    // First load login information
    // ======================================

    nameInput.value =
        user.fullname || "";

    emailInput.value =
        user.email || "";

    // ======================================
    // Load saved profile
    // ======================================

    const profileKey =
        "ownerProfile_" + user.id;

    const savedData =
        localStorage.getItem(profileKey);

    if (!savedData) {

        previewImage.src =
            DEFAULT_IMAGE;

        return;
    }

    try {

        const savedProfile =
            JSON.parse(savedData);

        // Keep login name/email
        nameInput.value =
            user.fullname ||
            savedProfile.name ||
            "";

        emailInput.value =
            user.email ||
            savedProfile.email ||
            "";

        mobileInput.value =
            savedProfile.mobile ||
            "";

        addressInput.value =
            savedProfile.address ||
            "";

        aboutInput.value =
            savedProfile.about ||
            "";

        if (
            savedProfile.image &&
            savedProfile.image.startsWith(
                "data:image"
            )
        ) {

            previewImage.src =
                savedProfile.image;

        } else {

            previewImage.src =
                DEFAULT_IMAGE;

        }

    } catch (error) {

        console.error(
            "Profile loading error:",
            error
        );

        previewImage.src =
            DEFAULT_IMAGE;

    }

}

// ==========================================
// Profile Image Preview
// ==========================================

if (profileImage) {

    profileImage.addEventListener(
        "change",
        function () {

            const file =
                this.files[0];

            if (!file) {
                return;
            }

            if (
                !file.type.startsWith("image/")
            ) {

                alert(
                    "Please select an image file."
                );

                this.value = "";

                return;
            }

            // Maximum 2 MB
            if (file.size > 2 * 1024 * 1024) {

                alert(
                    "Please select an image smaller than 2 MB."
                );

                this.value = "";

                return;
            }

            const reader =
                new FileReader();

            reader.onload =
                function (event) {

                    previewImage.src =
                        event.target.result;

                };

            reader.readAsDataURL(file);

        }
    );

}

// ==========================================
// Save Profile
// ==========================================

if (profileForm) {

    profileForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const user =
                getLoggedInUser();

            if (!user) {
                return;
            }

            const profileKey =
                "ownerProfile_" + user.id;

            const ownerProfile = {

                name:
                    user.fullname ||
                    nameInput.value.trim(),

                email:
                    user.email ||
                    emailInput.value.trim(),

                mobile:
                    mobileInput.value.trim(),

                address:
                    addressInput.value.trim(),

                about:
                    aboutInput.value.trim(),

                image:
                    previewImage.src

            };

            try {

                localStorage.setItem(
                    profileKey,
                    JSON.stringify(ownerProfile)
                );

                // Update displayed values
                nameInput.value =
                    ownerProfile.name;

                emailInput.value =
                    ownerProfile.email;

                alert(
                    "✅ Profile Saved Successfully!"
                );

                console.log(
                    "Profile saved for user:",
                    user.id
                );

            } catch (error) {

                console.error(
                    "Profile save error:",
                    error
                );

                alert(
                    "❌ Unable to save profile."
                );

            }

        }
    );

}

// ==========================================
// Reset Profile
// ==========================================

function resetProfile() {

    const user =
        getLoggedInUser();

    if (!user) {
        return;
    }

    const confirmed =
        confirm(
            "Are you sure you want to reset your profile?"
        );

    if (!confirmed) {
        return;
    }

    const profileKey =
        "ownerProfile_" + user.id;

    localStorage.removeItem(
        profileKey
    );

    // Restore login information
    nameInput.value =
        user.fullname || "";

    emailInput.value =
        user.email || "";

    mobileInput.value =
        "";

    addressInput.value =
        "";

    aboutInput.value =
        "";

    previewImage.src =
        DEFAULT_IMAGE;

    if (profileImage) {
        profileImage.value = "";
    }

    alert(
        "Profile Reset Successfully"
    );

}

// ==========================================
// Logout
// ==========================================

function logout() {

    const confirmed =
        confirm(
            "Are you sure you want to logout?"
        );

    if (!confirmed) {
        return;
    }

    // Remove login session
    localStorage.removeItem(
        "loggedInUser"
    );

    // Go to login page
    window.location.href =
        "../Home/login.html";

}

// ==========================================
// Make functions available to HTML
// ==========================================

window.resetProfile =
    resetProfile;

window.logout =
    logout;

// ==========================================
// Initialize
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadProfile();

    }
);

console.log(
    "Profile JS Loaded Successfully"
);
