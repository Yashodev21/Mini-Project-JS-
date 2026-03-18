const doneBtn = document.getElementById('doneBtn');
const skippedBtn = document.getElementById('skippedBtn');
const resetBtn = document.getElementById('resetBtn');
const historyList = document.getElementById('historyList');
const totalMealsEl = document.getElementById('totalMeals');
const doneMealsEl = document.getElementById('doneMeals');
const skippedMealsEl = document.getElementById('skippedMeals');
const billAmountEl = document.getElementById('billAmount');
const remainingEl = document.getElementById('remaining');
const progressBar = document.getElementById('progress');
const reminderModal = document.getElementById('reminderModal');
const closeReminder = document.getElementById('closeReminder');

// Constants
const TOTAL_MEALS = 30;
const PLAN_COST = 1500;
const COST_PER_MEAL = PLAN_COST / TOTAL_MEALS;

// Load data
let dinnerData = JSON.parse(localStorage.getItem('dinnerData')) || [];

function updateUI() {
  const doneMeals = dinnerData.filter(d => d.status === 'Done').length;
  const skippedMeals = dinnerData.filter(d => d.status === 'Skipped').length;
  const totalMeals = dinnerData.length;
  const totalBill = (doneMeals * COST_PER_MEAL).toFixed(2);
  const remaining = (PLAN_COST - totalBill).toFixed(2);
  const progressPercent = (doneMeals / TOTAL_MEALS) * 100;

  totalMealsEl.textContent = totalMeals;
  doneMealsEl.textContent = doneMeals;
  skippedMealsEl.textContent = skippedMeals;
  billAmountEl.textContent = totalBill;
  remainingEl.textContent = remaining;
  progressBar.style.width = `${progressPercent}%`;

  historyList.innerHTML = dinnerData
    .map(d => `<li><span>${d.date}</span><span>${d.status}</span></li>`)
    .join('');
}

function addDinner(status) {
  const today = new Date().toLocaleDateString();
  const alreadyMarked = dinnerData.find(d => d.date === today);

  if (alreadyMarked) {
    alert('You already marked dinner for today!');
    return;
  }

  dinnerData.push({ date: today, status });
  localStorage.setItem('dinnerData', JSON.stringify(dinnerData));
  updateUI();
}

function resetData() {
  const confirmReset = confirm('Are you sure you want to reset all dinner data?');
  if (confirmReset) {
    localStorage.removeItem('dinnerData');
    dinnerData = [];
    updateUI();
  }
}

// --- Daily Reminder ---
function checkReminder() {
  const now = new Date();
  const hours = now.getHours();

  // Reminder triggers between 8:00 PM - 8:30 PM
  if (hours === 20 && !localStorage.getItem('remindedToday')) {
    reminderModal.style.display = 'flex';
    localStorage.setItem('remindedToday', new Date().toLocaleDateString());
  }
}

// Close reminder
closeReminder.addEventListener('click', () => {
  reminderModal.style.display = 'none';
});

// Run check every 5 minutes
setInterval(() => {
  const today = new Date().toLocaleDateString();
  const remindedDate = localStorage.getItem('remindedToday');
  if (remindedDate !== today) checkReminder();
}, 300000); // 5 min

// Button Listeners
doneBtn.addEventListener('click', () => addDinner('Done'));
skippedBtn.addEventListener('click', () => addDinner('Skipped'));
resetBtn.addEventListener('click', resetData);

// Initial UI update
updateUI();
