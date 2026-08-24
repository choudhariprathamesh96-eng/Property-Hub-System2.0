// =====================================
// Property Hub System
// FAQ JavaScript
// =====================================

console.log("FAQ Page Loaded");

// =====================================
// FAQ ACCORDION
// =====================================

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        // Close all other FAQs
        faqItems.forEach(faq => {

            if (faq !== item) {

                faq.classList.remove("active");

            }

        });

        // Toggle current FAQ
        item.classList.toggle("active");

    });

});

// =====================================
// SEARCH FAQ
// =====================================

const searchInput = document.getElementById("searchFAQ");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        faqItems.forEach(item => {

            const question = item.querySelector(".faq-question").textContent.toLowerCase();

            const answer = item.querySelector(".faq-answer").textContent.toLowerCase();

            if (
                question.includes(value) ||
                answer.includes(value)
            ) {

                item.style.display = "block";

            } else {

                item.style.display = "none";

            }

        });

    });

}

// =====================================
// PAGE LOADED
// =====================================

console.log("FAQ Loaded Successfully");
