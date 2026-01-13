const http = require('http');

http.get('http://localhost:1337/api/projects', (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
        data += chunk;
    });

    resp.on('end', () => {
        try {
            const json = JSON.parse(data);
            console.log(JSON.stringify(json.data[0], null, 2));
        } catch (e) {
            console.log(data);
        }
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});
