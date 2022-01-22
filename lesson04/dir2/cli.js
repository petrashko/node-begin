const os = require('os');
const path = require('path');
const fs = require('fs');
const readline = require('readline');
//
const yargs = require('yargs');

const options = yargs
    .usage('Usage: -p <path to the file>')
    .option('p', {
        alias: 'path',
        describe: 'Path to the file',
        type: 'string',
        demandOption: true
    }).argv;

console.log(options);

//const fileName = 'log.txt';
const fileName = options.path;
const filePath = path.join(__dirname, fileName);

console.log(`START!!!${os.EOL}${os.EOL}`);

if (fs.existsSync(filePath)) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            throw err;
        }

        console.log( Buffer.from(data).toString() );
        console.log(`${os.EOL}${os.EOL}END!!!`);
    });
}
else {
    console.log('File not found');
}
