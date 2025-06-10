// script.js
document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const statusText = document.querySelector(".status");
    const restartButton = document.querySelector(".restart");
    const toggleModeButton = document.querySelector(".toggle-mode");
    let currentPlayer = "X";
    let board = ["", "", "", "", "", "", "", "", ""];
    let isAIEnabled = false;
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartButton.addEventListener("click", restartGame);
    toggleModeButton.addEventListener("click", toggleMode);

    function cellClicked(e) {
        const cell = e.target;
        const index = cell.getAttribute("data-index");

        if (board[index] !== "" || !isGameActive()) {
            return;
        }

        updateCell(cell, index);
        if (isAIEnabled && isGameActive()) {
            aiMove();
        }
    }

    function updateCell(cell, index) {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        updateStatus();
    }

    function updateStatus() {
        if (checkWinner()) {
            statusText.textContent = `${currentPlayer === "X" ? "O" : "X"} wins!`;
        } else if (board.includes("")) {
            statusText.textContent = `${currentPlayer}'s turn`;
        } else {
            statusText.textContent = `It's a draw!`;
        }
    }

    function checkWinner() {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return board[index] === (currentPlayer === "X" ? "O" : "X");
            });
        });
    }

    function isGameActive() {
        return statusText.textContent.includes("turn");
    }

    function restartGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        statusText.textContent = "X's turn";
        cells.forEach(cell => (cell.textContent = ""));
    }

    function toggleMode() {
        isAIEnabled = !isAIEnabled;
        toggleModeButton.textContent = isAIEnabled ? "Switch to PvP Mode" : "Switch to AI Mode";
        restartGame();
    }

    function aiMove() {
        let emptyCells = [];
        board.forEach((cell, index) => {
            if (cell === "") emptyCells.push(index);
        });

        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const cell = document.querySelector(`.cell[data-index="${randomIndex}"]`);
        updateCell(cell, randomIndex);
    }

    updateStatus();
});
