const newRestaurantFormTemplate = {
    formHeader: 'Welcome to RestaurantApp',
    inputFields: [ {
        fieldID: 'restaurant-name',
        fieldLabel: 'Restaurant Name',
        fieldType: 'text',
    } , {
        fieldID: 'restaurant-size',
        fieldLabel: 'Diameter in metres (5-20)',
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
        name: 'Cheese',
        price: 50,
    } , {
        name: 'Butt',
        price: 50,
    } , {
        name: 'Whatever',
        price: 50,
    } , {
        name: 'Stuff',
        price: 50,
    } , {
        name: 'Ok',
        price: 50,
    } , {
        name: 'Whatever',
        price: 50,
    } , {
        name: 'Stuff',
        price: 50,
    } , {
        name: 'Ok',
        price: 50,
    }]
};