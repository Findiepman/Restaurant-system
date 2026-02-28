import { elements } from "./elements.js";
import { createItem } from "./menu.js";
import { saveMenu, getMenu} from "./state.js";


elements.createItemBtn.addEventListener("click", () => {
    elements.createItemModal.style.display = "flex";
})
elements.cancelItemBtn.addEventListener("click", () => {
    elements.createItemModal.style.display = "none"
})
elements.closeItemBtn.addEventListener("click", () => {
    elements.createItemModal.style.display = "none"
})
elements.createItemModalBtn.addEventListener("click", () => {
    if (elements.itemName.value != "" && elements.itemPrice.value != "") {
        createItem(elements.itemName.value, parseFloat(elements.itemPrice.value))
        elements.createItemModal.style.display = "none"
    }
    else (console.log("wefewf"))
})
elements.createCategoryBtn.addEventListener("click", () => {
    elements.categoryCreationModal.style.display = "flex"
})