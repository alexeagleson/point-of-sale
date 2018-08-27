const clearAllMenus = () => {
    hideContextMenu();
    hideMenuModal();
    hideBillModal();
    hideFormModal();
    app.formCannotCancel = false;
};

const showError = (errorMessage) => {
    alert(errorMessage);
    hideContextMenu();
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
