import React from 'react';
import { Button } from '@mui/material';

const Square = ({ value, onClick, bgColor }) => {
    return (
        <button className="square" onClick={onClick} style={{ backgroundColor: bgColor, width: '100px', height: '100px', fontSize: '24px',cursor: "pointer" }}>
        {value}
      </button>
    );
};
export default Square;
  