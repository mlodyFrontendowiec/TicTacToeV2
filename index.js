class Game{
    constructor(){
        this.gameBoard= 
        [
            ["","",""],
            ["","",""],
            ["","",""]
        ]
        this.wrapper = document.querySelector('.wrapper')
        this.actualChar = "O";
    }
    start(){
        this.createGameBoard()
    }
    changeActualChar(){
        if(this.actualChar === "O"){
            this.actualChar = "X";
        }else if(this.actualChar ==="X")  {
            this.actualChar = "O";
        }
    }
    createGameBoard(){

        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                const div = document.createElement("div");
                div.classList.add("field");
                div.setAttribute("data-y",y);
                div.setAttribute("data-x",x)
                this.wrapper.appendChild(div);
                div.addEventListener('click',this.changeGameBoard)
            }
        }
    }
    changeGameBoard =(e)=>{
        const target = e.target;
        if(this.gameBoard[target.dataset.x][target.dataset.y] == ""){
        this.gameBoard[target.dataset.x][target.dataset.y] = this.actualChar;
        this.setImage(target);
        this.changeActualChar();
    }
    }
    setImage(target){
        if(this.actualChar == "X"){
            target.classList.add('field__cross');
        }else{
            target.classList.add('field__circle');
        }
    }
    

        

        
}
const game = new Game();
game.start();