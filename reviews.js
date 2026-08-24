// ==========================================
// Property Hub System
// Reviews JavaScript
// ==========================================

console.log("Reviews Module Loaded");

// ===============================
// Local Storage
// ===============================

let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

// Selected Rating
let selectedRating = 0;

// Elements
const reviewForm = document.getElementById("reviewForm");
const reviewContainer = document.getElementById("reviewContainer");
const averageRating = document.getElementById("averageRating");
const totalReviews = document.getElementById("totalReviews");
const stars = document.querySelectorAll(".star");

// ==========================================
// Star Rating
// ==========================================

stars.forEach((star) => {

    star.addEventListener("click", function () {

        selectedRating = Number(this.dataset.value);

        stars.forEach((s) => {

            s.classList.remove("fa-solid");
            s.classList.add("fa-regular");

            if (Number(s.dataset.value) <= selectedRating) {

                s.classList.remove("fa-regular");
                s.classList.add("fa-solid");
                s.style.color = "#FFD700";

            }

        });

    });

});

// ==========================================
// Submit Review
// ==========================================

reviewForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("reviewerName").value.trim();
    const title = document.getElementById("reviewTitle").value.trim();
    const message = document.getElementById("reviewMessage").value.trim();

    if (selectedRating === 0) {

        alert("Please select a rating.");
        return;

    }

    const review = {

        name: name,
        title: title,
        message: message,
        rating: selectedRating,
        likes: 0,
        date: new Date().toLocaleDateString()

    };

    reviews.unshift(review);

    localStorage.setItem("reviews", JSON.stringify(reviews));

    reviewForm.reset();

    selectedRating = 0;

    stars.forEach((s) => {

        s.classList.remove("fa-solid");
        s.classList.add("fa-regular");
        s.style.color = "#ccc";

    });

    displayReviews();

});

// ==========================================
// Display Reviews
// ==========================================

function displayReviews() {

    reviewContainer.innerHTML = "";

    if (reviews.length === 0) {

        reviewContainer.innerHTML = `
            <div class="review-card">
                <h3>No Reviews Yet</h3>
                <p>Be the first to review this property.</p>
            </div>
        `;

        averageRating.textContent = "0.0";
        totalReviews.textContent = "0";

        return;

    }

    let total = 0;

    reviews.forEach((review, index) => {

        total += review.rating;

        let starHTML = "";

        for (let i = 1; i <= 5; i++) {

            if (i <= review.rating) {

                starHTML += `<i class="fa-solid fa-star"></i>`;

            } else {

                starHTML += `<i class="fa-regular fa-star"></i>`;

            }

        }

        reviewContainer.innerHTML += `

        <div class="review-card">

            <div class="review-header">

                <div class="review-user">

                    <img src="../assets/images/default-user.png" alt="User">

                    <div>

                        <div class="review-name">${review.name}</div>

                        <div class="review-date">${review.date}</div>

                    </div>

                </div>

            </div>

            <div class="review-stars">

                ${starHTML}

            </div>

            <div class="review-title">

                ${review.title}

            </div>

            <div class="review-message">

                ${review.message}

            </div>

            <div class="review-actions">

                <button onclick="likeReview(${index})">

                    ❤️ Like (${review.likes})

                </button>

                <button onclick="deleteReview(${index})">

                    🗑 Delete

                </button>

            </div>

        </div>

        `;

    });

    averageRating.textContent = (total / reviews.length).toFixed(1);

    totalReviews.textContent = reviews.length;

}

// ==========================================
// Like Review
// ==========================================

function likeReview(index) {

    reviews[index].likes++;

    localStorage.setItem("reviews", JSON.stringify(reviews));

    displayReviews();

}

// ==========================================
// Delete Review
// ==========================================

function deleteReview(index) {

    if (confirm("Delete this review?")) {

        reviews.splice(index, 1);

        localStorage.setItem("reviews", JSON.stringify(reviews));

        displayReviews();

    }

}

// ==========================================
// Load Reviews
// ==========================================

displayReviews();