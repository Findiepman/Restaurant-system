## 🚀 Features

* **Dynamic Menu Builder:** Create, edit, and delete menu items with custom descriptions (e.g., volume, alcohol content, or ingredients).
* **Smart Filtering:** Quickly navigate through categories (Drinks, Food, Specials) to find items during busy shifts.
* **Tab Management:** Dedicated detail pages for tables using URL parameters to track orders in real-time.
* **Persistent Storage:** All data is synced with `localStorage`, ensuring no orders are lost on page refreshes.
* **Modular Architecture:** Optimized DOM handling using page-specific element selectors to prevent script crashes.

---

## 🛠️ Technical Stack

* **Language:** [TypeScript](https://www.typescriptlang.org/) (Strictly typed interfaces)
* **Frontend:** HTML5, CSS3 (Modern Grid & Flexbox)
* **Storage:** Browser LocalStorage API
* **Architecture:** Modular ESM (ECMAScript Modules)

---

## 📂 Project Structure

```text
├── src/
│   ├── elements.ts       # Page-specific DOM selectors
│   ├── menu.ts           # Menu logic & CRUD operations
│   ├── tab-detail.ts     # Table-specific ordering logic
│   └── ui.ts             # Global UI interactions
├── dist/                 # Compiled JavaScript
└── index.html            # Main Dashboard
```
---
## 🔧 Installation & Setup
Clone the repository:

# Bash
git clone [https://github.com/yourusername/restoflow-pos.git](https://github.com/yourusername/restoflow-pos.git)
Install dependencies:

# Bash
npm install
Compile TypeScript:

# Bash
npx tsc -w
Launch: Open index.html via Live Server.

---

## 📖 How it Works
The app uses URL Search Parameters to pass data between the main dashboard and the tab details.

When a waiter clicks on a table, the openTabDetail(id) function triggers a redirect to tab-detail.html?id=..., where the system automatically populates the page with that specific table's data.

---

## ⚖️ License
Distributed under the MIT License. See LICENSE for more information.