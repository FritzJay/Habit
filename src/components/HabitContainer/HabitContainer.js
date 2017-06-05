import React, { Component } from 'react';
import { 
    View, 
    Text,
    ScrollView,
    AppRegistry 
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
        fetch(this.props.url + '/habits/' + this.props.user_id)
            .then((res) => res.json())
            .then((resJson) => {
                console.log('Succesfully fetched habits: ' + resJson);
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
                        accentColor={accentColor}
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
            <ScrollView style={{
                flex:1
            }}>
                <View style={{                      // Habit Container
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    alignSelf: 'stretch',
                    backgroundColor: '#F9F9F9',
                }}>
                    {habits}
                </View>
            </ScrollView>
        );
    }
}

AppRegistry.registerComponent('HabitContainer', () => HabitContainer);