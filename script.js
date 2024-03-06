document.addEventListener('DOMContentLoaded', function () {
    const cardsArray = [
        '🍎', '🍎', '🍌', '🍌', '🍒', '🍒', '🍇', '🍇',
        '🍓', '🍓', '🍉', '🍉', '🥭', '🥭', '🍍', '🍍'
    ];

    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];

    cardsArray.sort(() => 0.5 - Math.random());

    const grid = document.getElementById('game-container');

    function createBoard() {
        for (let i = 0; i < cardsArray.length; i++) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-id', i);
            card.innerHTML = '';
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('.card');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];

        if (cardsChosen[0] === cardsChosen[1]) {
            cards[optionOneId].innerHTML = '✅';
            cards[optionTwoId].innerHTML = '✅';
            cardsWon.push(cardsChosen);
        } else {
            cards[optionOneId].innerHTML = '';
            cards[optionTwoId].innerHTML = '';
        }

        cardsChosen = [];
        cardsChosenId = [];

        if (cardsWon.length === cardsArray.length / 2) {
            alert('Congratulations! You found all the matches!');
            resetGame();
        }
    }

    function flipCard() {
        let cardId = this.getAttribute('data-id');
        cardsChosen.push(cardsArray[cardId]);
        cardsChosenId.push(cardId);
        this.innerHTML = cardsArray[cardId];

        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    function resetGame() {
        // Clear the game container
        grid.innerHTML = '';

        // Reset arrays
        cardsChosen = [];
        cardsChosenId = [];
        cardsWon = [];

        // Reshuffle cards
        cardsArray.sort(() => 0.5 - Math.random());

        // Recreate the board
        createBoard();
    }

    createBoard();
});
