window.addEventListener('beforeunload',save);

let tableBody = document.getElementById("table-body");
let links = document.querySelectorAll(".nav-link");
let views = document.querySelectorAll(".view");
let accountView = document.getElementById("accounts-view");
let addAccountView = document.getElementById("add-account-view");
let idInput = document.querySelector('[placeholder="id"]');
let nameInput = document.querySelector('[placeholder="name"]');
let lastNameInput = document.querySelector('[placeholder="lastname"]');
let emailInput = document.querySelector('[placeholder="email"]');
let phoneInput = document.querySelector('[placeholder="phone"]');
let saveBtn = document.getElementById("save");
let eId = document.querySelector(".eId");
let eName = document.querySelector(".eName");
let eLastName = document.querySelector(".eLastName");
let eEmail = document.querySelector(".eEmail");
let ePhone = document.querySelector(".ePhone");
let editBnt = document.getElementById("edit");
let id;

editBnt.addEventListener('click',saveEditAccount);
function saveEditAccount(){
    const editetAcount = {
        id : eId.value,
        name : eName.value,
        lastname : eLastName.value,
        email : eEmail.value,
        phone : ePhone.value
    }
    users[id] = editetAcount;
    createAccounts();
    showView("#accounts-view")

}

saveBtn.addEventListener('click',saveAccount);
function saveAccount(){
    const newAccount = {
        id : idInput.value,
        name : nameInput.value,
        lastname : lastNameInput.value,
        email : emailInput.value,
        phone : phoneInput.value
    }
    users.push(newAccount);
    idInput.value = "";
    nameInput.value = "";
    lastNameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";

    createAccounts();
    showView("#accounts-view")
}
  
for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click',showView);   
}

function showView(e){
    for (let i = 0; i < views.length; i++) {
        views[i].style.display = 'none';
        }

    if(e instanceof Event){
        e.preventDefault();
        let id = `#${this.getAttribute("href")}`;
        document.querySelector(id).style.display = "block";
    }
    else{
         document.querySelector(e).style.display = "block"
    }
   
  
 
}

createAccounts();

function createAccounts(){
    let htmlAccount = "";
    for (let i = 0; i< users.length; i++) {
      const account = users[i];
      htmlAccount += `
<tr>
      <td>${account.id}</td>
      <td>${account.name}</td>
      <td>${account.lastname}</td>
      <td>${account.email}</td>
      <td>${account.phone}</td>
      <td><button data-id="${i}" class="edit btn btn-sm btn-warning form-control">Edit</button></td>
      <td><button data-id="${i}" class="delete btn btn-sm btn-danger form-control">Delete</button></td>
  </tr>
      `
       
    }
    
    tableBody.innerHTML = htmlAccount;
    let allDeleteBtns = document.querySelectorAll('.delete');
    let allEditBtns = document.querySelectorAll('.edit');
    
    for (let i = 0; i < allDeleteBtns.length;i++) {
        allDeleteBtns[i].addEventListener('click',deleteAccount);
        allEditBtns[i].addEventListener('click',editAccount);
        
    }
}
function deleteAccount(){
   let id = this.getAttribute('data-id');
   users.splice(id,1);
   createAccounts();
   showView("#accounts-view");
}

function editAccount(){
  id = this.getAttribute('data-id');
 let selectedAccount = users[id];
 eId.value = selectedAccount.id;
 eName.value = selectedAccount.name;
 eLastName.value = selectedAccount.lastname;
 eEmail.value = selectedAccount.email;
 ePhone.value = selectedAccount.phone;
 showView("#edit-account-view");

}

function save(){
 localStorage.users = JSON.stringify(users);
}