// Checkbox.js
import React from 'react';
import Checkbox from '@mui/material/Checkbox';

function Check({ value, onChange }) {
  return (
    <>
      <Checkbox color='success' checked={value} onChange={onChange} />
    </>
  );
}

export default Check;
