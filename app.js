let generatedRolls = [];
let possibleRolls = [];

const validLetters = [
  'A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z'
];

// Map letter to index and vice versa
function letterToIndex(letter) {
  return validLetters.indexOf(letter.toUpperCase());
}
function indexToLetter(index) {
  return validLetters[index];
}

// Converts roll like "A0" or "98" to a unique index
function rollToIndex(roll) {
  if (/^\d{2}$/.test(roll)) {
    // Numeric roll (e.g., "98")
    return parseInt(roll, 10);
  } else if (/^[A-HJ-NP-Z][0-9]$/.test(roll.toUpperCase())) {
    // Alphanumeric roll (e.g., "A0", "R7")
    const letter = roll[0].toUpperCase();
    const digit = parseInt(roll[1], 10);
    return 100 + letterToIndex(letter) * 10 + digit;
  }
  return NaN;
}

// Converts index back to roll number
function indexToRoll(index) {
  if (index < 100) {
    return index.toString().padStart(2, '0');
  } else {
    const letterIdx = Math.floor((index - 100) / 10);
    const digit = (index - 100) % 10;
    return indexToLetter(letterIdx) + digit;
  }
}

// Generate all possible rolls between start and end (inclusive)
function generatePossibleRolls(start, end) {
  const startIndex = rollToIndex(start);
  const endIndex = rollToIndex(end);
  if (isNaN(startIndex) || isNaN(endIndex)) return [];
  const min = Math.min(startIndex, endIndex);
  const max = Math.max(startIndex, endIndex);
  const rolls = [];
  for (let i = min; i <= max; i++) {
    rolls.push(indexToRoll(i));
  }
  return rolls;
}

function updateCountTracker() {
  const remaining = possibleRolls.filter(r => !generatedRolls.includes(r)).length;
  const total = possibleRolls.length;
  document.getElementById("count-tracker").textContent =
    total > 0 ? `Remaining: ${remaining} / ${total}` : "";
}

function generateRandomRoll(start, end) {
  // If possibleRolls is empty or range changed, regenerate
  if (
    possibleRolls.length === 0 ||
    possibleRolls[0] !== start ||
    possibleRolls[possibleRolls.length - 1] !== end
  ) {
    possibleRolls = generatePossibleRolls(start, end);
    generatedRolls = [];
  }

  // Filter out already generated rolls
  const remaining = possibleRolls.filter(r => !generatedRolls.includes(r));
  if (remaining.length === 0) {
    alert("All roll numbers have been generated!");
    generatedRolls = [];
    updateCountTracker();
    return "";
  }
  const randomIndex = Math.floor(Math.random() * remaining.length);
  const result = remaining[randomIndex];
  generatedRolls.push(result);
  updateCountTracker();
  return result;
}

function handleGenerate() {
  const start = document.getElementById("startRoll").value.trim();
  const end = document.getElementById("endRoll").value.trim();
  if (!start || !end) {
    alert("Please enter both start and end roll numbers.");
    return;
  }
  const result = generateRandomRoll(start, end);
  if (result) {
    document.getElementById("rollnum").textContent = result;
  }
}

// Make sure both buttons trigger a new number
document.getElementById("submi").addEventListener("click", handleGenerate);
document.getElementById("Refresh").addEventListener("click", handleGenerate);

// Optionally, update the count tracker on load
updateCountTracker();
