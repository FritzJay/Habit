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
                console.log(resJson);
                this.setState({
                    habits: resJson
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render () {
        let habits = [];
        // Map habits to an array of Card 
        if (this.state.habits.length > 0) {
            habits = Array.from(this.state.habits).map((habit) => {
                // Create a habit card for each habit in state.habits
                const accentColor = this.state.accentColors[habit.habit_id];
                return (
                    <HabitCard
                        picture={habit.picture}
                        info={habit.info}
                        title={habit.title}
                        key={habit.habit_id} 
                        id={habit.habit_id}
                        accentColor={accentColor}
                        interval={habit.interval}     // Time between notifications (in seconds)
                    />
                )
            });
        }

        // Fill remaining space in habits with empty cards
        while (habits.length < 3) {
            habits.push(
                <EmptyCard 
                    key={habits.length + 1}
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