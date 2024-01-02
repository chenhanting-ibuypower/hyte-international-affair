import React from 'react';

const AddButton = ({ onAdd }) => {
  return (
    <button onClick={onAdd}>
      Add
    </button>
  );
};

export default AddButton;