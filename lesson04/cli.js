const os = require('os');
const path = require('path');
const fs = require('fs');
const readline = require('readline');
//
const inquirer = require('inquirer');
const yargs = require('yargs');

const options = yargs
    .usage('Usage: -s <string to search>')
    .option('s', {
        alias: 'search',
        describe: 'String to search',
        type: 'string',
        demandOption: true
    }).argv;

//console.log(options.search);

const searchInFile = (filePath, search) => {
    const readLines = readline.createInterface({
        input: fs.createReadStream(filePath, 'utf8'),
        crlfDelay: Infinity
    });
    
    readLines.on('line', (str) => {
        if (str.includes(search)) {
            console.log(`${search} найдено в => ${str}`);
        }
    });
    
    readLines.on('close', () => {
        console.log(`${os.EOL}${os.EOL}END!!!`);
    });
    /*
    readLines.on('error', (err) => {
        console.log(err);
    });
    */
}

const isFile = (fileName) => fs.lstatSync(fileName).isFile();

const chooseFile = (curDir) => {
    const fileList = fs.readdirSync(curDir);
    
    inquirer.prompt([
        {
            name: 'fileName',
            type: 'list', // input, number, confirm, list, checkbox, password
            message: 'Выберите файл для чтения',
            choices: fileList,
        }
    ]).then((result) => {
        //console.log(result);
        let fileOrDir = '';
        if (curDir === `.${path.sep}`) {
            fileOrDir = path.join(__dirname, result.fileName);
        }
        else {
            fileOrDir = path.join(curDir, result.fileName);
        }
        //console.log(fileOrDir);

        if (isFile(fileOrDir) === true) {
            searchInFile(fileOrDir, options.search);
        }
        else {
            chooseFile(fileOrDir);
        }
    });
}

chooseFile(`.${path.sep}`);
