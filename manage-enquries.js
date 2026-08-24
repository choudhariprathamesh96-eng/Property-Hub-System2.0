// =======================================
// Property Hub System
// Manage Enquiries
// =======================================

console.log("Manage Enquiries Loaded");

let enquiries = JSON.parse(localStorage.getItem("enquiries")) || [];

const table = document.getElementById("enquiryTable");

displayEnquiries();

function displayEnquiries(){

table.innerHTML="";

if(enquiries.length===0){

table.innerHTML=`

<tr>

<td colspan="7" style="padding:30px;text-align:center;">

No Enquiries Found

</td>

</tr>

`;

return;

}

enquiries.forEach((enquiry,index)=>{

table.innerHTML+=`

<tr>

<td>${index+1}</td>

<td>${enquiry.name}</td>

<td>${enquiry.email}</td>

<td>${enquiry.property}</td>

<td>${enquiry.visitDate}</td>

<td>

<span class="status ${
enquiry.status==="Resolved"
? "active"
: "pending"
}">

${enquiry.status}

</span>

</td>

<td>

<button class="view-btn"
onclick="viewEnquiry(${index})">

View

</button>

<button class="edit-btn"
onclick="resolveEnquiry(${index})">

Resolve

</button>

<button class="delete-btn"
onclick="deleteEnquiry(${index})">

Delete

</button>

</td>

</tr>

`;

});

}

function viewEnquiry(index){

const e=enquiries[index];

alert(

"Customer : "+e.name+

"\nEmail : "+e.email+

"\nPhone : "+e.phone+

"\nProperty : "+e.property+

"\nVisit Date : "+e.visitDate+

"\n\nMessage:\n"+e.message

);

}

function resolveEnquiry(index){

enquiries[index].status="Resolved";

localStorage.setItem(

"enquiries",

JSON.stringify(enquiries)

);

displayEnquiries();

}

function deleteEnquiry(index){

if(confirm("Delete this enquiry?")){

enquiries.splice(index,1);

localStorage.setItem(

"enquiries",

JSON.stringify(enquiries)

);

displayEnquiries();

}

}