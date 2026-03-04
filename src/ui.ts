import { elements } from "./elements.js";
import { createCategory, createItem, deleteCategory, deleteItem, renderItems } from "./menu.js";
import { saveMenu, getMenu, getCategories } from "./state.js";
import { createTab, renderTabs } from "./tabs.js";

// IMMEDIATELY attach ALL tab modal buttons at the top
if (elements.tabModalBtn && elements.tabModal) {
    elements.tabModalBtn.addEventListener("click", () => {
        elements.tabModal.style.display = "flex";
        elements.tabModal.classList.add("is-open");
    });
}

if (elements.cancelTabBtn && elements.tabModal) {
    elements.cancelTabBtn.addEventListener("click", () => {
        elements.tabModal.classList.remove("is-open");
        elements.tabModal.style.display = "none";
    });
}

if (elements.closeTabBtn && elements.tabModal) {
    elements.closeTabBtn.addEventListener("click", () => {
        elements.tabModal.classList.remove("is-open");
        elements.tabModal.style.display = "none";
    });
}

if (elements.createTabBtn && elements.tabModal) {
    elements.createTabBtn.addEventListener("click", () => {
        const tableNum = Number(elements.tabTableNum.value);
        if (!isNaN(tableNum) && elements.tabCustomerName.value) {
            createTab(elements.tabCustomerName.value, tableNum);
            elements.tabModal.classList.remove("is-open");
            elements.tabModal.style.display = "none";
            clearInput();
            renderTabs();
        } else {
            console.warn("Invalid table number or customer name");
        }
    });
}

// Attach all other tab modal buttons
if (elements.cancelTabBtn && elements.tabModal) {
    elements.cancelTabBtn.addEventListener("click", () => {
        elements.tabModal.classList.remove("is-open");
        elements.tabModal.style.display = "none";
    });
}

if (elements.closeTabBtn && elements.tabModal) {
    elements.closeTabBtn.addEventListener("click", () => {
        elements.tabModal.classList.remove("is-open");
        elements.tabModal.style.display = "none";
    });
}

if (elements.createTabBtn && elements.tabModal) {
    elements.createTabBtn.addEventListener("click", () => {
        const tableNum = Number(elements.tabTableNum.value);
        if (!isNaN(tableNum) && elements.tabCustomerName.value) {
            createTab(elements.tabCustomerName.value, tableNum);
            elements.tabModal.classList.remove("is-open");
            elements.tabModal.style.display = "none";
            clearInput();
            renderTabs();
        } else {
            console.warn("Invalid table number or customer name");
        }
    });
}

const currentCategory = getCategories()
let itemToDeleteId: string | null = null;


function clearInput() {
    if (elements.itemName) elements.itemName.value = ""
    if (elements.itemPrice) elements.itemPrice.value = ""
    if (elements.itemCategory) elements.itemCategory.value = ""
    if (elements.categoryName) elements.categoryName.value = ""
    if (elements.categoryIcon) elements.categoryIcon.value = ""
    if (elements.itemDesc) elements.itemDesc.value = ""
    if (elements.tabNotes) elements.tabNotes.value = ""
    if (elements.tabCustomerName) elements.tabCustomerName.value = ""
    if (elements.tabTableNum) elements.tabTableNum.value = ""
}
if (elements.createItemBtn) {
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
}
if (elements.cancelItemBtn) {
    elements.cancelItemBtn.addEventListener("click", () => {
        elements.createItemModal.style.display = "none"
        clearInput()
    })
}
if (elements.closeItemBtn) {
    elements.closeItemBtn.addEventListener("click", () => {
        elements.createItemModal.style.display = "none"
        clearInput()
    })
}
if (elements.createItemModalBtn) {
    elements.createItemModalBtn.addEventListener("click", () => {
        if (elements.itemName.value == "" || elements.itemPrice.value == "" || elements.itemCategory.value === "") { console.log("nonono") }

        else {
            createItem(elements.itemName.value, parseFloat(elements.itemPrice.value), elements.itemCategory.value, elements.itemDesc.value)
            elements.createItemModal.style.display = "none"
            clearInput()
        }

    })
}
if (elements.createCategoryBtn) {
    elements.createCategoryBtn.addEventListener("click", () => {
        elements.categoryCreationModal.style.display = "flex"
    })
}
if (elements.cancelCategorybtn) {
    elements.cancelCategorybtn.addEventListener("click", () => {
        elements.categoryCreationModal.style.display = "none"
        clearInput()
    })
}
if (elements.closeCategoryCreate) {
    elements.closeCategoryCreate.addEventListener("click", () => {
        elements.categoryCreationModal.style.display = "none"
        clearInput()
    })
}
if (elements.createCategoryBtnFinal) {
    elements.createCategoryBtnFinal.addEventListener("click", () => {
        createCategory(elements.categoryName.value, elements.categoryIcon.value)
        elements.categoryCreationModal.style.display = "none"
    })
}

if (elements.deleteItemConfirm) {
    elements.deleteItemConfirm.addEventListener("click", () => {
        const id = elements.deleteItemConfirm.dataset.id
        if (id) {
            deleteItem(id)
            elements.deleteItemModal.style.display = "none";
            clearInput()
            delete elements.deleteItemConfirm.dataset.id;

        }
    })
}
if (elements.deleteCategoryConfirm) {
    elements.deleteCategoryConfirm.addEventListener("click", () => {
        const id = elements.deleteCategoryConfirm.dataset.id;
        if (id) {
            deleteCategory(id)
            elements.deleteCategoryModal.style.display = "none"
            clearInput()
            delete elements.deleteCategoryConfirm.dataset.id
        }
    })
}