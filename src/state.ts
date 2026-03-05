// types.ts
export interface MenuItem {
    id: string;
    name: string;
    price: number;
    category: string;
    desc: string;
}
export interface orderItem {
    name: string,
    quantity: number,
    price: number
}

export interface Tab {
    id: string;
    tableNumber: number;
    total: number
    name: string,
    items: orderItem[];
    isOpen: boolean;
    time: string
}
export interface Category {
    id: string;
    name: string;
    icon: string;
}


// state.ts
export const saveTabs = (tabs: Tab[]) => {
    localStorage.setItem('restaurant_tabs', JSON.stringify(tabs));
};
export const saveMenu = (menu: MenuItem[]) => {
    localStorage.setItem('menu', JSON.stringify(menu));
}
export const saveCategory = (category: Category[]) => {
    localStorage.setItem('categories', JSON.stringify(category))
}

export const getTabs = (): Tab[] => {
    const data = localStorage.getItem('restaurant_tabs');
    return data ? JSON.parse(data) : [];
};

export const getMenu = (): MenuItem[] => {
    const data = localStorage.getItem('menu');
    return data ? JSON.parse(data) : [];
}
export const getCategories = (): Category[] => {
    const data = localStorage.getItem('categories')
    return data ? JSON.parse(data) : [];
}