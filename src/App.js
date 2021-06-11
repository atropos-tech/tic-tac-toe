import React from 'react';
import './App.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function Board(props) {
  const renderSquare = (i) => {
    return (
      <Square
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
      />
    );
  }

  return (
    <div className="entire-board">
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function Game2() {
  const [squares, setSquares] = React.useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = React.useState(true);

  const restartGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  const handleClick = React.useCallback((i) => {
    
    setSquares(old => {
      const squaresCopy = old.slice();
      if (calculateWinner(old) != null || old[i]) {
        return old;
      }
      squaresCopy[i] = xIsNext ? 'X' : 'O';
      setXIsNext(!xIsNext);
      return squaresCopy;
    });    
  }, [xIsNext])
  
  const winner = calculateWinner(squares);
  let status;
  if (winner === "draw") {
    status = 'It\'s a draw!';
  } else if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return ( 
      <div className="game">
         <div className="container">
          <div className="title">Tic-Tac-Toe</div>
            <div className="status">{status}</div>
            <Board 
              squares={squares}
              onClick={handleClick}
            />
          <div className="restart-container">
           <button className="restart-button" onClick={restartGame}>Restart</button>
          </div>
         </div>
        <div className="game-info">
          <ol>{/* TODO */}</ol>
        </div>
      </div>
   );    

}

// ========================================


function calculateWinner(squares) {
  let won = null;
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  
  lines.forEach(line => {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      won = squares[a];
      return won;
    }
  })

  if (!squares.includes(null)) {
    return "draw";
  }
  return won;
}

export default Game2;