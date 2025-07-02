const { people: rawPeople, cars: rawCars } = require('./peopleCarsScheme');

let people = [...(Array.isArray(rawPeople) ? rawPeople : [])];
let cars = [...(Array.isArray(rawCars) ? rawCars : [])];

const findById = (arr, id) => arr.find(item => item.id === id);
const generateId = (arr) => String(arr.length + 1);

const resolvers = {
  Query: {
    people: () => people,
    cars: () => cars,
    personWithcars: (_, { id }) => findById(people, id),
  },

  Person: {
    cars: (person) => cars.filter(car => car.personId === person.id),
  },

  Mutation: {
    addPerson: (_, { firstName, lastName }) => {
      const newPerson = { id: generateId(people), firstName, lastName };
      people.push(newPerson);
      return newPerson;
    },

    updatePerson: (_, { id, firstName, lastName }) => {
      const person = findById(people, id);
      if (!person) return null;
      if (firstName) person.firstName = firstName;
      if (lastName) person.lastName = lastName;
      return person;
    },

    deletePerson: (_, { id }) => {
      const index = people.findIndex(p => p.id === id);
      if (index === -1) return null;
      const deletedPerson = people.splice(index, 1)[0];
      cars = cars.filter(car => car.personId !== id);
      return deletedPerson;
    },

    deleteAllPeople: () => {
      people = [];
      cars = [];
      return true;
    },

    addCar: (_, { year, make, model, price, personId }) => {
      const newCar = { id: generateId(cars), year, make, model, price, personId };
      cars.push(newCar);
      return newCar;
    },

    updateCar: (_, { id, year, make, model, price, personId }) => {
      const car = findById(cars, id);
      if (!car) return null;
      if (year !== undefined) car.year = year;
      if (make !== undefined) car.make = make;
      if (model !== undefined) car.model = model;
      if (price !== undefined) car.price = price;
      if (personId !== undefined) car.personId = personId;
      return car;
    },

    deleteCar: (_, { id }) => {
      const index = cars.findIndex(c => c.id === id);
      if (index === -1) return null;
      return cars.splice(index, 1)[0];
    },

    deleteAllCars: () => {
      cars = [];
      return true;
    },
  },
};

module.exports = { resolvers };