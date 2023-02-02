import { Button, TextField, Tooltip } from "@material-ui/core";
import { useEffect, useState } from "react";

class Cell {
  constructor(val = 0) {
    this.options = val === 0 ? [1, 2, 3, 4, 5, 6, 7, 8, 9] : [];
    this.val = val;
    this.locked = val !== 0 ? true : false;
  }
}

function App() {
  const [board, setBoard] = useState([]);
  const [repeatNum, setRepeatNum] = useState(9);

  const init = () => {
    console.log("wow");
    setBoard(
      [
        [1, 0, 4, 0, 8, 3, 9, 6, 7],
        [6, 0, 5, 0, 0, 0, 0, 2, 0],
        [7, 0, 3, 6, 1, 2, 5, 0, 8],
        [3, 0, 0, 0, 0, 0, 8, 0, 4],
        [0, 0, 0, 8, 2, 0, 0, 3, 9],
        [0, 6, 0, 0, 0, 4, 0, 0, 0],
        [8, 0, 0, 0, 0, 0, 0, 9, 0],
        [0, 3, 0, 4, 6, 0, 7, 0, 0],
        [2, 7, 0, 0, 5, 8, 0, 0, 0],
      ].map((row) => row.map((num) => new Cell(num)))
    );
    // setBoard([...new Array(9)].map((row) => [...new Array(9)].map((item) => new Cell())));
  };

  window.onclick = () => console.log(board.map((row) => row.map((cell) => cell.val)));

  useEffect(() => {
    init();
  }, []);

  const changeCell = (rowIndex, colIndex, val) => {
    let newBoard = [...board.map((row) => [...row])];

    newBoard[rowIndex][colIndex].val = parseInt(val);
    newBoard[rowIndex][colIndex].locked = true;
    newBoard[rowIndex][colIndex].options = [];

    if (val == 0) {
      newBoard[rowIndex][colIndex].locked = false;
      newBoard[rowIndex][colIndex].options = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }

    setBoard(newBoard);
  };

  // [1, 0, 4, 0, 8, 3, 9, 6, 7]
  // [6, 0, 5, 0, 0, 0, 0, 2, 0]
  // [7, 0, 3, 6, 1, 2, 5, 0, 8]
  // [3, 0, 0, 0, 0, 0, 8, 0, 4]
  // [0, 0, 0, 8, 2, 0, 0, 3, 9]
  // [0, 6, 0, 0, 0, 4, 0, 0, 0]
  // [8, 0, 0, 0, 0, 0, 0, 9, 0]
  // [0, 3, 0, 4, 6, 0, 7, 0, 0]
  // [2, 7, 0, 0, 5, 8, 0, 0, 0]

  const dropLockedOptions = () => {
    let newBoard = [...board.map((row) => [...row])];
    //rows
    for (let row of newBoard) {
      let lockedNums = [];
      //get the locked nums of the row
      for (let cell of row) if (cell.locked) lockedNums.push(cell.val);
      //removes locked values from the row
      for (let cell of row)
        for (let lockedNum of lockedNums) cell.options = cell.options.filter((num) => num !== lockedNum);
    }
    //columns
    for (let colIndex = 0; colIndex < 9; colIndex++) {
      let lockedNums = [];
      //get the locked nums of the column
      for (let rowIndex = 0; rowIndex < 9; rowIndex++)
        if (newBoard[rowIndex][colIndex].locked) lockedNums.push(newBoard[rowIndex][colIndex].val);
      //removes locked values from the column
      for (let rowIndex = 0; rowIndex < 9; rowIndex++)
        for (let lockedNum of lockedNums)
          newBoard[rowIndex][colIndex].options = newBoard[rowIndex][colIndex].options.filter(
            (num) => num !== lockedNum
          );
    }
    // //3X3s
    for (let i = 0; i < 9; i += 3) {
      for (let j = 0; j < 9; j += 3) {
        let lockedNums = [];
        //get the locked nums of the 3X3
        for (let k = 0; k < 3; k++) {
          for (let w = 0; w < 3; w++) {
            if (newBoard[i + k][j + w].locked) lockedNums.push(newBoard[i + k][j + w].val);
          }
        }
        //removes locked values from the 3X3
        for (let k = 0; k < 3; k++) {
          for (let w = 0; w < 3; w++) {
            for (let lockedNum of lockedNums)
              newBoard[i + k][j + w].options = newBoard[i + k][j + w].options.filter((num) => num !== lockedNum);
          }
        }
      }
    }
    setBoard(newBoard);
  };

  //func 1
  const lockCellWithOneOption = () => {
    let newBoard = [...board.map((row) => [...row])];
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (newBoard[row][col].options.length === 1) {
          newBoard[row][col].val = newBoard[row][col].options[0];
          newBoard[row][col].locked = true;
          newBoard[row][col].options = [];
        }
      }
    }
  };

  //func 2
  const lockCellWithUniqueOption = () => {
    lockCellWithUniqueOptionCols();
    // lockCellWithUniqueOptionRows();
  };

  const lockCellWithUniqueOptionCols = () => {
    let newBoard = [...board.map((row) => [...row])];
    //rows
    for (let i = 0; i < 9; i++) {
      let CarrOptions = [...new Array(10)].map((item) => 0);
      let indexCache = {};

      for (let j = 0; j < 9; j++) {
        if (!newBoard[j][i].locked)
          for (let option of newBoard[j][i].options) {
            CarrOptions[option]++;
            indexCache[option] = j;
          }
      }
      //look for unique options in row
      for (let j = 1; j < CarrOptions.length; j++) {
        if (CarrOptions[j] === 1) {
          newBoard[indexCache[j]][i].val = j;
          newBoard[indexCache[j]][i].locked = true;
          newBoard[indexCache[j]][i].options = [];
        }
      }
    }
  };
  const lockCellWithUniqueOptionRows = () => {
    let newBoard = [...board.map((row) => [...row])];
    //rows
    for (let i = 0; i < 9; i++) {
      let CarrOptions = [...new Array(10)].map((item) => 0);
      let indexCache = {};

      for (let j = 0; j < 9; j++) {
        if (!newBoard[i][j].locked)
          for (let option of newBoard[i][j].options) {
            CarrOptions[option]++;
            indexCache[option] = j;
          }
      }
      //look for unique options in row
      for (let j = 1; j < CarrOptions.length; j++) {
        if (CarrOptions[j] === 1) {
          newBoard[i][indexCache[j]].val = j;
          newBoard[i][indexCache[j]].locked = true;
          newBoard[i][indexCache[j]].options = [];
        }
      }
    }

    //3X3s
    // for (let i = 0; i < 9; i += 3) {
    //   for (let j = 0; j < 9; j += 3) {
    //     let CarrOptions = [...new Array(10)].map((item) => 0);
    //     let indexCache = {};

    //     for (let k = 0; k < 3; k++)
    //       for (let w = 0; w < 3; w++) {
    //         for (let option of board[i + k][j + w].options) {
    //           CarrOptions[option]++;
    //           indexCache[option] = i + k + "" + j + w;
    //         }

    //       }
    //     //look for unique options in row
    //     for (let k = 1; k < CarrOptions.length; k++) {
    //       if (CarrOptions[k] === 1) {
    //         newBoard[indexCache[k][0]][indexCache[k][1]].val = k;
    //         newBoard[indexCache[k][0]][indexCache[k][1]].locked = true;
    //       }
    //     }
    //   }
    // }

    setBoard(newBoard);
  };

  const solve = () => {
    // (!isSolved())
    for (let i = 0; i < 5; i++) {
      dropLockedOptions();
      lockCellWithOneOption();
      lockCellWithUniqueOption();
      console.log(board.map((row) => row.map((cell) => cell.val)));
    }
  };

  const isSolved = () => {
    for (let i = 0; i < 9; i++) {
      let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      for (let col = 0; col < 9; col++) {
        nums = nums.filter((num) => num !== board[i][col].val);
      }
      if (nums.length > 0) return false;
      nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      for (let row = 0; row < 9; row++) {
        nums = nums.filter((num) => num !== board[row][i].val);
      }
      if (nums.length > 0) return false;
    }

    //for 3X3s
    for (let i = 0; i < 9; i += 3) {
      for (let j = 0; j < 9; j += 3) {
        let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (let k = 3; k < 3; k++) {
          for (let w = 3; w < 3; w++) {
            nums = nums.filter((num) => num !== board[i + k][j + w].val);
          }
        }
        if (nums.length > 0) return false;
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
      }}
    >
      <div style={{ margin: "20px auto", display: "grid", gridTemplateColumns: `repeat(${repeatNum}, 1fr)`, gap: 3 }}>
        {board.map((row, rowIndex) => (
          <>
            {row.map((item, itemIndex) => (
              <div style={{ width: 70 }}>
                <Tooltip title={JSON.stringify(item.options)}>
                  <TextField
                    variant="outlined"
                    value={item.val}
                    type="number"
                    style={{ width: 70, border: item.locked ? "1px solid red" : "" }}
                    onChange={({ target }) => changeCell(rowIndex, itemIndex, target.value)}
                  />
                </Tooltip>
              </div>
            ))}
          </>
        ))}
      </div>
      <Button variant="contained" onClick={solve}>
        solve
      </Button>
      <div style={{position: "fixed", bottom: 10, left: 10}}>
        <div>repeat: {repeatNum}</div>
        <input type="range" min={0} max={20} step={1} onChange={({target}) => setRepeatNum(target.value)}/>
      </div>
      
    </div>
  );
}

export default App;
