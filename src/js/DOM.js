import { Gameboard, Ship } from "./gameElements";

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

    let i = 0;
    
    for (let j = 0; j < 10; j++) {
      const boardRow = document.createElement("div");
      boardRow.classList.add("board-row");
      boardRow.setAttribute("id", `b${i + 1}row-${j}`);
      boardOne.appendChild(boardRow);
      for (let k = 0; k < 10; k++) {
        const boardField = document.createElement("div");
        boardField.classList.add("board-field");
        boardField.setAttribute("id", `r${j}f-${k}`);
        boardRow.appendChild(boardField);
      }
    }

    boardOne.addEventListener("click", (event) => {
        const eventId = event.target.id;

        if (eventId[0] === "r" || event[2] === "f") {
          let rowNumber = Number(eventId[1]);
          let fieldNumber = Number(eventId.slice(4));
    
          if (ships.length > 0) {
            let ship = new Ship(ships[0].length, ships[0].name);
            if (gameboard.placeShip([rowNumber, fieldNumber], ship, 1) === 'Field occupied') {
                return alert('Incorrect field');
            }
            for (let i = 0; i < ships[0].length; i++) {
              document
                .querySelector(`#r${rowNumber}f-${fieldNumber + i}`)
                .classList.add("black");
            }
    
            ships.shift();
            if (ships.length > 0) {
              placementPara2.textContent = `Place ship (length: ${ships[0].length})`;
            }
          }
    
          if (ships.length === 0) {
            placementPara2.textContent = "Ships placed";
            console.log(gameboard.gameboardOne);
            main.appendChild(startGame);
          }
        }
      });

    placementPara1.textContent = 'PLACE YOUR SHIPS';
    placementPara2.textContent = 'PLACE SHIP (LENGTH: 5)';
    startGame.textContent = 'START GAME';

    main.appendChild(placementHeading);
    placementHeading.appendChild(placementPara1);
    placementHeading.appendChild(placementPara2);
    main.appendChild(boardOne);
}