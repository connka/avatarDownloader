var request = require("request");
var myToken = require("./secret.js");

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

request(options, function(err, res, body) { 
    let allInfo = parse(body);
    for (let item in allInfo) {
        if (allInfo[item].hasOwnProperty('avatar_url')) {
            console.log("Avatar URL for " + allInfo[item].login + "is: " + allInfo[item].avatar_url)
        } else {
            console.log("No Avatar URL found")
        }
        
    }

    })
//        cb(err, JSON.parse(body)[0].avatar_url);
    }