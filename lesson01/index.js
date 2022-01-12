const { bgGreen, bgYellow, bgRed } = require('chalk');

const printPrimeNumbers = (args) => {
    //console.log(args);
    if (args.length < 4) {
        console.log( bgRed('Укажите диапазон чисел!') );
    }

    const a = parseInt(args[2]);
    const b = parseInt(args[3]);
    
    if (isNaN(a)) {
        console.log( bgRed(`Аргумент ${args[2]} не является целым числом`) );
        return;
    }

    if (isNaN(b)) {
        console.log( bgRed(`Аргумент ${args[3]} не является целым числом`) );
        return;
    }

    if (b <= a) {
        console.log( bgRed(`[${a}; ${b}]: недопустимый диапазон чисел!`) );
        return;
    }

    const primeNumbers = [];

    nextPrime:
    for (let i=a; i <= b; i++) {
        if (i < 2) {
            continue;
        }

        for (let j = 2; j < i; j++) {
            if (i % j === 0) continue nextPrime;
        }
        primeNumbers.push(i);
    }

    if (primeNumbers.length < 1) {
        console.log( bgRed(`В диапазоне [${a}; ${b}] простых чисел нет!`) );
        return;
    }

    let color = 1;
    primeNumbers.forEach((num, index) => {
        if (color === 1) {
            console.log( bgGreen(num) );
        }
        else if (color === 2) {
            console.log( bgYellow(num) );
        }
        else {
            console.log( bgRed(num) );
        }

        color++;
        if (color > 3) {
            color = 1;
        }
    });
}

printPrimeNumbers(process.argv);
