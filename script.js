const productInput = document.getElementById("productInput");
const addButton = document.getElementById("addButton");
const productList = document.getElementById("productList");

function addProduct() {
  const productName = productInput.value.trim();

  if (productName === "") {
    return;
  }

  // https://developer.mozilla.org/ru/docs/Web/API/Document/querySelectorAll
  const existingItems = productList.querySelectorAll("li");

  for (const item of existingItems) {
    if (item.textContent.toLowerCase() === productName.toLowerCase()) {
      alert("Этот продукт уже есть в списке!");
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

  // очищаем форму после ввода
  productInput.value = "";
  // возвращаем курсор на поле ввода (почему-то нужно только для клика, для Ент не надо)
  productInput.focus();
}

addButton.addEventListener("click", addProduct);

productInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addProduct();
  }
});
