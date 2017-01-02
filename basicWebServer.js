var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    host = '127.0.0.1',
    port = '9000';


var mimes = {
    '.htm' : 'text/html',
    '.css' : 'text/css',
    '.js'  : 'text/javascript',
    '.gif' : 'image/gif',
    '.jpg' : 'image/jpeg',
    '.png' : 'image/png'

}

var server = http.createServer(function(req, res){
    // If requested URL == / then serve ./index.htm else serve . + requested URL
    var filepath = (req.url === '/') ? ('./index.htm') : ('.' + req.url);
    var contentType = mimes[path.extname(filepath)];
    // Check if file exists
    fs.exists(filepath, function(file_exists) {
        if(file_exists){
            // Read and Serve
            fs.readFile(filepath, function(error, content){
                if(error){
                    res.writeHead(500);
                    res.end();
                } else {
                    res.writeHead(200, { 'Content-Type' : contentType });
                    res.end(content, 'utf-8');
                }
            })
        }
        else {
            // Throw an error with code 404
            res.writeHead(404);
            res.end('Error 404. Not found !')
        }

    })

}).listen(port, host, function(){
    console.log("Server running at http://" + host + ":" + port);
});