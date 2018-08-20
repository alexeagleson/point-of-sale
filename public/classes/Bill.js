class Bill {
    constructor() {
        this.menuItems = [];
    }

    removeAllItems() {
        this.menuItems = [];
    }

    addItem(itemName, itemPrice) {
        for (const menuItem of this.menuItems) {
            if (menuItem.name === itemName) {
                menuItem.quantity += 1;
                return;
            }
        }
        this.menuItems.push(new MenuItem(itemName, itemPrice));
    }

    removeItem(itemName) {
        for (const menuItem of this.menuItems) {
            if (menuItem.name === itemName && menuItem.quantity > 1) {
                menuItem.quantity -= 1;
                return;
            }
        }
        this.menuItems = this.menuItems.filter(menuItem => menuItem.name !== itemName);
    }

    getTotal() {
        let billTotal = 0;
        this.menuItems.forEach((menuItem) => {
            billTotal += menuItem.price;
        });
        return billTotal;
    }

    getBill() {
        this.menuItems.forEach((menuItem) => {
            menuItem.total = menuItem.totalPrice();
        });
        return this.menuItems;
    }
}