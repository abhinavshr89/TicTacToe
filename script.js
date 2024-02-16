let turn = "X";
let isGameOver = false;
let turnDisplay = document.querySelector(".turnShowDisplay");
let gameOverScreen = document.querySelector(".gameOverScreen");
let message = document.querySelector(".message");
let boxes = document.getElementsByClassName("box");
let boxText = document.querySelector(".boxtext");
// Function to change the turn
let changeTurn = () => {
   if(turn === 'X'){
      turnDisplay.innerText = "O";
      

      return 'O';
   }else{
      turnDisplay.innerText = 'X';
      return 'X';
      
   }
};

// Function to check for a win
const checkWin = () => {
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < winConditions.length; i++) {
        let v0 = boxes[winConditions[i][0]].querySelector('.boxtext').innerText;
        let v1 = boxes[winConditions[i][1]].querySelector('.boxtext').innerText;
        let v2 = boxes[winConditions[i][2]].querySelector('.boxtext').innerText;

        if (v0 !== "" && v0 === v1 && v0 === v2) {
            isGameOver = true;
            gameOverScreen.style.display = "flex";
            message.innerText = `${v0} wins!`;
            highlightWinningCells(winConditions[i]);
            return true;
        }
    }
    return false;
};

// Function to check for a draw
const checkDraw = () => {
    if (!isGameOver) {
        let isDraw = true;
        for (let i = 0; i < boxes.length; i++) {
            if (boxes[i].querySelector('.boxtext').innerText === "") {
                isDraw = false;
                break;
            }
        }

        if (isDraw) {
            isGameOver = true;
            gameOverScreen.style.display = "flex";
            message.innerText = "It's a Draw!";
            return true;
        }
    }
    return false;
};

// Highlight winning cells
const highlightWinningCells = (winningCells) => {
    for (let j = 0; j < 3; j++) {
        let index = winningCells[j];
        boxes[index].style.backgroundColor = "#ff0084";
        boxes[index].style.color = "#000";
    }
};

// Game Logic
Array.from(boxes).forEach(element => {
    element.addEventListener('click', (e) => {
        let boxtext = element.querySelector('.boxtext');
        if (boxtext.innerText === '' && !isGameOver) {
            boxtext.innerText = turn;
            boxtext.classList.add(turn === 'X' ? 'x-color' : 'o-color');

            turn = changeTurn();
            
            if (checkWin() || checkDraw()) {
                // Additional actions after a win or draw can be added here
            }
        }
    });
});

// Reset Button
const resetButton = document.querySelector('.resetButton');

resetButton.addEventListener('click', () => {
    window.location.reload();
});
