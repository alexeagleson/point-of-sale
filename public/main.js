const app = {};
app.tableMap = new Map();

const mainGrid = document.getElementById('floor-plan');
const restaurant = new Restaurant(10, 10);

const showError = (errorMessage) => {
    alert(errorMessage);
    hideContextMenu();
};

const getCoordsFromID = (cellID) => {
    return [cellID.split("-")[0], cellID.split("-")[1]];
};

const updateFloorPlan = () => {
    hideFormModal();
    restaurant.updateSize(document.getElementById('restaurant-size').value, document.getElementById('restaurant-size').value);
    refreshGridDisplay(restaurant);
}

const updateCell = (cell) => {
    const restTable = restaurant.getTable(getCoordsFromID(cell.id));
    cell.innerHTML = restTable
        ? restTable.occupied 
            ? 'Occupied (' + restTable.numberOfPatrons + ' seated) Bill: ' + restTable.getBillTotal()
            : 'Open Table'
        : '';
    const image = document.createElement('img');
    image.src = 'https://svgsilh.com/svg_v2/2715994.svg';
    image.width = 50;
    image.height = 50;
    image.style['pointer-events'] = 'none';
    cell.appendChild(image);
    hideContextMenu();
}

const showContextMenu = (e) => {
    e = e || window.event;
    const target = e.target || e.srcElement;
    const dropMenu = document.getElementById('context-menu');
    dropMenu.style.display = 'block';
    dropMenu.style.left = `${e.x}px`
    dropMenu.style.top = `${e.y}px`
    app.currentCell = target;
};

const hideContextMenu = () => document.getElementById('context-menu').style.display = 'none';

const addTable = () => {
    restaurant.addNewTable(getCoordsFromID(app.currentCell.id));
    updateCell(app.currentCell);
};

const removeTable = () => {
    restaurant.removeTable(getCoordsFromID(app.currentCell.id));
    updateCell(app.currentCell);
};

const seatTable = () => {
    hideFormModal();
    const thisTable = restaurant.getTable(getCoordsFromID(app.currentCell.id));
    if (!thisTable) return showError('No table exists to seat');
    if (thisTable.occupied) return showError('Clear table before seating');
    thisTable.seatTable(document.getElementById('party-size').value);
    updateCell(app.currentCell);
};

const clearTable = () => {
    const thisTable = restaurant.getTable(getCoordsFromID(app.currentCell.id));
    if (!thisTable) return showError('No table exists to clear');
    thisTable.clearTable();
    updateCell(app.currentCell);
};

const addItemToBill = (itemName) => {
    const itemPrice = 50;
    const thisTable = restaurant.getTable(getCoordsFromID(app.currentCell.id));
    if (!thisTable) return showError('No table exists to add item to');
    if (!thisTable.occupied) return showError('Nobody is sitting at this table');
    thisTable.addItemToBill(itemName, itemPrice);
};

const removeItemFromBill = (itemName) => {
    const thisTable = restaurant.getTable(getCoordsFromID(app.currentCell.id));
    if (!thisTable) return showError('No table exists to remove item from');
    thisTable.removeItemFromBill(itemName);
};

const refreshGridDisplay = (thisRestaurant) => {
    while (mainGrid.firstChild) mainGrid.removeChild(mainGrid.firstChild);

    columndWidth = Math.floor(95 / thisRestaurant.tileWidth) + '%';
    let cssGridColumnsString = '';
    for (let i = 0; i < thisRestaurant.tileWidth; i += 1) cssGridColumnsString += columndWidth + ' ';
    mainGrid.style['grid-template-columns'] = cssGridColumnsString;

    for (let i = 0; i < (thisRestaurant.tileWidth * thisRestaurant.tileHeight); i += 1) {
        const newCell = document.createElement('div');
        newCell.id = `cell-${Math.floor(i / thisRestaurant.tileWidth)}-${(i % thisRestaurant.tileWidth)}`;
        newCell.className = 'grid-item';
        newCell.onclick = showContextMenu;
        newCell.style.height = Math.floor(80 / thisRestaurant.tileWidth) + 'vw';
        mainGrid.appendChild(newCell);
    }
};

const showNewRestaurantModal = () => showFormModal(newRestaurantFormTemplate);

const showSeatTableModal = () => showFormModal(seatTableFormTemplate);

const hideFormModal = () => document.getElementById('form-modal').style.display = 'none';

const showFormModal = (formTemplate) => {
    const source = document.getElementById('form-template').innerHTML;
    const template = Handlebars.compile(source); 
    document.getElementById('form-div').innerHTML = template(formTemplate);
    document.getElementById('form-modal').style.display = 'block';
}

const showMenuModal = () => {
    const source = document.getElementById('menu-template').innerHTML;
    const template = Handlebars.compile(source); 
    restaurantMenuTemplate.menuItems.forEach((menuItem) => { menuItem.addToBill = `addItemToBill('${menuItem.name}')` });
    document.getElementById('menu-div').innerHTML = template(restaurantMenuTemplate);
    document.getElementById('menu-modal').style.display = 'block';
};

const hideMenuModal = () => document.getElementById('menu-modal').style.display = 'none';

const showBillModal = () => {
    const thisTable = restaurant.getTable(getCoordsFromID(app.currentCell.id));
    if (!thisTable) return showError('No table exists to show bill');

    const source = document.getElementById('bill-template').innerHTML;
    const template = Handlebars.compile(source);

    const data = { billItems: thisTable.getBill() };

    data.billItems.forEach((billItem) => { billItem.removeFromBill = `removeItemFromBill('${billItem.name}')` });

    const reducer = (accumulator, currentValue) => accumulator + currentValue.total;
    data.grandTotal = data.billItems.reduce(reducer, 0);

    document.getElementById('bill-div').innerHTML = template(data);
    document.getElementById('bill-modal').style.display = 'block';
};

const hideBillModal = () => document.getElementById('bill-modal').style.display = 'none';

showNewRestaurantModal();



