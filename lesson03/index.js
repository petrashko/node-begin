const os = require('os');
const path = require('path');
const fs = require('fs');
const readline = require('readline');

const apiList = ['89.123.1.41', '34.48.240.111'];

apiList.forEach(api => {
    const fileName = path.join(__dirname, `${api}_request.log`);
    if (fs.existsSync(fileName)) {
        fs.unlinkSync(fileName, (err) => {
            if (err) console.log(err);
            else console.log("Файл удалён");
        });
    }
});

const writeToFile = async (api, str) => {
    console.log(`Line from file: ${str}`);
    const fileName = path.join(__dirname, `${api}_request.log`);

    if (fs.existsSync(fileName)) {
        await fs.promises.appendFile(fileName, `${os.EOL}${str}`);
    }
    else {
        await fs.promises.writeFile(fileName, str);
    }
}

const readLogsFromFile = () => {
    const readLines = readline.createInterface({
        input: fs.createReadStream(path.join(__dirname, 'access.log'), 'utf8'),
        crlfDelay: Infinity
    });
    
    readLines.on('line', async (str) => {
        if (str.startsWith(apiList[0])) {
            await writeToFile(apiList[0], str);
        }
    
        if (str.startsWith(apiList[1])) {
            await writeToFile(apiList[1], str);
        }
    });
    
    readLines.on('close', () => {
        console.log('File reading finished');
    });
    /*
    readLines.on('error', (err) => {
        console.log(err);
    });
    */
}

readLogsFromFile();

