// ===================================
// Admin Profile
// ===================================

console.log("Admin Profile Loaded");

const form = document.getElementById("adminProfileForm");

let admin = JSON.parse(localStorage.getItem("admin")) || {

name:"Administrator",

email:"admin@propertyhub.com",

phone:"9876543210",

password:""

};

// Load Existing Data

document.getElementById("adminName").value = admin.name;

document.getElementById("adminEmail").value = admin.email;

document.getElementById("adminPhone").value = admin.phone;

form.addEventListener("submit",function(e){

e.preventDefault();

admin.name=document.getElementById("adminName").value;

admin.email=document.getElementById("adminEmail").value;

admin.phone=document.getElementById("adminPhone").value;

admin.password=document.getElementById("adminPassword").value;

localStorage.setItem(

"admin",

JSON.stringify(admin)

);

alert("Profile Updated Successfully.");

});