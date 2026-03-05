import { tab, menu, detail } from "./elements.js";
import { createCategory, createItem, deleteCategory, deleteItem, renderItems } from "./menu.js";
import { saveMenu, getMenu, getCategories } from "./state.js";
import { createTab, renderitems, renderTabs } from "./tabs.js";
import { renderCategoriesSidebar } from "./tabs.js";

// attach tab modal buttons
if (tab.tabModalBtn && tab.tabModal) {
    tab.tabModalBtn.addEventListener("click", () => {
        tab.tabModal.style.display = "flex";
        tab.tabModal.classList.add("is-open");
    });
}

if (tab.cancelTabBtn && tab.tabModal) {
    tab.cancelTabBtn.addEventListener("click", () => {
        tab.tabModal.classList.remove("is-open");
        tab.tabModal.style.display = "none";
    });
}

if (tab.closeTabBtn && tab.tabModal) {
    tab.closeTabBtn.addEventListener("click", () => {
        tab.tabModal.classList.remove("is-open");
        tab.tabModal.style.display = "none";
    });
}

if (tab.createTabBtn && tab.tabModal) {
    tab.createTabBtn.addEventListener("click", () => {
        const tableNum = Number(tab.tabTableNum.value);
        if (!isNaN(tableNum) && tab.tabCustomerName.value) {
            createTab(tab.tabCustomerName.value, tableNum);
            tab.tabModal.classList.remove("is-open");
            tab.tabModal.style.display = "none";
            clearInput();
            renderTabs();
        } else {
            console.warn("Invalid table number or customer name");
        }
    });
}

const currentCategory = getCategories();
let itemToDeleteId: string | null = null;

function clearInput() {
    if (menu.itemName) menu.itemName.value = "";
    if (menu.itemPrice) menu.itemPrice.value = "";
    if (menu.itemCategory) menu.itemCategory.value = "";
    if (menu.categoryName) menu.categoryName.value = "";
    if (menu.categoryIcon) menu.categoryIcon.value = "";
    if (menu.itemDesc) menu.itemDesc.value = "";
    if (tab.tabNotes) tab.tabNotes.value = "";
    if (tab.tabCustomerName) tab.tabCustomerName.value = "";
    if (tab.tabTableNum) tab.tabTableNum.value = "";
}

if (menu.createItemBtn) {
    menu.createItemBtn.addEventListener("click", () => {
        menu.createItemModal.style.display = "flex";

        const selectElement = menu.itemCategory;

        // empty select then populate categories
        selectElement.innerHTML = '<option value="">Select a category</option>';

        currentCategory.forEach((category) => {
            const categoryItem = document.createElement("option");
            categoryItem.value = category.name;
            categoryItem.textContent = `${category.icon} | ${category.name}`;
            selectElement.appendChild(categoryItem);
        });
        renderCategoriesSidebar()
    });
}

if (menu.cancelItemBtn) {
    menu.cancelItemBtn.addEventListener("click", () => {
        menu.createItemModal.style.display = "none";
        clearInput();
    });
}

if (menu.closeItemBtn) {
    menu.closeItemBtn.addEventListener("click", () => {
        menu.createItemModal.style.display = "none";
        clearInput();
    });
}

if (menu.createItemModalBtn) {
    menu.createItemModalBtn.addEventListener("click", () => {
        if (
            menu.itemName.value === "" ||
            menu.itemPrice.value === "" ||
            menu.itemCategory.value === ""
        ) {
            console.log("nonono");
        } else {
            createItem(
                menu.itemName.value,
                parseFloat(menu.itemPrice.value),
                menu.itemCategory.value,
                menu.itemDesc.value
            );
            menu.createItemModal.style.display = "none";
            clearInput();
        }
    });
}

if (menu.createCategoryBtn) {
    menu.createCategoryBtn.addEventListener("click", () => {
        menu.categoryCreationModal.style.display = "flex";
    });
}

if (menu.cancelCategorybtn) {
    menu.cancelCategorybtn.addEventListener("click", () => {
        menu.categoryCreationModal.style.display = "none";
        clearInput();
    });
}

if (menu.closeCategoryCreate) {
    menu.closeCategoryCreate.addEventListener("click", () => {
        menu.categoryCreationModal.style.display = "none";
        clearInput();
    });
}

if (menu.createCategoryBtnFinal) {
    menu.createCategoryBtnFinal.addEventListener("click", () => {
        createCategory(menu.categoryName.value, menu.categoryIcon.value);
        menu.categoryCreationModal.style.display = "none";
    });
}

if (menu.deleteItemConfirm) {
    menu.deleteItemConfirm.addEventListener("click", () => {
        const id = menu.deleteItemConfirm.dataset.id;
        if (id) {
            deleteItem(id);
            menu.deleteItemModal.style.display = "none";
            clearInput();
            delete menu.deleteItemConfirm.dataset.id;
        }
    });
}

if (menu.deleteCategoryConfirm) {
    menu.deleteCategoryConfirm.addEventListener("click", () => {
        const id = menu.deleteCategoryConfirm.dataset.id;
        if (id) {
            deleteCategory(id);
            menu.deleteCategoryModal.style.display = "none";
            clearInput();
            delete menu.deleteCategoryConfirm.dataset.id;
        }
    });
}
// only attach order-item listener on detail page
if (detail.addOrderItemBtn && detail.AddItemModal) {
    detail.addOrderItemBtn.addEventListener("click", () => {
        quantity = 1;
        detail.totalQuantity.textContent = quantity.toString();
        detail.AddItemModal.style.display = "flex";
        renderCategoriesSidebar()
        renderitems()
    });
}
if (detail.closeChooseItem) {
    detail.closeChooseItem.addEventListener("click", () => {
        detail.AddItemModal.style.display = "none"
    })
}
if (detail.cancelAddItemBtn) {
    detail.cancelAddItemBtn.addEventListener("click", () => {
        detail.AddItemModal.style.display = "none"
    })
}
let quantity: number = 1
console.log(quantity)
if (detail.morequantityBtn) {
    detail.morequantityBtn.addEventListener("click", () => {
        quantity++
        detail.totalQuantity.textContent = quantity.toString()
    })
}
detail.AddtoTabFinal.addEventListener("click", () => {
    quantity = 1
    detail.totalQuantity.textContent = quantity.toString()
})
if (detail.closeChooseItem) detail.closeChooseItem.addEventListener("click", () => { quantity = 1; detail.totalQuantity.textContent = quantity.toString(); console.log("wefhj") })
if (detail.cancelAddItemBtn) detail.cancelAddItemBtn.addEventListener("click", () => { quantity = 1; detail.totalQuantity.textContent = quantity.toString() })


if (detail.lessquantityBtn) {
    detail.lessquantityBtn.addEventListener("click", () => {
        quantity--
        if (quantity <= 0) quantity = 1
        detail.totalQuantity.textContent = quantity.toString()
    })
}


