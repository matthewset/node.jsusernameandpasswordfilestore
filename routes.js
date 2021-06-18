const fs = require('fs');
const { runInNewContext } = require('vm');

const rqListener = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/'){
        res.write('<html>');
        res.write('<head><title>Login Page</title></head>');
        res.write('<form action="/message" method="POST">');//we use form to collect input from user
        res.write('<body><h4>Username:</h4></body>');
        res.write('<body><input type="text" name="message"></input></body>');
        res.write('<body><h4>Password:</h4></body>')
        res.write('<body><input type="password" name="message"></input></body><br><br>');
        res.write('<body><button type="submit">Send</button></body>')
        res.write('<form>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/message' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {//called sometime in the future (1)
            const parsedBody = Buffer.concat(body).toString();
            const username = parsedBody.split('=')[1].split('&')[0];
            const password = parsedBody.split('=')[2];
            fs.appendFile('message.csv',username + ' ' + password + '\n', (err) => {
                res.statusCode = 302;
                res.setHeader('Location','/');
                return res.end();
            });//using FileSync blocks code execution until file is written
        })
    }
    //called before code (1)
    res.setHeader('Content-type','text/html');
    res.write('<html>');
    res.write('<head><title>Welcome!</title></head>');
    res.write('<body><h1>Welcome!</h1></body>');
    res.write('</html>');
    res.end();
}

module.exports = rqListener;