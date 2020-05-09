// const cards in data.js

window.onload = function(){
    const elBoard = document.getElementById("board");

    elBoard.innerHTML = generateElCards(cards);
};

const generateElCards = (cards) => cards.reduce((acc, card) => acc + "<section class='card'></section>", "")