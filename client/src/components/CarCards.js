import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_CAR } from '../queries/cars';
import { GET_PEOPLE } from '../queries/people';

const CarCard = ({ car }) => {
  const [deleteCar] = useMutation(DELETE_CAR, {
    update(cache, { data: { deleteCar } }) {
      const { people } = cache.readQuery({ query: GET_PEOPLE });
      cache.writeQuery({
        query: GET_PEOPLE,
        data: {
          people: people.map((p) => ({
            ...p,
            cars: p.cars.filter((c) => c.id !== deleteCar.id),
          })),
        },
      });
    },
  });

  return (
    <div className="car-card">
      <p>
        {car.year} {car.make} {car.model} - ${car.price.toLocaleString()}
      </p>
      <button onClick={() => deleteCar({ variables: { id: car.id } })}>Delete</button>
    </div>
  );
};

export default CarCard;
