// const cards in data.js
// const cardWitdhInPx in data.js

window.onload = function(){
    const elBoard = document.getElementById("board");
    elBoard.style.width= `${cards.length * cardWitdhInPx}px`
    elBoard.innerHTML = generateElCards(cards);

    const elCards = document.getElementsByClassName('card-container');
    setTimeout(()=>{
        cardsAppearance(elCards);
    },300)
};

const generateElCards = (cards) => cards.reduce((acc, currentCard, i) => `${acc}${card(cards, currentCard, i)}`, "");

const card = (cards, currentCard, i) => `
    <div class='card-container' ${cardStyle(cards, i)}>
        <section class='card'>
            ${cardFront(currentCard)}
            ${cardBack(currentCard)}
        </section>
    </div>`;
const cardFront = (currentCard) => `<figure></figure>`;
const cardBack = (currentCard) => `<article><p>${currentCard.text}</p></article>`;

// Style
const cardStyle = (cards, i) => `style="${cardRotation(cards, i)};${cardPositionHorizontaly(i)};${cardDepth(i)}"`;

const cardRotation = (cards, indexCard) => {
    const lengthIsOdd = cards.length%2 === 0;
    const middle = cards.length/2 - 0.5;
    const ratio = middle - indexCard;
    const halfTheNumberOfCard = Math.floor(cards.length/2);
    const angle = randomNumberBetween(10, 15) / ((halfTheNumberOfCard - Math.abs(ratio)) + (lengthIsOdd ? 0.5 : 1));
    return `transform:rotate(${ratio > 0 ? "-" : ""}${angle}deg)`
};

const cardPositionHorizontaly = (indexCard) => `left:${cardWitdhInPx * indexCard}px`;

const cardDepth = (indexCard) => `z-index:${indexCard%2 === 0 ? 100 : 200}`;

// Animaton
const cardsAppearance = (elCards, i = 0) => {
    if (elCards.length > i) {
        setTimeout(() => {
            elCards[i].style.top = cardPositionVerticaly(i);
            elCards[i].style.opacity = 1;

                cardsAppearance(elCards, i + 1);  
        }, randomNumberBetween(100, 300));
    };
};

const cardPositionVerticaly = (indexCard) => indexCard%2 === 0 ? randomNumberBetween(60, 120) : randomNumberBetween(0, 10)


// Usefull
const randomNumberBetween = (min, max) => Math.floor(Math.random() * (max-min)+1) + min;
