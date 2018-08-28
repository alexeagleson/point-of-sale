const getContextMenu = (e) => {
    e = e || window.event;
    const target = e.target || e.srcElement;
    app.currentCell = target;

    const restTable = restaurant.getTable(getCoordsFromID(app.currentCell.id));
    const tableExists = !!restTable;
    const tableOccupied = tableExists && restTable.occupied;

    const contextMenuTemplate = {
        tableExists,
        tableOccupied,
    };

    displayContextMenu(contextMenuTemplate, e);
};

const updateFloorPlan = () => {
    const restaurantSize = document.getElementById('restaurant-size').value;
    const restaurantName = document.getElementById('restaurant-name').value;

    // Form validation - cancels (returns) if check fails.
    let errorCheck = validateTextField(restaurantName, 'Restaurant Name');
    if (typeof errorCheck === 'string') {
        document.getElementById('form-log').innerHTML = errorCheck;
        document.getElementById('restaurant-name').value = '';
        return;
    }
    errorCheck = validateNumber(restaurantSize, 'Restaurant Size', 5, 15);
    if (typeof errorCheck === 'string') {
        document.getElementById('form-log').innerHTML = errorCheck;
        document.getElementById('restaurant-size').value = '';
        return;
    }

    clearAllMenus();
    document.getElementById('main-header').innerHTML = restaurantName;
    restaurant.updateSize(restaurantSize, restaurantSize);
    refreshGridDisplay(restaurant);
}


const addTable = () => {
    restaurant.addNewTable(getCoordsFromID(app.currentCell.id));
    updateCell(app.currentCell);
};

const removeTable = () => {
    restaurant.removeTable(getCoordsFromID(app.currentCell.id));
    updateCell(app.currentCell);
};

const seatTable = (numberOfPatrons) => {
    const thisTable = restaurant.getTable(getCoordsFromID(app.currentCell.id));
    if (!thisTable) return showError('No table exists to seat');
    if (thisTable.occupied) return showError('Clear table before seating');
    numberOfPatrons = numberOfPatrons || document.getElementById('party-size').value;

    let errorCheck = validateNumber(numberOfPatrons, 'Party Size', 1, 20);
    if (typeof errorCheck === 'string') {
        document.getElementById('party-size').value = '';
        document.getElementById('form-log').innerHTML = errorCheck;
        return;
    }

    clearAllMenus();
    thisTable.seatTable(numberOfPatrons);
    updateCell(app.currentCell);
};

const clearTable = () => {
    clearAllMenus()
    const thisTable = restaurant.getTable(getCoordsFromID(app.currentCell.id));
    if (!thisTable) return showError('No table exists to clear');
    app.totalSales += thisTable.getBillTotal();
    thisTable.clearTable();
    updateCell(app.currentCell);
};

const addItemToBill = (itemName) => {
    const thisTable = restaurant.getTable(getCoordsFromID(app.currentCell.id));
    if (!thisTable) return showError('No table exists to add item to');
    if (!thisTable.occupied) return showError('Nobody is sitting at this table');
    const itemPrice = restaurantMenuTemplate.menuItems.find((menuItem) => menuItem.name === itemName).price;
    thisTable.addItemToBill(itemName, itemPrice);
    updateCell(app.currentCell);
    document.getElementById('menu-log').innerHTML = `${itemName} added to bill (total: $${thisTable.getBillTotal()} )`;
};

const removeItemFromBill = (itemName) => {
    const thisTable = restaurant.getTable(getCoordsFromID(app.currentCell.id));
    if (!thisTable) return showError('No table exists to remove item from');
    thisTable.removeItemFromBill(itemName);
    updateCell(app.currentCell);
    showBillModal();
};
