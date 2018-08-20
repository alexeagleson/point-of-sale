class RestTable {
    constructor(coords) {
      this.coords = coords;
      this.occupied = false;
      this.numberOfPatrons = null;
      this.bill = new Bill();
    }

    seatTable(numberOfPatrons) {
      this.occupied = true;
      this.numberOfPatrons = numberOfPatrons;
    }

    clearTable() {
      this.occupied = false;
      this.bill = new Bill();
      this.numberOfPatrons = null;
    }

    addItemToBill(itemName, itemPrice) {
      this.bill.addItem(itemName, itemPrice);
    }

    removeItemFromBill(itemName) {
      this.bill.removeItem(itemName);
    }

    getBillTotal() {
      return this.bill.getTotal();
    }

    getBill() {
      return this.bill.getBill();
    }
  }