
var numTickets = 50;  // you can change this value to change the draw size for testing
var pot = 200;        // initialize the pot with $200 the first time only.
var firstBall, secondBall, thirdBall;

var ticketsSold = 0;
var ticketArray = [],
    ticketsSoldArray = [];

// ** Ticket Constructor
function Ticket(firstName, purchaseTime, ballNumberChosen) {
  return {
    firstName: firstName,
    purchaseTime: purchaseTime,
    ballNumberChosen: ballNumberChosen
  };
}

function newGame() {
  ticketsSold = 0;
  firstBall = secondBall = thirdBall = 0;
  ticketArray = ticketsSoldArray = [];
  createTickets();
}

function createTickets() {
  // Add tickets to an array, then shuffle the array, then sell them in that order

  var i = numTickets;
  while (i) {
    ticketArray.push(i);
    i--;
  }
  shuffle(ticketArray);
  // console.log(ticketArray);
}


// "Purchase a Ticket" Button
document.getElementById('purchaseTicket').addEventListener('click', function() {

  // resetting some stuff for a new game. try find a better way to do this.
  document.getElementById("winner1").value = '';
  document.getElementById("winner2").value = '';
  document.getElementById("winner3").value = '';
  document.getElementById("ball1").value = '';
  document.getElementById("ball2").value = '';
  document.getElementById("ball3").value = '';
  document.getElementById("carryOver").value = '';

  // Dont sell more tickets than available.
  if (ticketsSold < numTickets) {
    firstName = document.getElementById("fname").value;
    purchaseTime = new Date();
    ballNumberChosen = ticketArray[ticketsSold];
    ticketsSold++;

    document.getElementById("fnumber").value = firstName + ", your ticket number is " + ballNumberChosen;
    ticketsSoldArray.push(Ticket(firstName, purchaseTime, ballNumberChosen));

    console.log(firstName + ", your ticket number is: " + ballNumberChosen);
    // console.log(ticketsSoldArray);

    pot += 10;
    document.getElementById("ftotal").value = "$" + pot.toFixed(2);
    document.getElementById("fprize").value = "$" + (0.5 * pot).toFixed(2);
  }
  else {
    alert("Tickets are all sold out! Time for the draw!");
    startDraw();
  }
});

// Start a Draw Button
document.getElementById('beginDraw').addEventListener('click', function() {
  if (ticketsSold === 0)
    alert("No tickets have been sold yet");
  else
    startDraw();
});


// ** Draw
function startDraw() {
  var uniqueBallsArray = [];

  // Add 50 balls to an array, then shuffle the array
  var balls = numTickets;
  while (balls) {
    uniqueBallsArray.push(balls);
    balls--;
  }
  shuffle(uniqueBallsArray);

  // console.log(uniqueBallsArray);
  firstBall = uniqueBallsArray[0];
  secondBall = uniqueBallsArray[1];
  thirdBall = uniqueBallsArray[2];
  // console.log("First Ball is " + firstBall + ". Second Ball is " + secondBall + ". Third Ball is " + thirdBall + ".");

  document.getElementById("fname").value = '';
  document.getElementById("fnumber").value = '';

  document.getElementById("ball1").value = firstBall;
  document.getElementById("ball2").value = secondBall;
  document.getElementById("ball3").value = thirdBall;

  console.log("~ New Draw ~");

  findWinners();
  newGame();
}

// ** Pick Winners
function findWinners() {
  var text;
  var i = ticketsSoldArray.length;

  var winner1 = null,
    winner2 = null,
    winner3 = null;
  var payout1 = 0,
    payout2 = 0,
    payout3 = 0;

  //see if any winning tickets match the 3 chosen balls
  while (i--) {
    if (ticketsSoldArray[i].ballNumberChosen === firstBall) {
      winner1 = ticketsSoldArray[i];
    }
    if (ticketsSoldArray[i].ballNumberChosen === secondBall) {
      winner2 = ticketsSoldArray[i];
    }
    if (ticketsSoldArray[i].ballNumberChosen === thirdBall) {
      winner3 = ticketsSoldArray[i];
    }
  }

  //payout the 3 potential winners
  if (winner1) {
    payout1 = Math.round(37.5 * pot) / 100; //
    text = winner1.firstName + " wins the 1st place prize, 75% of prize money: $" + payout1.toFixed(2) + ".";
    document.getElementById("winner1").value = text;
    // console.log(text);
  } else {
    text = "No 1st place winner. Prize money returns to the pot.";
    document.getElementById("winner1").value = text;
    // console.log(text);
  }

  if (winner2) {
    payout2 = Math.round(7.5 * pot) / 100;
    text = winner2.firstName + " wins the 2nd place prize, 15% of prize money: $" + payout2.toFixed(2) + ".";
    document.getElementById("winner2").value = text;
    // console.log(text);
  } else {
    text = "No 2nd place winner. Prize money returns to the pot.";
    document.getElementById("winner2").value = text;
    // console.log(text);
  }

  if (winner3) {
    payout3 = Math.round(5 * pot) / 100;
    text = winner3.firstName + " wins the 3rd place prize, 10% of prize money: $" + payout3.toFixed(2) + ".";
    document.getElementById("winner3").value = text;
    // console.log(text);
  } else {
    text = "No 3rd place winner. Prize money returns to the pot.";
    document.getElementById("winner3").value = text;
    // console.log(text);
  }

  pot = Math.round(100 * (pot - payout1 - payout2 - payout3)) / 100;

  // console.log("Payouts: { $" + payout1 + ", $" + payout2 + ", $" + payout3 + " }");
  document.getElementById("carryOver").value = "$" + pot.toFixed(2) + " is left in the pot and will carry over to the next draw.";
}


// ** Shuffle Array
function shuffle(array) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// ** Main
newGame();
