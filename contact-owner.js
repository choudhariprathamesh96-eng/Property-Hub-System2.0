// =======================================
// Property Hub System
// Contact Owner JavaScript
// =======================================

console.log("Contact Owner Loaded");

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const property = document.getElementById("property").value.trim();
        const visitDate = document.getElementById("visitDate").value;
        const message = document.getElementById("message").value.trim();

        if (
            name === "" ||
            email === "" ||
            phone === "" ||
            property === "" ||
            visitDate === "" ||
            message === ""
        ) {
            alert("Please fill all fields.");
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            alert("Enter a valid email.");
            return;
        }

        if (phone.length !== 10 || isNaN(phone)) {
            alert("Enter a valid 10-digit mobile number.");
            return;
        }

        const today = new Date().toISOString().split("T")[0];

        if (visitDate < today) {
            alert("Visit date cannot be in the past.");
            return;
        }

        const enquiry = {
            name,
            email,
            phone,
            property,
            visitDate,
            message,
            status: "Pending"
        };

        let enquiries = JSON.parse(localStorage.getItem("enquiries")) || [];

        enquiries.push(enquiry);

        localStorage.setItem("enquiries", JSON.stringify(enquiries));

        alert("Enquiry Sent Successfully!");

        contactForm.reset();

    });

}