// =====================================
// Property Hub System
// Add / Edit Property - API + Image Upload
// =====================================

console.log("Add / Edit Property Page Loaded");

// =====================================
// API
// =====================================

const PROPERTY_API = "http://localhost:8080/properties";
const UPLOAD_API = "http://localhost:8080/upload";

// =====================================
// Get Form Elements
// =====================================

const propertyForm = document.getElementById("propertyForm");
const imageInput = document.getElementById("image");
const previewImage = document.getElementById("previewImage");

// =====================================
// Check Edit Mode
// =====================================

const urlParams = new URLSearchParams(window.location.search);
const editId = urlParams.get("id");
const isEditMode = editId !== null;

console.log("Edit Mode:", isEditMode);
console.log("Property ID:", editId);

// =====================================
// Load Existing Property For Edit
// =====================================

async function loadPropertyForEdit() {

    if (!isEditMode) {
        return;
    }

    try {

        const response = await fetch(
            `${PROPERTY_API}/${editId}`
        );

        if (!response.ok) {
            throw new Error(
                "Property not found. Status: " +
                response.status
            );
        }

        const property = await response.json();

        console.log(
            "Property loaded for editing:",
            property
        );

        // =====================================
        // Basic Details
        // =====================================

        document.getElementById("title").value =
            property.title || "";

        document.getElementById("description").value =
            property.description || "";

        document.getElementById("price").value =
            property.price || "";

        document.getElementById("city").value =
            property.location || "";

        // =====================================
        // Location
        // =====================================

        document.getElementById("state").value =
            property.state || "";

        document.getElementById("address").value =
            property.address || "";

        // =====================================
        // Property Details
        // =====================================

        document.getElementById("type").value =
            property.type || "Apartment";

        document.getElementById("status").value =
            property.status || "For Rent";

        document.getElementById("area").value =
            property.area || "";

        document.getElementById("floor").value =
            property.floor || "";

        document.getElementById("bedrooms").value =
            property.bedrooms || "";

        document.getElementById("bathrooms").value =
            property.bathrooms || "";

        // =====================================
        // Other Details
        // =====================================

        document.getElementById("parking").value =
            property.parking || "Available";

        document.getElementById("furnished").value =
            property.furnished || "Fully Furnished";

        document.getElementById("owner").value =
            property.owner || "";

        document.getElementById("mobile").value =
            property.mobile || "";

        // =====================================
        // Existing Image
        // =====================================

        if (previewImage && property.image) {

            previewImage.src =
                `../../assets/images/${property.image}`;

        }

        // =====================================
        // Change Page Heading
        // =====================================

        const heading =
            document.querySelector("h1");

        if (heading) {

            heading.innerHTML =
                `<i class="fa-solid fa-pen"></i>
                 Edit Property`;

        }

        // =====================================
        // Change Submit Button
        // =====================================

        const submitButton =
            propertyForm.querySelector(
                "button[type='submit']"
            );

        if (submitButton) {

            submitButton.innerHTML =
                `<i class="fa-solid fa-save"></i>
                 Update Property`;

        }

    } catch (error) {

        console.error(
            "Error loading property:",
            error
        );

        alert(
            "Unable to load property for editing.\n\n" +
            error.message
        );

    }

}

// =====================================
// Image Preview
// =====================================

if (imageInput) {

    imageInput.addEventListener(
        "change",
        function () {

            const file = this.files[0];

            if (!file) {
                return;
            }

            // Check image type

            if (!file.type.startsWith("image/")) {

                alert(
                    "Please select a valid image."
                );

                this.value = "";

                return;
            }

            // Preview image

            const reader = new FileReader();

            reader.onload = function (event) {

                if (previewImage) {

                    previewImage.src =
                        event.target.result;

                }

            };

            reader.readAsDataURL(file);

        }
    );

}

// =====================================
// Submit Form
// =====================================

if (propertyForm) {

    propertyForm.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();

            console.log(
                "Property form submitted."
            );

            try {

                // =====================================
                // Get Form Values
                // =====================================

                const title =
                    document.getElementById("title")
                        .value.trim();

                const description =
                    document.getElementById("description")
                        .value.trim();

                const price =
                    Number(
                        document.getElementById("price")
                            .value
                    );

                const city =
                    document.getElementById("city")
                        .value.trim();

                const state =
                    document.getElementById("state")
                        .value.trim();

                const address =
                    document.getElementById("address")
                        .value.trim();

                const type =
                    document.getElementById("type")
                        .value;

                const status =
                    document.getElementById("status")
                        .value;

                const area =
                    Number(
                        document.getElementById("area")
                            .value
                    ) || 0;

                const floor =
                    Number(
                        document.getElementById("floor")
                            .value
                    ) || 0;

                const bedrooms =
                    Number(
                        document.getElementById("bedrooms")
                            .value
                    ) || 0;

                const bathrooms =
                    Number(
                        document.getElementById("bathrooms")
                            .value
                    ) || 0;

                const parking =
                    document.getElementById("parking")
                        .value;

                const furnished =
                    document.getElementById("furnished")
                        .value;

                const owner =
                    document.getElementById("owner")
                        .value.trim();

                const mobile =
                    document.getElementById("mobile")
                        .value.trim();

                // =====================================
                // Validation
                // =====================================

                if (title === "") {

                    alert(
                        "Please enter property title."
                    );

                    return;
                }

                if (description === "") {

                    alert(
                        "Please enter property description."
                    );

                    return;
                }

                if (!price || price <= 0) {

                    alert(
                        "Please enter a valid price."
                    );

                    return;
                }

                if (city === "") {

                    alert(
                        "Please enter city."
                    );

                    return;
                }

                if (area <= 0) {

                    alert(
                        "Please enter a valid area."
                    );

                    return;
                }

                // =====================================
                // Image Name
                // =====================================

                let imageName =
                    "apartment1.png";

                // =====================================
                // Get Existing Image During Edit
                // =====================================

                if (isEditMode) {

                    const existingResponse =
                        await fetch(
                            `${PROPERTY_API}/${editId}`
                        );

                    if (existingResponse.ok) {

                        const existingProperty =
                            await existingResponse.json();

                        imageName =
                            existingProperty.image ||
                            "apartment1.png";

                    }

                }

                // =====================================
                // Upload New Image
                // =====================================

                if (
                    imageInput &&
                    imageInput.files.length > 0
                ) {

                    const file =
                        imageInput.files[0];

                    console.log(
                        "Uploading image:",
                        file.name
                    );

                    const formData =
                        new FormData();

                    formData.append(
                        "image",
                        file
                    );

                    const uploadResponse =
                        await fetch(
                            UPLOAD_API,
                            {
                                method: "POST",
                                body: formData
                            }
                        );

                    if (!uploadResponse.ok) {

                        const errorText =
                            await uploadResponse.text();

                        throw new Error(
                            "Image upload failed: " +
                            errorText
                        );

                    }

                    imageName =
                        (
                            await uploadResponse.text()
                        ).trim();

                    console.log(
                        "Image uploaded successfully:",
                        imageName
                    );

                }

                // =====================================
                // Create Property Object
                // =====================================

                const property = {

                    title: title,

                    description: description,

                    location: city,

                    state: state,

                    address: address,

                    price: price,

                    type: type,

                    status: status,

                    area: area,

                    floor: floor,

                    bedrooms: bedrooms,

                    bathrooms: bathrooms,

                    parking: parking,

                    furnished: furnished,

                    owner: owner,

                    mobile: mobile,

                    image: imageName

                };

                // =====================================
                // Debug
                // =====================================

                console.log(
                    "Property being sent to backend:",
                    property
                );

                // =====================================
                // ADD OR UPDATE
                // =====================================

                let response;

                if (isEditMode) {

                    console.log(
                        "Updating property ID:",
                        editId
                    );

                    response =
                        await fetch(
                            `${PROPERTY_API}/${editId}`,
                            {
                                method: "PUT",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify(property)
                            }
                        );

                } else {

                    console.log(
                        "Adding new property..."
                    );

                    response =
                        await fetch(
                            PROPERTY_API,
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify(property)
                            }
                        );

                }

                // =====================================
                // Check Backend Response
                // =====================================

                if (!response.ok) {

                    const errorText =
                        await response.text();

                    throw new Error(
                        "Server error " +
                        response.status +
                        ": " +
                        errorText
                    );

                }

                const savedProperty =
                    await response.json();

                console.log(
                    "Property saved successfully:",
                    savedProperty
                );

                // =====================================
                // Success Message
                // =====================================

                if (isEditMode) {

                    alert(
                        "✅ Property updated successfully!"
                    );

                } else {

                    alert(
                        "✅ Property added successfully!"
                    );

                }

                // =====================================
                // Go To My Properties
                // =====================================

                window.location.href =
                    "my-properties.html";

            } catch (error) {

                console.error(
                    "Add/Edit Property Error:",
                    error
                );

                alert(
                    "❌ Unable to save property.\n\n" +
                    error.message
                );

            }

        }
    );

}

// =====================================
// Start Page
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadPropertyForEdit();

    }
);