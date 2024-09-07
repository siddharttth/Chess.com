const socket = io();
const chess = new Chess();
const boardElement = document.querySelector(".chessboard");

let draggedPiece=null;
let sourceSquare=null;
let playerRole=null;

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML="";
    // console.log(board);
    board.forEach((row, rowindex)=>{
        row.forEach((square, squareindex)=>{
            const squareElement = document.createElement("div");
            squareElement.classList.add("square",
                (rowindex+squareindex)%2==0 ? "light" : "dark"
            );

            squareElement.dataset.row = rowindex;
            squareElement.dataset.col = squareindex;

            //creating piece element
            if (square){
                const pieceElement = document.createElement("div");
                pieceElement.classList.add(
                    "piece",
                    square.color === "w" ? "white" : "black"
                );
                pieceElement.innerText=getPieceUnicode(square);
                pieceElement.draggable=playerRole === square.color;
                pieceElement.addEventListener("dragstart",(e)=>{
                    if(pieceElement.draggable){
                        draggedPiece=pieceElement;
                        sourceSquare={row: rowindex, col:squareindex};
                        e.dataTransfer.setData("text/plain","");
                    }
                });
                pieceElement.addEventListener("dragend",(e)=>{
                    draggedPiece = null;
                    sourceSquare = null; 
                });
                squareElement.appendChild(pieceElement);
            }
            squareElement.addEventListener("dragover", function(e){
                e.preventDefault();
            });
            squareElement.addEventListener("drop", function(e){
                e.preventDefault();
                if(draggedPiece){
                    const targetSource = {
                        row:parseInt(squareElement.dataset.row),
                        col:parseInt(squareElement.dataset.col),
                    };
                    handleMove(sourceSquare, targetSource)
                }
            });
            boardElement.appendChild(squareElement);
        });  
    });
    if (playerRole==="b"){
        boardElement.classList.add("flipped");
    }else{
        boardElement.classList.remove("flipped");
    }
};
const handleMove = (sourceSquare, targetSource) => {
    const move = {
        from: `${String.fromCharCode(97 + sourceSquare.col)}${8 - sourceSquare.row}`,
        to: `${String.fromCharCode(97 + targetSource.col)}${8 - targetSource.row}`,
        promotion: 'q', // Assuming you always promote to a queen
    };

    // Emit the move to the server
    socket.emit("move", move);
};

const getPieceUnicode = (piece) => {
    const unicodePieces={
        p:"♟",
        r:"♜",
        n:"♞",
        b:"♝",
        q:"♛",
        k:"♚",
        P:"♙",
        R:"♖",
        N:"♘",
        B:"♗",
        Q:"♕",
        K:"♔",
    };
    return unicodePieces[piece.type] || "";
};
socket.on("playerRole",function(role){
    playerRole=role;
    renderBoard();
});
socket.on("spectatorRole", function(){
    playerRole=null;
    renderBoard();
});
socket.on("boardState", function(fen){
    chess.load(fen);
    renderBoard();
});
socket.on("move", function(move){
    chess.load(move);
    renderBoard();
});

renderBoard();