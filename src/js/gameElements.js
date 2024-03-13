class Ship {
	constructor(length, name = 'boat') {
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
      ['','','','','','','','','',''],
      ['','','','','','','','','',''],
      ['','','','','','','','','',''],
      ['','','','','','','','','',''],
      ['','','','','','','','','',''],
      ['','','','','','','','','',''],
      ['','','','','','','','','',''],
      ['','','','','','','','','',''],
      ['','','','','','','','','',''],
      ['','','','','','','','','','']
    ];
      this.gameboardTwo = [
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','',''],
        ['','','','','','','','','','']
      ];
  }

  placeShip(coordinates, ship, gameboard) {
    const length = ship.length;
    const cord1 = coordinates[0];
    const cord2 = coordinates[1];

    for (let i = 0; i < length; i++) {
      gameboard[cord1 - 1][cord2 - 1 + i] = `${ship.name.slice(0, 3).toLowerCase()}-${i + 1}`;
    }
  }

  reciveAttack(coordinates, gameboard) {
    const cord1 = coordinates[0];
    const cord2 = coordinates[1];
    
    if (gameboard[cord1 - 1][cord2 - 1] === '') {
      return gameboard[cord1 - 1][cord2 - 1] = 'x';
    }

  }
}

export {Ship,
  Gameboard 
}