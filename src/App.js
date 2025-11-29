import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Square({ value, onSquareClick }){
    return(
      <button className = "square" onClick={onSquareClick}>{value}</button>
    );
  }
  function Board({ squares, onPlay, xIsNext }){

      function handleClick(i){
        if(calculateWinner(squares) || squares[i]){
          return;
        }
        const nextSquares = squares.slice();

        if (xIsNext){
          nextSquares[i] = "X"
        } else{
          nextSquares[i] = "O"
        }
        onPlay(nextSquares)
      }

      const winner = calculateWinner(squares)
      let status;
      if(winner) {
        status = "vencedor: " + winner
      } else{
        status = "Proximo jogador: " + (xIsNext ? "X" : "O")
      }
      return(
        <>
          <div className='status'>{status}</div>
              <div className='board-row'>
                <Square value = {squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value = {squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value = {squares[2]} onSquareClick={() => handleClick(2)} />
              </div>
              <div className='board-row'>
                <Square value = {squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value = {squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value = {squares[5]} onSquareClick={() => handleClick(5)} />
              </div>
              <div className='board-row'>
                <Square value = {squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value = {squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value = {squares[8]} onSquareClick={() => handleClick(8)} />
              </div>
            </>
      )
  }

  export default function Game(){
    const [history, setHistory] = useState([Array(9).fill(null)]); // armazenando o historico de jogadas
    const [currentMove, setCurrentMove] = useState(0); // pra saber emque jogada estamos

    const xIsNext = currentMove%2 === 0; // vendo se o atual moviemnto foi O (o proximo é x)

    const currentSquares = history[currentMove] // o tabuleiro atual corresponde a jogada atual

    function handlePlay(nextSquares){ // aqui ta criando um historico salvando tudo ate o momento atual + a proxima jogada
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares] 
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1) // isso aqui aapga uma jogada futura caso voltemos atras
    }
    function jumpTo(nextMove){
      setCurrentMove(nextMove) // função de viajar na linha do tempo da sjogadas
    }

    const moves = history.map((squares, move) => {
      let description;
      if (move > 0){
        description = "Ir para jogada #" + move
      } else{
        description = "Ir para o inicio do jogo"
      } return(
        <li key = {move}>
          <button onClick={()=> jumpTo(move)}>{description}</button>
        </li>
      )
    });
    return(
      <div className='game'>
        <div className='game-board'>
          <Board xIsNext={xIsNext} squares ={currentSquares} onPlay={handlePlay} />
        </div>
        <div className='game-info'>
          <h3>Histórico</h3>
          <ol>{moves}</ol>
        </div>
      </div>
    )
    }
// função pra verificar o vencedor

function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for(let i = 0; i< lines.length; i++){
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a]
    }
  }
  return null
}