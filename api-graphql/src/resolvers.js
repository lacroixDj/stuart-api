const courriers = [
  {
    id: 1,
    max_capacity: 10,
    firstName: 'Luke',
    lastName: 'Skywalker',
    email: 'luke@stuart.com',
    active: true,
    position: {lat: 41.397532, lng:2.163488}
  },
  
  {
    id: 2,
    max_capacity: 20,
    firstName: 'Anakin',
    lastName: 'Skywalker',
    email: 'darthvader@stuart.com',
    active: true,
    position: {lat: 41.396365, lng:2.162360}
  },

  {
    id: 3,
    max_capacity: 20,
    firstName: 'Obi-Wan',
    lastName: 'Kenobi',
    email: 'obiwan@stuart.com',
    active: true,
    position: {lat: 41.395882, lng:2.162983}
  },

  {
    id: 4,
    max_capacity: 30,
    firstName: 'Han',
    lastName: 'Solo',
    email: 'hansolo@stuart.com',
    active: true,
    position: {lat: 41.396713, lng:2.164110}
  },

  {
    id: 5,
    max_capacity: 50,
    firstName: 'Chewbacca',
    lastName: null,
    email: 'chewbacca@stuart.com',
    active: true,
    position: {lat: 41.396706, lng:2.161829}
  },

];

const getAllCouriers = () => {
  return new Promise((resolve, reject) => {
    resolve(courriers);
  });
}

const getAllCouriersByCapacity = (capacity_required) => {
  return new Promise((resolve, reject) => {
    resolve(courriers.filter(courrier => courrier.max_capacity >= capacity_required));
  });
}

const getCouriersByCapacityAndProximity = (capacity_required, position, radius) => {
  return new Promise((resolve, reject) => {
    resolve(courriers.filter(courrier => courrier.max_capacity >= capacity_required));
  });
}







const resolvers = {
  Query: {
    
    getAllCouriers: () => {
      return getAllCouriers();
    },

    getCouriersByCapacity: (root, {capacity_required}) => {
      return getAllCouriersByCapacity(capacity_required);
    },

    getCouriersByCapacityAndProximity: (root, {capacity_required, position, radius}) => {
      return getCouriersByCapacityAndProximity(capacity_required, position, radius);
    },

  },
};

module.exports = resolvers;