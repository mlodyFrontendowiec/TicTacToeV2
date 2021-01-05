class Game {
  constructor() {
    this.gameBoard = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    this.wrapper = document.querySelector(".wrapper");
    this.actualChar = "O";
  }
  start() {
    this.createGameBoard();
  }
  changeActualChar() {
    if (this.actualChar === "O") {
      this.actualChar = "X";
    } else if (this.actualChar === "X") {
      this.actualChar = "O";
    }
  }
  createGameBoard() {
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        const div = document.createElement("div");
        div.classList.add("field");
        div.setAttribute("data-y", y);
        div.setAttribute("data-x", x);
        this.wrapper.appendChild(div);
        div.addEventListener("click", this.changeGameBoard);
      }
    }
  }
  changeGameBoard = (e) => {
    const target = e.target;
    if (this.gameBoard[target.dataset.x][target.dataset.y] == "") {
      this.gameBoard[target.dataset.x][target.dataset.y] = this.actualChar;
      this.checkWin();
      this.setImage(target);
      this.changeActualChar();
    }
  };
  setImage(target) {
    if (this.actualChar == "X") {
      target.classList.add("field__cross");
    } else {
      target.classList.add("field__circle");
    }
  }
  checkWin() {
    for (let x = 0; x < 3; x++) {
      if (
        (this.gameBoard[x][0] == this.actualChar &&
          this.gameBoard[x][1] == this.actualChar &&
          this.gameBoard[x][2] == this.actualChar) ||
        (this.gameBoard[0][x] == this.actualChar &&
          this.gameBoard[1][x] == this.actualChar &&
          this.gameBoard[2][x] == this.actualChar)
      ) {
        this.endGame();
      } else if (
        (this.gameBoard[0][x] == this.actualChar &&
          this.gameBoard[1][x + 1] == this.actualChar &&
          this.gameBoard[2][x + 2] == this.actualChar) ||
        (this.gameBoard[2][x] == this.actualChar &&
          this.gameBoard[1][x + 1] == this.actualChar &&
          this.gameBoard[0][x + 2] == this.actualChar)
      ) {
        this.endGame();
        return;
      } else {
        const flatGameBoard = this.gameBoard.flat();
        const draw = flatGameBoard.findIndex((item) => item == "");
        if (draw == -1) {
          this.endGame(draw);
        }
      }
    }
  }
  endGame(draw = 1) {
    this.wrapper.style.filter = `blur(2px)`;
    const div = document.createElement("div");
    const button = document.createElement("button");
    button.addEventListener("click", () => {
      location.reload();
    });
    button.classList.add("end-wrapper__button");
    button.textContent = "Nowa Gra";
    if (draw == -1) {
      div.textContent = "Remis";
    } else {
      div.textContent =
        this.actualChar === "O"
          ? "Koniec gry! Wygrywa kółko"
          : "Koniec gry! Wygrywa krzyżyk";
    }
    div.appendChild(button);
    div.classList.add("end-wrapper");
    document.body.appendChild(div);
  }
}
const game = new Game();
game.start();
