export const dbTabs = new PouchDB('restaurant_tabs');
export const dbMenu = new PouchDB('restaurant_menu');
export const dbCategories = new PouchDB('restaurant_categories');

console.log("DB instances created:", dbTabs);