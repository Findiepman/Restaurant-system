import { tab, detail } from "./elements.js";
import { saveTabs, getTabs, getMenu, getCategories } from "./state.js";


export function createTab(name: string, tableNumber: number) {
    const tabs = getTabs()
    const existingTab = getTabs().some(tab => tab.name.toLocaleLowerCase().trim() === name.toLocaleLowerCase().trim())
    if (!existingTab && name && tableNumber) {
        const newTab = {
            name: name,
            tableNumber: tableNumber,
            isOpen: true,
            id: crypto.randomUUID().toString(),
            items: [],
            total: 0,
            time: new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }).format(Date.now())
        }
        tabs.push(newTab)
        saveTabs(tabs)
        renderTabs()
    }
}

export function renderTabs() {
    const grid = document.querySelector("#tabs-grid-67") as HTMLDivElement | null
    if (!grid) return; // Exit if element doesn't exist on this page
    grid.innerHTML = ""; // clear existing cards before rendering

    const tabs = getTabs()

    tabs.forEach((tab) => {
        const card = document.createElement("article")
        card.className = "tab-card"
        const header = document.createElement("div")
        header.className = "tab-card__header"
        const table = document.createElement("div")
        table.className = "tab-card__table"
        table.textContent = `Table ${tab.tableNumber.toString()}`
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
        items.textContent = `Total items: ${tab.items.length.toString()}`
        const price = document.createElement("span")
        price.className = "tab-card__total"
        price.textContent = "Total $WIP"
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


        card.addEventListener("click", () => openTabDetail(tab.id))

        header.appendChild(table)
        card.appendChild(customer)
        card.appendChild(meta)
        card.appendChild(time)
        card.appendChild(actions)
        card.appendChild(header)
        grid.appendChild(card)
    })
}

function openTabDetail(id: string) {
    // navigate to detail page; the new page will run its own rendering logic
    window.location.href = `tab-detail.html?id=${id}`;
}
function renderTabDetails() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const tabId = urlParams.get('id');
    if (!tabId) return; // nothing to do when no id present

    const allTabs = getTabs();
    const current = allTabs.find(t => t.id === tabId);
    if (!current) return; // invalid id

    detail.topDetails.textContent = `Table ${current.tableNumber} -- ${current.name}`;
    detail.tableNumBig.textContent = `Table ${current.tableNumber}`;
    detail.CustomerSectionTime.textContent = `${current.name} · WIP · Opened WIP`;
    detail.ActivityTab.textContent = current.isOpen ? "Active" : "Inactive";

    detail.tableNumSidebar.textContent = current.tableNumber.toString()
    detail.customerNamesidebar.textContent = current.name
    detail.TimeOpenedSidebar.textContent = current.time
    detail.TotalItemsSidebar.textContent = current.items.toString()
}

renderTabDetails();
renderTabs();
