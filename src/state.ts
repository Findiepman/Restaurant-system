// types.ts
export interface MenuItem {
    id: string;
    name: string;
    price: number;
}

export interface Tab {
    id: string;
    tableNumber: number;
    items: MenuItem[];
    isOpen: boolean;
}

// state.ts
export const saveTabs = (tabs: Tab[]) => {
    localStorage.setItem('restaurant_tabs', JSON.stringify(tabs));
};

export const getTabs = (): Tab[] => {
    const data = localStorage.getItem('restaurant_tabs');
    return data ? JSON.parse(data) : [];
};