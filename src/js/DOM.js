import { Gameboard, Ship, aiPlayer } from "./gameElements";

const ships = [
  { name: "Carrier", length: 5 },
  { name: "Battleship", length: 4 },
  { name: "Cruiser", length: 3 },
  { name: "Submarine", length: 3 },
  { name: "Destroyer", length: 2 },
];

function removeMainChildren() {
  const main = document.querySelector("main");

  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
}

function createBoard(board) {
  const boardOne = document.createElement("div");
  const boardTwo = document.createElement("div");
  const boardList = [boardOne, boardTwo];

  boardOne.setAttribute("id", "board-one");
  boardTwo.setAttribute("id", "board-two");

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 10; j++) {
      const boardRow = document.createElement("div");
      boardRow.classList.add("board-row");
      boardRow.setAttribute("id", `b${i + 1}row-${j}`);
      boardList[i].appendChild(boardRow);
      for (let k = 0; k < 10; k++) {
        const boardField = document.createElement("div");
        boardField.classList.add("board-field");
        boardField.setAttribute("id", `r${j}f-${k}`);
        boardRow.appendChild(boardField);
      }
    }
  }

  if (board === 1) {
    return boardOne;
  } else if (board === 2) {
    return boardTwo;
  } else if ((board = 12)) {
    return [boardOne, boardTwo];
  }
}

function startScreen() {
  const main = document.querySelector("main");
  const startScreen = document.createElement("div");
  const mainHeading = document.createElement("h1");
  const playNow = document.createElement("button");

  startScreen.setAttribute("id", "start-screen");
  mainHeading.setAttribute("id", "main-heading");
  playNow.setAttribute("id", "play-now");

  mainHeading.textContent = "BATTLESHIP";
  playNow.textContent = "PLAY NOW";

  playNow.addEventListener("click", () => {
    removeMainChildren();
    placeShips();
  });

  main.appendChild(startScreen);
  startScreen.appendChild(mainHeading);
  startScreen.appendChild(playNow);
}

function placeShips() {
  const main = document.querySelector("main");
  const placementHeading = document.createElement("div");
  const placementPara1 = document.createElement("p");
  const placementPara2 = document.createElement("p");
  const placementDirection = document.createElement("p");
  const startGame = document.createElement("button");
  const boardOne = createBoard(1);
  const gameboard = new Gameboard();

  placementHeading.setAttribute("id", "placement-heading");
  placementPara1.setAttribute("id", "placemenet-para-1");
  placementPara2.setAttribute("id", "placemenet-para-2");
  placementDirection.setAttribute("id", "placement-direction");
  startGame.setAttribute("id", "start-game");

  placementPara1.textContent = "PLACE YOUR SHIPS";
  placementPara2.textContent = "PLACE SHIP (LENGTH: 5)";
  placementDirection.textContent = "HORIZONTAL";
  startGame.textContent = "START GAME";

  main.appendChild(placementHeading);
  placementHeading.appendChild(placementPara1);
  placementHeading.appendChild(placementPara2);
  placementHeading.appendChild(placementDirection);
  main.appendChild(boardOne);

  placementDirection.addEventListener("click", () => {
    if (placementDirection.textContent === "HORIZONTAL") {
      placementDirection.textContent = "VERTICAL";
    } else {
      placementDirection.textContent = "HORIZONTAL";
    }
  });

  let shipCount = 0;

  boardOne.addEventListener("click", (event) => {
    const eventId = event.target.id;

    if (eventId[0] === "r" || event[2] === "f") {
      let rowNumber = Number(eventId[1]);
      let fieldNumber = Number(eventId.slice(4));
      let direction = placementDirection.textContent.toLowerCase();

      if (shipCount < 5) {
        let ship = new Ship(ships[shipCount].length, ships[shipCount].name);
        if (
          gameboard.placeShip([rowNumber, fieldNumber], ship, 1, direction) ===
          "Field occupied"
        ) {
          return alert("Incorrect field");
        }
        for (let i = 0; i < ships[shipCount].length; i++) {
          if (direction === "horizontal") {
            document
              .querySelector(`#r${rowNumber}f-${fieldNumber + i}`)
              .classList.add("black");
            document
              .querySelector(`#r${rowNumber}f-${fieldNumber + i}`)
              .classList.remove("aqua");
          } else if (direction === "vertical") {
            document
              .querySelector(`#r${rowNumber + i}f-${fieldNumber}`)
              .classList.add("black");
            document
              .querySelector(`#r${rowNumber + i}f-${fieldNumber}`)
              .classList.remove("aqua");
          }
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
          let randomNumber3 = Math.round(Math.random() * (2 - 1) + 1); // Math.round used for higher chance of getting 2 for 'vertical' direction
          let direction;

          if (randomNumber3 === 1) {
            direction = "horizontal";
          } else if (randomNumber3 === 2) {
            direction = "vertical";
          }
          let ship = new Ship(
            ships[secondCount].length,
            ships[secondCount].name
          );

          if (
            gameboard.placeShip(
              [randomNumber, randomNumber2],
              ship,
              2,
              direction
            ) !== "Field occupied"
          ) {
            secondCount++;
          }
        }

        main.appendChild(startGame);
        startGame.addEventListener("click", () => {
          removeMainChildren();
          playGame(gameboard, boardOne);
        });
      }
    }
  });

  boardOne.addEventListener("mouseover", (event) => {
    const eventId = event.target.id;
    const direction = placementDirection.textContent.toLowerCase();
    if (eventId[0] === "r" || event[2] === "f") {
      let rowNumber = Number(eventId[1]);
      let fieldNumber = Number(eventId.slice(4));
      if (shipCount < 5) {
        const tempClass = boardOne
          .querySelector(`#r${rowNumber}f-${fieldNumber}`)
          .getAttribute("class");
        if (tempClass.includes("black")) {
          return;
        }
        for (let i = 0; i < ships[shipCount].length; i++) {
          if (direction === "horizontal") {
            if (fieldNumber + i > 9) return;
            document
              .querySelector(`#r${rowNumber}f-${fieldNumber + i}`)
              .classList.toggle("aqua");
          } else if (direction === "vertical") {
            if (rowNumber + i > 9) return;
            document
              .querySelector(`#r${rowNumber + i}f-${fieldNumber}`)
              .classList.toggle("aqua");
          }
        }
      }
    }
  });

  boardOne.addEventListener("mouseout", (event) => {
    const eventId = event.target.id;
    const direction = placementDirection.textContent.toLowerCase();
    if (eventId[0] === "r" || event[2] === "f") {
      let rowNumber = Number(eventId[1]);
      let fieldNumber = Number(eventId.slice(4));
      if (shipCount < 5) {
        const tempClass = boardOne
          .querySelector(`#r${rowNumber}f-${fieldNumber}`)
          .getAttribute("class");
        if (tempClass.includes("black")) {
          return;
        }
        for (let i = 0; i < ships[shipCount].length; i++) {
          if (direction === "horizontal") {
            if (fieldNumber + i > 9) return;
            document
              .querySelector(`#r${rowNumber}f-${fieldNumber + i}`)
              .classList.toggle("aqua");
          } else if (direction === "vertical") {
            if (rowNumber + i > 9) return;
            document
              .querySelector(`#r${rowNumber + i}f-${fieldNumber}`)
              .classList.toggle("aqua");
          }
        }
      }
    }
  });
}

function playGame(gameboard, boardOne) {
  const main = document.querySelector("main");
  const boardHolder = document.createElement("div");
  const boardTwo = createBoard(2);
  const computerAI = new aiPlayer("Computer");
  const gameVerdict = document.createElement('div');
  const gameVerdictPara = document.createElement('p');
  const playAgain = document.createElement("button");

  boardHolder.setAttribute("id", "board-holder");
  gameVerdict.setAttribute('id', 'game-verdict');
  gameVerdictPara.setAttribute('id', 'game-verdict-text');
  playAgain.setAttribute("id", "play-again");
  
  playAgain.textContent = "PLAY AGAIN";

  main.appendChild(boardHolder);
  boardHolder.appendChild(boardOne);
  boardHolder.appendChild(boardTwo);
  gameVerdict.appendChild(gameVerdictPara);

  boardTwo.addEventListener("click", (event) => {
    const eventId = event.target.id;

    if (gameboard.areAllShipsSunk(1) || gameboard.areAllShipsSunk(2)) return;

    if (eventId[0] === "r" || event[2] === "f") {
      let rowNumber = Number(eventId[1]);
      let fieldNumber = Number(eventId.slice(4));

      let boardTwoTempField = gameboard.gameboardTwo[rowNumber][fieldNumber];
      if (
        gameboard.receiveAttack([[rowNumber], [fieldNumber]], 2) ===
        "Already attacked"
      ) {
        return alert("Already attacked field");
      }

      if (boardTwoTempField === "") {
        boardTwo
          .querySelector(`#r${rowNumber}f-${fieldNumber}`)
          .classList.add("yellow");
      } else if (boardTwoTempField.length === 5) {
        boardTwo
          .querySelector(`#r${rowNumber}f-${fieldNumber}`)
          .classList.add("red");
      }

      const computerAttackResult = computerAI.attack(gameboard);

      let boardOneTempField = computerAttackResult[2];
      if (boardOneTempField === "") {
        boardOne
          .querySelector(
            `#r${computerAttackResult[0]}f-${computerAttackResult[1]}`
          )
          .classList.add("yellow");
      } else if (boardOneTempField.length === 5) {
        boardOne
          .querySelector(
            `#r${computerAttackResult[0]}f-${computerAttackResult[1]}`
          )
          .classList.add("red");
      }

      if (gameboard.areAllShipsSunk(1) || gameboard.areAllShipsSunk(2)) {
        if (gameboard.areAllShipsSunk(1)) {
          gameVerdictPara.textContent = 'Computer wins';
        } else if (gameboard.areAllShipsSunk(2)) {
          gameVerdictPara.textContent = "You won";
        }
        main.appendChild(gameVerdict);
        main.appendChild(playAgain);
        playAgain.addEventListener("click", () => {
          removeMainChildren();
          placeShips();
        });
      }
    }
  });
}

export { startScreen, placeShips };
