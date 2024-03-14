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

  placeShip(coordinates, ship, boardNum) {
    const length = ship.length;
    const cord1 = coordinates[0];
    const cord2 = coordinates[1];
    let gameboard;

    if (boardNum === 1) {
      gameboard = this.gameboardOne;
    } else if (boardNum === 2) {
      gameboard = this.gameboardTwo;
    }

    for (let i = 0; i < length; i++) {
      if (gameboard[cord1 - 1][cord2 - 1 + i] !== "") {
        return "Field occupied";
      }
      gameboard[cord1 - 1][cord2 - 1 + i] = `${ship.name
        .slice(0, 3)
        .toLowerCase()}-${i + 1}`;
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

    if (gameboard[cord1 - 1][cord2 - 1] === "") {
      return (gameboard[cord1 - 1][cord2 - 1] = "x");
    } else if (gameboard[cord1 - 1][cord2 - 1].length === 5) {
      shipList.forEach((ship) => {
        if (
          ship.name.toLowerCase().slice(0, 3) ===
          gameboard[cord1 - 1][cord2 - 1].slice(0, 3)
        ) {
          ship.hit();
          return (gameboard[cord1 - 1][cord2 - 1] = "x");
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
