const http = require('http');
const sockjs = require('sockjs');
const echo = sockjs.createServer({prefix:'/echo'});

echo.on('connection',
    function(conn){
        setInterval(
            function(){
                conn.write(new Date().toLocaleTimeString());
            },
            1000
        );
        conn.on('data',
            function(message){
                console.log(message)
            }
        );
        conn.on('close',function(){});
    }
);

const server = http.createServer();
echo.installHandlers(server, {prefix:'/echo'});
server.listen(9999,'0.0.0.0');