// There will be only two players. One human and one computer (for the Base solution).
// The computer will always be the dealer.
// Each player gets dealt two cards to start.
// The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
// The dealer has to hit if their hand is below 17.
// Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
// The player who is closer to, but not above 21 wins the hand.

//card deck function to draw cards, shuffle function
//player and computer array with each card and total, as well as a display for them
//if blackjack, end turn here
//else, move on
//take command to either hit or stand
//while loop? as long as player input is hit and their card total is below 21, they can continue to hit
//computer's turn is automatic, must draw until 17 and above
//compare both values in comparer function, churn out winner

//initialize hands for both players
var gameMode = "start";
var playerHand = [];
var dealerHand = [];
var playerHandValue = 0;
var dealerHandValue = 0;

//deck function
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

//shuffle function
// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// Initialise the card deck representation as an array of objects
var deck = makeDeck();

// Shuffle the deck and save it in a new variable shuffledDeck
// to communicate that we have shuffled the deck.
var shuffledDeck = shuffleCards(deck);

var handValueCalc = function (handArray) {
  var handValue = 0;
  for (var j = 0; j < handArray.length; j++) {
    //set value of JQK to 10
    if (
      handArray[j].name == "king" ||
      handArray[j].name == "queen" ||
      handArray[j].name == "jack"
    ) {
      handArray[j].rank = 10;
      //set value of A to 11 only if handValue less than or equal to 10
    } else if (handArray[j].rank == 1 && handValue <= 10) {
      handArray[j].rank = 11;
    }
    handValue = handValue + parseInt(handArray[j].rank);
  }
  if (handValue > 21) {
    //set value of A back to 1 if handValue exceeds 21 and recalculate
    handValue = 0;
    for (var k = 0; k < handArray.length; k++) {
      if (handArray[k].rank == 11) {
        handArray[k].rank = 1;
      }
      handValue = handValue + parseInt(handArray[k].rank);
    }
  }
  console.log(handValue);
  return handValue;
};

var handToString = function (hands) {
  var handStringOutput = "";
  for (var x = 0; x < hands.length; x++) {
    handStringOutput += `${hands[x].name}`;
    if (hands.length - x > 2) {
      handStringOutput += `, `;
    } else if (hands.length - x == 2) {
      handStringOutput += ` and `;
    }
  }
  return handStringOutput;
};

var startGame = function (
  playerHand,
  dealerHand,
  playerHandValue,
  dealerHandValue
) {
  //player and computer array with each card and total, as well as a display for them
  for (var i = 0; i < 2; i++) {
    playerHand.push(shuffledDeck.pop());
    dealerHand.push(shuffledDeck.pop());
  }
  console.log(playerHand);
  console.log(dealerHand);

  //test if ace function works
  // playerHand[0].rank = 1;
  // playerHand[1].rank = 1;
  // playerHand[0].name = "ace";
  // playerHand[1].name = "ace";

  //calculate value of the hand
  playerHandValue = handValueCalc(playerHand);
  dealerHandValue = handValueCalc(dealerHand);
  //string player's hands
  playerHandText = handToString(playerHand);
  dealerHandText = handToString(dealerHand);
  //display and check for Blackjack
  var startingText = "";

  startingText += `Player drew ${playerHandText}, with a value of ${playerHandValue}. <br> Dealer drew ${dealerHandText}, with a value of ${dealerHandValue}.`;
  if (playerHandValue == 21 && dealerHandValue == 21) {
    startingText += `<br>Both players got Blackjack. It's a tie! Please refresh the page to restart.`;
  } else if (playerHandValue == 21) {
    startingText += `<br>Player got Blackjack. Player wins! Please refresh the page to restart.`;
  } else if (dealerHandValue == 21) {
    startingText += `<br>Dealer got Blackjack. Dealer wins! Please refresh the page to restart.`;
  } else {
    startingText += `<br>Please enter "hit" or "stand" to continue.`;
  }
  console.log(startingText);
  return startingText;
};

var draw = function (
  input,
  playerHand,
  playerHandValue,
  dealerHand,
  dealerHandValue
) {
  //function runs if no players get blackjack.
  //function checks for input, if hit, draw card, if stand, proceed to dealer draw and compare outputs.
  //returns output at every draw
  //returns comparison only when "stand" is entered
  //if at any time hit leads to above 21, exit loop
  var updatedHandDisplay = "";
  var updatedHandValue = handValueCalc(playerHand);
  var updatedHandText = handToString(playerHand);
  var updatedDealerHandValue = handValueCalc(dealerHand);
  var updatedDealerHandText = handToString(dealerHand);
  if (input == "hit") {
    playerHand.push(shuffledDeck.pop());
    updatedHandValue = handValueCalc(playerHand);
    updatedHandText = handToString(playerHand);
    if (updatedHandValue > 21) {
      updatedHandDisplay += `Player has ${updatedHandText}, with a value of ${updatedHandValue}. Player has exceeded 21 points.<br>Dealer wins! Please refresh the page to restart.`;
    } else {
      updatedHandDisplay += `Player has ${updatedHandText}, with a value of ${updatedHandValue}.<br>Please enter "hit" or "stand" to continue.`;
    }
  } else if (input == "stand") {
    console.log(updatedHandValue);
    //computer assesses if it has enough points, otherwise draw card
    //compare results and display, return to function.
    //var updatedDealerHandValue = dealerHandValue;
    while (updatedDealerHandValue < 17) {
      dealerHand.push(shuffledDeck.pop());
      updatedDealerHandValue = handValueCalc(dealerHand);
      updatedDealerHandText = handToString(dealerHand);
    }
    if (updatedDealerHandValue > 21) {
      updatedHandDisplay += `Player has ${updatedHandValue} points.<br>Dealer has ${updatedDealerHandText}, with a value of ${updatedDealerHandValue}.<br>Dealer has exceeded 21 points. Player wins! Please refresh the page to restart.`;
    } else if (updatedDealerHandValue == updatedHandValue) {
      updatedHandDisplay += `Player has ${updatedHandValue} points.<br>Dealer has ${updatedDealerHandText}, with a value of ${updatedDealerHandValue}.<br>It's a tie! Please refresh the page to restart.`;
    } else if (updatedDealerHandValue > updatedHandValue) {
      updatedHandDisplay += `Player has ${updatedHandValue} points.<br>Dealer has ${updatedDealerHandText}, with a value of ${updatedDealerHandValue}.<br>Dealer wins! Please refresh the page to restart.`;
    } else {
      updatedHandDisplay += `Player has ${updatedHandValue} points.<br>Dealer has ${updatedDealerHandText}, with a value of ${updatedDealerHandValue}.<br>Player wins! Please refresh the page to restart.`;
    }
    //error catch for nonsense input
  } else {
    updatedHandDisplay += `You have entered an invalid value. Please enter either "hit" or "stand".`;
  }
  return updatedHandDisplay;
};

var main = function (input) {
  var myOutputValue = "";
  if (gameMode == "start") {
    myOutputValue = startGame(
      playerHand,
      dealerHand,
      playerHandValue,
      dealerHandValue
    );
    if (myOutputValue.includes("refresh") != true) {
      gameMode = "draw";
    }
    return myOutputValue;
    //if game ends here, refresh to restart
    //else, continue to draw function.
  } else if ((gameMode = "draw")) {
    myOutputValue = draw(
      input,
      playerHand,
      playerHandValue,
      dealerHand,
      dealerHandValue
    );
  }
  return myOutputValue;
};
