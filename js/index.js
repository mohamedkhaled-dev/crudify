//CRUDS APP
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productDesc = document.getElementById("productDesc");
var productCategory = document.getElementById("productCategory");
var productImage = document.getElementById("productImage");
var productData = document.getElementById("productData");
var searchInput = document.getElementById("searchInput");
var createBtn = document.getElementById("createBtn");
var updateBtn = document.getElementById("updateBtn");
var modalOverlay = document.getElementById("modalOverlay");
var modalInfo = document.getElementById("modalInfo");
var productList = [];
var updateIndex = -1;

if (localStorage.getItem("products")) {
  productList = JSON.parse(localStorage.getItem("products"));

  if (productList.length === 0) {
    localStorage.removeItem("products");
  } else {
    displayProduct(productList);
  }
}

function createProduct() {
  if (!emptyFieldsCheck()) {
    return;
  }

  var product = {
    name: productName.value,
    price: productPrice.value,
    desc: productDesc.value,
    category: productCategory.value,
    image: `images/${productImage.files[0]?.name}`,
  };

  productList.push(product);
  clearForm();
  displayProduct(productList);
  updateLocalStorage();
}

function displayProduct(productsArr) {
  var box = "";
  for (var i = 0; i < productsArr.length; i++) {
    box += `        
        <div class="col-xl-3 col-lg-4 col-sm-6">
          <div class="card border-light shadow-sm overflow-hidden d-flex flex-column h-100">
            <img src="${productsArr[i].image}" alt="Product Image" class="card-img-top rounded-top shadow-sm">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${productsArr[i].name}</h5>
              <p class="card-text text-muted">${productsArr[i].desc}</p>
            </div>
            <div class="card-footer bg-transparent border-0 d-flex flex-column mt-auto">
              <!-- Category and Price -->
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="text-muted fw-bold">${productsArr[i].category}</span>
                <span class="text-danger">$${productsArr[i].price}</span>
              </div>
  
              <!-- Buttons -->
              <div class="btn-group d-flex justify-content-center gap-2 mt-2">
                <button class="btn btn-outline-danger rounded-1 d-flex justify-content-center align-items-center gap-1" onclick="deleteProduct(${i});">
                  <i class="fas fa-trash-alt"></i> Delete
                </button>
                <button class="btn btn-outline-warning rounded-1 d-flex justify-content-center align-items-center gap-1" onclick="setFormForUpdate(${i});">
                  <i class="fas fa-edit"></i> Edit
                </button>
              </div>
            </div>
          </div>
        </div>
        `;
  }

  productData.innerHTML = box;
}

function setFormForUpdate(productIndex) {
  updateBtn.classList.remove("d-none");
  createBtn.classList.add("d-none");
  productName.value = productList[productIndex].name;
  productPrice.value = productList[productIndex].price;
  productDesc.value = productList[productIndex].desc;
  productCategory.value = productList[productIndex].category;
  productImage.value = "";

  updateIndex = productIndex;
}

function updateProduct(updateIndex) {
  if (!emptyFieldsCheck()) {
    return;
  }
  productList[updateIndex].name = productName.value;
  productList[updateIndex].price = productPrice.value;
  productList[updateIndex].desc = productDesc.value;
  productList[updateIndex].category = productCategory.value;
  productList[updateIndex].image = `images/${productImage.files[0]?.name}`;
  createBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");

  updateLocalStorage();
  clearForm();
  displayProduct(productList);
  updateIndex = -1;
}

function deleteProduct(deleteIndex) {
  productList.splice(deleteIndex, 1);
  updateLocalStorage();
  displayProduct(productList);
}

function searchProduct() {
  var searchList = [];
  for (var i = 0; i < productList.length; i++) {
    if (
      productList[i].name
        .toLowerCase()
        .includes(searchInput.value.toLowerCase())
    ) {
      searchList.push(productList[i]);
    }
  }

  displayProduct(searchList);
}

function clearForm() {
  productName.value = "";
  productPrice.value = "";
  productDesc.value = "";
  productCategory.value = "";
  productImage.value = "";
}

function emptyFieldsCheck() {
  if (
    !productName.value ||
    !productPrice.value ||
    !productDesc.value ||
    !productCategory.value ||
    !productImage.files[0]
  ) {
    modalOverlay.classList.remove("d-none");
    modalInfo.classList.remove("d-none");
    return false;
  }
  return true;
}

function closeInfo() {
  modalOverlay.classList.add("d-none");
  modalInfo.classList.add("d-none");

  displayProduct(productList);
}

function updateLocalStorage() {
  localStorage.setItem("products", JSON.stringify(productList));
}
