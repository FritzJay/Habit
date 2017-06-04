module.exports = class Habit {
    Habit(title, picture, info, isActive)
    {
        this.title = title;
        this.picture = picture;
        this.info = info;
        this.isActive = isActive;
    }
};

module.exports = class User {
    User(username, fName, lName)
    {
        this.username = username;
        this.fName = fName;
        this.lName = lName;
    }
}
