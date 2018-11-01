var request = require("request");
var myToken = require("./secrets.js");
var fs = require('fs');

console.log("Welcome to the GitHub Avatar Downloader!");

getRepoContributors("jquery", "jquery", function(err, result) {
    console.log("Errors:", err);
    console.log("Result:", result);
});

function getRepoContributors(repoOwner, repoName, cb) {
    //var contributors = JSON.parse(repoOwner).avatar_url;
    var options = {
    url:
    "https://api.github.com/repos/" +
    repoOwner +
    "/" +
    repoName +
    "/contributors",
    headers: {
    "User-Agent": "request",
    Authorization: "token" + myToken.GITHUB_TOKEN
    }
};

function parse (body) {
    return JSON.parse(body);
}
let url = "";
request(options, function(err, res, body) { 
    let allInfo = parse(body);
    for (let item in allInfo) {
        if (err) {
            throw err; 
        }
        if (allInfo[item].hasOwnProperty('avatar_url')) {
            url = allInfo[item].avatar_url
 //           console.log("Avatar URL for " + allInfo[item].login + "is: " + url)
 DownloadImageByURL(url, allInfo[item].login)
        }
        else {
            console.log("Avatar URL not found");
        }
    }; 
    })

    function DownloadImageByURL(url, fileName){
        request(url, function(err, response, body) {
    if (err) throw err;
})

.on('response', function (response) {                            
    console.log(`Response Status Code: ${response.statusCode} 
    Response Status Message: ${response.statusMessage} 
    Content Type: ${response.headers['content-type']}`)
    console.log(`Download complete!`)
  })

 .pipe(fs.createWriteStream(`./downloaded/${fileName}.jpg`)); 
    }
}
