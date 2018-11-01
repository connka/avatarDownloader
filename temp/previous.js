var request = require("request");
var fs = require("fs");
var myToken = require("./secrets.js");

console.log("Welcome to the GitHub Avatar Downloader!");

getRepoContributors("jquery", "jquery", function(err, result) {
  const dir = './imagedownloadfile';
  if(!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
//    console.log("Errors:", err);
//    console.log("Result:", result);
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

  function parse(body) {
    return JSON.parse(body);
  }

  request(options, function(err, res, body) {
    console.log("Requesting the images...");
    let allInfo = parse(body);
    for (let item in allInfo) {
      let url = allInfo[item];
//      console.log(url)
      downloadImageByURL(url.avatar_url, './imagedownloadfile')
    }
});
  downloadImageByURL = (url, filepath) => {
    request.get(url)
      .on('error', (err) => {
        throw err;
      })
      .on('response', (response) => {
//        console.log('Response status Code:', response.statusCode);
      })
      .pipe(fs.createWriteStream(filepath))
  }
}