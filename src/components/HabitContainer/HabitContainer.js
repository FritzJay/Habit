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
            habits: props.habits,                                  // The habits that will be passed down to habit cards
            accentColors: ['#F44336', '#FFC107', '#3F51B5']        // The accent colors that will be passed down to habit Cards
        }
        
        // Bind functions to component
        this.handleReload = this.handleReload.bind(this);
    }

    // Set state on componentWillReceiveProps to make sure-
    // habits can be mapped to a HabitCard via state
    componentWillReceiveProps(props) {
        this.setState({
            habits: props.habits
        })
    }

    // Get user info from database
    handleReload () {
        fetch(this.props.url)           // fetch from supplied url
            .then((res) => res.json())  // Get json from fetch
            .then((resJson) => {
                let newUser = resJson;                              // Make a newUser variable so I can read resJson -
                console.log('Successfully reloaded: ' + resJson);   // more than once.
                this.setState({
                    habits: newUser.habits
                });
            })
            .catch((err) => {
                console.log(err);
            });
    } 

    render () {
        let habits = [];
        // Map habits to an array of Card 
        if (this.state.habits.length > 0) {
            habits = Array.from(this.state.habits).map((habit) => {
                // Create a habit card for each habit in state.habits
                const accentColor = this.state.accentColors[habit.id];
                return (
                    <HabitCard 
                        isLoved={habit.isLoved}
                        isActive={habit.isActive}
                        streak={habit.streak}
                        notes={habit.notes}
                        picture={habit.picture}
                        info={habit.info}
                        title={habit.title}
                        key={habit.id} 
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