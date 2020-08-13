const  CouriersService = require('./services/courier-service');

// Let's instance the service class
const couriersService = new CouriersService();

// Defining our API Resolvers
const resolvers = {
  
  Query: {

    getAllCouriers: () => {
      return couriersService.getAllCouriers();
    },
    
    getCourierById: (root, { id }) => {
      return couriersService.getCourierById(id);
    },

    getCouriersByCapacity: (root, { capacity_required }) => {
      return couriersService.getCouriersByCapacity(capacity_required);
    },

    getCouriersByCapacityAndProximity: (root, { capacity_required, position, radius }) => {
      return couriersService.getCouriersByCapacityAndProximity(capacity_required, position, radius);
    },
  },

  Mutation: {

    setCapacity: (root, { id,  max_capacity }) => {
      return couriersService.setCapacity(id, max_capacity);
    },

    addCapacity: (root, { id,  max_capacity }) => {
      return couriersService.addCapacity(id, max_capacity);
    },

    removeCapacity: (root, { id,  max_capacity }) => {
      return couriersService.removeCapacity(id, max_capacity);
    },

    createCourier: (root, { courier }) => {
      return couriersService.createCourier(courier);
    },

    updateCourier: (root, { id, courier }) => {
      return couriersService.updateCourier(id, courier);
    },

    deleteCourier: (root, { id }) => {
      return couriersService.deleteCourier(id);
    },
  }
};

// Exporting our resolvers module
module.exports = resolvers;