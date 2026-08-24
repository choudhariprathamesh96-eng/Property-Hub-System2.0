// =======================================
// Property Hub - Dynamic Location Page
// =======================================

// Get Property ID
const params = new URLSearchParams(window.location.search);
const propertyId = params.get("id");

// Property Data
const properties = {

    1: {

        title: "Luxury Apartment",

        address: "Pune, Maharashtra",

        price: "₹25,000 / Month",

        bedrooms: "3 BHK",

        bathrooms: "2",

        area: "1450 Sq.ft",

        image: "../../assets/images/apartment1.jpg",

        map: "https://www.google.com/maps?q=Pune,Maharashtra&output=embed"

    },

    2: {

        title: "Modern Villa",

        address: "Mumbai, Maharashtra",

        price: "₹50,000 / Month",

        bedrooms: "5 BHK",

        bathrooms: "4",

        area: "3200 Sq.ft",

        image: "../../assets/images/vila.jpg",

        map: "https://www.google.com/maps?q=Mumbai,Maharashtra&output=embed"

    },

    3: {

        title: "Commercial Office",

        address: "Bengaluru, Karnataka",

        price: "₹1,00,000 / Month",

        bedrooms: "-",

        bathrooms: "4",

        area: "5000 Sq.ft",

        image: "../../assets/images/commercial office.jpg",

        map: "https://www.google.com/maps?q=Bengaluru,Karnataka&output=embed"

    }

};

// Default Property
const property = properties[propertyId] || properties[1];

// Load Data
document.getElementById("propertyTitle").innerHTML = property.title;

document.getElementById("propertyAddress").innerHTML = property.address;

document.getElementById("propertyPrice").innerHTML = property.price;

document.getElementById("propertyBedrooms").innerHTML = property.bedrooms;

document.getElementById("propertyBathrooms").innerHTML = property.bathrooms;

document.getElementById("propertyArea").innerHTML = property.area;

document.getElementById("propertyImage").src = property.image;

document.getElementById("mapFrame").src = property.map;