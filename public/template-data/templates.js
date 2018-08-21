const newRestaurantFormTemplate = {
    inputFields: [ {
        fieldID: 'restaurant-name',
        fieldLabel: 'Restaurant Name',
        fieldType: 'text',
    } , {
        fieldID: 'restaurant-size',
        fieldLabel: 'Restaurant Size',
        fieldType: 'number',
    }],
    submitButton: { 'buttonName': 'Aright', 'buttonFunction': 'updateFloorPlan()' },
};

const seatTableFormTemplate = {
    inputFields: [ {
        fieldID: 'party-size',
        fieldLabel: 'Party Size',
        fieldType: 'number',
    }],
    submitButton: { 'buttonName': 'Aright', 'buttonFunction': 'seatTable()' },
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
    }]
};