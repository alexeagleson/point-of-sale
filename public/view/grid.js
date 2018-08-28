const refreshGridDisplay = (thisRestaurant) => {
    while (mainGrid.firstChild) mainGrid.removeChild(mainGrid.firstChild);

    columndWidth = Math.floor(95 / thisRestaurant.tileWidth) + '%';
    let cssGridColumnsString = '';
    for (let i = 0; i < thisRestaurant.tileWidth; i += 1) cssGridColumnsString += columndWidth + ' ';
    mainGrid.style['grid-template-columns'] = cssGridColumnsString;
    mainGrid.style['font-size'] = (12 / thisRestaurant.tileWidth) + 'vw';

    for (let i = 0; i < (thisRestaurant.tileWidth * thisRestaurant.tileHeight); i += 1) {
        const newCell = document.createElement('div');
        newCell.id = `${Math.floor(i / thisRestaurant.tileWidth)}-${(i % thisRestaurant.tileWidth)}`;
        newCell.className = 'grid-item';
        newCell.onclick = getContextMenu;
        newCell.style.height = Math.floor(80 / thisRestaurant.tileWidth) + 'vw';

        const topText = document.createElement('p');
        topText.id = `top-text ${newCell.id}`;
        topText.className = 'grid-item-text top';
        newCell.appendChild(topText);

        const image = document.createElement('img');
        image.id = `image-icon ${newCell.id}`;
        image.className = 'grid-item-image';
        image.style.display = 'none';
        newCell.appendChild(image);

        mainGrid.appendChild(newCell);
    }
};

const updateCell = (cell) => {
    const restTable = restaurant.getTable(getCoordsFromID(cell.id));
    const tableNumber = getTableNumFromID(cell.id);
    const imageIcon = document.getElementById(`image-icon ${cell.id}`);
    imageIcon.style.display = restTable ? 'block' : 'none';
    imageIcon.src = (restTable && restTable.occupied) ? 'https://svgsilh.com/svg/2715994-ff5722.svg' : 'https://svgsilh.com/svg_v2/2715994.svg';

    const topText = document.getElementById(`top-text ${cell.id}`);
    topText.innerHTML = restTable
        ? restTable.occupied
            ? `${tableNumber}: Party ${restTable.numberOfPatrons} ($${restTable.getBillTotal()})`
            : `${tableNumber} (Open)`
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
