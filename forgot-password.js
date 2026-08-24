// =====================================
// Forgot Password
// =====================================

const forgotForm = document.getElementById("forgotForm");

forgotForm.addEventListener("submit", function(e){

    e.preventDefault();

    const email = document.getElementById("email").value;

    if(email === ""){

        alert("Please enter your email address.");

        return;

    }

    alert("Password reset link has been sent to " + email);

    forgotForm.reset();

});