import { elements } from "./elements.js";
import { createCategory, createItem, deleteCategory, deleteItem, renderItems } from "./menu.js";
import { saveMenu, getMenu, getCategories } from "./state.js";
import { createTab, renderTabs } from "./tabs.js";
const currentCategory = getCategories()
let itemToDeleteId: string | null = null;


function clearInput() {
    elements.itemName.value = ""
    elements.itemPrice.value = ""
    elements.itemCategory.value = ""
    elements.categoryName.value = ""
    elements.categoryIcon.value = ""
    elements.itemDesc.value = ""
    elements.tabNotes.value = ""
    elements.tabCustomerName.value = ""
    elements.tabTableNum.value = ""
}
elements.createItemBtn.addEventListener("click", () => {
    elements.createItemModal.style.display = "flex";
    const selectElement = elements.itemCategory;

    // 1. Maak de select eerst helemaal leeg
    selectElement.innerHTML = '<option value="">Select a category</option>';

    // 2. Voeg daarna pas de categorieën toe
    currentCategory.forEach((category) => {
        const categoryItem = document.createElement("option");
        categoryItem.value = category.name;
        categoryItem.textContent = `${category.icon} | ${category.name}`;
        selectElement.appendChild(categoryItem);
    });
});
elements.cancelItemBtn.addEventListener("click", () => {
    elements.createItemModal.style.display = "none"
    clearInput()
})
elements.closeItemBtn.addEventListener("click", () => {
    elements.createItemModal.style.display = "none"
    clearInput()
})
elements.createItemModalBtn.addEventListener("click", () => {
    if (elements.itemName.value == "" || elements.itemPrice.value == "" || elements.itemCategory.value === "") { console.log("nonono") }

    else {
        createItem(elements.itemName.value, parseFloat(elements.itemPrice.value), elements.itemCategory.value, elements.itemDesc.value)
        elements.createItemModal.style.display = "none"
        clearInput()
    }

})
elements.createCategoryBtn.addEventListener("click", () => {
    elements.categoryCreationModal.style.display = "flex"
})
elements.cancelCategorybtn.addEventListener("click", () => {
    elements.categoryCreationModal.style.display = "none"
    clearInput()
})
elements.closeCategoryCreate.addEventListener("click", () => {
    elements.categoryCreationModal.style.display = "none"
    clearInput()
})
elements.createCategoryBtnFinal.addEventListener("click", () => {
    createCategory(elements.categoryName.value, elements.categoryIcon.value)
    elements.categoryCreationModal.style.display = "none"
})
elements.cancelTabBtn.addEventListener("click", () => {
    elements.tabModal.classList.remove("is-open");
    elements.tabModal.style.display = "none";
})
elements.closeTabBtn.addEventListener("click", () => {
    elements.tabModal.classList.remove("is-open");
    elements.tabModal.style.display = "none";
})
elements.createTabBtn.addEventListener("click", () => {
    // ensure table number is passed as a number
    const tableNum = Number(elements.tabTableNum.value);
    if (!isNaN(tableNum) && elements.tabCustomerName.value) {
        createTab(elements.tabCustomerName.value, tableNum);
        // close and reset modal
        elements.tabModal.classList.remove("is-open");
        elements.tabModal.style.display = "none";
        clearInput();
        // re-render the tabs grid so the new tab appears
        renderTabs();
    } else {
        console.warn("Invalid table number or customer name");
    }
})
// debug: show button reference and log clicks
console.log("tabModalBtn element", elements.tabModalBtn);
if (elements.tabModalBtn) {
    elements.tabModalBtn.addEventListener("click", () => {
        console.log("tabModalBtn clicked");
        elements.tabModal.style.display = "flex";
        elements.tabModal.classList.add("is-open");
    });
} else {
    console.error("tabModalBtn not found in DOM");
}
console.log("ewfwefwef")
elements.deleteItemConfirm.addEventListener("click", () => {
    const id = elements.deleteItemConfirm.dataset.id
    if (id) {
        deleteItem(id)
        elements.deleteItemModal.style.display = "none";
        clearInput()
        delete elements.deleteItemConfirm.dataset.id;

    }
})
elements.deleteCategoryConfirm.addEventListener("click", () => {
    const id = elements.deleteCategoryConfirm.dataset.id;
    if (id) {
        deleteCategory(id)
        elements.deleteCategoryModal.style.display = "none"
        clearInput()
        delete elements.deleteCategoryConfirm.dataset.id
    }
})