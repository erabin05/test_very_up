// const cards in data.js

window.onload = function(){
    const elBoard = document.getElementById("board");

    elBoard.innerHTML = generateElCards(cards);
};

const generateElCards = (cards) => cards.reduce((acc, card, i) => acc + `<section class='card' ${rotationBis(cards, i)}></section>`, "")

const cardRotation = (indexCard) => result = `style="transform:rotate(${indexCard%2 === 0 ? 10 : -10}deg)"`

const rotationBis = (cards, indexCard) => {
  const middle = cards.length/2 - 0.5;
  const ratio = middle - indexCard;
  const halfTheNumberOfCard = Math.floor(cards.length/2)
  const angle = 15 / Math.ceil(halfTheNumberOfCard - Math.abs(ratio))
  return `style="transform:rotate(${ratio > 0 ? "-" : ""}${angle}deg)"`
}