var http = require('http'),
    fs = require('fs');


var server = http.createServer(function(request, response){
    console.log(request.url);

    var splitURL = request.url.split('/'),
        firstChunk = splitURL[1];

    switch (firstChunk) {
        case "styles":
        //CSS
            serveCSS(splitURL[2], response);
            break;
        case "images":
        //IMAGES
            serveJPG(splitURL[2], response);
            break;
        default:
            switch(splitURL[1]){
                case "cars":
                if(splitURL[2] === "new"){
                    serveHTML("new.html", response);
                } else {
                    serveHTML("cars.html", response);

                }
                    break;
                case "cats":
                    serveHTML("cats.html", response);
                    break;
                default:
                console.log("Hitting this!")
                    serve404(response);
                ////?
            }

        //HTML
    }


});

function serveHTML(filename, response){
    //Read a particular file..
    fs.readFile(`views/${filename}`, 'utf8', function(error, contents){
        //Check to see if an error exists
        if(error) { return serve404(response)}

        //respond to the browser
        response.writeHead(200, {'Content-type': 'text/html' });
        response.write(contents);
        response.end();
    });
}

function serveCSS(filename, response){
    //Read a particular file..
    fs.readFile(`stylesheets/${filename}`, 'utf8', function(error, contents){
        //Check to see if an error exists
        if(error) { return serve404(response)}

        //respond to the browser
        response.writeHead(200, {'Content-type': 'text/css' });
        response.write(contents);
        response.end();
    });
}

function serveJPG(filename, response){
    //Read a particular file..
    fs.readFile(`images/${filename}`, function(error, contents){
        //Check to see if an error exists
        if(error) { return serve404(response)}
        //respond to the browser
        response.writeHead(200, {'Content-type': 'image/jpg' });
        response.write(contents);
        response.end();
    });
}

function serve404(response){
    response.writeHead(404);
    response.end("File not found!");
}
server.listen(7077);
console.log('Running on 7077');
