const app = document.getElementById("app");

const heading = document.createElement("h1");
heading.textContent = "Список продуктов";

const productList = document.createElement("ul");

const form = document.createElement("form");

const nameLabel = document.createElement("label");
nameLabel.textContent = "Название: ";

const nameInput = document.createElement("input");
nameLabel.append(nameInput);

const categoryLabel = document.createElement("label");
categoryLabel.textContent = "Категория: ";

const categoryInput = document.createElement("input");
categoryLabel.append(categoryInput);

const addButton = document.createElement("button");
addButton.type = "submit";
addButton.textContent = "Добавить";

//form is ready to append
form.append(nameLabel, categoryLabel, addButton);

const filters = document.createElement("div");

const allButton = document.createElement("button");
allButton.textContent = "Все";

const neededButton = document.createElement("button");
neededButton.textContent = "Нужно купить";

const boughtButton = document.createElement("button");
boughtButton.textContent = "Куплено";

//filters ready to append
filters.append(allButton, neededButton, boughtButton);

const createDraftButton = document.createElement("button");
createDraftButton.textContent = "Работа с черновиком";

const saveDraftButton = document.createElement("button");
saveDraftButton.textContent = "Сохранить";
saveDraftButton.hidden = true;

const cancelDraftButton = document.createElement("button");
cancelDraftButton.textContent = "Отменить";
cancelDraftButton.hidden = true;

const draftControls = document.createElement("div");

//draft is ready to append
draftControls.append(createDraftButton, saveDraftButton, cancelDraftButton);

const columns = document.createElement("div");
//some css for 2 columns
columns.style.display = "flex";
columns.style.gap = "40px";

const workingColumn = document.createElement("section");

const workingTitle = document.createElement("h2");
workingTitle.textContent = "Основной список";

workingColumn.append(workingTitle, productList);

const originalColumn = document.createElement("section");
originalColumn.hidden = true;

const originalTitle = document.createElement("h2");
originalTitle.textContent = "Оригинал : только просмотр";

const originalList = document.createElement("ul");

originalColumn.append(originalTitle, originalList);
columns.append(workingColumn, originalColumn);

app.append(heading, form, filters, draftControls, columns);

//fabric for products, let since we ++ later
let nextProductId = 1;

function createProduct(name, category, bought = false) {
  const product = {
    id: nextProductId,
    name: name.trim(),
    category: category.trim(),
    bought: bought,
  };

  nextProductId++;

  return product;
}

//creating some products, let as we are chnaging lists with deepcopy later

let products = [
  createProduct("Молоко", "Молочные продукты"),
  createProduct("Хлеб", "Выпечка", true),
  createProduct("Сыр", "Молочные продукты"),
  createProduct("Яблоки", "Фрукты"),
];

let currentFilter = "all";

//if draft is not created (later) - we see it falsy
let draftProducts = null;

//used later to display both containers - main and draft
function displayProducts(list, container) {
  container.replaceChildren();

  for (const product of list) {
    const li = document.createElement("li");
    //dataset id for listener
    li.dataset.id = product.id;

    if (container === productList) {
      li.style.cursor = "pointer";
    }

    li.textContent = `${product.name} : ${product.category}`;

    if (product.bought) {
      //adding ✓ only on render - not in the source data
      li.textContent += " ✓";
    }

    container.append(li);
  }
}

updateView();

function getCurrentProducts() {
  if (draftProducts !== null) {
    return draftProducts;
  }

  return products;
}

productList.addEventListener("click", (event) => {
  const li = event.target.closest("li");
  //to skip not li
  if (!li) {
    return;
  }

  const id = Number(li.dataset.id);
  toggleProduct(id);
});

function addProduct(name, category) {
  name = name.trim();
  category = category.trim();
//empty values rejected
  if (name === "" || category === "") {
    return false;
  }
  const currentProducts = getCurrentProducts();
  //no duplicates
  for (const product of currentProducts) {
    if (product.name.toLowerCase() === name.toLowerCase()) {
      return false;
    }
  }

  const product = createProduct(name, category);
  currentProducts.push(product);

  updateView();
  return true;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  //create object, boolean response
  const added = addProduct(nameInput.value, categoryInput.value);
  //if object created - reset
  if (added) {
    form.reset();
    nameInput.focus();
  }
});
//for listener to trigger once clicked - toggling bought field and rerendering the list
function toggleProduct(id) {
  const currentProducts = getCurrentProducts();

  for (const product of currentProducts) {
    if (product.id === id) {
      product.bought = !product.bought;
      break;
    }
  }

  updateView();
}
//update only view toggles - buttons, draftColumn, 
function updateView() {
  const currentProducts = getCurrentProducts();
  //reassinging variable later, let again
  let visibleProducts = currentProducts;
  //filter logic, binary right now
  if (currentFilter === "needed") {
    visibleProducts = currentProducts.filter((product) => !product.bought);
  }

  if (currentFilter === "bought") {
    visibleProducts = currentProducts.filter((product) => product.bought);
  }

  displayProducts(visibleProducts, productList);

  const editingDraft = draftProducts !== null;
//hiding things if toggled, using null in draftProducts as a condition
  originalColumn.hidden = !editingDraft;
  createDraftButton.hidden = editingDraft;
  saveDraftButton.hidden = !editingDraft;
  cancelDraftButton.hidden = !editingDraft;

  workingTitle.textContent = "Основной список";

  if (editingDraft) {
    workingTitle.textContent = "Черновик";
    displayProducts(products, originalList);
  } else {
    originalList.replaceChildren();
  }
}

//setting filter listeners
neededButton.addEventListener("click", () => {
  currentFilter = "needed";
  updateView();
});

boughtButton.addEventListener("click", () => {
  currentFilter = "bought";
  updateView();
});

allButton.addEventListener("click", () => {
  currentFilter = "all";
  updateView();
});

//draft
function createDraft() {
  //if draft is not created yet only
  if (draftProducts !== null) {
    return;
  }
  //cloning and rendering
  draftProducts = structuredClone(products);
  updateView();
}

function saveDraft() {
  if (draftProducts === null) {
    return;
  }
  //saving, resetting, rendering
  products = draftProducts;
  draftProducts = null;
  updateView();
}

function cancelDraft() {
  //resetting and rendering
  draftProducts = null;
  updateView();
}

//draft listeners
createDraftButton.addEventListener("click", createDraft);
saveDraftButton.addEventListener("click", saveDraft);
cancelDraftButton.addEventListener("click", cancelDraft);

// const deepCopy = structuredClone(products);

// console.log(products === deepCopy);       // false
// console.log(products[0] === deepCopy[0]); // false

// deepCopy[0].name = "Тест";
// console.log(products[0].name); // "Молоко"
