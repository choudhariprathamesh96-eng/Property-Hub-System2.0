// Search Properties

const propertySearchButton = document.getElementById("searchBtn");

if (propertySearchButton) {

    propertySearchButton.addEventListener("click", function () {

        const search = document
            .getElementById("searchInput")
            .value
            .toLowerCase();

        const cards = document.querySelectorAll(".property-card");

        cards.forEach(card => {

            if (card.textContent.toLowerCase().includes(search)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    });

}