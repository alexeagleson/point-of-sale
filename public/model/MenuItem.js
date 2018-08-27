class MenuItem {
    constructor(name, price) {
        this.name = name;
        this.price = price;
        this.quantity = 1;
    }

    totalPrice() {
        return this.price * this.quantity;
    }
}