const app = {};
app.tableMap = new Map();

const mainGrid = document.getElementById('floor-plan');
const restaurant = new Restaurant(8, 10);

const showError = (errorMessage) => alert(errorMessage);

const getCoordsFromID = (cellID) => {
    return [cellID.split("-")[0], cellID.split("-")[1]];
};

const updateFloorPlan = () => {
    restaurant.updateSize(document.getElementById('floor-plan-width').value, document.getElementById('floor-plan-height').value);
    refreshGridDisplay(restaurant);
}

const updateCell = (cell) => {
    const restTable = restaurant.getTable(getCoordsFromID(cell.id));
    cell.innerHTML = restTable
        ? restTable.occupied 
            ? 'Occupied (' + restTable.numberOfPatrons + ' seated) Bill: ' + restTable.getBillTotal()
            : 'Open Table'
        : '';
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

const seatTable = (numberOfPatrons) => {
    const thisTable = restaurant.getTable(getCoordsFromID(app.currentCell.id));
    if (!thisTable) return showError('No table exists to seat');
    if (thisTable.occupied) return showError('Clear table before seating');
    thisTable.seatTable(numberOfPatrons);
    updateCell(app.currentCell);
};

const clearTable = () => {
    const thisTable = restaurant.getTable(getCoordsFromID(app.currentCell.id));
    if (!thisTable) return showError('No table exists to clear');
    thisTable.clearTable();
    updateCell(app.currentCell);
};

const addItemToBill = (itemName, itemPrice) => {
    const thisTable = restaurant.getTable(getCoordsFromID(app.currentCell.id));
    if (!thisTable) return showError('No table exists to add item to');
    if (!thisTable.occupied) return showError('Nobody is sitting at this table');
    thisTable.addItemToBill(itemName, itemPrice);
    updateCell(app.currentCell);
};

const hideBillModal = () => document.getElementById('bill-modal').style.display = 'none';

const showBillModal = () => {
    const thisTable = restaurant.getTable(getCoordsFromID(app.currentCell.id));
    if (!thisTable) return showError('No table exists to show bill');
    document.getElementById('bill-modal').style.display = 'block';
    document.getElementById('bill-text').innerHTML = thisTable.getBillText();
};

const hideMenuModal = () => document.getElementById('menu-modal').style.display = 'none';

const showMenuModal = () => document.getElementById('menu-modal').style.display = 'block';

const populateMenuModal = () => {
    const menuTable = document.getElementById('restaurant-menu');

    restaurantMenu.forEach((menuItem) => {
        const tableRow = document.createElement('tr');

        const nameColumn = document.createElement('td');
        const priceColumn = document.createElement('td');
        nameColumn.innerHTML = menuItem.name;
        priceColumn.innerHTML = menuItem.price;

        tableRow.onclick = () => { addItemToBill(menuItem.name, menuItem.price); }
        tableRow.appendChild(nameColumn);
        tableRow.appendChild(priceColumn);

        menuTable.appendChild(tableRow);
    });
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
        mainGrid.appendChild(newCell);
    }
};

refreshGridDisplay(restaurant);
populateMenuModal();


// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

const showModal = () => {
    modal.style.display = 'block';
};

const submitModal = () => {
    seatTable(document.getElementById('number-of-patrons-field').value);
    modal.style.display = 'none';
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}



