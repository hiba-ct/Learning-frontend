import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SERVER_URL from '../services/serverUrl';

const TeachersCard = ({ displayDataTeachers }) => {
  
  return (
    <div>
      {/* teachers Card */}
      <Card style={{ width: '18rem' }} >
        <Card.Img
          variant="top"
          src={`${SERVER_URL}/uploads/${displayDataTeachers?.teachersImg}`}alt=""/>
        <Card.Body>
          <Card.Title>{displayDataTeachers?.name}</Card.Title>
          
        
        </Card.Body>
      </Card>

      
    </div>
  );
};

export default TeachersCard;
