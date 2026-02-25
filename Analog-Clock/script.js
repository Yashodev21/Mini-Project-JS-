const hourHand = document.querySelector('.hour');
const minuteHand = document.querySelector('.minute');
const secondHand = document.querySelector('.second');

function updateTime(){
    const now = new Date();

    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    const secDeg = seconds * 6;
    const minDeg = minutes * 6 + seconds * 0.1;
    const hourDeg = hours * 30 + minutes * 0.5;

    secondHand.style.transform = `translateX(-50%) rotate(${secDeg}deg)`;
    minuteHand.style.transform = `translateX(-50%) rotate(${minDeg}deg)`;
    hourHand.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
}

setInterval(updateTime,1000);
updateTime();