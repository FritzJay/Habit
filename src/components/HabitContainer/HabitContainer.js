import React, { Component } from 'react';
import { 
    View, 
    Text,
    ScrollView,
    StyleSheet
} from 'react-native';
import HabitCard from '../HabitCard/HabitCard';
import EmptyCard from '../EmptyCard/EmptyCard';

export default class HabitContainer extends Component {
    constructor (props) {
        super(props);
        this.state = {
            habits: [],
            accentColors: ['#F44336', '#FFC107', '#3F51B5']        // The accent colors that will be passed down to habit Cards
        }
        
        // Bind functions to component
        this.getHabits = this.getHabits.bind(this);
        this.calculateProgress = this.calculateProgress.bind(this);
    }

    componentWillMount(props) {
        this.getHabits();
    }

    // Fetches habits associated with the current user
    // from the api server
    getHabits () {
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
                    habits: habits
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }


    calculateProgress (habit) {
        console.log(this.state)
        console.log("Calculating progress of: ");
        console.log(habit);
        function checkTime(i) {
            return (i < 10) ? "0" + i : i;
        }
        const time = new Date(),
            h = checkTime(time.getHours()),
            m = checkTime(time.getMinutes()),
            s = checkTime(time.getSeconds());
        //const now = (h + ':' + m + ':' + s);
        const now = '10:00:00' // Temporary for testing
        // If time.now is within the active hours of this habit
        if (now >= habit.start_time && now <= habit.end_time)
        {
            // Get the total number of active hours
            const activeHours = habit.end_time.slice(0, 2) - habit.start_time.slice(0, 2);
            // Get the hours that have passed since the active hours have started
            const passedHours = 10 - habit.start_time.slice(0, 2); // USE 10 TEMPORARILY
            // Get the percentage of the active day that has already passed
            const progress = (passedHours / activeHours) * 100;
            return progress;
        } else {
            return 100;
        }
    }

    updateProgress (id) {
        console.log('Update progress, id: ' + id)
        const progress = this.calculateProgress(this.state.habits[id]);
        // Create a copy of the habits array to be modified
        habits = this.state.habits;
        // Update the specified habit's progress
        habits[id].progress = parseInt(progress) + 25;
        console.log('new progress: ' + habits[id].progress)
        this.setState({
            habits: habits
        })
    }

    render () {
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
                    />
                )
            });
        }

        // Fill remaining space in habits with empty cards
        while (habits.length < 3) {
            habits.push(
                <EmptyCard
                    key={habits.length}
                />    
            );
        }

        return(
            <ScrollView>
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