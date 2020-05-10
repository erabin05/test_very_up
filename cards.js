// const cards in data.js
// const cardWitdhInPx in data.js
let isAnimationEnded = false

window.onload = function(){
    const elBoard = document.getElementById("board");
    elBoard.style.width= `${cards.length * cardWitdhInPx}px`;
    elBoard.innerHTML = generateElCards(cards);

    const elCardsContainers = document.getElementsByClassName('card-container');
    setTimeout(()=>{
        cardsAppearance(elCardsContainers, randomOrderIndexs(elCardsContainers));
    },300)

    const elCardsContents = document.getElementsByClassName('card');
    cardsOnClick(elCardsContents, elCardsContainers);

    parallaxe(elCardsContainers, isAnimationEnded)
};

const generateElCards = (cards) => cards.reduce((acc, currentCard, i) => `${acc}${card(cards, currentCard, i)}`, "");

const card = (cards, currentCard, i) => `
    <div class='card-container' ${cardStyle(cards, i)}>
        <section class='card'>
            ${cardFront(currentCard)}
            ${cardBack(currentCard)}
        </section>
    </div>`;

const cardFront = (currentCard) => (
    `<figure>
        <div>
            <img src="${currentCard.img.url}" alt="${currentCard.img.alt}"/>
        </div>
    </figure>`);

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

const cardDepth = (indexCard) => `z-index:${depthDependingOnPosition(indexCard)}`;
const depthDependingOnPosition = (index) => index%2 === 0 ? 100 : 200;

// Animations
const cardsAppearance = (elCards, randomOrderIndexs, i = 0) => {

    if (elCards.length > i) {
        setTimeout(() => {
            elCards[randomOrderIndexs[i]].style.top = cardPositionVerticaly(randomOrderIndexs[i]);
            elCards[randomOrderIndexs[i]].style.opacity = 1;

                cardsAppearance(elCards, randomOrderIndexs, i + 1);  
        }, randomNumberBetween(100, 300));
    } else {
        setTimeout(() => {
            isAnimationEnded = true;
            for (let i = 0; i < elCards.length; i++) {
                elCards[i].style.transitionDuration = '0s';
            }
        }, 500)   
    };
};

const cardPositionVerticaly = (indexCard) => indexCard%2 === 0 ? randomNumberBetween(60, 120) : randomNumberBetween(0, 10);

const cardsOnClick = (elCardsContents, elCardsContainers) => {
    for(let i=0; i<elCardsContents.length; i++) {
        elCardsContents[i].addEventListener('click', () => {
            if (elCardsContents[i].style.transform !== 'rotateY(180deg)') {
                for(let y=0; y<elCardsContents.length; y++) {
                    elCardsContents[y].style.transform = 'rotateY(0deg)';
                    elCardsContainers[y].style.zIndex = depthDependingOnPosition(y);
                }
                elCardsContents[i].style.transform = 'rotateY(180deg)';
                elCardsContainers[i].style.zIndex = '250';
            } else {
                elCardsContents[i].style.transform = 'rotateY(0deg)';
                elCardsContainers[i].style.zIndex = depthDependingOnPosition(i);
            }
        })
    }
};

// Parallaxe

const parallaxe = (elCards) => {

    let count = 0;
    let iscardVerticalPositionTaken = count >= elCards.length;
    let verticalPositions = []

    window.addEventListener('mousemove', ()=> {

        const howFarFromCenterHorizontal = event.clientX - window.innerWidth/2
        const howFarFromCenterVertical = event.clientY - window.innerHeight/2
        if (isAnimationEnded) {
            for (let i=0; i < elCards.length; i++) {

                elCards[i].style.left = cardWitdhInPx * i - (howFarFromCenterHorizontal * (elCards[i].style.zIndex * 0.0002));
                if (count < elCards.length) {
                    verticalPositions = [... verticalPositions, parseInt(elCards[i].style.top, 10)]
                    count ++
                } else {
                    elCards[i].style.top = verticalPositions[i] - (howFarFromCenterVertical * (elCards[i].style.zIndex * 0.0002))
                }
            }
        }
    })
}


// Usefull
const randomNumberBetween = (min, max) => Math.floor(Math.random() * (max-min)+1) + min;

const randomOrderIndexs = (arr) => shuffle([...arr].map((el, i) => i));

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
};
