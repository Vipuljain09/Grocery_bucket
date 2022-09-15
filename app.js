// ****** SELECT ITEMS **********
const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// edit option

let editElement;
let editFlag = false;
let editID = "";

// ****** EVENT LISTENERS **********

form.addEventListener("submit", addItem);

clearBtn.addEventListener("click", function () {
  
  const items = document.querySelectorAll('.grocery-item');

  if(items.length > 0){
    items.forEach(function(item){
        list.removeChild(item);
    })
  }
  displayalert('Clear list','danger');
  container.classList.remove("show-container");
  setbacktodefault();
   //   clear data from local Storage.
   localStorage.removeItem("list");
});
// ****** FUNCTIONS **********

function addItem(e) {
  e.preventDefault();
  const val = grocery.value;
  console.log(val);
  const id = new Date().getTime().toString();
  console.log(id);

  if (val && !editFlag) {
    // add the new item
    const element = document.createElement("article");
    element.classList.add("grocery-item");
    // create dataset of item.
    const attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);

    element.innerHTML = `<p class="title"> ${val} </p>
    <div class="btn-container">
      <button type="button" class="edit-btn">
      <i class="fas fa-edit"></i>
      </button>
      <button type="button" class="delete-btn">
      <i class="fas fa-trash"></i>
      </button>
      </div>`;

    // append child in list.
    list.appendChild(element);
    displayalert("item added successfully.", "success");
    // add the show-container in container.
    container.classList.add("show-container");

    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", removeItem);
    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);

    // add to local storage.
    addToLocalStorage(id, val);
    // set back to default.
    setbacktodefault();
  } else if (val && editFlag) {
    // edit the item
    console.log('edit item');
    editElement.innerHTML = val;
    displayalert('value changed successfully','success');
    // edit Local storage
    editInLocalStorage(id,val);

    setbacktodefault();

  } else {
    // Please enter value;
    displayalert("please enter the value", "danger");
  }
}

// display alert.
function displayalert(text, state) {
  alert.textContent = text;
  alert.classList.add(`alert-${state}`);

  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${state}`);
  }, 1000);
}

// remove item from list.

function removeItem(e) {
  const ele = e.currentTarget.parentElement.parentElement;
  console.log(ele);
  const delId = ele.dataset.id;
  console.log(delId);

  list.removeChild(ele);

  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  setbacktodefault();
  // remove from local storage.
  removeFromLocalStorage(delId);
  displayalert("item remove from list", "danger");
}

// edit item from list

function editItem(e) {
  const ele = e.currentTarget.parentElement.parentElement;

  editElement = e.currentTarget.parentElement.previousElementSibling;
  
  const old_val = editElement.innerHTML;
    editFlag =true;
    editID = ele.dataset.id;
  grocery.value = old_val;
  submitBtn.textContent = "edit";


}

// create-element.
// function create_element(id, val) {
//   // add the new item
//   const element = document.createElement("article");
//   element.classList.add("grocery-item");
//   // create dataset of item.
//   const attr = document.createAttribute("data-id");
//   attr.value = id;
//   element.setAttributeNode(attr);

//   element.innerHTML = `<p class="title"> ${val} </p>
//     <div class="btn-container">
//       <button type="button" class="edit-btn">
//       <i class="fas fa-edit"></i>
//       </button>
//       <button type="button" class="delete-btn">
//       <i class="fas fa-trash"></i>
//       </button>
//       </div>`;

//   // append child in list.
//   list.appendChild(element);
// }
// set back to defalut.

function setbacktodefault() {
  editFlag = false;
  editID = "";
  submitBtn.textContent = "submit";
  grocery.value = "";
}



// ****** LOCAL STORAGE **********

function addToLocalStorage(id, val) {
    const grocery ={id:id,val:val};

    const items = getLocalstorage();

    items.push(grocery);
    localStorage.setItem("list",JSON.stringify(items));

}

function removeFromLocalStorage(id) {

    const items = getLocalstorage();

    const new_items = items.filter(function(item){
        if(item.dataset.id !== id){
            return item;
        }
    })

    localStorage.setItem(JSON.stringify("list",new_items));
}

function editInLocalStorage(id,val) {}

function getLocalstorage(){
    return localStorage.getItem("list")?JSON.parse(localStorage.getItem("list")):[];
}
// ****** SETUP ITEMS **********
