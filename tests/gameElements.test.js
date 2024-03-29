import { Gameboard, Ship } from "../src/js/gameElements";

test("Testing ship hit function, test 1", () => {
  const ship = new Ship(3);
  ship.hit();

  expect(ship.hitCount).toBe(1);
});

test("Testing ship hit function, test 2", () => {
  const ship = new Ship(3);
  ship.hit();
  ship.hit();
  ship.hit();

  expect(ship.hitCount).toBe(3);
});

test("Ship isSunk function, test 1", () => {
  const ship = new Ship(5);
  for (let i = 0; i < 4; i++) {
    ship.hit();
  }

  expect(ship.isSunk()).toBeFalsy();
});

test("Ship isSunk function, test 2", () => {
  const ship = new Ship(3);
  for (let i = 0; i < 3; i++) {
    ship.hit();
  }

  expect(ship.isSunk()).toBeTruthy();
});

test("Place ship function, test 1", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(5, "Carrier");

  gameboard.placeShip([2, 2], ship, 1, 'horizontal');

  expect(gameboard.gameboardOne[2]).toStrictEqual([
    "",
    "",
    "car-1",
    "car-2",
    "car-3",
    "car-4",
    "car-5",
    "",
    "",
    "",
  ]);
});

test("Place ship function, test 2", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(5, "Carrier");
  const ship2 = new Ship(3, "Cruiser");

  gameboard.placeShip([2, 2], ship, 1, 'horizontal');
  gameboard.placeShip([4, 2], ship2, 1, 'horizontal');

  const partOfBoard = gameboard.gameboardOne.slice(2, 5);

  expect(gameboard.shipsOne).toStrictEqual([ship, ship2]);
  expect(partOfBoard).toStrictEqual([
    ["", "", "car-1", "car-2", "car-3", "car-4", "car-5", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "cru-1", "cru-2", "cru-3", "", "", "", "", ""],
  ]);
});

test("Place ship function, test 3", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(5, "Carrier");
  const ship2 = new Ship(3, "Cruiser");

  gameboard.placeShip([2, 2], ship, 1, 'horizontal');
  gameboard.placeShip([2, 2], ship2, 1, 'horizontal');

  expect(gameboard.shipsOne).toStrictEqual([ship]);
  expect(gameboard.gameboardOne[2]).toStrictEqual([
    "",
    "",
    "car-1",
    "car-2",
    "car-3",
    "car-4",
    "car-5",
    "",
    "",
    "",
  ]);
});

test('Receive attack function, test 4', () => {
  const gameboard = new Gameboard();
  const ship = new Ship(5, 'Carrier');
  const ship2 = new Ship(4, 'Battleship');
  const ship3 = new Ship(3, 'Cruiser');
  const ship4 = new Ship(3, 'Submarine');
  const ship5 = new Ship(2, 'Destroyer');

  gameboard.placeShip([2, 2], ship, 1, 'vertical');
  gameboard.placeShip([3, 3], ship2, 1, 'horizontal');
  gameboard.placeShip([5, 5], ship3, 1, 'vertical');
  gameboard.placeShip([1, 1], ship4, 1, 'horizontal');
  gameboard.placeShip([0, 5], ship5, 1, 'vertical');

  expect(gameboard.gameboardOne).toStrictEqual(
    [
      ["", "", "", "", "", "des-1", "", "", "", ""],
      ["", "sub-1", "sub-2", "sub-3", "", "des-2", "", "", "", ""],
      ["", "", "car-1", "", "", "", "", "", "", ""],
      ["", "", "car-2", "bat-1", "bat-2", "bat-3", "bat-4", "", "", ""],
      ["", "", "car-3", "", "", "", "", "", "", ""],
      ["", "", "car-4", "", "", "cru-1", "", "", "", ""],
      ["", "", "car-5", "", "", "cru-2", "", "", "", ""],
      ["", "", "", "", "", "cru-3", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
    ]
  )
});

test("Receive attack function, test 1", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3, "Cruiser");

  gameboard.placeShip([2, 2], ship, 1, 'horizontal');
  gameboard.receiveAttack([2, 2], 1);

  expect(gameboard.gameboardOne[2][2]).toBe("x");
});

test("Receive attack function, test 2", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3, "Cruiser");

  gameboard.placeShip([2, 2], ship, 1, 'horizontal');
  gameboard.receiveAttack([2, 2], 1);

  expect(ship.hitCount).toBe(1);
  expect(gameboard.gameboardOne[2]).toStrictEqual([
    "",
    "",
    "x",
    "cru-2",
    "cru-3",
    "",
    "",
    "",
    "",
    "",
  ]);
});

test("Receive attack function, test 3", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(5, "Carrer");
  const ship2 = new Ship(3, "Cruiser");

  gameboard.placeShip([2, 2], ship, 1, 'horizontal');
  gameboard.placeShip([4, 2], ship2, 1, 'horizontal');
  gameboard.receiveAttack([4, 2], 1);
  gameboard.receiveAttack([4, 3], 1);
  gameboard.receiveAttack([4, 4], 1);
  gameboard.receiveAttack([2, 3], 1);

  expect(ship.hitCount).toBe(1);
  expect(ship2.hitCount).toBe(3);
  expect(ship.isSunk()).toBeFalsy();
  expect(ship2.isSunk()).toBeTruthy();
  expect(gameboard.areAllShipsSunk(1)).toBeFalsy();

  const partOfBoard = gameboard.gameboardOne.slice(0, 5);
  expect(partOfBoard).toStrictEqual([
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "car-1", "x", "car-3", "car-4", "car-5", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "x", "x", "x", "", "", "", "", ""],
  ]);
});

test("Are all ships sunk function, test 1", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(5, "Carrer");
  const ship2 = new Ship(3, "Cruiser");

  gameboard.placeShip([3, 3], ship, 1, 'horizontal');
  gameboard.placeShip([5, 3], ship2, 1, 'horizontal');
  gameboard.receiveAttack([3, 3], 1);
  gameboard.receiveAttack([3, 4], 1);
  gameboard.receiveAttack([3, 5], 1);
  gameboard.receiveAttack([3, 6], 1);
  gameboard.receiveAttack([3, 7], 1);
  gameboard.receiveAttack([5, 3], 1);
  gameboard.receiveAttack([5, 4], 1);
  gameboard.receiveAttack([5, 5], 1);

  expect(gameboard.areAllShipsSunk(1)).toBeTruthy();
});

test("Are all ships sunk function, test 2", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(5, "Carrer");
  const ship2 = new Ship(3, "Cruiser");

  gameboard.placeShip([3, 3], ship, 1, 'horizontal');
  gameboard.placeShip([5, 3], ship2, 1, 'horizontal');
  gameboard.receiveAttack([3, 3], 1);
  gameboard.receiveAttack([3, 4], 1);
  gameboard.receiveAttack([3, 5], 1);
  gameboard.receiveAttack([3, 6], 1);
  gameboard.receiveAttack([5, 3], 1);
  gameboard.receiveAttack([5, 4], 1);
  gameboard.receiveAttack([5, 5], 1);

  expect(gameboard.areAllShipsSunk(1)).toBeFalsy();
});


test('Ship placement test', () => {
  const gameboard = new Gameboard();
  const p1ship1 = new Ship(5, 'Carrier');
  const p1ship2 = new Ship(4, 'Battleship');
  const p1ship3 = new Ship(3, 'Cruiser');
  const p1ship4 = new Ship(3, 'Submarine');
  const p1ship5 = new Ship(2, 'Destroyer');
  const p2ship1 = new Ship(5, 'Carrier');
  const p2ship2 = new Ship(4, 'Battleship');
  const p2ship3 = new Ship(3, 'Cruiser');
  const p2ship4 = new Ship(3, 'Submarine');
  const p2ship5 = new Ship(2, 'Destroyer');

  gameboard.placeShip([0, 4], p1ship1, 1, 'horizontal');
  gameboard.placeShip([8, 5], p1ship2, 1, 'horizontal');
  gameboard.placeShip([1, 6], p1ship3, 1, 'horizontal');
  gameboard.placeShip([4, 2], p1ship4, 1, 'horizontal');
  gameboard.placeShip([9, 0], p1ship5, 1, 'horizontal');
  gameboard.placeShip([0, 4], p2ship1, 2, 'horizontal');
  gameboard.placeShip([8, 5], p2ship2, 2, 'horizontal');
  gameboard.placeShip([1, 6], p2ship3, 2, 'horizontal');
  gameboard.placeShip([4, 2], p2ship4, 2, 'horizontal');
  gameboard.placeShip([9, 0], p2ship5, 2, 'horizontal');

  expect(gameboard.gameboardOne).toStrictEqual(
    [
      ["", "", "", "", "car-1", "car-2", "car-3", "car-4", "car-5", ""],
      ["", "", "", "", "", "", "cru-1", "cru-2", "cru-3", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "sub-1", "sub-2", "sub-3", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "bat-1", "bat-2", "bat-3", "bat-4", ""],
      ["des-1", "des-2", "", "", "", "", "", "", "", ""],
    ]
  );
  expect(gameboard.gameboardTwo).toStrictEqual(
    [
      ["", "", "", "", "car-1", "car-2", "car-3", "car-4", "car-5", ""],
      ["", "", "", "", "", "", "cru-1", "cru-2", "cru-3", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "sub-1", "sub-2", "sub-3", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "bat-1", "bat-2", "bat-3", "bat-4", ""],
      ["des-1", "des-2", "", "", "", "", "", "", "", ""],
    ]
  );
}); 