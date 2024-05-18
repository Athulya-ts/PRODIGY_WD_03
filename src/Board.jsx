import React from 'react';
import { Grid } from '@mui/material';
import Square from './Square';

const Board = ({ squares, onClick, xIsNext }) => {
    const renderSquare = (i) => {
      return <Square value={squares[i]} onClick={() => onClick(i)} bgColor={xIsNext ? '#9e0202' : '#193be3'} />;
    };

  return (
    <Grid container spacing={1} justifyContent="center" className="board-container">
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={1}>
          <Grid item>{renderSquare(0)}</Grid>
          <Grid item>{renderSquare(1)}</Grid>
          <Grid item>{renderSquare(2)}</Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={1}>
          <Grid item>{renderSquare(3)}</Grid>
          <Grid item>{renderSquare(4)}</Grid>
          <Grid item>{renderSquare(5)}</Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={1}>
          <Grid item>{renderSquare(6)}</Grid>
          <Grid item>{renderSquare(7)}</Grid>
          <Grid item>{renderSquare(8)}</Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Board;
