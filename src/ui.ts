import { elements } from "./elements.js";
import { createCategory, createItem } from "./menu.js";
import { saveMenu, getMenu, getCategories} from "./state.js";
const currentCategory = getCategories()

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
})
elements.closeItemBtn.addEventListener("click", () => {
    elements.createItemModal.style.display = "none"
})
elements.createItemModalBtn.addEventListener("click", () => {
    if (elements.itemName.value != "" && elements.itemPrice.value != "" && elements.itemCategory.value != ">— Select category —<" || "") {
        createItem(elements.itemName.value, parseFloat(elements.itemPrice.value), elements.itemCategory.value)
        elements.createItemModal.style.display = "none"
    }
    else (console.log("wefewf"))
})
elements.createCategoryBtn.addEventListener("click", () => {
    elements.categoryCreationModal.style.display = "flex"
})
elements.cancelCategorybtn.addEventListener("click", () => {
    elements.categoryCreationModal.style.display = "none"
})
elements.closeCategoryCreate.addEventListener("click", () => {
    elements.categoryCreationModal.style.display = "none"
})
elements.createCategoryBtnFinal.addEventListener("click", () => {
    createCategory(elements.categoryName.value, elements.categoryIcon.value)
    elements.categoryCreationModal.style.display = "none"
})