const app = {};
app.totalSales = 0;
const mainGrid = document.getElementById('floor-plan');
const restaurant = new Restaurant(10, 10);

window.addEventListener('mouseup', (e) => {
    if (app.formCannotCancel) return;
    if (e.target.className === 'background' || e.target.className === 'modal' || e.target.className === 'header' || e.target.className === 'grid-container') {
        clearAllMenus();
    }
});

showNewRestaurantModal();



