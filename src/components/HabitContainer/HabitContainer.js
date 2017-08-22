import React, { Component } from 'react';
import { 
    View, 
    Text,
    ScrollView,
    RefreshControl,
    StyleSheet
} from 'react-native';
import HabitCard from '../HabitCard/HabitCard';
import EmptyCard from '../HabitCard/EmptyCard/EmptyCard';

export default class HabitContainer extends Component {
    constructor (props) {
        super(props);
        this.state = {
            habits: [],
            accentColors: ['#E84721', '#F9BE01', '#0595C2'],        // The accent colors that will be passed down to habit Cards
            refreshing: false
        }
        
        // Bind functions to component
        this.getHabits = this.getHabits.bind(this);
        this.createHabits = this.createHabits.bind(this);
        this.calculateProgress = this.calculateProgress.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
    }

    // Fetches habits associated with the current user
    // from the api server
    getHabits () {
        this.setState({
            refreshing: true
        });
       fetch(this.props.url + '/habits/1', {                // fetches info from supplied url
            method: 'GET',
            headers: {
                'x-access-token': this.props.token
            }})
            .then((res) => res.json())
            .then((resJson) => {
                console.log('Succesfully fetched habits: ');
                // Add some necessary properties to each habit
                let habits = Array.from(resJson);
                habits.forEach((habit, i) =>
                {
                    habit.progress = this.calculateProgress(habit);
                    habit.index = i;
                });
                console.log("NEW HABITS: ")
                console.log(habits)
                this.setState({
                    habits: habits,
                    refreshing: false,
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    createHabits () {
        let habits = [];
        // Map habits to an array of Card 
        if (this.state.habits.length > 0) {
            habits = this.state.habits.map((habit) => {
                // Create a habit card for each habit in state.habits
                const accentColor = this.state.accentColors[habit.index];
                return (
                    <HabitCard
                        key={habit.index}               // Required by react-native
                        picture={habit.picture}         // Url to picture
                        info={habit.info}               // Habit info
                        title={habit.title}             // Habit title
                        id={habit.habit_id}             // Habit id
                        accentColor={accentColor}       // The color used by this habit's progress bar
                        interval={habit.interval}       // Time between notifications (in seconds)
                        start={habit.start_time}        // The time of day this habit becomes active
                        end={habit.end_time}            // The time of day this habit becomes inactive
                        progress={habit.progress}       // The current progress of this habit throught it's active day
                        index={habit.index}             // The index of this habit within habitContainer's state.habits (used by push notifications)
                        isActive={habit.isActive}       // Is the habit currently sending push notifications
                    />
                )
            });
        }

        // Fill remaining space in habits with empty cards
        while (habits.length < 3) {
            habits.push(
                <EmptyCard
                    key={habits.length}
                    accentColor={this.state.accentColors[habits.length]}
                />    
            );
        }
        return habits;
    }

    calculateProgress (habit) {
        console.log(this.state)
        console.log("Calculating progress of: ");
        console.log(habit);
        function checkTime(i) {
            return (i < 10) ? "0" + i : i;
        }
        function calculateSeconds(hms) {
            var a = hms.split(':'); // split it at the colons
            // minutes are worth 60 seconds. Hours are worth 60 minutes.
            return (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
        }
        const time = new Date(),
            h = checkTime(time.getHours()),
            m = checkTime(time.getMinutes()),
            s = checkTime(time.getSeconds());
        const now = (h + ':' + m + ':' + s);
        // If time.now is within the active hours of this habit
        if (now >= habit.start_time && now <= habit.end_time)
        {
            // Get the total number of active seconds
            const activeSeconds = calculateSeconds(habit.end_time) - calculateSeconds(habit.start_time);
            // Get the seconds that have passed since the active hours have started
            const passedSeconds = calculateSeconds(now) - calculateSeconds(habit.start_time);
            // Get the percentage of the active day that has already passed
            const progress = (passedSeconds / activeSeconds) * 100;
            return Math.floor(progress);
        } else {
            return 100;
        }
    }

    updateProgress (index) {
        console.log('Update progress, index: ' + index)
        const progress = this.calculateProgress(this.state.habits[index]);
        // Create a copy of the habits array to be modified
        habits = this.state.habits;
        // Update the specified habit's progress
        habits[index].progress = parseInt(progress);
        console.log('new progress: ' + habits[index].progress)
        this.setState({
            habits: habits
        })
    }

    handleRefresh () {
        console.log('refreshing')
        this.setState({
            refreshing: true
        });
        // Refresh habits
        this.getHabits();
        // Refresh the progress bar of each habit
        if (this.state.habits.length > 0)
            this.state.habits.forEach((habit) => {
                this.updateProgress(habit.index);
            })
        this.setState({
            refreshing: false
        });
    }

    componentWillMount(props) {
    this.getHabits();
    }

    render () {
        const habits = this.createHabits();

        return(
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.handleRefresh}
                    />
                }
            >
                <View style={ styles.habitContainer }>
                    {habits}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    habitContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#F9F9F9',
    }
})