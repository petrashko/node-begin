const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const port = process.env.PORT || 3000;

const isFile = (fileName) => fs.lstatSync(fileName).isFile();

const createLinks = (curDir, pathList) => {
    const links = pathList.map((pathName) => {
        let fileBool = false;
        
        let fileOrDir = '';
        if (curDir === `.${path.sep}`) {
            fileOrDir = path.join(__dirname, pathName);
        }
        else {
            fileOrDir = path.join(curDir, pathName);
        }
        //console.log(fileOrDir);

        if (isFile(fileOrDir) === true) {
            fileBool = true;
        }

        const dirs = curDir.split(path.sep);
        const tail = dirs[dirs.length-1];
        
        return `<a href="${tail}/${pathName}?file=${fileBool}">${tail}/${pathName}</a><br/>`;
    });

    return links;
}

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
    });
    //res.end('<h1>Lesson 5</h1>');
    console.log(`Url: ${req.url}`);
    
    // Старт - Навигация по каталогам из исходной папки
    if (req.url === '/') {
        const fileList = fs.readdirSync(`.${path.sep}`);
        const linkList = createLinks(`.${path.sep}`, fileList);
        linkList.forEach(link => {
            res.write(link);
        });
    }
    else {
        const { query } = url.parse(req.url, true);
        //console.log(query);
        // Показать содержимое файла
        if (query.file === 'true') {
            const [name, rest] = req.url.split('?');
            fs.readFile(path.join(__dirname, name), (err, content) => {
                if (err) {
                    throw err;
                }

                res.end( Buffer.from(content).toString() );
            });
            return;
        }
        // Показать содержимое текущей директории
        else if (query.file === 'false') {
            const [dir, rest] = req.url.split('?');
            const newDir = dir.replace('/', path.sep);
            const curDir = path.join(__dirname, newDir);

            let fileList = fs.readdirSync(curDir);
            const linkList = createLinks(curDir, fileList);

            // Сформировать ссылку "Назад"
            let dirBack = '/';
            const dirs = dir.split('/');
            const tail = dirs.pop();
            if (dirs.length > 1) {
                dirBack = dirs.join('/');
            }
            if (tail) {
                const linkBack = `<a href="${dirBack}?file=false">Back</a><br/>`;
                linkList.unshift(linkBack);
            }

            linkList.forEach(link => {
                res.write(link);
            });
        }
    }

    res.end();
});

server.listen(port, () => {
    console.log(`Server is run on localhost:${port}`);
});
