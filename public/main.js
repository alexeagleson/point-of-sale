const app = {};
app.totalSales = 0;

const mainGrid = document.getElementById('floor-plan');
const restaurant = new Restaurant(10, 10);

const validateTextField = (textValue, formName) => {
    if (textValue.length === 0) return `${formName} cannot be empty.`;
    return true;
};

const validateNumber = (numberValue, formName, min, max) => {
    if (isNaN(numberValue)) return `${formName} must be a number.`;
    if (min && max) {
        if (numberValue < min || numberValue > max) return `${formName} must be between ${min} and ${max}.`;
    }
    return true;
};

const showError = (errorMessage) => {
    alert(errorMessage);
    hideContextMenu();
};

const getCoordsFromID = (cellID) => {
    return [cellID.split("-")[0], cellID.split("-")[1]];
};

const getTableNumFromID = (cellID) => {
    const tableCoords = getCoordsFromID(cellID);
    return `${(parseInt(tableCoords[0]) + 1)}-${(parseInt(tableCoords[1]) + 1)}`;
};

const updateFloorPlan = () => {
    const restaurantSize = document.getElementById('restaurant-size').value;
    const restaurantName = document.getElementById('restaurant-name').value;

    // Form validation - cancels (returns) if check fails.
    let errorCheck = validateTextField(restaurantName, 'Restaurant Name');
    if (typeof errorCheck === 'string') { document.getElementById('form-log').innerHTML = errorCheck; return; }
    errorCheck = validateNumber(restaurantSize, 'Restaurant Size', 5, 20);
    if (typeof errorCheck === 'string') { document.getElementById('form-log').innerHTML = errorCheck; return; }

    clearAllMenus();
    document.getElementById('main-header').innerHTML = restaurantName;
    restaurant.updateSize(restaurantSize, restaurantSize);
    refreshGridDisplay(restaurant);
}

const updateCell = (cell) => {
    const restTable = restaurant.getTable(getCoordsFromID(cell.id));
    const tableNumber = getTableNumFromID(cell.id);

    const imageIcon = document.getElementById(`image-icon ${cell.id}`);
    imageIcon.style.display = restTable ? 'block' : 'none';
    imageIcon.src = (restTable && restTable.occupied) ? 'https://svgsilh.com/svg/2715994-f44336.svg' : 'https://svgsilh.com/svg_v2/2715994.svg';

    const topText = document.getElementById(`top-text ${cell.id}`);
    topText.innerHTML = restTable
        ? restTable.occupied
            ? `Table ${tableNumber}: Party of ${restTable.numberOfPatrons} ($${restTable.getBillTotal()})`
            : 'Open'
        : '';

    let totalTables = 0;
    let occupiedTables = 0;
    restaurant.tableMap.forEach((tableObject) => {
        totalTables += 1;
        if (tableObject.occupied) occupiedTables += 1;
    });

    document.getElementById('total-tables').innerHTML = `Occupied Tables: ${occupiedTables}/${totalTables}`;
    document.getElementById('total-sales').innerHTML = `Total Sales: $${app.totalSales}`;


    hideContextMenu();
}

const showContextMenu = (e) => {
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

    const source = document.getElementById('context-template').innerHTML;
    const template = Handlebars.compile(source); 
    document.getElementById('context-div').innerHTML = template(contextMenuTemplate);

    const dropMenu = document.getElementById('context-menu');
    dropMenu.style.display = 'block';
    dropMenu.style.left = `${e.pageX}px`
    dropMenu.style.top = `${e.pageY}px`
};

const hideContextMenu = () => {
    const contextMenu = document.getElementById('context-menu')
    if (contextMenu) contextMenu.style.display = 'none';
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
    if (typeof errorCheck === 'string') { document.getElementById('form-log').innerHTML = errorCheck; return; }

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
    const itemPrice = 50;
    const thisTable = restaurant.getTable(getCoordsFromID(app.currentCell.id));
    if (!thisTable) return showError('No table exists to add item to');
    if (!thisTable.occupied) return showError('Nobody is sitting at this table');
    thisTable.addItemToBill(itemName, itemPrice);
    updateCell(app.currentCell);
    document.getElementById('menu-log').innerHTML = `${itemName} added to bill (total: ${thisTable.getBillTotal()} )`;
};

const removeItemFromBill = (itemName) => {
    const thisTable = restaurant.getTable(getCoordsFromID(app.currentCell.id));
    if (!thisTable) return showError('No table exists to remove item from');
    thisTable.removeItemFromBill(itemName);
    showBillModal();
};

const refreshGridDisplay = (thisRestaurant) => {
    while (mainGrid.firstChild) mainGrid.removeChild(mainGrid.firstChild);

    columndWidth = Math.floor(95 / thisRestaurant.tileWidth) + '%';
    let cssGridColumnsString = '';
    for (let i = 0; i < thisRestaurant.tileWidth; i += 1) cssGridColumnsString += columndWidth + ' ';
    mainGrid.style['grid-template-columns'] = cssGridColumnsString;
    mainGrid.style['font-size'] = (10 / thisRestaurant.tileWidth) + 'em';

    for (let i = 0; i < (thisRestaurant.tileWidth * thisRestaurant.tileHeight); i += 1) {
        const newCell = document.createElement('div');
        newCell.id = `${Math.floor(i / thisRestaurant.tileWidth)}-${(i % thisRestaurant.tileWidth)}`;
        newCell.className = 'grid-item';
        newCell.onclick = showContextMenu;
        newCell.style.height = Math.floor(80 / thisRestaurant.tileWidth) + 'vw';

        const topText = document.createElement('p');
        topText.id = `top-text ${newCell.id}`;
        topText.className = 'grid-item-text top';
        newCell.appendChild(topText);

        const image = document.createElement('img');
        image.src = 'https://svgsilh.com/svg_v2/2715994.svg';
        image.id = `image-icon ${newCell.id}`;
        image.className = 'grid-item-image';
        image.style.display = 'none';
        newCell.appendChild(image);

        mainGrid.appendChild(newCell);
    }
};

const showNewRestaurantModal = () => showFormModal(newRestaurantFormTemplate);

const showSeatTableModal = () => showFormModal(seatTableFormTemplate);

const showFormModal = (formTemplate) => {
    clearAllMenus();
    if (formTemplate.cannotCancel) app.formCannotCancel = true;
    const source = document.getElementById('form-template').innerHTML;
    const template = Handlebars.compile(source); 
    document.getElementById('form-div').innerHTML = template(formTemplate);
    document.getElementById('form-modal').style.display = 'block';
};

const hideFormModal = () => {
    const formModal = document.getElementById('form-modal');
    if (formModal) formModal.style.display = 'none';
};

const showMenuModal = () => {
    clearAllMenus();
    const source = document.getElementById('menu-template').innerHTML;
    const template = Handlebars.compile(source); 
    restaurantMenuTemplate.menuItems.forEach((menuItem) => { menuItem.addToBill = `addItemToBill('${menuItem.name}')` });
    document.getElementById('menu-div').innerHTML = template(restaurantMenuTemplate);
    document.getElementById('menu-modal').style.display = 'block';
};

const hideMenuModal = () => {
    const menuModal = document.getElementById('menu-modal');
    if (menuModal) menuModal.style.display = 'none';
};

const showBillModal = () => {
    clearAllMenus();
    const thisTable = restaurant.getTable(getCoordsFromID(app.currentCell.id));
    if (!thisTable) return showError('No table exists to show bill');

    const source = document.getElementById('bill-template').innerHTML;
    const template = Handlebars.compile(source);

    const data = { billItems: thisTable.getBill() };
    data.billItems.forEach((billItem) => { billItem.removeFromBill = `removeItemFromBill('${billItem.name}')` });
    data.grandTotal = thisTable.getBillTotal();

    document.getElementById('bill-div').innerHTML = template(data);
    document.getElementById('bill-modal').style.display = 'block';
};

const hideBillModal = () => {
    const billModal = document.getElementById('bill-modal');
    if (billModal) billModal.style.display = 'none';
};

const clearAllMenus = () => {
    hideContextMenu();
    hideMenuModal();
    hideBillModal();
    hideFormModal();
    app.formCannotCancel = false;
};


window.addEventListener('mouseup', (e) => {
    if (app.formCannotCancel) return;
    if (e.target.className === 'background' || e.target.className === 'modal' || e.target.className === 'header' || e.target.className === 'grid-container') {
        clearAllMenus();
    }
});


showNewRestaurantModal();



