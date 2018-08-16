class Bill {
    constructor() {
        this.menuItems = [];
    }

    removeAllItems() {
        this.menuItems = [];
    }

    addItem(itemName, itemPrice) {
        this.menuItems.push(new MenuItem(itemName, itemPrice));
    }

    getTotal() {
        let billTotal = 0;
        this.menuItems.forEach((menuItem) => {
            billTotal += menuItem.price;
        });
        return billTotal;
    }

    getText() {
        let billText = '';
        this.menuItems.forEach((menuItem) => {
            billText = billText.concat(menuItem.name + ' ');
        });
        return billText;
    }
}