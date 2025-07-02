import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PEOPLE } from '../queries/people';
import PersonForm from '../components/PersonForm';
import CarForm from '../components/CarForm';
import PersonCard from '../components/PersonCard';
import '../styles/Home.css';

const Home = () => {
  const { loading, error, data } = useQuery(GET_PEOPLE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading people.</p>;

  return (
    <div className="home-container">
      <h1 className="title">PEOPLE AND THEIR CARS</h1>

      <section className="form-section">
        <PersonForm />
      </section>

      <section className="form-section">
        <CarForm people={data.people} />
      </section>

      <section className="records-section">
         <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2>Records</h2>
        </div>
        <div className="cards-wrapper">
          {data.people.map(person => (
            <PersonCard key={person.id} person={person} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
