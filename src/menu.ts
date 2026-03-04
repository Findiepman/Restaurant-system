import { getCategories, getMenu, saveCategory, saveMenu } from "./state.js";
import { elements } from "./elements.js";

let totalItems = 0
export function createItem(name: string, price: number, category: string, desc: string) {
    const existingItem = getMenu().some(item => item.name.toLocaleLowerCase().trim() === name.toLocaleLowerCase().trim())
    const currentMenu = getMenu();
    if (!existingItem && name && price) {
        const newItem = {
            name: name,
            id: crypto.randomUUID(),
            price: price,
            category: category,
            desc: desc,
        }
        currentMenu.push(newItem);
        totalItems += 1
        saveMenu(currentMenu);
        renderItems()
    }
}
export function createCategory(name: string, icon: string) {
    const currentCategory = getCategories()
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
        renderCategories()
    }
}
export function renderCategories() {
    const grid = elements.categoryGrid
    if (!grid) return; // Exit if element doesn't exist on this page
    grid.innerHTML = ""

    const currentCategory = getCategories()
    const allItems = document.createElement("button")
    allItems.className = "menu-category-link menu-category-link--active"
    allItems.style.width = "100%"
    allItems.style.justifyContent = "center"
    allItems.style.border = "1px solid #2a3047"
    allItems.style.borderRadius = "8px"
    allItems.textContent = "All Items"
    grid.appendChild(allItems)
    allItems.addEventListener("click", () => {
        renderItems("all")
    })


    currentCategory.forEach((category) => {
        const li = document.createElement("li")
        const button = document.createElement("button")
        button.style.width = "100%"
        button.style.color = "#e8a046"
        button.style.backgroundColor = "#1f2535"
        button.style.border = "1px solid #2a3047"
        button.style.borderRadius = "8px"
        button.style.justifyContent = "center"
        button.style.margin = "5px 0px 5px 0px"
        button.addEventListener("mouseenter", () => {
            button.style.backgroundColor = "#2a3047"
        })

        button.addEventListener("mouseleave", () => {
            button.style.backgroundColor = "#1f2535"
        })
        button.className = "menu-category-link"
        button.dataset.id = String(category.id)
        button.addEventListener("click", (e) => {
            if (e.ctrlKey) {
                elements.deleteCategoryConfirm.dataset.id = category.id;
                elements.deleteCategoryModal.style.display = "flex"
            }
        })

        const name = document.createElement("span")
        name.textContent = `${category.icon} | ${category.name}`

        button.addEventListener("click", () => {
            renderItems(category.name)
        })

        li.appendChild(button)
        button.appendChild(name)
        grid.appendChild(li)
    })
}
function isCategoryEmpty(categoryId: string): boolean {
    const menu = getMenu();

    // Check of er MINSTENS één item is met deze categoryId
    const hasItems = menu.some(item => item.category === categoryId);

    // Als hasItems 'false' is, dan is de categorie leeg
    return !hasItems;
}
export function renderItems(categoryFilter: string = "all") {
    const grid = elements.itemGrid
    if (!grid) return; // Exit if element doesn't exist on this page
    let currentMenu = getMenu();
    grid.innerHTML = ""

    if (categoryFilter !== "all") {
        currentMenu = currentMenu.filter(item => item.category === categoryFilter)
        if (isCategoryEmpty(categoryFilter) == true) {
            const card = document.createElement("div")
            card.className = "menu-item-card"
            const cardBody = document.createElement("div")
            cardBody.className = "menu-item-card__body"
            const text = document.createElement("h3")
            text.textContent = "No items yet.."
            text.className = "menu-item-card__name"
            const cardDesc = document.createElement("p")
            cardDesc.className = "menu-item-card__desc"
            cardDesc.textContent = "This category has no items. Add one using the button above."

            cardBody.appendChild(text)
            cardBody.appendChild(cardDesc)
            card.appendChild(cardBody)
            grid.appendChild(card)
        }
    }

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
        itemDesc.textContent = `${item.desc}`
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
        deleteBtn.addEventListener("click", () => {
            elements.deleteItemConfirm.dataset.id = item.id;
            elements.deleteItemModal.style.display = "flex"
        })

        card.appendChild(itemBody)
        card.appendChild(itemFooter)
        card.appendChild(buttons)
        grid.appendChild(card)
    });
}

export function deleteItem(id: string) {
    const menu = getMenu();
    const updatedMenu = menu.filter(item => item.id !== id);
    saveMenu(updatedMenu);
    renderItems();
}
export function deleteCategory(id: string) {
    const categories = getCategories();
    const menu = getMenu();
    const isUsed = menu.some(item => item.id === id);
    if (isUsed) {
        alert("Cannot delete: This category still has items assigned to it!");
        return;
    }
    const updatedCategories = categories.filter(cat => cat.id !== id);
    saveCategory(updatedCategories);
    renderCategories();
}


renderItems()
renderCategories()