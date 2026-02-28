import { createCategory } from "./menu";

export const elements = {
    itemGrid: document.getElementById("items-grid")! as HTMLDivElement,
    createItemBtn: document.getElementById("create-item-btn")! as HTMLButtonElement,
    createItemModal: document.getElementById("modal-menu-item")! as HTMLDivElement,
    createItemModalBtn: document.getElementById("create-item-modal-btn")! as HTMLButtonElement,
    cancelItemBtn: document.getElementById("cancel-modal-btn")! as HTMLButtonElement,
    closeItemBtn: document.getElementById("close-modal-btn")! as HTMLButtonElement,
    itemName: document.getElementById("item-name")! as HTMLInputElement,
    itemPrice: document.getElementById("item-price")! as HTMLInputElement,
    createCategoryBtn: document.getElementById("create-category")! as HTMLButtonElement,
    categoryCreationModal: document.getElementById("modal-new-category")! as HTMLDivElement

}