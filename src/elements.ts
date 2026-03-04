import { createCategory, deleteCategory } from "./menu.js";

//menu.html
export const menu = {
    itemGrid: document.getElementById("items-grid")! as HTMLDivElement,
    createItemBtn: document.getElementById("create-item-btn")! as HTMLButtonElement,
    createItemModal: document.getElementById("modal-menu-item")! as HTMLDivElement,
    createItemModalBtn: document.getElementById("create-item-modal-btn")! as HTMLButtonElement,
    cancelItemBtn: document.getElementById("cancel-modal-btn")! as HTMLButtonElement,
    closeItemBtn: document.getElementById("close-modal-btn")! as HTMLButtonElement,
    itemName: document.getElementById("item-name")! as HTMLInputElement,
    itemPrice: document.getElementById("item-price")! as HTMLInputElement,
    createCategoryBtn: document.getElementById("create-category")! as HTMLButtonElement,
    categoryCreationModal: document.getElementById("modal-new-category")! as HTMLDivElement,
    categoryName: document.getElementById("category-name")! as HTMLInputElement,
    categoryIcon: document.getElementById("category-icon")! as HTMLInputElement,
    createCategoryBtnFinal: document.getElementById("create-btn-category")! as HTMLButtonElement,
    cancelCategorybtn: document.getElementById("cancel-category-create")! as HTMLButtonElement,
    closeCategoryCreate: document.getElementById("close-category-create")! as HTMLButtonElement,
    categoryGrid: document.getElementById("card grid")! as HTMLUListElement,
    itemCategory: document.getElementById("item-category")! as HTMLSelectElement,
    deleteItemModal: document.getElementById("modal-delete-item")! as HTMLDivElement,
    deleteItemConfirm: document.getElementById("modal-delete-item-confirm")! as HTMLButtonElement,
    deleteCategoryModal: document.getElementById("modal-delete-category")! as HTMLDivElement,
    deleteCategoryConfirm: document.getElementById("modal-delete-category-confirm")! as HTMLButtonElement,
    itemDesc: document.getElementById("item-desc")! as HTMLInputElement,
}

//index.html
export const tab = {
    tabModal: document.getElementById("modal-new-tab")! as HTMLDivElement,
    tabTableNum: document.getElementById("new-tab-table")! as HTMLInputElement,
    tabCustomerName: document.getElementById("new-tab-customer")! as HTMLInputElement,
    tabNotes: document.getElementById("new-tab-notes")! as HTMLInputElement,
    tabsGrid: document.getElementById("tabs-grid-67")! as HTMLDivElement,
    createTabBtn: document.getElementById("create-tab-btn")! as HTMLButtonElement,
    cancelTabBtn: document.getElementById("create-tab-cancel")! as HTMLButtonElement,
    closeTabBtn: document.getElementById("close-tab-modal")! as HTMLButtonElement,
    tabModalBtn: document.getElementById("new-tab-btn")! as HTMLButtonElement,
    addItemModal: document.getElementById("modal-add-item")! as HTMLDivElement,
}

//tab-detail.html
export const detail = {
    topDetails: document.getElementById("table-num-customer-name")! as HTMLSpanElement,
    closeTabBtnTop: document.getElementById("close-tab-btn")! as HTMLButtonElement,
    tableNumBig: document.getElementById("table-number")! as HTMLTitleElement,
    CustomerSectionTime: document.getElementById("customer-name-section-time")! as HTMLParagraphElement,
    ActivityTab: document.getElementById("active-tab")! as HTMLSpanElement,
    addOrderItemBtn: document.getElementById("add-order-item-tab-btn")! as HTMLButtonElement,
    orderItemsList: document.getElementById("order-items-list")! as HTMLUListElement, // hier komen alle bestelde items
    tabNotesDetail: document.getElementById("tab-notes")! as HTMLTextAreaElement,
    saveNotesBtn: document.getElementById("save-notes-btn")! as HTMLButtonElement,
    tableNumSidebar: document.getElementById("table-number-sidebar")! as HTMLSpanElement,
    customerNamesidebar: document.getElementById("customer-name-sidebar")! as HTMLSpanElement,
    TimeOpenedSidebar: document.getElementById("time-opened-sidebar")! as HTMLSpanElement,
    TotalItemsSidebar: document.getElementById("items-length-sidebar")! as HTMLSpanElement,
    totalExclusiefVat: document.getElementById("total-exclusief-vat")! as HTMLSpanElement,
    totalPriceTab: document.getElementById("total-total-price")! as HTMLSpanElement,
    addItemSidebarBtn: document.getElementById("add-item-sidebar")! as HTMLButtonElement,
    closeTabSidebar: document.getElementById("close-tab-sidebar")! as HTMLButtonElement,
    AddItemModal: document.getElementById("modal-add-item")! as HTMLDivElement,


    closeChooseItem: document.getElementById("close-choose-item")! as HTMLButtonElement,
    lessquantityBtn: document.getElementById("Decrease-quantity")! as HTMLButtonElement,
    morequantityBtn: document.getElementById("increase-quantity")! as HTMLButtonElement,
    totalQuantity: document.getElementById("total-queantity")! as HTMLSpanElement,
    totalPriceItem: document.getElementById("total-price")! as HTMLSpanElement,
    cancelAddItemBtn: document.getElementById("cancel-add-item-modal")! as HTMLButtonElement,
    addItemButton: document.getElementById("add-item-to-tab")! as HTMLButtonElement,

}
