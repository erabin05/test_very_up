// const cards in data.js
// const cardWitdhInPx in data.js

window.onload = function(){
    const elBoard = document.getElementById("board");

    elBoard.style.width= `${cards.length * cardWitdhInPx}px`

    elBoard.innerHTML = generateElCards(cards);
};

const generateElCards = (cards) => cards.reduce((acc, card, i) => acc + `<section class='card' ${cardStyle(i)}></section>`, "");

const cardStyle = (i) => `style="${cardRotation(cards, i)};${cardPositionHorizontaly(i)};${cardDepth(i)}"`;

const cardRotation = (cards, indexCard) => {
    const lengthIsOdd = cards.length%2 === 0;
    const middle = cards.length/2 - 0.5;
    const ratio = middle - indexCard;
    const halfTheNumberOfCard = Math.floor(cards.length/2);
    const randomBetween10and15 = Math.floor(Math.random() * 6) + 10;
    const angle = randomBetween10and15 / ((halfTheNumberOfCard - Math.abs(ratio)) + (lengthIsOdd ? 0.5 : 1));
    return `transform:rotate(${ratio > 0 ? "-" : ""}${angle}deg)`
};

const cardPositionHorizontaly = (indexCard) => `left:${cardWitdhInPx * indexCard}`;

const cardDepth = (indexCard) => `z-index:${indexCard%2 === 0 ? 100 : 200}`