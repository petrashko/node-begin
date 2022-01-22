const os = require('os');
const path = require('path');
const fs = require('fs');

const fileName = 'log.txt';
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
