const newRestaurantFormTemplate = {
    formHeader: 'Welcome to Restaurant Manager',
    inputFields: [ {
        fieldID: 'restaurant-name',
        fieldLabel: 'Restaurant Name',
        fieldType: 'text',
    } , {
        fieldID: 'restaurant-size',
        fieldLabel: 'Diameter in metres (5-15)',
        fieldType: 'number',
    }],
    submitButton: { 'buttonName': 'Confirm', 'buttonFunction': 'updateFloorPlan()' },
    cannotCancel: true,
};

const seatTableFormTemplate = {
    formHeader: 'Enter party size',
    inputFields: [ {
        fieldID: 'party-size',
        fieldLabel: 'Party Size (1-20)',
        fieldType: 'number',
    }],
    submitButton: { 'buttonName': 'Confirm', 'buttonFunction': 'seatTable()' },
    cannotCancel: false,
};

const restaurantMenuTemplate = {
    menuItems: [{
        name: 'Chicken',
        price: 11,
    } , {
        name: 'Steak',
        price: 15,
    } , {
        name: 'Salad',
        price: 7,
    } , {
        name: 'Nachos',
        price: 12,
    } , {
        name: 'Cheeseburger',
        price: 8,
    } , {
        name: 'French Fries',
        price: 5,
    } , {
        name: 'Milk',
        price: 3,
    } , {
        name: 'Soda',
        price: 2,
    }]
};