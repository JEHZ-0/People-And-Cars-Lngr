import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PERSON, GET_PEOPLE } from '../queries/people';

const PersonForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [addPerson] = useMutation(ADD_PERSON, {
    update(cache, { data: { addPerson } }) {
      const { people } = cache.readQuery({ query: GET_PEOPLE });
      cache.writeQuery({
        query: GET_PEOPLE,
        data: { people: [...people, addPerson] },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName) return;
    addPerson({ variables: { firstName, lastName } });
    setFirstName('');
    setLastName('');
  };

  return (
    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
      <h2>Add Person</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'nowrap',
          whiteSpace: 'nowrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <label htmlFor="firstName">First name:</label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <label htmlFor="lastName">Last name:</label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <button type="submit">Add Person</button>
      </form>
    </div>
  );
};

export default PersonForm;