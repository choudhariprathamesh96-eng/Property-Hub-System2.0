// =======================================
// Manage Properties
// =======================================

let properties = JSON.parse(localStorage.getItem("properties")) || [];

const table = document.getElementById("propertyTable");

displayProperties();

function displayProperties(){

table.innerHTML="";

if(properties.length===0){

table.innerHTML=`
<tr>
<td colspan="7" style="text-align:center;padding:30px;">
No Properties Found
</td>
</tr>
`;

return;

}

properties.forEach((property,index)=>{

table.innerHTML+=`

<tr>

<td>

<img src="${property.image}" width="80">

</td>

<td>${property.title}</td>

<td>${property.type}</td>

<td>${property.city}</td>

<td>₹${property.price}</td>

<td>

<span class="status active">

${property.status}

</span>

</td>

<td>

<button class="view-btn"
onclick="viewProperty(${index})">

View

</button>

<button class="edit-btn"
onclick="editProperty(${index})">

Edit

</button>

<button class="delete-btn"
onclick="deleteProperty(${index})">

Delete

</button>

</td>

</tr>

`;

});

}

function deleteProperty(index){

if(confirm("Delete this property?")){

properties.splice(index,1);

localStorage.setItem("properties",JSON.stringify(properties));

displayProperties();

}

}

function editProperty(index){

localStorage.setItem("editIndex",index);

window.location.href="add-property.html";

}

function viewProperty(index){

localStorage.setItem("selectedProperty",index);

window.location.href="property-detail.html?id="+(index+1);

}