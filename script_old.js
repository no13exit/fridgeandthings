import { askAi } from "./fridge/aiService.js";
import { createBasePromptByRole, createPrompt} from "./fridge/promptService.js";

//hack to skip auth

const basePrompt = createBasePromptByRole({
    role: "ADMIN"
});

const productInput = document.getElementById("productInput");
const addButton = document.getElementById("addButton");
const productList = document.getElementById("productList");
const showListButton = document.getElementById("showListButton");

const products = [
    "Молоко",
    "Хлеб",
    "Сыр",
    "Молоко",
    "Яйца",
    "Хлеб"
];

const dishInput = document.getElementById("dishInput");
const findMissingButton = document.getElementById("findMissingButton");
const missingProductList =
    document.getElementById("missingProductList");


// enter listeners for dish search
dishInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    findMissingProducts();
  }
});

findMissingButton.addEventListener("click", findMissingProducts);

// separate function for adding a product and adding from input
function addProduct(productName) {
    productName = productName.trim();

  if (productName === "") {
    return;
  }

  // https://developer.mozilla.org/ru/docs/Web/API/Document/querySelectorAll
  const existingItems = productList.querySelectorAll("li");

//we are doing it invidually for each item, not for the whole list

  for (const item of existingItems) {
    if (item.textContent.toLowerCase() === productName.toLowerCase()) {
    //   alert("Этот продукт уже есть в списке!");
    // alert no longer needed, we are running it in the background 
      return;
    }
  }

  const listItem = document.createElement("li");
  // https://developer.mozilla.org/ru/docs/Web/API/Node/textContent
  listItem.textContent = productName;

  listItem.addEventListener("click", () => {
    // https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle
    // мы добавялем класс purchased к элементу, на который кликаем, мини-цсс зачёркивает по наличию класса

    listItem.classList.toggle("purchased");
  });

  productList.append(listItem);
}

// separate addproduct func for missing products with duplicate check if run many times
function addMissingProduct(productName) {
    productName = productName.trim();

    if (productName === "") {
        return;
    }

    const existingItems = missingProductList.querySelectorAll("li");

    for (const item of existingItems) {
        if (
            item.textContent.trim().toLowerCase() ===
            productName.toLowerCase()
        ) {
            return;
        }
    }

    const listItem = document.createElement("li");
    listItem.textContent = productName;

    missingProductList.append(listItem);
}

//addFromInput as we trigger addProduct and do the ui stuff

function addFromInput() {
    addProduct(productInput.value);
    productInput.value = "";
    productInput.focus();
}

addButton.addEventListener("click", addFromInput);


productInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addFromInput();
  }
});


//since addProduct goes through array checking for duplicates - we can just trigger it

showListButton.addEventListener("click", () => {
    for (const product of products) {
        addProduct(product);
    }
});

// checking presense (и дублирующий функционал, надо бы дописать так, чтобы функция принимали на вход массив и куда добавить, сейчас для второго списка отдельная)

function productExists(products, productName) {
    for (let i = 0; i < products.length; i++) {
        if (
            products[i].trim().toLowerCase() ===
            productName.trim().toLowerCase()
        ) {
            return true;
        }
    }

    return false;
}



async function findMissingProducts() {
    const dishTitle = dishInput.value.trim();

    if (dishTitle === "") {
        return;
    }
//new array to get existing products
    const existingProducts = [];

//getting them from DOM
    for (const item of productList.querySelectorAll("li")) {
        existingProducts.push(item.textContent.trim());
    }

    try {
        const prompt = createPrompt(
    basePrompt,
    dishTitle,
    existingProducts
);

const answer = await askAi(prompt);
const ingredients = JSON.parse(answer);

missingProductList.replaceChildren();

for (let i = 0; i < ingredients.length; i++) {
    const ingredient = ingredients[i];

    if (productExists(existingProducts, ingredient)) {
        continue;
    }

    addMissingProduct(ingredient);
}
        
    } catch (error) {
        console.error("Не удалось получить продукты:", error);
    }
}

