
//const balanceLabelElement = document.getElementById("balanceLabel");
const balanceElement = document.getElementById("balance");
const outstandingLoanElement = document.getElementById("outstandingLoan");
const loanBalanceElement = document.getElementById("loanBalance");

//Work and Repay Loan
const getLoanButton = document.getElementById("getLoan");
const payElement = document.getElementById("pay");
const bankButton = document.getElementById("bank");
const workButton = document.getElementById("work");
const repayButton = document.getElementById("repay");


const laptopsSelectElement = document.getElementById("laptops")
const featuresElement = document.getElementById("features");
const laptopImageElement = document.getElementById("laptopImage");
const descriptionElement = document.getElementById("description");
const priceElement = document.getElementById("price");
const buyNowButtonElement = document.getElementById("buyNow");
const loanErrorElement = document.getElementById("loanError");

//instantiating values:
let laptops = [];
let initialBalance = 200;
balanceElement.innerText = parseFloat(initialBalance);


 //Bank & loan
getLoanButton.addEventListener("click", getLoan);
function getLoan() {
    const loanRequestAmount = parseInt(prompt("Please enter the amount to loan"));
    if (loanRequestAmount > (parseFloat(balanceElement.innerText * 2)) ||
        parseFloat(loanBalanceElement.innerText) > 0) {
        loanErrorElement.innerText = "Invalid amount requested";
        loanErrorElement.hidden = false;
        return;
    }
    loanBalanceElement.innerText = loanRequestAmount;
    outstandingLoanElement.hidden = false;
    repayButton.hidden = false;

}

//Work
let initialPay = 0;
workButton.addEventListener("click", work);

function work() {
    initialPay += 100;
    payElement.innerText = parseFloat(initialPay);
}


//Bank button & transfer
payElement.innerText = 0;

bankButton.addEventListener("click", transfer);

function transfer() {
   // get the affected variables
    let loanBalance = parseFloat(loanBalanceElement.innerText);
    let currentPay = parseFloat(payElement.innerText);
    let nonLoanAmount = currentPay * 1;
    let deductedAmount = currentPay * 0.1;
    let transferAmount = currentPay * 0.9;
    if (loanBalance > 0) {

        initialBalance += transferAmount
        let newLoanBalance = loanBalance - deductedAmount;

     //   update loanBalance and bank balance
        loanBalanceElement.innerText = newLoanBalance;
        balanceElement.innerText = initialBalance;
        initialPay = 0;
        payElement.innerText = 0;
    } else {
        initialBalance += nonLoanAmount;
        balanceElement.innerText = initialBalance;
        payElement.innerText = 0;
        initialPay = 0;

    }
}


repayButton.addEventListener("click", repay);

function repay() {
    let loanBalance = parseFloat(loanBalanceElement.innerText);
    initialPay = parseFloat(payElement.innerText);

    if (loanBalance <= 0) {
        repayButton.hidden = true;
        outstandingLoanElement.hidden = true;
        return;
    }

    if (initialPay > loanBalance) {
        //initial pay is greater, loanBalance should be repaid to 0
        initialPay = initialPay - loanBalance;
        loanBalance = 0;



    } else {
      //  there is more loan than worked, take all the money, set the loanBalance remainder.
        loanBalance = loanBalance - initialPay;
        initialPay = 0;
    }

    loanBalanceElement.innerText = loanBalance;
    payElement.innerText = initialPay;

}


fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
    .then(response => response.json())
    .then(data => laptops = data)
    .then(laptops => addLAptops(laptops))


const addLAptops = (laps => {
    for (let x of laps) {
        addLaptop(x);
    }
});

const addLaptop = (laptop) => {
    const laptopOptionElement = document.createElement("option");

    laptopOptionElement.appendChild(document.createTextNode(laptop.title))
    laptopOptionElement.value = laptop.id;
    featuresElement.innerText = laptop.specs;
    descriptionElement.innerText = laptop.description;
    priceElement.innerText = laptop.price;
    const url = "https://noroff-komputer-store-api.herokuapp.com/" + laptop.image;
    laptopImageElement.src = url;

    laptopsSelectElement.appendChild(laptopOptionElement)
}

let buyNowLaptop = "";
const handleLAptopChangeMenu = e => {
    const selectedLAptop = laptops[e.target.selectedIndex];
    buyNowLaptop = selectedLAptop;
    console.log(buyNowLaptop);
    featuresElement.innerText = selectedLAptop.specs;

}


const handleLaptopDescriptionMEnu = e => {
    const selectedLAptop = laptops[e.target.selectedIndex];
    descriptionElement.innerText = selectedLAptop.description;
    priceElement.innerText = selectedLAptop.price;

    const url = "https://noroff-komputer-store-api.herokuapp.com/" + selectedLAptop.image;

    laptopImageElement.src = url;

}

laptopsSelectElement.addEventListener("change", handleLAptopChangeMenu);
laptopsSelectElement.addEventListener("change", handleLaptopDescriptionMEnu);


const handleBuyNow = () => {

    if (initialBalance > buyNowLaptop.price) {
        alert(`Thank you for buying the following :
        ${buyNowLaptop.title}.

        The total price you paid :   ${buyNowLaptop.price}.

        The laptop has te following specs : ${buyNowLaptop.specs}

        If you are not satisfied with the product, you can return it  with in 2 weeks.  
        `)

        initialBalance = initialBalance - buyNowLaptop.price;
        balanceElement.innerText = initialBalance;


    } else {

        alert("You dont have enough money in your account to buy this product.")

    }

}

buyNowButtonElement.addEventListener("click", handleBuyNow);


