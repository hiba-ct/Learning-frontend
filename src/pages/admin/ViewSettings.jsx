import React from 'react';
import Settings from './Settings';

const ViewSettings = () => {
  const admin = {
    _id: '67833a87b85f0b0060e5f7a2', // Replace with actual data
    username: 'Reo Max',
    email: 'adminEduversity@gmail.com',
    password: 'admin122',
    role: 'admin',
  };

  return (
    <div>
      <Settings admin={admin} />
    </div>
  );
};

export default ViewSettings;
