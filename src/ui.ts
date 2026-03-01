import { elements } from "./elements.js";
import { createCategory, createItem,deleteCategory,deleteItem,renderItems } from "./menu.js";
import { saveMenu, getMenu, getCategories } from "./state.js";
const currentCategory = getCategories()
let itemToDeleteId: string | null = null;


function clearInput() {
    elements.itemName.value = ""
    elements.itemPrice.value = ""
    elements.itemCategory.value = ""
    elements.categoryName.value = ""
    elements.categoryIcon.value = ""
    elements.itemDesc.value = ""

}
elements.createItemBtn.addEventListener("click", () => {
    elements.createItemModal.style.display = "flex";
    const selectElement = elements.itemCategory
    currentCategory.forEach((category) => {
        const categoryItem = document.createElement("option")
        categoryItem.value = category.name
        categoryItem.textContent = `${category.icon} | ${category.name}`
        selectElement.appendChild(categoryItem)
    })
})
elements.cancelItemBtn.addEventListener("click", () => {
    elements.createItemModal.style.display = "none"
    clearInput()
})
elements.closeItemBtn.addEventListener("click", () => {
    elements.createItemModal.style.display = "none"
    clearInput()
})
elements.createItemModalBtn.addEventListener("click", () => {
    if (elements.itemName.value == "" || elements.itemPrice.value == "" || elements.itemCategory.value === "") {console.log("nonono")}

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