import { elements } from "./elements";
import { saveTabs, getTabs, getMenu, getCategories } from "./state";


export function createTab(name: string, tableNumber: number) {
    const tabs = getTabs()
    const existingTab = getTabs().some(tab => tab.name.toLocaleLowerCase().trim() === name.toLocaleLowerCase().trim())
    if (!existingTab && name && tableNumber) {
        const newTab = {
            name: name,
            tableNumber: tableNumber,
            isOpen: true,
            id: crypto.randomUUID().toString(),
            items: []
        }
        tabs.push(newTab)
        saveTabs(tabs)
    }
}

export function renderTabs() {
    const grid = elements.tabsGrid
    grid.innerHTML = ""

    const tabs = getTabs()

    tabs.forEach((tab) => {
        const card = document.createElement("article") 
        card.className = "tab-card"
        const header = document.createElement("div") 
        header.className = "tab-card__header"
        const table = document.createElement("div")
        table.className = "tab-card__table"
        table.textContent = tab.tableNumber.toString()
        const tableSection = document.createElement("div")
        tableSection.className = "tab-card__table-sub"
        tableSection.textContent = "WIP"

        const isactive = document.createElement("span")
        isactive.className = "badge badge--active"
        isactive.textContent = String(tab.isOpen)

        const customer = document.createElement("div")
        customer.className = "tab-card__customer"
        customer.textContent = tab.name

        const meta = document.createElement("div")
        meta.className = "tab-card__meta"
        
        const items = document.createElement("span")
        items.className = "tab-card__items-count" 
        items.textContent = tab.items.length.toString()
        const price = document.createElement("span")
        price.className = "tab-card__total"
        price.textContent = "WIP"
        meta.appendChild(items)
        meta.appendChild(price)

        const time = document.createElement("div")
        time.className = "tab-card__time label"
        time.textContent = "WIP"

        const actions = document.createElement("div")
        actions.className = "tab-card__actions"
        const view = document.createElement("a")
        view.className = "btn btn--secondary btn--sm"
        view.textContent = "View Tab"
        actions.appendChild(view)
        const deletebtn = document.createElement("button")
        deletebtn.className = "btn btn--danger btn--sm"
        deletebtn.textContent = "Close Tab"
        actions.appendChild(deletebtn)


        

        header.appendChild(table)
        card.appendChild(customer)
        card.appendChild(meta)
        card.appendChild(time)
        card.appendChild(actions)
        card.appendChild(header)
        grid.appendChild(card)
    })
}

renderTabs()