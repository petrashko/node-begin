const EventEmitter = require('events');

// Timer
//const deadline = '2022-01-13T10:03:00';

const getDedline = (args) => {
    //console.log(args);
    const sample = '05-09-30-01-2022';

    if (args.length < 3) {
        console.log(`Укажите дату и время в формате: минуты-часы-день-месяц-год. Образец: ${sample}`);
        return null;
    }

    const arg = args[2].split('-');
    if (arg.length < 5) {
        console.log(`Неверный формат даты и времени. Образец: ${sample}`);
        return null;
    }

    if ((arg[4].length < 4) || (arg[3].length < 2) || (arg[2].length < 2) || (arg[1].length < 2) || (arg[0].length < 2)) {
        console.log(`Неверный формат даты и времени. Образец: ${sample}`);
        return null;
    }

    const deadline = `${arg[4]}-${arg[3]}-${arg[2]}T${arg[1]}:${arg[0]}:00`;
    console.log(deadline);
    return deadline;
}

function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - new Date();
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((t / (1000 * 60)) % 60);
    const seconds = Math.floor((t / 1000) % 60);

    return {
        total: t,
        days,
        hours,
        minutes,
        seconds
    };
}

function getZero(num) {
    if ((num >= 0) && (num < 10)) {
        return `0${num}`;
    }
    else {
        return '' + num;
    }
}

function updateClock(endtime, timeInterval) {
    const t = getTimeRemaining(endtime);

    if (t.total <= 0) {
        clearInterval(timeInterval);
        countdownEmitter.off('updateClock', updateClock);
        console.log('Время истекло');
        return;
    }

    const output = `Осталось дней: ${getZero(t.days)}; часов: ${getZero(t.hours)}; минут: ${getZero(t.minutes)}; секунд: ${getZero(t.seconds)}`;
    console.log(output);
}

class CountdownEmitter extends EventEmitter {};
const countdownEmitter = new CountdownEmitter();

countdownEmitter.on('updateClock', updateClock);

function setColock(endtime) {
    const timeInterval = setInterval(countdon, 1000);
    
    function countdon() {
        countdownEmitter.emit('updateClock', endtime, timeInterval);
    }
}

const deadline = getDedline(process.argv);
if (deadline !== null) {
    setColock(deadline);
}
