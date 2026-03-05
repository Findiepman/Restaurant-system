import { tab, detail } from "./elements.js";
import { saveTabs, getTabs, getMenu, getCategories } from "./state.js";
import { isCategoryEmpty } from "./menu.js";

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
export function deleteTab(id: string) {
    const tab = getTabs()
    const updatedTabs = tab.filter(tab => tab.id !== id);
    saveTabs(updatedTabs);
    renderTabs();
}

export function getTabStats() {
    const tabs = getTabs();
    const count = tabs.length;
    const totalRevenue = tabs.reduce((sum, tab) => sum + tab.total, 0);
    const averageRevenue = count > 0 ? totalRevenue / count : 0;
    return { count, totalRevenue, averageRevenue };
}

let totalrevenue: number = 0;
let averageRevenue: number = 0
export function renderTabs() {
    const grid = document.querySelector("#tabs-grid-67") as HTMLDivElement | null
    if (!grid) return; // Exit if element doesn't exist on this page
    grid.innerHTML = ""; // clear existing cards before rendering
    let totaltabs = getTabs().length
    const totaltabstext = document.getElementById("total-tabs-open")! as HTMLSpanElement
    console.log(totaltabs)
    totaltabstext.textContent = totaltabs.toString()
    document.getElementById("total-tabs-dashboard")!.textContent = totaltabs.toString()
    const revenueDisplay = document.getElementById("total-revenue")!
    const averageRevenueDisplay = document.getElementById("average-revenue")!


    const tabs = getTabs()

    // Reset totalrevenue before calculating
    totalrevenue = 0;

    tabs.forEach((tab) => {

        totalrevenue += tab.total

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
        price.textContent = `Total $${tab.total}`
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



        card.addEventListener("click", (e) => {
            if (e.ctrlKey) {
                deleteTab(tab.id)
            }
            else { openTabDetail(tab.id) }
        })

        header.appendChild(table)
        card.appendChild(customer)
        card.appendChild(meta)
        card.appendChild(time)
        card.appendChild(actions)
        card.appendChild(header)
        grid.appendChild(card)
        console.log(totalrevenue)
    })

    // Calculate average after summing all totals
    averageRevenue = totaltabs > 0 ? totalrevenue / totaltabs : 0;

    // Update displays after the loop
    revenueDisplay.textContent = `$${totalrevenue.toString()}`
    averageRevenueDisplay.textContent = `$${averageRevenue.toFixed(2)}`
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
    detail.CustomerSectionTime.textContent = `${current.name} · WIP · opened ${current.time}`;
    detail.ActivityTab.textContent = current.isOpen ? "Active" : "Inactive";

    detail.tableNumSidebar.textContent = current.tableNumber.toString()
    detail.customerNamesidebar.textContent = current.name
    detail.TimeOpenedSidebar.textContent = current.time
    detail.TotalItemsSidebar.textContent = current.items.length.toString()

    detail.totalExclusiefVat.textContent = current.total.toString()
    detail.totalPriceTab.textContent = (current.total + 9.77).toFixed(2)
    if (current.items.length == 0) {
        detail.totalPriceTab.textContent = "0.00"
    }

    renderOrderedItems()
}


export function renderCategoriesSidebar() {
    const grid = document.getElementById("category-grid-sidebar")! as HTMLElement
    let categories = getCategories()
    grid.innerHTML = ""
    const allItems = document.createElement("button")
    allItems.className = "menu-category-link menu-category-link--active"
    allItems.textContent = "All items"
    grid.appendChild(allItems)
    allItems.addEventListener("click", () => { renderitems("all") })



    categories.forEach((category) => {
        const card = document.createElement("button")
        card.className = "menu-category-link"
        card.textContent = category.name
        card.style.color = "#e8a046"
        card.style.backgroundColor = "#1f2535"
        card.style.border = "1px solid #2a3047"
        card.style.borderRadius = "8px"
        card.addEventListener("mouseenter", () => {
            card.style.backgroundColor = "#2a3047"
        })

        card.addEventListener("mouseleave", () => {
            card.style.backgroundColor = "#1f2535"
        })
        card.addEventListener("click", () => {
            renderitems(category.name)
        })

        grid.appendChild(card)
    })


}

export function renderitems(categoryFilter: string = "all") {
    const grid = document.getElementById("items-grid-item-picker") as HTMLDivElement | null;
    if (!grid) return;
    grid.innerHTML = "";

    let menu = getMenu();
    if (categoryFilter !== "all") {
        menu = menu.filter(item => item.category === categoryFilter);
        if (isCategoryEmpty(categoryFilter)) {
            const card = document.createElement("div");
            card.className = "menu-item-card";
            const cardBody = document.createElement("div");
            cardBody.className = "menu-item-card__body";
            const text = document.createElement("h3");
            text.textContent = "No items yet..";
            text.className = "menu-item-card__name";
            const cardDesc = document.createElement("p");
            cardDesc.className = "menu-item-card__desc";
            cardDesc.textContent = "This category has no items. Add one in the menu page.";

            cardBody.appendChild(text);
            cardBody.appendChild(cardDesc);
            card.appendChild(cardBody);
            grid.appendChild(card);
        }
    }

    let selectedName: string | null = null;

    menu.forEach((item) => {
        const card = document.createElement("div");
        card.className = "item-picker-row";
        const itemName = document.createElement("span");
        itemName.className = "item-picker-row__name";
        itemName.textContent = item.name;
        card.appendChild(itemName);
        const itemPrice = document.createElement("span");
        itemPrice.className = "item-picker-row__price";
        itemPrice.textContent = `$${item.price}`;
        card.appendChild(itemPrice);

        card.addEventListener("click", () => {
            const prev = grid.querySelector(".item-picker-row.selected");
            if (prev) {
                prev.classList.remove("selected");
                (prev as HTMLElement).style.border = "";
            }
            card.classList.add("selected");
            card.style.border = "2px solid white";
            selectedName = item.name;
        });

        grid.appendChild(card);
    });

    if (detail.AddtoTabFinal) {
        detail.AddtoTabFinal.onclick = () => {
            if (selectedName) {
                const q = parseInt(detail.totalQuantity.textContent || "1", 10) || 1;
                quantity = 1
                detail.totalQuantity.textContent = quantity.toString()
                addItem(selectedName, q);
                detail.AddItemModal.style.display = "none"
                renderOrderedItems()
                renderitems(categoryFilter);
            }
        };
    }
}
let quantity: number = 1
console.log(quantity)
if (detail.morequantityBtn) {
    detail.morequantityBtn.addEventListener("click", () => {
        quantity++
        detail.totalQuantity.textContent = quantity.toString()
    })
}

if (detail.closeChooseItem) detail.closeChooseItem.addEventListener("click", () => { quantity = 1; detail.totalQuantity.textContent = quantity.toString(); console.log("wefhj") })
if (detail.cancelAddItemBtn) detail.cancelAddItemBtn.addEventListener("click", () => { quantity = 1; detail.totalQuantity.textContent = quantity.toString() })


if (detail.lessquantityBtn) {
    detail.lessquantityBtn.addEventListener("click", () => {
        quantity--
        if (quantity <= 0) quantity = 1
        detail.totalQuantity.textContent = quantity.toString()
    })
}
if (detail.addOrderItemBtn && detail.AddItemModal) {
    detail.addOrderItemBtn.addEventListener("click", () => {
        quantity = 1;
        detail.totalQuantity.textContent = quantity.toString();
        detail.AddItemModal.style.display = "flex";
        renderCategoriesSidebar()
        renderitems()
    });
}




let isSelected



export function addItem(name: string, quantity: number) {
    // Get current tab id from URL
    const currentTabId = new URLSearchParams(window.location.search).get("id");
    const tabs = getTabs();
    const currentTab = tabs.find(tab => tab.id === currentTabId);

    if (!currentTab) return;

    // Find the menu item
    const menu = getMenu();
    const menuItem = menu.find(item => item.name === name);

    if (menuItem && quantity > 0) {
        const orderItem = {
            name: menuItem.name,
            price: menuItem.price * quantity,
            quantity: quantity
        }
        // add full cost (price times quantity)
        currentTab.total += menuItem.price * quantity;
        console.log(currentTab.total);
        currentTab.items.push(orderItem);
        saveTabs(tabs);
        isSelected = false
        detail.totalQuantity.textContent = "1"
        renderOrderedItems()
        renderTabDetails()
    }

}

export function removeItem(index: number) {
    // remove an item by its index from the current tab
    const currentTabId = new URLSearchParams(window.location.search).get("id");
    const tabs = getTabs();
    const currentTab = tabs.find(tab => tab.id === currentTabId);

    if (!currentTab) return;

    // make sure index is valid
    if (index < 0 || index >= currentTab.items.length) return;

    const removed = currentTab.items[index];
    // adjust total (price already accounts for quantity)
    currentTab.total = Math.max(0, currentTab.total - removed.price);
    // remove the item
    currentTab.items.splice(index, 1);

    saveTabs(tabs);
    // re-render details so UI reflects change (both item list and sidebar totals)
    renderOrderedItems();
    renderTabDetails();
}

export function renderOrderedItems() {
    const grid = detail.orderItemsList
    grid.innerHTML = ""

    const currentTabId = new URLSearchParams(window.location.search).get("id");
    const tabs = getTabs();
    const currentTab = tabs.find(tab => tab.id === currentTabId);

    if (!currentTab) return;

    currentTab.items.forEach((item) => {
        const card = document.createElement("li")
        card.className = "order-item"
        const quantity = document.createElement("span")
        quantity.className = "order-item__qty"
        quantity.textContent = item.quantity.toString()
        card.appendChild(quantity)

        const info = document.createElement("div")
        info.className = "order-item__info"
        card.appendChild(info)

        const name = document.createElement("div")
        name.className = "order-item__name"
        name.textContent = item.name
        info.appendChild(name)

        const note = document.createElement("div")
        note.className = "order-item__note"
        info.appendChild(note)

        const price = document.createElement("span")
        price.className = "order-item__price"
        price.textContent = `$${item.price}`
        card.appendChild(price)

        const remove = document.createElement("button")
        remove.className = "order-item__remove"
        remove.textContent = `Remove ${item.name}`
        // wire up removal using current index
        remove.addEventListener("click", (e) => {
            const idx = currentTab.items.indexOf(item);
            if (idx !== -1) {
                removeItem(idx);
            }
        });
        card.addEventListener("click", (e) => {
            if (e.ctrlKey) {
                const idx = currentTab.items.indexOf(item);
                removeItem(idx)
            }
        })
        card.appendChild(remove);
        grid.appendChild(card)
    })

}

renderTabDetails();
renderTabs();
