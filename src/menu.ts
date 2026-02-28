import { getCategories, getMenu, saveCategory, saveMenu } from "./state.js";
import { elements } from "./elements.js";
const currentMenu = getMenu();
const currentCategory = getCategories()
let totalItems = 0
export function createItem(name: string, price: number, category: string) {
    const existingItem = getMenu().some(item => item.name.toLocaleLowerCase().trim() === name.toLocaleLowerCase().trim())
    if (!existingItem && name && price) {
        const newItem = {
            name: name,
            id: crypto.randomUUID(),
            price: price,
            category: category
        }
        currentMenu.push(newItem);
        renderItems()
        totalItems += 1
        saveMenu(currentMenu);
    }
}
export function createCategory(name: string, icon: string) {

    const existingCategory = getCategories().some(category => category.name.toLocaleLowerCase().trim() === name.toLocaleLowerCase().trim())
    if (!existingCategory && name && icon) {
        const category = {
            name: name,
            id: crypto.randomUUID(),
            icon: icon
        }
        currentCategory.push(category)
        console.log(category)
        saveCategory(currentCategory)

    }
}
export function renderCategories() {
    const grid = elements.categoryGrid
    grid.innerHTML = ""

    currentCategory.forEach((category) => {
        const li = document.createElement("li")
        const button = document.createElement("button")
        button.style.width = "100%"
        button.style.color = "#e8a046"
        button.style.backgroundColor = "#1f2535"
        button.style.border = "1px solid #2a3047"
        button.style.borderRadius = "8px"
        button.style.justifyContent = "center"
        button.addEventListener("mouseenter", () => {
            button.style.backgroundColor = "#2a3047"
        })

        button.addEventListener("mouseleave", () => {
            button.style.backgroundColor = "#1f2535"
        })
        button.className = "menu-category-link"
        button.dataset.id = String(category.id)
        button.addEventListener("click", (e) => {
            if (e.ctrlKey) {alert("ctrl key pressed!")} 
        })

        const name = document.createElement("span")
        name.textContent = `${category.icon} | ${category.name}`


        button.appendChild(name)
        li.appendChild(button)
        grid.appendChild(li)
    })
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
        category.textContent = item.category
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
renderCategories()