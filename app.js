const selectedSeatEl = document.getElementById("selected-seat");
const totalSeat = document.getElementById("total-seat");
const availableSeatEl = document.getElementById("available-seats");
const totalPriceEl = document.getElementById("total-price");
const couponInputEl = document.getElementById("coupon-field");
const couponBtnEl = document.getElementById("coupon-btn");
const noSeatEl = document.getElementById("default-text-no-seat");
const grandTotalEl = document.getElementById("grand-total");
const phoneNumberEl = document.getElementById("phone-number");
const nextBtnEl = document.getElementById("next-btn");

let selectedSeatElArray = [];
let totalPrice = 0;

// handle selection seat
function handleSelectSeat(event) {
  const value = event.innerText;

  if (selectedSeatElArray.includes(value)) {
    return alert("Seat Already Booked");
  } else if (selectedSeatElArray.length < 4) {
    event.classList.add("text-white");
    event.style.background = "#1dd100";

    selectedSeatElArray.push(event.innerText);
    totalSeat.innerText = selectedSeatElArray.length;

    // decrease available seats
    const availableSeatValue = parseFloat(availableSeatEl.innerText);
    const newAvailableSeatValue = availableSeatValue - 1;
    availableSeatEl.innerText = newAvailableSeatValue;

    // remove default-text-no-seat
    noSeatEl.classList.add("hidden");

    selectedSeatEl.innerHTML += `<li class="flex justify-between">
            <span>${event.innerText}</span>
            <span>Economy</span>
            <span>550</span>
        </li>`;

    // Update total price
    totalPrice += 550;
    totalPriceEl.innerText = totalPrice.toFixed(2);

    // activate coupon button
    if (selectedSeatElArray.length > 3) {
      couponInputEl.removeAttribute("disabled");
      couponBtnEl.removeAttribute("disabled");
    }
  } else {
    return alert("Maximum seat Booked");
  }
}

// coupon btn function
document.getElementById("coupon-btn").addEventListener("click", function () {
  const couponInputValue = couponInputEl.value;
  let couponSave = 0;

  if (couponInputValue !== "NEW50" && couponInputValue !== "Couple 20") {
    alert("Your Provided Coupon is Not Valid");
    return;
  }

  if (couponInputValue === "NEW50") {
    couponSave = totalPrice * 0.15;
  } else if (couponInputValue === "Couple 20") {
    couponSave = totalPrice * 0.2;
  }
  const showCouponPriceEl = document.getElementById("show-coupon-price");
  showCouponPriceEl.innerHTML = `<p>Discount</p>
   <p>
      <span>-BDT:</span>
      <span id="grand-total">${couponSave.toFixed(2)}</span>
    </p>`;

  const grandTotalValue = totalPrice - couponSave;
  grandTotalEl.innerText = grandTotalValue.toFixed(2);
});

// next btn related function
phoneNumberEl.addEventListener("input", function (event) {
  const inputValue = event.target.value;
  console.log(inputValue);

  if(inputValue.length >= 11){
    nextBtnEl.removeAttribute('disabled')
  }
});

document.getElementById('btn-continue').addEventListener('click', function(){
  window.location.reload();
})
