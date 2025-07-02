import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_CAR, DELETE_CAR } from '../queries/cars';
import { GET_PEOPLE } from '../queries/people';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const PersonCard = ({ person }) => {
  const [editingCarId, setEditingCarId] = useState(null);
  const [editedCar, setEditedCar] = useState({});

  const [updateCar] = useMutation(UPDATE_CAR);
  const [deleteCar] = useMutation(DELETE_CAR, {
    refetchQueries: [{ query: GET_PEOPLE }]
  });

  const startEditCar = (car) => {
    setEditingCarId(car.id);
    setEditedCar({ ...car });
  };

  const handleSaveCar = () => {
    updateCar({
      variables: {
        ...editedCar,
        year: parseInt(editedCar.year),
        price: parseFloat(editedCar.price)
      },
      refetchQueries: [{ query: GET_PEOPLE }]
    });
    setEditingCarId(null);
  };

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, marginBottom: 24 }}>
      <h3>
        {person.firstName} {person.lastName}
      </h3>

      {person.cars.map((car) => (
        <div key={car.id} style={{ marginBottom: 12 }}>
          <div style={{ backgroundColor: '#f0f0f0', padding: 8, borderRadius: 4 }}>
            {editingCarId === car.id ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <input
                  value={editedCar.year}
                  onChange={(e) => setEditedCar({ ...editedCar, year: e.target.value })}
                  placeholder="Year"
                />
                <input
                  value={editedCar.make}
                  onChange={(e) => setEditedCar({ ...editedCar, make: e.target.value })}
                  placeholder="Make"
                />
                <input
                  value={editedCar.model}
                  onChange={(e) => setEditedCar({ ...editedCar, model: e.target.value })}
                  placeholder="Model"
                />
                <input
                  value={editedCar.price}
                  onChange={(e) => setEditedCar({ ...editedCar, price: e.target.value })}
                  placeholder="Price"
                />
                <button onClick={handleSaveCar}>Save</button>
              </div>
            ) : (
              <div>
                {car.year} {car.make} {car.model} → ${parseFloat(car.price).toLocaleString()}
              </div>
            )}
          </div>

          <div style={{ marginTop: 4 }}>
            <EditOutlined
              style={{ marginRight: 12, cursor: 'pointer' }}
              onClick={() => startEditCar(car)}
            />
            <DeleteOutlined
              style={{ cursor: 'pointer' }}
              onClick={() => deleteCar({ variables: { id: car.id } })}
            />
          </div>
        </div>
      ))}

      <Link to={`/people/${person.id}`} style={{ fontSize: '0.9rem', color: '#1890ff' }}>
        LEARN MORE
      </Link>
    </div>
  );
};

export default PersonCard;