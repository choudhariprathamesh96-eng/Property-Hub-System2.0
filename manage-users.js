// =======================================
// Property Hub System
// Manage Users
// =======================================

console.log("Manage Users Loaded");

let users = JSON.parse(localStorage.getItem("users")) || [];

const table = document.getElementById("userTable");

displayUsers();

function displayUsers(){

table.innerHTML="";

if(users.length===0){

table.innerHTML=`

<tr>

<td colspan="6" style="padding:30px;text-align:center;">

No Users Found

</td>

</tr>

`;

return;

}

users.forEach((user,index)=>{

table.innerHTML+=`

<tr>

<td>${index+1}</td>

<td>${user.fullname}</td>

<td>${user.email}</td>

<td>${user.mobile}</td>

<td>${user.role || "Customer"}</td>

<td>

<button class="delete-btn"
onclick="deleteUser(${index})">

Delete

</button>

</td>

</tr>

`;

});

}

function deleteUser(index){

if(confirm("Delete this user?")){

users.splice(index,1);

localStorage.setItem(
"users",
JSON.stringify(users)
);

displayUsers();

}

}