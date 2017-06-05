'use strict'

module.exports = class User {
    // Takes a postgres query result and converts it into a user
    constructor(res)
    {
        this.user_id = res.user_id;
        this.username = res.username;
        if (res.picture)
            this.picture = res.picture;
        if (res.password)
            this.password = res.password;
    }
}