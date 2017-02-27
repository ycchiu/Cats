var xmlToJSON = require("../lib/xmlToJSON.min");
const IMG_URL = "http://mapd-cats.azurewebsites.net/catpics";
const FACT_URL = "http://mapd-cats.azurewebsites.net/catfacts";

function get (url) {
    // Return a new promise.
    return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open("GET", url);

        req.onload = function() {
            if (req.status == 200) {
                resolve(req.response);
            }
            else {
                reject(Error("req_url:" + url + ",  error:" + req.statusText));
            }
        };

        // Handle network errors
        req.onerror = function() {
            reject(Error("Network Error"));
        };

        // Make the request
        req.send();
    });
}

function DataServer () {
    function handleImagesSuccess (response) {
        response = xmlToJSON.parseString(response);
        let images = response.response[0].data[0].images[0].image;
        let result = [];        
        images.forEach((imgObj) => {            
            result.push({
                id: imgObj.id[0]._text,
                source_url: imgObj.source_url[0]._text,
                url: imgObj.url[0]._text
            });
        });
        return result;
    }

    function handleFactsSuccess (response) {
        response = JSON.parse(response);
        return response.facts;
    }

    function handleReqError (error) {
        console.log(error.toString());
    }

    this.loadImages = ((url, res, rej) => {
        return function () {
            return get(url).then(res, rej);    
        };
    })(IMG_URL, handleImagesSuccess, handleReqError);

    this.loadFacts = ((url, res, rej) => {
        return function () {
            return get(url).then(res, rej);    
        };
    })(FACT_URL, handleFactsSuccess, handleReqError);
}

export default DataServer;