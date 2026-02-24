const paragraphs = [
`Success usually comes to those who are too busy to be looking for it. Hard work and dedication always pay off in the long run.`,

`Programming is not about what you know, it is about what you can figure out. The best developers are always curious learners.`,

`Consistency is more important than motivation. Small daily progress creates big results over time.`,

`Technology is best when it brings people together and solves real world problems for society.`,

`Dream big, start small, but most importantly start. Action is the foundation of all success.`
];

const paraEl = document.getElementById("paragraph");
const inputEl = document.getElementById("input");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accEl = document.getElementById("acc");
const restartBtn = document.getElementById("restart");

let time = 30;
let timer = null;
let started = false;

// load random paragraph
function loadParagraph(){
    const random = paragraphs[Math.floor(Math.random()*paragraphs.length)];
    paraEl.textContent = random;
}
loadParagraph();

// typing event
inputEl.addEventListener("input", () => {

    if(!started){
        started = true;
        timer = setInterval(updateTime,1000);
    }

    const typed = inputEl.value;
    const original = paraEl.textContent;

    let correct = 0;

    for(let i=0;i<typed.length;i++){
        if(typed[i] === original[i]){
            correct++;
        }
    }

    // accuracy
    let accuracy = Math.floor((correct/typed.length)*100) || 0;
    accEl.textContent = accuracy;

    // WPM
    let words = typed.trim().split(/\s+/).length;
    let wpm = Math.floor(words / (30-time) * 60) || 0;
    wpmEl.textContent = wpm;
});

// timer
function updateTime(){
    time--;
    timeEl.textContent = time;

    if(time === 0){
        clearInterval(timer);
        inputEl.disabled = true;
    }
}

// restart
restartBtn.addEventListener("click", ()=>{
    clearInterval(timer);
    time = 30;
    started = false;
    inputEl.disabled = false;
    inputEl.value = "";
    timeEl.textContent = time;
    wpmEl.textContent = 0;
    accEl.textContent = 0;
    loadParagraph();
});