class Ship {
  constructor(length, name = "boat") {
    this.length = length;
    this.name = name;
    this.hitCount = 0;
  }

  hit() {
    this.hitCount++;
  }

  isSunk() {
    if (this.hitCount === this.length) return true;

    return false;
  }
}

class Gameboard {
  constructor() {
    this.gameboardOne = [
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
    ];
    this.gameboardTwo = [
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
    ];
    this.shipsOne = [];
    this.shipsTwo = [];
  }

  placeShip(coordinates, ship, boardNum, direction) {
    const length = ship.length;
    const cord1 = coordinates[0];
    const cord2 = coordinates[1];
    let gameboard;

    if (boardNum === 1) {
      gameboard = this.gameboardOne;
    } else if (boardNum === 2) {
      gameboard = this.gameboardTwo;
    }

    if (direction === 'horizontal') {
      for (let i = 0; i < length; i++) {
        if (cord2 + i > 9 || gameboard[cord1][cord2 + i] !== "")  {
          return "Field occupied";
        }
      }
  
      for (let i = 0; i < length; i++) {
        gameboard[cord1][cord2 + i] = `${ship.name
          .slice(0, 3)
          .toLowerCase()}-${i + 1}`;
      }
    } else if (direction === 'vertical') {
      for (let i = 0; i < length; i++) {
        if (cord1 + i > 9 || gameboard[cord1 + i][cord2] !== "") {
          return "Field occupied";
        }
      }
  
      for (let i = 0; i < length; i++) {
        gameboard[cord1 + i][cord2] = `${ship.name
          .slice(0, 3)
          .toLowerCase()}-${i + 1}`;
      }
    }

    if (boardNum === 1) {
      this.shipsOne.push(ship);
    } else if (boardNum === 2) {
      this.shipsTwo.push(ship);
    }
  }

  receiveAttack(coordinates, boardNum) {
    const cord1 = coordinates[0];
    const cord2 = coordinates[1];
    let gameboard;
    let shipList;

    if (boardNum === 1) {
      gameboard = this.gameboardOne;
      shipList = this.shipsOne;
    } else if (boardNum === 2) {
      gameboard = this.gameboardTwo;
      shipList = this.shipsTwo;
    }

    if (gameboard[cord1][cord2] === 'x') {
      return 'Already attacked';
    }
    else if (gameboard[cord1][cord2] === "") {
      return (gameboard[cord1][cord2] = "x");
    } else if (gameboard[cord1][cord2].length === 5) {
      shipList.forEach(ship => {
        if (ship.name.toLowerCase().slice(0, 3) === gameboard[cord1][cord2].slice(0, 3)) {
          ship.hit();
          return (gameboard[cord1][cord2] = "x");
        }
      });
    }
  }

  areAllShipsSunk(boardNum) {
    let shipList;

    if (boardNum === 1) {
      shipList = this.shipsOne;
    } else if (boardNum === 2) {
      shipList = this.shipsTwo;
    }

    for (let i = 0; i < shipList.length; i++) {
      if (shipList[i].isSunk() === false) {
        return false;
      }
    }

    return true;
  }
}

class aiPlayer {
  constructor(name) {
    this.name = name;
  }

  attack(gameboard) {
    let randomNumber = Math.floor(Math.random() * (9 - 0) + 0);
    let randomNumber2 = Math.floor(Math.random() * (9 - 0) + 0);
    let tempField = gameboard.gameboardOne[randomNumber][randomNumber2]

    if (gameboard.receiveAttack([randomNumber, randomNumber2], 1) === 'Already attacked') {
      return this.attack(gameboard);
    }

    return [randomNumber, randomNumber2, tempField];
  }
}

export { Ship, Gameboard, 
  aiPlayer };
