import '../style.css'

const boardOne = document.querySelector('#board-one');
const boardTwo = document.querySelector('#board-two');
const boards = [boardOne, boardTwo];

for (let i = 0; i < 2; i++) {
    let board = boards[i];

    for (let j = 0; j < 10; j++) {
        const boardRow = document.createElement('div');
        boardRow.classList.add('board-row');
        boardRow.setAttribute('id', `b${i}row-${j}`)
        board.appendChild(boardRow);
        for(let k = 0; k < 10; k++) {
            const boardField = document.createElement('div');
            boardField.classList.add('board-field');
            boardField.setAttribute('id', `r${j}f-${k}`);
            boardRow.appendChild(boardField);
        }
    }
}