import { Gameboard, Ship } from "../src/js/gameElements";

test('Testing ship hit function 2', () => {
  const ship = new Ship(3);
  ship.hit();

  expect(ship.hitCount).toBe(1);
});

test('Testing ship hit function 3', () => {
  const ship = new Ship(3);
  ship.hit();
  ship.hit();
  ship.hit();

  expect(ship.hitCount).toBe(3);
});

test('Ship isSunk function 1', () => {
  const ship = new Ship(5);
  for (let i = 0; i < 4; i++) {
    ship.hit();
  }

  expect(ship.isSunk()).toBeFalsy();
});

test('Ship isSunk function 2', () => {
  const ship = new Ship(3);
  for (let i = 0; i < 3; i++) {
    ship.hit();
  }

  expect(ship.isSunk()).toBeTruthy();
});

test('Place ship function 1', () => {
  const gameboard = new Gameboard();
  const ship = new Ship(5, 'Carrier');

  gameboard.placeShip([3,3], ship, gameboard.gameboardOne);

  expect(gameboard.gameboardOne[2]).toStrictEqual(
    ['','','car-1','car-2','car-3','car-4','car-5','','','']
  )
});

test('Place ship function 2', () => {
  const gameboard = new Gameboard();
  const ship = new Ship(5, 'Carrier');
  const ship2 = new Ship(3, 'Cruiser');

  gameboard.placeShip([3,3], ship, gameboard.gameboardOne);
  gameboard.placeShip([5,3], ship2, gameboard.gameboardOne);

  const partOfBoard = gameboard.gameboardOne.slice(2, 5);
  expect(partOfBoard).toStrictEqual( 
      [['','','car-1','car-2','car-3','car-4','car-5','','',''],
      ['','','','','','','','','',''],
      ['','','cru-1','cru-2','cru-3','','','','',''],]
  )
});

test('Recive attack function 1', () => {
  const  gameboard = new Gameboard();
  const ship = new Ship(3, 'Cruiser');

  gameboard.reciveAttack([1, 1], gameboard.gameboardOne);

  expect(gameboard.gameboardOne[0][0]).toBe('x');
});