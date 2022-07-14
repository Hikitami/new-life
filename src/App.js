import './App.css';
import React from 'react'
import { useState } from 'react';
import Area from './Components/Area/Area';

function App() {
  function createLifeArea (width, height) {
    let fullAreaArr = [];

    for (let i = 0; i < height; i++) {
      let rowArray = [];
    
      for(let idx = 0; idx < width; idx++) {
        rowArray.push(false)
      }
      fullAreaArr.push(rowArray);
    }

    return fullAreaArr;
  }

  let area = createLifeArea(50,50);
  let [life, setLife] = useState(area);

  let returnInfo = (row, idx) => {
    let newLife = [...life];
    console.log(newLife)
    console.log(row,idx)
    newLife[row][idx] = !newLife[row][idx]
    setLife(newLife)
  }

  function checkLifeBlock () {
    let lifeCoordArray = [];

    for (let i = 0; i < life.length;i++) {
      for (let idx = 0; idx < life[i].length; idx++) {
        if (life[i][idx] == true) {
          let newCoord = [i, idx];

          lifeCoordArray.push(newCoord)
        }
      }
    }
    
    return lifeCoordArray;
  }

  function checkArea (row, col, disp) {
    let range = disp;
    let lifeBlock = [];
    let deathBlock = [row, col];

    for (let colIdx = range[0]; colIdx <= range[1]; colIdx++) {
      for (let rowIdx = range[0]; rowIdx <= range[1]; rowIdx++) {
        let currentCheckCoord = [row - rowIdx, col - colIdx]

        if ((currentCheckCoord[0] < life.length && currentCheckCoord[0] >= 0) && (currentCheckCoord[1] >= 0 && life[currentCheckCoord[0]].length > currentCheckCoord[1])) {
          if (colIdx !== 0 || rowIdx !== 0) {
            if (life[currentCheckCoord[0]][currentCheckCoord[1]] === true) {
              lifeBlock.push(currentCheckCoord)
            }
          }
        }
      }
    }

    let newLifeObj = {
      current: [row, col],
      life: lifeBlock
    }

    if (newLifeObj.life.length == 2) {
      return [newLifeObj, false];
    } else if (newLifeObj.life.length > 2) {
      return [newLifeObj, deathBlock];         
    } else {
      return [newLifeObj, deathBlock];
    }               
  }

  function createNewLife (newLifeBlocks) {
    let newLifeObj = {}
    newLifeBlocks.forEach(function(item) {
      let fullArray = item.life;
      
      fullArray.push(item.current)
      
      fullArray.forEach(function(el) { 
        let obj = checkAreaLife(el[0],el[1],[-1,1])
      
        for(var key in obj) {
          if (newLifeObj[key] != undefined) {
            newLifeObj[key] = newLifeObj[key] + 1
          } else {
            newLifeObj[key] = 1
          }
        }
      })
    })

    let lifeBlock = [...life];

    for (let key in newLifeObj) {
      if (newLifeObj[key] > 2) {
        let newKey = key.split(',');
        let row = Number(newKey[0]);
        let col = Number(newKey[1]);

        lifeBlock[row][col] = true;
      }
    }

    setLife(lifeBlock)
  }

  function checkAreaLife (row, col, disp) {
    let range = disp;
    let lifeBlock = {};
    
    for (let colIdx = range[0]; colIdx <= range[1]; colIdx++) {
      for (let rowIdx = range[0]; rowIdx <= range[1]; rowIdx++) {
        let currentCheckCoord = [row - rowIdx, col - colIdx]

        if ((currentCheckCoord[0] < life.length && currentCheckCoord[0] >= 0) && (currentCheckCoord[1] >= 0 && life[currentCheckCoord[0]].length > currentCheckCoord[1])) {
          if (colIdx !== 0 || rowIdx !== 0) {
            if (life[currentCheckCoord[0]][currentCheckCoord[1]] === false) {
              lifeBlock[currentCheckCoord] = 1
            }
          }
        }
      }
    }

    return lifeBlock;
  }

  function deleteDeathBlocks (deathBlocks) {
    let deathBlock = [...life];
    
    deathBlocks.forEach(function(item) {
      deathBlock[item[0]][item[1]] = false;
    })

    setLife(deathBlock)
    console.log(deathBlock)
  }

  function checkLife (coord) {
    let newLifeBlocks = [];
    let deathBlocks = [];

    for (let i = 0; i < coord.length; i++) {
      let row = coord[i][0];
      let col = coord[i][1];

      let [lifeBlock, deathBlock] = checkArea(row, col, [-1,1])
   
      if (lifeBlock.life.length == 2) {
        newLifeBlocks.push(lifeBlock)
      } else if (lifeBlock.life.length > 2) {
        newLifeBlocks.push(lifeBlock) 
        deathBlocks.push(deathBlock)
      } else {
        deathBlocks.push(deathBlock)
      }
    }

    createNewLife(newLifeBlocks)

    deleteDeathBlocks(deathBlocks)
  }

  let start = () => {
    setInterval(function() {   
      let lifeCoord = checkLifeBlock();                     

      checkLife(lifeCoord)
    },500)
  }

  return (
    <div className="App">
      {life.map((item, i) => (
        <Area key={i} lifeCicleRow={i} fop={returnInfo} territory={item}/>
      ))}
      <button onClick={start}>start</button>
    </div>
  );
}

export default App;
