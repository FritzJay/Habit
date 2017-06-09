'use strict'

module.exports = class Habit {
    // Takes a postgres query and converts it into a habit
    constructor(res)
    {
        this.habit_id = res.habit_id;
        this.title = res.title;
        this.picture = res.picture;
        this.info = res.info;
        this.interval = res.interval;
    }
};