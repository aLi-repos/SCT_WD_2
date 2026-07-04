// TIMEFIT STOPWATCH

// Display
const display = document.getElementById("display");

// Buttons
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");

// Lap Elements
const lapList = document.getElementById("lapList");
const lapCount = document.getElementById("lapCount");
const clearLapBtn = document.getElementById("clearLap");

// Theme Buttons
const greenTheme = document.querySelector(".green");
const blueTheme = document.querySelector(".blue");
const redTheme = document.querySelector(".red");

// Variables
let startTime = 0;
let elapsedTime = 0;
let timer;
let running = false;
let laps = 0;

// Format Time

function formatTime(time) {
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor((time % 3600000) / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    let milliseconds = Math.floor((time % 1000) / 10);
    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

// Update Stopwatch

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

// Start

startBtn.addEventListener("click", () => {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateDisplay, 10);
        running = true;
    }

});

// Pause

pauseBtn.addEventListener("click", () => {
    clearInterval(timer);
    running = false;
});

// Reset

resetBtn.addEventListener("click", () => {
    clearInterval(timer);
    running = false;
    elapsedTime = 0;
    laps = 0;
    display.textContent = "00:00:00.00";
});

// Lap

lapBtn.addEventListener("click", () => {
    if (!running) return;
    laps++;
    lapCount.textContent = laps;
    const li = document.createElement("li");
    li.textContent = "Lap " + laps + " - " + formatTime(elapsedTime);
    lapList.appendChild(li);
});

clearLapBtn.addEventListener("click", () => {
    lapList.innerHTML = "";
    laps = 0;
    lapCount.textContent = "0";
});

// Theme Switching

//blueTheme

greenTheme.addEventListener("click", () => {
    document.body.classList.remove("theme-blue");
    document.body.classList.remove("theme-red");
});

//redTheme

blueTheme.addEventListener("click", () => {
    document.body.classList.remove("theme-red");
    document.body.classList.add("theme-blue");
});

//greenTheme

redTheme.addEventListener("click", () => {
    document.body.classList.remove("theme-blue");
    document.body.classList.add("theme-red");
});

// WORKOUT PLANNER

const addWorkoutBtn = document.getElementById("addWorkout");
const workoutList = document.getElementById("workoutList");
const exerciseCount = document.getElementById("exerciseCount");
const completedCount = document.getElementById("completedCount");

// Load Saved Workouts

let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

// Save Workouts

function saveWorkouts() {
    localStorage.setItem("workouts", JSON.stringify(workouts));
}

// Render Workouts

function renderWorkouts() {
    workoutList.innerHTML = "";
    let completed = 0;
    workouts.forEach((workout, index) => {
        if (workout.done) {
            completed++;
        }
        const card = document.createElement("div");
        card.className = "workout-card";
        card.innerHTML = `
            <h3>${workout.name}</h3>
            <p>${workout.time}</p>
            <div class="actions">
                <button class="complete-btn">
                    ${workout.done ? "Completed" : "Complete"}
                </button>
                <button class="edit-btn">
                    Edit
                </button>
                <button class="delete-btn">
                    Delete
                </button>
            </div>
        `;

        // Complete Button

        card.querySelector(".complete-btn").addEventListener("click", () => {
            workouts[index].done = !workouts[index].done;
            saveWorkouts();
            renderWorkouts();
        });

        // Edit Button
        card.querySelector(".edit-btn").addEventListener("click", () => {
            const newName = prompt("Exercise Name", workout.name);
            const newTime = prompt("Duration / Reps", workout.time);
            if (newName && newTime) {
                workouts[index].name = newName;
                workouts[index].time = newTime;
                saveWorkouts();
                renderWorkouts();
            }
        });

        // Delete Button
        card.querySelector(".delete-btn").addEventListener("click", () => {
            workouts.splice(index, 1);
            saveWorkouts();
            renderWorkouts();
        });

        workoutList.appendChild(card);
    });
    exerciseCount.textContent = workouts.length;
    completedCount.textContent = completed;
}

// Add Workout

addWorkoutBtn.addEventListener("click", () => {
    const exercise = prompt("Enter Exercise Name");
    if (!exercise) return;
    const duration = prompt("Enter Reps or Duration");
    if (!duration) return;
    workouts.push({
        name: exercise,
        time: duration,
        done: false
    });
    saveWorkouts();
    renderWorkouts();

});

// First Load

renderWorkouts();

//Features
// Keyboard Shortcuts 

// Space = Start / Pause
document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        event.preventDefault();
        if (running) {
            pauseBtn.click();
        } else {
            startBtn.click();
        }
    }
});

// R = Reset

document.addEventListener("keydown", function(event) {
    if (event.key === "r" || event.key === "R") {
        resetBtn.click();
    }
});

// L = Lap

document.addEventListener("keydown", function(event) {
    if (event.key === "l" || event.key === "L") {
        lapBtn.click();
    }
});

// Status Indicator

const statusText = document.querySelector(".status");
startBtn.addEventListener("click", () => {
    statusText.textContent = "● RUNNING";
    statusText.style.color = "#42ff8c";
});

pauseBtn.addEventListener("click", () => {
    statusText.textContent = "● PAUSED";
    statusText.style.color = "#ffc107";
});

resetBtn.addEventListener("click", () => {
    statusText.textContent = "● READY";
    statusText.style.color = "#42ff8c";
});

// Stopwatch Animation

const dial = document.querySelector(".dial");

startBtn.addEventListener("click", () => {
    dial.style.transform = "scale(1.03)";

});

pauseBtn.addEventListener("click", () => {
    dial.style.transform = "scale(1)";

});

resetBtn.addEventListener("click", () => {
    dial.style.transform = "scale(1)";
});

// Best Lap Highlight

function highlightBestLap() {
    const laps = document.querySelectorAll("#lapList li");
    if (laps.length === 0) return;
    laps.forEach(lap => {
        lap.style.background = "#111a2f";
    });
    laps[0].style.background = "#14532d";
}

lapBtn.addEventListener("click", () => {
    setTimeout(highlightBestLap, 100);
});

// Greeting Message

const hour = new Date().getHours();
let greeting = "";
if (hour < 12) {
    greeting = "Good Morning";
} else if (hour < 18) {
    greeting = "Good Afternoon";
} else {
    greeting = "Good Evening";
}

console.log(greeting + " 👋 Welcome to TimeFit!");

// Footer Year

const year = new Date().getFullYear();
console.log("© " + year + " TimeFit");

// Theme Button Active State

const themeButtons = document.querySelectorAll(".theme");

themeButtons.forEach(button => {
    button.addEventListener("click", () => {
        themeButtons.forEach(btn => {
            btn.style.opacity = "0.6";
        });
        button.style.opacity = "1";
    });
});

// Simple Button Animation

const allButtons = document.querySelectorAll("button");

allButtons.forEach(button => {
    button.addEventListener("mousedown", () => {
        button.style.transform = "scale(0.95)";
    });
    button.addEventListener("mouseup", () => {
        button.style.transform = "scale(1)";
    });
});

// App Loaded

window.addEventListener("load", () => {
    console.log("TimeFit Loaded Successfully!");
});