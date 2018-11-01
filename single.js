var username = "jeresig";
var avatarURL = "https://avatars0.githubusercontent.com/u/1615?v=4";

function getImage(username, avatarURL) {
    MIDDLEWARE.get(avatarURL)
    .pipe(fs.createWriteStream(avatarURL + ".png"))
};

getImage(username, avatarURL); 