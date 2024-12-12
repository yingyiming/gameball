import React, { useState } from 'react';
import './App.css';

// 棋盘尺寸常量
const BOARD_SIZE = 20; // 修改为 20x20 棋盘
const SQUARE_SIZE = 25; // 每个小方格的尺寸调整为 25px


function App() {
  // 棋盘状态
  const [board, setBoard] = useState(Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(null)));
  const [isBlackTurn, setIsBlackTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  // 放置棋子处理函数
  const handleClick = (row, col) => {
    if (board[row][col] || winner) return; // 如果已被占用或游戏已结束

    const newBoard = board.map(row => row.slice());
    newBoard[row][col] = isBlackTurn ? 'black' : 'white';
    setBoard(newBoard);

    if (checkWinner(newBoard, row, col)) {
      setWinner(isBlackTurn ? 'Black' : 'White');
    } else {
      setIsBlackTurn(!isBlackTurn);
    }
  };

  // 勝利檢測邏輯
  const checkWinner = (board, row, col) => {
    const directions = [
      { dr: 0, dc: 1 }, // 横向
      { dr: 1, dc: 0 }, // 竖向
      { dr: 1, dc: 1 }, // 对角线右下
      { dr: 1, dc: -1 } // 对角线左下
    ];
    const currentPlayer = board[row][col];

    for (let { dr, dc } of directions) {
      let count = 1;

      // 检查正向方向
      for (let i = 1; i < 5; i++) {
        const r = row + dr * i;
        const c = col + dc * i;
        if (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && board[r][c] === currentPlayer) {
          count++;
        } else {
          break;
        }
      }

      // 检查反向方向
      for (let i = 1; i < 5; i++) {
        const r = row - dr * i;
        const c = col - dc * i;
        if (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && board[r][c] === currentPlayer) {
          count++;
        } else {
          break;
        }
      }

      if (count >= 5) {
        return true; // 找到五连线
      }
    }

    return false; // 没有连成五子
  };

  // 重启游戏
  const restartGame = () => {
    setBoard(Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(null)));
    setIsBlackTurn(true);
    setWinner(null);
  };

  return (
    <div className="container">
      <h1>五子棋</h1>
      {winner && <h2>{winner} 获胜！🎉</h2>}
      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`cell ${cell}`}
              style={{
                top: rowIndex * SQUARE_SIZE,
                left: colIndex * SQUARE_SIZE,
              }}
              onClick={() => handleClick(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
      <button className="restart" onClick={restartGame}>重启游戏</button>
    </div>
  );
}

export default App;
