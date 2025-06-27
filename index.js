var express = require('express');
const app = express();
// var server = http.createServer(function(req, res){
//     res.setHeader("Content-Type", "application/json");
//     res.end("karo");
// });
app.get("/", function(req, res){
    res.send("Karo")
})
app.listen(3100, function(){
    console.log("Server listening on localhost 3100")
})

