import { Category, getCategories, getMenu, MenuItem, saveCategory, saveMenu } from "./state.js";
import { menu } from "./elements.js";
import { dbMenu, dbTabs } from "./db.js";
import { dbCategories } from "./db.js";
import { renderitems } from "./tabs.js";

let totalItems = 0
export async function createItem(name: string, price: number, category: string, desc: string) {
    const allItems = await dbMenu.allDocs({ include_docs: true });

    const existingItem = allItems.rows.some(row => {
        const doc = row.doc as unknown as MenuItem;
        return doc?.name?.toLowerCase().trim() === name.toLocaleLowerCase().trim()
    })

    if (!existingItem && name && price) {
        const itemId = crypto.randomUUID().toString()

        const newItem = {
            name: name,
            id: itemId,
            _id: itemId,
            price: price,
            category: category,
            desc: desc,
        } as any

        try {
            await dbMenu.put(newItem)
            console.log("Succesfully saved item to menu")

            await renderItems()
        } catch (err) {
            console.error("Error", err)
        }


        
    }
}
export async function createCategory(name: string, icon: string) {
    const allCategories = await dbCategories.allDocs({ include_docs: true });
    const existingCategory = allCategories.rows.some(row => {
        const doc = row.doc as unknown as Category
        return doc?.name?.toLocaleLowerCase().trim() === name.toLocaleLowerCase().trim();
    })
    
    if (!existingCategory && name && icon) {
        const newTabId = crypto.randomUUID().toString()
        

        const category = {
            name: name,
            id: newTabId,
            _id: newTabId,
            icon: icon
        } as any;

        try {
            await dbCategories.put(category)
            console.log("Succesfully saved " + category + " to DB!")

            await renderCategories()
        } catch (err) {
            console.error("Database save failed", err)
        }

    }
}
export async function renderCategories() {
    const grid = menu.categoryGrid
    if (!grid) return; // Exit if element doesn't exist on this page
    grid.innerHTML = ""

    const result = await dbCategories.allDocs({include_docs: true})
    const allCategories = result.rows.map(row => row.doc as any)


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


    allCategories.forEach((category) => {
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
                menu.deleteCategoryConfirm.dataset.id = category.id;
                menu.deleteCategoryModal.style.display = "flex"
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
export function isCategoryEmpty(categoryId: string): boolean {
    const menu = getMenu();

    // Check of er MINSTENS één item is met deze categoryId
    const hasItems = menu.some(item => item.category === categoryId);

    // Als hasItems 'false' is, dan is de categorie leeg
    return !hasItems;
}
// 1. Added 'async' here
export async function renderItems(categoryFilter: string = "all") {
    const grid = menu.itemGrid;
    if (!grid) return; 

    grid.innerHTML = "";

    // 2. Fetch all menu items from PouchDB
    const result = await dbMenu.allDocs({ include_docs: true });
    let currentMenu = result.rows.map(row => row.doc as any);

    // 3. Handle Filtering
    if (categoryFilter !== "all") {
        currentMenu = currentMenu.filter(item => item.category === categoryFilter);
    }

    // 4. Handle Empty State
    if (currentMenu.length === 0) {
        const card = document.createElement("div");
        card.className = "menu-item-card";
        const cardBody = document.createElement("div");
        cardBody.className = "menu-item-card__body";
        const text = document.createElement("h3");
        text.textContent = categoryFilter === "all" ? "No items in menu yet.." : "No items yet..";
        text.className = "menu-item-card__name";
        const cardDesc = document.createElement("p");
        cardDesc.className = "menu-item-card__desc";
        cardDesc.textContent = "Add your first item using the button above.";

        cardBody.appendChild(text);
        cardBody.appendChild(cardDesc);
        card.appendChild(cardBody);
        grid.appendChild(card);
        return; // Exit early since there is nothing else to render
    }

    // 5. Render Items
    currentMenu.forEach((item) => {
        const card = document.createElement("article");
        card.className = "menu-item-card";
        
        const itemBody = document.createElement("div");
        itemBody.className = "menu-item-card__body";
        
        const category = document.createElement("span");
        category.textContent = item.category;
        category.className = "menu-item-card__category";
        
        const itemName = document.createElement("h3");
        itemName.textContent = item.name;
        itemName.className = "menu-item-card__name";
        
        const itemDesc = document.createElement("p");
        itemDesc.textContent = item.desc || "";
        itemDesc.className = "menu-item-card__desc";

        itemBody.appendChild(category);
        itemBody.appendChild(itemName);
        itemBody.appendChild(itemDesc);

        const itemFooter = document.createElement("div");
        itemFooter.className = "menu-item-card__footer";
        
        const itemPrice = document.createElement("span");
        itemPrice.textContent = `$${item.price}`;
        itemPrice.className = "menu-item-card__price";
        itemFooter.appendChild(itemPrice);

        const buttons = document.createElement("div");
        buttons.style.padding = "0 16px 16px";
        buttons.style.display = "flex";
        buttons.style.gap = "8px";

        const editBtn = document.createElement("button");
        editBtn.className = "btn btn--secondary btn--sm btn--full";
        editBtn.textContent = "Edit";
        
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn btn--danger btn--sm";
        deleteBtn.textContent = "Delete Item";
        
        // Use _id for PouchDB consistency
        deleteBtn.addEventListener("click", () => {
            menu.deleteItemConfirm.dataset.id = item._id || item.id;
            menu.deleteItemModal.style.display = "flex";
        });

        buttons.appendChild(editBtn);
        buttons.appendChild(deleteBtn);

        card.appendChild(itemBody);
        card.appendChild(itemFooter);
        card.appendChild(buttons);
        grid.appendChild(card);
    });
}

export async function deleteItem(id: string) {
    try {
    const item = await dbMenu.get(id)
    await dbMenu.remove(item)
    await renderItems();
    } catch (err) {console.error("Error", err)}
}

export async function deleteCategory(categoryId: string) {
    try {
        const menuResult = await dbMenu.allDocs({ include_docs: true });
        const menuItems = menuResult.rows.map(row => row.doc as any);
        
        const isUsed = menuItems.some(item => item.category === categoryId);

        if (isUsed) {
            alert("Cannot delete: This category still has items assigned to it!");
            return;
        }
        const categoryDoc = await dbCategories.get(categoryId);
        await dbCategories.remove(categoryDoc);
        await renderCategories(); 
        
    } catch (err) {
        console.error("Error deleting category:", err);
    }
}


renderItems()
renderCategories()