import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_CAR } from '../queries/cars';
import { GET_PEOPLE } from '../queries/people';

const CarForm = () => {
  const { data } = useQuery(GET_PEOPLE);
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [personId, setPersonId] = useState('');

 const [addCar] = useMutation(ADD_CAR, {
  update(cache, { data: { addCar } }) {
    const existing = cache.readQuery({ query: GET_PEOPLE });

    if (!existing) return;

    const updatedPeople = existing.people.map(person => {
      if (person.id === addCar.personId) {
        return {
          ...person,
          cars: [...(person.cars || []), addCar]
        };
      }
      return person;
    });

    cache.writeQuery({
      query: GET_PEOPLE,
      data: { people: updatedPeople }
    });
  }
});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!year || !make || !model || !price || !personId) return;

    addCar({
      variables: {
        year: parseInt(year),
        make,
        model,
        price: parseFloat(price),
        personId,
      },
    });

    setYear('');
    setMake('');
    setModel('');
    setPrice('');
    setPersonId('');
  };

  if (!data || !data.people || data.people.length === 0) return null;

  return (
    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
      <h2>Add Car</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          whiteSpace: 'nowrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <label htmlFor="year">Year:</label>
          <input
            id="year"
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <label htmlFor="make">Make:</label>
          <input
            id="make"
            type="text"
            value={make}
            onChange={(e) => setMake(e.target.value)}
            required
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <label htmlFor="model">Model:</label>
          <input
            id="model"
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <label htmlFor="price">Price:</label>
          <input
            id="price"
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <label htmlFor="person">Person:</label>
          <select
            id="person"
            value={personId}
            onChange={(e) => setPersonId(e.target.value)}
            required
          >
            <option value="">Select person</option>
            {data.people.map((person) => (
              <option key={person.id} value={person.id}>
                {person.firstName} {person.lastName}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Add Car</button>
      </form>
    </div>
  );
};

export default CarForm;