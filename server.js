var express = require("express");
var path = require("path");
var webpack = require("webpack");
var config = require("./webpack.config");

const port = 8080;
const app = express();
const compiler = webpack(config);

app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler));

app.get("*", function(req, res) {
    var filePath = req.url;
    if (filePath == "/") {
        res.sendFile(path.join( __dirname, "index.html"));
    } 
    else {
       res.sendFile(path.join( __dirname, filePath));     
    }
});

app.listen(port, function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.info("==> Open http://%s:%s in a browser to view the app.", "localhost", port);
    }
});