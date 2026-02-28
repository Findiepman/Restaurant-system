import { getMenu, saveMenu } from "./state.js";
import { elements } from "./elements.js";
const currentMenu = getMenu();
let totalItems = 0
export function createItem(name: string, price: number) {
    const existingItem = getMenu().some(item => item.name.toLocaleLowerCase().trim() === name.toLocaleLowerCase().trim())
    if (!existingItem && name && price) {
        const newItem = {
            name: name,
            id: crypto.randomUUID(),
            price: price
        }
        currentMenu.push(newItem);
        renderItems()
        totalItems += 1
        saveMenu(currentMenu);
    }
}
export function createCategory(name: string) {

}

export function renderItems() {
    const grid = elements.itemGrid
    grid.innerHTML = ""

    currentMenu.forEach((item) => {
        const card = document.createElement("article")
        card.className = "menu-item-card"
        const itemBody = document.createElement("div")
        itemBody.className = "menu-item-card__body"
        const category = document.createElement("span")
        category.textContent = "WIP"
        category.className = "menu-item-card__category"
        const itemName = document.createElement("h3")
        itemName.textContent = item.name
        itemName.className = "menu-item-card__name"
        const itemDesc = document.createElement("p")
        itemDesc.textContent = "WIP"
        itemDesc.className = "menu-item-card__desc"
        itemBody.appendChild(category)
        itemBody.appendChild(itemName)
        itemBody.appendChild(itemDesc)

        const itemFooter = document.createElement("div")
        itemFooter.className = "menu-item-card__footer"
        const itemPrice = document.createElement("span")
        itemPrice.textContent = `$${String(item.price)}`
        itemPrice.className = "menu-item-card__price"
        itemFooter.appendChild(itemPrice)

        const buttons = document.createElement("div")
        buttons.style.padding = "0 16px 16px"
        buttons.style.display = "flex"
        buttons.style.gap = "8px"
        const editBtn = document.createElement("button")
        editBtn.className = "btn btn--secondary btn--sm btn--full"
        editBtn.textContent = "Edit"
        buttons.appendChild(editBtn)
        const deleteBtn = document.createElement("button")
        deleteBtn.className = "btn btn--danger btn--sm"
        deleteBtn.textContent = "Delete Item"
        buttons.appendChild(deleteBtn)
        
        card.appendChild(itemBody)
        card.appendChild(itemFooter)
        card.appendChild(buttons)
        grid.appendChild(card)
    });
}
renderItems()