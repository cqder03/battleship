import { Gameboard, Ship, aiPlayer } from "./gameElements";

const ships = [
  { name: "Carrier", length: 5 },
  { name: "Battleship", length: 4 },
  { name: "Cruiser", length: 3 },
  { name: "Submarine", length: 3 },
  { name: "Destroyer", length: 2 },
];

function startScreen() {
    const main = document.querySelector('main');
    const startScreen = document.createElement('div');
    const mainHeading = document.createElement('h1');
    const playNow = document.createElement('button');

    startScreen.setAttribute('id', 'start-screen');
    mainHeading.setAttribute('id', 'main-heading');
    playNow.setAttribute('id', 'play-now');

    mainHeading.textContent = 'BATTLESHIP';
    playNow.textContent = 'PLAY NOW';
    
    playNow.addEventListener('click', () => {
        while (main.firstChild) {
            main.removeChild(main.firstChild);
        }
        placeShips();
    })

    main.appendChild(startScreen);
    startScreen.appendChild(mainHeading);
    startScreen.appendChild(playNow);
}

function placeShips() {
    const main = document.querySelector('main');
    const placementHeading = document.createElement('div');
    const placementPara1 = document.createElement('p');
    const placementPara2 = document.createElement('p');
    const startGame = document.createElement('button');
    const boardOne = document.createElement('div');
    const gameboard = new Gameboard();


    placementHeading.setAttribute('id', 'placement-heading');
    placementPara1.setAttribute('id', 'placemenet-para-1');
    placementPara2.setAttribute('id', 'placemenet-para-2');
    startGame.setAttribute('id', 'start-game');
    boardOne.setAttribute('id', 'board-one');

    placementPara1.textContent = 'PLACE YOUR SHIPS';
    placementPara2.textContent = 'PLACE SHIP (LENGTH: 5)';
    startGame.textContent = 'START GAME';

    main.appendChild(placementHeading);
    placementHeading.appendChild(placementPara1);
    placementHeading.appendChild(placementPara2);
    main.appendChild(boardOne);
    
    for (let j = 0; j < 10; j++) {
      const boardRow = document.createElement("div");
      boardRow.classList.add("board-row");
      boardRow.setAttribute("id", `b1row-${j}`);
      boardOne.appendChild(boardRow);
      for (let k = 0; k < 10; k++) {
        const boardField = document.createElement("div");
        boardField.classList.add("board-field");
        boardField.setAttribute("id", `r${j}f-${k}`);
        boardRow.appendChild(boardField);
      }
    }

    let shipCount = 0;

    boardOne.addEventListener("click", (event) => {
        const eventId = event.target.id;

        if (eventId[0] === "r" || event[2] === "f") {
          let rowNumber = Number(eventId[1]);
          let fieldNumber = Number(eventId.slice(4));
    
          if (shipCount < 5) {
            let ship = new Ship(ships[shipCount].length, ships[shipCount].name);
            if (gameboard.placeShip([rowNumber, fieldNumber], ship, 1) === 'Field occupied') {
                return alert('Incorrect field');
            }
            for (let i = 0; i < ships[shipCount].length; i++) {
              document
                .querySelector(`#r${rowNumber}f-${fieldNumber + i}`)
                .classList.add("black");
                document
                .querySelector(`#r${rowNumber}f-${fieldNumber + i}`)
                .classList.remove("aqua");
              
            }
    
            shipCount++;
            if (shipCount < 5) {
              placementPara2.textContent = `Place ship (length: ${ships[shipCount].length})`;
            }
          }
    
          if (shipCount === 5) {
            placementPara2.textContent = "Ships placed";
            
            let secondCount = 0;
            while (secondCount < 5) {
                let randomNumber = Math.floor(Math.random() * (9 - 0) + 0);
                let randomNumber2 = Math.floor(Math.random() * (9 - 0) + 0);
                let ship = new Ship(ships[secondCount].length, ships[secondCount].name);

                if (gameboard.placeShip([randomNumber, randomNumber2], ship, 2) !== 'Field occupied') {
                    secondCount++;
                };
            }

            console.log(gameboard.gameboardOne);
            console.log(gameboard.gameboardTwo);
            main.appendChild(startGame);
            startGame.addEventListener('click', () => {
            
            while (main.firstChild) {
                main.removeChild(main.firstChild);
            }

            playGame(gameboard, boardOne);
            });
          }
        }
      });

      boardOne.addEventListener('mouseover', (event) => {
        const eventId = event.target.id;
        if (eventId[0] === "r" || event[2] === "f") {
            let rowNumber = Number(eventId[1]);
            let fieldNumber = Number(eventId.slice(4));
            if (shipCount < 5) {
                const tempClass = boardOne.querySelector(`#r${rowNumber}f-${fieldNumber}`).getAttribute('class');
                if (tempClass.includes('black')) {
                    return;
                }
                for (let i = 0; i < ships[shipCount].length; i++) {
                    if (fieldNumber + i > 9) return;
                    boardOne.querySelector(`#r${rowNumber}f-${fieldNumber + i}`).classList.toggle('aqua');
                }
            }
        }
      });

      boardOne.addEventListener('mouseout', (event) => {
        const eventId = event.target.id;
        if (eventId[0] === "r" || event[2] === "f") {
            let rowNumber = Number(eventId[1]);
            let fieldNumber = Number(eventId.slice(4));
            if (shipCount < 5) {
                const tempClass = boardOne.querySelector(`#r${rowNumber}f-${fieldNumber}`).getAttribute('class');
                if (tempClass.includes('black')) {
                    return;
                }
                for (let i = 0; i < ships[shipCount].length; i++) {
                    if (fieldNumber + i > 9) return;
                    boardOne.querySelector(`#r${rowNumber}f-${fieldNumber + i}`).classList.toggle('aqua');
                }
            }
        }
      });

}

function playGame(gameboard, boardOne) {
    console.log(gameboard);
    const main = document.querySelector('main');
    const boardHolder = document.createElement('div');
    const boardTwo = document.createElement('div');
    const computerAI = new aiPlayer('Computer');

    boardHolder.setAttribute('id', 'board-holder');
    boardTwo.setAttribute('id', 'board-two');

    for (let j = 0; j < 10; j++) {
        const boardRow = document.createElement("div");
        boardRow.classList.add("board-row");
        boardRow.setAttribute("id", `b2row-${j}`);
        boardTwo.appendChild(boardRow);
        for (let k = 0; k < 10; k++) {
          const boardField = document.createElement("div");
          boardField.classList.add("board-field");
          boardField.setAttribute("id", `r${j}f-${k}`);
          boardRow.appendChild(boardField);
        }
    }

    main.appendChild(boardHolder);
    boardHolder.appendChild(boardOne);
    boardHolder.appendChild(boardTwo);

    boardTwo.addEventListener('click', (event) => {
        const eventId = event.target.id;

        if (gameboard.areAllShipsSunk(1) || gameboard.areAllShipsSunk(2)) return;

        if (eventId[0] === "r" || event[2] === "f") {
            let rowNumber = Number(eventId[1]);
            let fieldNumber = Number(eventId.slice(4));

            let boardTwoTempField = gameboard.gameboardTwo[rowNumber][fieldNumber];
            if (gameboard.receiveAttack([[rowNumber], [fieldNumber]], 2) === 'Already attacked') {
                return alert('Already attacked field');
            }

            if (boardTwoTempField === '') {
                boardTwo.querySelector(`#r${rowNumber}f-${fieldNumber}`).classList.add('yellow');
            } else if (boardTwoTempField.length === 5) {
                boardTwo.querySelector(`#r${rowNumber}f-${fieldNumber}`).classList.add('red');
            }
            
            const computerAttackResult = computerAI.attack(gameboard);
            
            let boardOneTempField = computerAttackResult[2];
            if (boardOneTempField === '') {
                boardOne.querySelector(`#r${computerAttackResult[0]}f-${computerAttackResult[1]}`).classList.add('yellow');
            } else if (boardOneTempField.length === 5) {
                boardOne.querySelector(`#r${computerAttackResult[0]}f-${computerAttackResult[1]}`).classList.add('red');
            }

            if (gameboard.areAllShipsSunk(1) || gameboard.areAllShipsSunk(2)) {
                if (gameboard.areAllShipsSunk(1)) {
                    return console.log('Computer wins');
                } else if (gameboard.areAllShipsSunk(2)) {
                    return console.log('You win');
                }
            }

            
        }

    })
}

export {
    startScreen,
    placeShips
}