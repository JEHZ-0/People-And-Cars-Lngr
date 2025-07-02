import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { PERSON_WITH_CARS } from '../queries/people';
import CarCard from '../components/CarCards';

const ShowPage = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(PERSON_WITH_CARS, {
    variables: { id }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading person data</p>;

  const { firstName, lastName, cars } = data?.personWithcars || {};

  return (
    <div>
      <h2>{firstName} {lastName}</h2>
      <Link to="/">Go Back Home</Link>
      <h3>Cars</h3>
      {cars?.length > 0 ? (
        cars.map(car => (
          <CarCard key={car.id} car={car} />
        ))
      ) : (
        <p>No cars owned</p>
      )}
    </div>
  );
};

export default ShowPage;
