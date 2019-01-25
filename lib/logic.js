/**
* Creates a new Car with a aadharNo and a Car object, contatined in the
* createCar transaction passed into this function. The default Car access value
* is true. The Car will be added to the AssetRegistry.
* @param {org.guru.cars.createCar} createCar The createCar transaction.
* @transaction
*/
function createCar(createCar) {
  
    var newCar;

    return getAssetRegistry('org.guru.cars.Car')
    .then(function (carRegistry) {
        
        // create new instance of a Car
        newCar = getFactory().newResource('org.guru.cars', 'Car', createCar.carId);

        newCar.carId = createCar.carId;
        newCar.carDetails = createCar.carDetails;
        return carRegistry.add(newCar);
    })
    .then(function () {
        // Emit an event for the new Car creation.
        var event = getFactory().newEvent('org.guru.cars', 'NewCarCreated');
        event.car = newCar;
        emit(event);
    });
}