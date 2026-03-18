import { dbCategories, dbMenu } from "./db.js";
import { tab, menu, detail } from "./elements.js";
import { createCategory, createItem, deleteCategory, deleteItem, renderCategories, renderItems } from "./menu.js";
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
    // 1. Added 'async' here so the 'await' below works
    menu.createItemBtn.addEventListener("click", async () => {
        menu.createItemModal.style.display = "flex";

        const selectElement = menu.itemCategory;

        // Clear select then populate categories
        selectElement.innerHTML = '<option value="">Select a category</option>';

        try {
            // 2. Fetch from the specific Categories database
            const result = await dbCategories.allDocs({ include_docs: true });
            
            // 3. Map the rows to usable category objects
            const allCategories = result.rows.map(row => row.doc as any);

            // 4. Use 'allCategories' (the data we just fetched) to fill the dropdown
            allCategories.forEach((category: any) => {
                const categoryItem = document.createElement("option");
                categoryItem.value = category.name;
                // Using optional chaining (?) in case icon or name are missing
                categoryItem.textContent = `${category.icon || '📁'} | ${category.name}`;
                selectElement.appendChild(categoryItem);
            });
        } catch (err) {
            console.error("Failed to load categories for dropdown:", err);
        }

        // 5. Assuming this is also async, we should await it
        await renderCategories();
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



