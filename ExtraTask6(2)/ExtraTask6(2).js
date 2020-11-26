let arrCheckWin = [
    [],
    [],
    []
];

function clickElement(element) {
    let numberUser = element;
    element = "el" + element;
    const check = document.getElementById(element);
    if(check.innerHTML === ""){
        check.innerHTML = `<span class="iconify" data-inline="false" data-icon="emojione-monotone:cross-mark" style="font-size: 70px; color: black;"></span>`;
        
        addElementArr(numberUser, "User");
        if(checkWinner("User")){
            //for(let i = 0; i < 5000000000; ++i); У меня есть один небольшой недочёт, выйрышний крестик или нолик не видно, я пытался ставить слипы, но это отрисовывается после выхода из функции(
            //setTimeout(function(){}, 100000);

            let finish = checkWinner("User");
            newGame(finish);

            return;
        }

        let numberBot = botMove();

        addElementArr(numberBot, "Bot");
        if(checkWinner("Bot")){

            let finish = checkWinner("Bot");
            newGame(finish);

            return;
        }
    }
    else{
        alert("Ну нельзя же, сюда поставить))");
    }
    
    return;
}

function addElementArr(number, player) {
    if(number === 1 && player === "User") arrCheckWin[0][0] = 1;
    if(number === 1 && player === "Bot")  arrCheckWin[0][0] = 2;

    if(number === 2 && player === "User") arrCheckWin[0][1] = 1;
    if(number === 2 && player === "Bot") arrCheckWin[0][1] = 2;

    if(number === 3 && player === "User") arrCheckWin[0][2] = 1;
    if(number === 3 && player === "Bot") arrCheckWin[0][2] = 2;

    if(number === 4 && player === "User") arrCheckWin[1][0] = 1;
    if(number === 4 && player === "Bot") arrCheckWin[1][0] = 2;

    if(number === 5 && player === "User") arrCheckWin[1][1] = 1;
    if(number === 5 && player === "Bot") arrCheckWin[1][1] = 2;

    if(number === 6 && player === "User") arrCheckWin[1][2] = 1;
    if(number === 6 && player === "Bot") arrCheckWin[1][2] = 2;

    if(number === 7 && player === "User") arrCheckWin[2][0] = 1;
    if(number === 7 && player === "Bot") arrCheckWin[2][0] = 2;

    if(number === 8 && player === "User") arrCheckWin[2][1] = 1;
    if(number === 8 && player === "Bot") arrCheckWin[2][1] = 2;

    if(number === 9 && player === "User") arrCheckWin[2][2] = 1;
    if(number === 9 && player === "Bot") arrCheckWin[2][2] = 2;
}

function checkWinner(player) {
    if(player === "User"){
        if((arrCheckWin[0][0] === 1 && arrCheckWin[0][1] === 1 && arrCheckWin[0][2] === 1) 
        || (arrCheckWin[1][0] === 1 && arrCheckWin[1][1] === 1 && arrCheckWin[1][2] === 1) 
        || (arrCheckWin[2][0] === 1 && arrCheckWin[2][1] === 1 && arrCheckWin[2][2] === 1)
        || (arrCheckWin[0][0] === 1 && arrCheckWin[1][0] === 1 && arrCheckWin[2][0] === 1)
        || (arrCheckWin[0][1] === 1 && arrCheckWin[1][1] === 1 && arrCheckWin[2][1] === 1)
        || (arrCheckWin[0][2] === 1 && arrCheckWin[1][2] === 1 && arrCheckWin[2][2] === 1)
        || (arrCheckWin[0][0] === 1 && arrCheckWin[1][1] === 1 && arrCheckWin[2][2] === 1)
        || (arrCheckWin[2][0] === 1 && arrCheckWin[1][1] === 1 && arrCheckWin[0][2] === 1)
        ){    
            return "Ты победил!!!";
        }

        if(arrCheckWin[0][0] && arrCheckWin[0][1] && arrCheckWin[0][2] && arrCheckWin[1][0] && arrCheckWin[1][1] && arrCheckWin[1][2] && arrCheckWin[2][0] && arrCheckWin[2][1] && arrCheckWin[2][2])
            return "Ничья";
    }

    if(player === "Bot"){
        if((arrCheckWin[0][0] === 2 && arrCheckWin[0][1] === 2 && arrCheckWin[0][2] === 2)
        || (arrCheckWin[1][0] === 2 && arrCheckWin[1][1] === 2 && arrCheckWin[1][2] === 2)
        || (arrCheckWin[2][0] === 2 && arrCheckWin[2][1] === 2 && arrCheckWin[2][2] === 2)
        || (arrCheckWin[0][0] === 2 && arrCheckWin[1][0] === 2 && arrCheckWin[2][0] === 2)
        || (arrCheckWin[0][1] === 2 && arrCheckWin[1][1] === 2 && arrCheckWin[2][1] === 2)
        || (arrCheckWin[0][2] === 2 && arrCheckWin[1][2] === 2 && arrCheckWin[2][2] === 2)
        || (arrCheckWin[0][0] === 2 && arrCheckWin[1][1] === 2 && arrCheckWin[2][2] === 2)
        || (arrCheckWin[2][0] === 2 && arrCheckWin[1][1] === 2 && arrCheckWin[0][2] === 2)
        ){ 
            return "Ты проиграл боту)";
        }
    }
}

function newGame(info) {
    let game1 = document.querySelector("body");
    game1.innerHTML = `<div class="finish"><div class="info"> <p class="infoWin">${info}</p><button id="butt">Ещё партейку?</button></div></div>`;

    arrCheckWin = [
        [],
        [],
        []
    ];

    const button1 = document.querySelector("button");
    button1.addEventListener("click", (event) => {
        document.location.reload();
    });
}

function botMove() {
    let element, check, numberBot;

    while(true){
        element = Math.floor(Math.random() * 9) + 1;
        numberBot = element;
        element = "el" + element;

        check = document.getElementById(element);
        if(check.innerHTML === ""){
            check.innerHTML = `<span class="iconify" data-inline="false" data-icon="bi:circle" style="font-size: 70px; color: red;"></span>`;
            return numberBot;
        }
    }
}