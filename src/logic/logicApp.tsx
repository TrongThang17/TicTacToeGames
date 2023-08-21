import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
const emptyMap = [
  ['', '', ''], //1st row
  ['', '', ''], //2nd row
  ['', '', ''], //3rd row
];

const copyArray = (original: any) => {
  const copy = original.map((arr: any) => {
    return arr.slice();
  });
  return copy;
};
export default function () {
  const [map, setMap] = useState<any>(emptyMap);
  const [currentTurn, setCurrenTurn] = useState<any>('x');
  const [gameMode, setGameMode] = useState('Medium'); // have local, EASY and MEDIUM

  useEffect(() => {
    if (currentTurn === 'o' && gameMode !== 'Local') {
      botTurn();
    }
  }, [currentTurn, gameMode]);

  useEffect(() => {
    const winner = getWinner(map);
    if (winner) {
      gameWon(winner);
    } else {
      checkTieState();
    }
  }, [map]);

  const onPress = (rowIndex: any, columnIndex: any) => {
    if (map[rowIndex][columnIndex] !== '') {
      Alert.alert('position already occupied');
      return;
    }

    setMap((existingMap: any) => {
      const updateMap = [...existingMap];
      updateMap[rowIndex][columnIndex] = currentTurn;
      return updateMap;
    });

    setCurrenTurn(currentTurn === 'x' ? 'o' : 'x');
  };

  const getWinner = (winnerMap: any) => {
    //check row
    for (let i = 0; i < 3; i++) {
      const isRowXWinning = winnerMap[i].every((cell: any) => cell === 'x');
      const isRowOWinning = winnerMap[i].every((cell: any) => cell === 'o');
      if (isRowXWinning) {
        return 'x';
      }
      if (isRowOWinning) {
        return 'o';
      }
    }

    //check columb
    try {
      for (let col = 0; col < 3; col++) {
        let isColumnXWinner = true;
        let isColumnOWinner = true;

        for (let row = 0; row < 3; row++) {
          if (winnerMap[row][col] !== 'x') {
            isColumnXWinner = false;
          }

          if (winnerMap[row][col] !== 'o') {
            isColumnOWinner = false;
          }
        }

        if (isColumnXWinner) {
          return 'x';
          break;
        }

        if (isColumnOWinner) {
          return 'o';
          break;
        }
      }
    } catch (e) {
      console.log(e);
    }

    //check diagonals
    let isDiagonal1OWinning = true;
    let isDiagonal1XWinning = true;
    let isDiagonal2OWinning = true;
    let isDiagonal2XWinning = true;
    for (let i = 0; i < 3; i++) {
      if (winnerMap[i][i] !== 'o') {
        isDiagonal1OWinning = false;
      }
      if (winnerMap[i][i] !== 'x') {
        isDiagonal1XWinning = false;
      }
      if (winnerMap[i][2 - i] !== 'o') {
        isDiagonal2OWinning = false;
      }
      if (winnerMap[i][2 - i] !== 'x') {
        isDiagonal2XWinning = false;
      }
    }

    if (isDiagonal1OWinning || isDiagonal2OWinning) {
      return 'o';
    }
    if (isDiagonal1XWinning || isDiagonal2XWinning) {
      return 'x';
    }
  };

  const checkTieState = () => {
    if (!map.some(row => row.some(cell => cell === ''))) {
      Alert.alert("It's a tie", 'Tie', [
        {
          text: 'Restart',
          onPress: resetGame,
        },
      ]);
    }
  };

  const gameWon = (player: any) => {
    Alert.alert('Huraaay', `Player ${player} won`, [
      {
        text: 'Restart',
        onPress: resetGame,
      },
    ]);
  };

  const resetGame = () => {
    setMap([
      ['', '', ''], //1st row
      ['', '', ''], //2nd row
      ['', '', ''], //3rd row
    ]);
    setCurrenTurn('x');
  };

  const botTurn = () => {
    //Sưu tập tất cả các lựa chọn
    const possiblePositions: any[] = [];

    map.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        if (cell === '') {
          possiblePositions.push({row: rowIndex, col: columnIndex});
        }
      });
    });

    let chosenOption;
    if (gameMode === 'Medium') {
      //Attack
      possiblePositions.forEach(possiblePosition => {
        const mapCopy = copyArray(map);
        mapCopy[possiblePosition.row][possiblePosition.col] = 'o';
        const winner = getWinner(mapCopy);

        if (winner === 'o') {
          // attack that position
          chosenOption = possiblePosition;
        }
      });

      if (!chosenOption) {
        possiblePositions.forEach(possiblePosition => {
          const mapCopy = copyArray(map);
          mapCopy[possiblePosition.row][possiblePosition.col] = 'x';
          const winner = getWinner(mapCopy);

          if (winner === 'x') {
            // defend that position
            chosenOption = possiblePosition;
          }
        });
      }
    }

    if (!chosenOption) {
      chosenOption =
        possiblePositions[Math.floor(Math.random() * possiblePositions.length)];
    }
    if (chosenOption) {
      onPress(chosenOption.row, chosenOption.col);
    }
  };

  return {currentTurn, map, onPress, gameMode, setGameMode, resetGame};
}
