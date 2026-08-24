// ==========================================
// Property Hub System
// Dark Mode
// ==========================================

const body = document.body;

// Create Toggle Button

const darkButton = document.createElement("button");

darkButton.id = "darkModeBtn";

darkButton.innerHTML = "🌙";

document.body.appendChild(darkButton);

// Load Saved Theme

if(localStorage.getItem("theme") === "dark"){

    body.classList.add("dark-mode");

    darkButton.innerHTML = "☀️";

}

// Toggle Theme

darkButton.addEventListener("click",()=>{

    body.classList.toggle("dark-mode");

    if(body.classList.contains("dark-mode")){

        localStorage.setItem("theme","dark");

        darkButton.innerHTML="☀️";

    }

    else{

        localStorage.setItem("theme","light");

        darkButton.innerHTML="🌙";

    }

});