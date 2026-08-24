// =======================================
// Property Hub System
// Authentication JavaScript
// =======================================

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");


// =======================================
// SHOW REGISTER
// =======================================

if (showRegister && loginForm && registerForm) {

    showRegister.addEventListener("click", function (e) {

        e.preventDefault();

        loginForm.classList.remove("active");
        registerForm.classList.add("active");

    });

}


// =======================================
// SHOW LOGIN
// =======================================

if (showLogin && loginForm && registerForm) {

    showLogin.addEventListener("click", function (e) {

        e.preventDefault();

        registerForm.classList.remove("active");
        loginForm.classList.add("active");

    });

}


// =======================================
// REGISTER
// =======================================

if (registerForm) {

    registerForm.addEventListener("submit", function (e) {

        e.preventDefault();


        const fullnameElement =
            document.getElementById("fullname");

        const mobileElement =
            document.getElementById("mobile");

        const emailElement =
            document.getElementById("registerEmail");

        const passwordElement =
            document.getElementById("registerPassword");

        const confirmPasswordElement =
            document.getElementById("confirmPassword");


        // Check elements exist

        if (
            !fullnameElement ||
            !mobileElement ||
            !emailElement ||
            !passwordElement ||
            !confirmPasswordElement
        ) {

            alert("Registration form fields are missing.");
            return;

        }


        const fullname =
            fullnameElement.value.trim();

        const mobile =
            mobileElement.value.trim();

        const email =
            emailElement.value.trim();

        const password =
            passwordElement.value.trim();

        const confirmPassword =
            confirmPasswordElement.value.trim();


        // ===================================
        // VALIDATION
        // ===================================

        if (fullname === "") {

            alert("Please enter Full Name.");
            return;

        }


        if (!/^[0-9]{10}$/.test(mobile)) {

            alert("Enter valid 10 digit Mobile Number.");
            return;

        }


        if (email === "") {

            alert("Please enter Email.");
            return;

        }


        if (password.length < 6) {

            alert("Password must contain at least 6 characters.");
            return;

        }


        if (password !== confirmPassword) {

            alert("Passwords do not match.");
            return;

        }


        // ===================================
        // CHECK EXISTING USER
        // ===================================

        let existingUser = null;

        try {

            existingUser =
                JSON.parse(
                    localStorage.getItem("propertyHubUser")
                );

        } catch (error) {

            console.error(
                "Error reading registered user:",
                error
            );

        }


        if (
            existingUser &&
            existingUser.email &&
            existingUser.email.toLowerCase() ===
            email.toLowerCase()
        ) {

            alert(
                "An account with this email already exists."
            );

            return;

        }


        // ===================================
        // CREATE USER
        // ===================================

        const user = {

            fullname: fullname,

            mobile: mobile,

            email: email,

            password: password

        };


        // ===================================
        // SAVE USER
        // ===================================

        localStorage.setItem(
            "propertyHubUser",
            JSON.stringify(user)
        );


        alert(
            "✅ Registration Successful!\n\n" +
            "You can now login."
        );


        // ===================================
        // RESET FORM
        // ===================================

        registerForm.reset();


        // ===================================
        // SHOW LOGIN
        // ===================================

        if (loginForm) {

            registerForm.classList.remove("active");

            loginForm.classList.add("active");

        }

    });

}


// =======================================
// LOGIN
// =======================================

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();


        const emailElement =
            document.getElementById("loginEmail");

        const passwordElement =
            document.getElementById("loginPassword");


        // Check fields

        if (!emailElement || !passwordElement) {

            alert("Login form fields are missing.");
            return;

        }


        const email =
            emailElement.value.trim();

        const password =
            passwordElement.value.trim();


        // ===================================
        // VALIDATION
        // ===================================

        if (email === "") {

            alert("Please enter your Email.");
            return;

        }


        if (password === "") {

            alert("Please enter your Password.");
            return;

        }


        // ===================================
        // GET REGISTERED USER
        // ===================================

        let storedUser = null;

        try {

            storedUser =
                JSON.parse(
                    localStorage.getItem("propertyHubUser")
                );

        } catch (error) {

            console.error(
                "Error reading user data:",
                error
            );

        }


        if (!storedUser) {

            alert(
                "No account found.\n\n" +
                "Please register first."
            );

            return;

        }


        // ===================================
        // CHECK EMAIL
        // ===================================

        if (
            !storedUser.email ||
            storedUser.email.toLowerCase() !==
            email.toLowerCase()
        ) {

            alert("Incorrect email or password.");
            return;

        }


        // ===================================
        // CHECK PASSWORD
        // ===================================

        if (storedUser.password !== password) {

            alert("Incorrect email or password.");
            return;

        }


        // ===================================
        // SAVE LOGGED-IN USER
        // ===================================

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(storedUser)
        );


        // ===================================
        // LOGIN SUCCESSFUL
        // ===================================

        alert(
            "✅ Login Successful!\n\n" +
            "Welcome " +
            storedUser.fullname +
            "!"
        );


        // ===================================
        // GO TO OWNER DASHBOARD
        // ===================================

        window.location.href =
            "../Owner/owner-dashboard.html";

    });

}