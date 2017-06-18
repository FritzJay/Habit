import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import MiniHabit from './MiniHabit/MiniHabit';
import ListHabit from './ListHabit/ListHabit';

export default class HabitEditor extends Component {
    static navigationOptions = {
        header: null
    };

    constructor (props) {
        super(props);

        this.state={
            habits: { }
        }
        
        this.getHabits = this.getHabits.bind(this);
        this.createHabitList = this.createHabitList.bind(this);
        this.handleBackPressed = this.handleBackPressed.bind(this);
        this.addToList = this.addToList.bind(this);
        this.removeFromList = this.removeFromList.bind(this);
    }

    getHabits () {
        console.log('Getting all of the users habits')
        // fetch a list of all the users habits

        // Temporarily return a list of bogus habits
        const habits = [
            { id: 0, title: 'Temp Habit 1', picture: 'fapperMapper.jpg' },
            { id: 1, title: 'Ablarg Dahar Formit Pecan', picture: 'posture.png' },
            { id: 2, title: 'Short', picture: 'profile.jpg' },
            { id: 3, title: 'Wa', picture: 'water.jpg' },
            { id: 4, title: 'ONEWORKALLCAPS', picture: 'posture.png' },
            { id: 5, title: '_*!?%$#', picture: 'fapperMapper.jpg' },
            { id: 6, title: 'Short', picture: 'profile.jpg' },
            { id: 7, title: 'Wa', picture: 'water.jpg' },
            { id: 8, title: 'ONEWORKALLCAPS', picture: 'posture.png' },
            { id: 9, title: '_*!?%$#', picture: 'fapperMapper.jpg' },
            { id: 10, title: 'Short', picture: 'profile.jpg' },
            { id: 11, title: 'Wa', picture: 'water.jpg' },
            { id: 12, title: 'ONEWORKALLCAPS', picture: 'posture.png' },
            { id: 13, title: '_*!?%$#', picture: 'fapperMapper.jpg' }
        ];
        this.setState({
            habits: habits
        });
    }

    createHabitList () {
        let habits = [];

        this.state.habits.map((habit) => {
            habits.push(
                <ListHabit
                    key={ habits.length }
                    title={ habit.title }
                    add={ this.addToList }
                    remove={ this.removeFromList }
                >
                </ListHabit>
            );
        });
        console.log(habits);
        return habits;
    }

    handleBackPressed () {
        const { goBack } = this.props.navigation;
        goBack(null);
    }

    addToList (habit) {
        // Create a ListHabit out of 'habit'
        const newHabit = (
            <ListHabit
                key={ habits.length + 1}
                title={ habit.title }
                add={ this.addToList }
                remove={ this.removeFromList }
            >
            </ListHabit>
        )
        let habits = this.state.habits;
        // Add the habit to the list of habits
        habits.push(newHabit);
        // Adds the habit to the list of habits
        this.setState({
            habits: habits
        })
    }

    removeFromList (id) {
        // Remove the habit from the list
        let habits = this.state.habits.filter((habit) => {
            return habit.id !== id
        });
        // Removes the habit from the list of habits
        this.setState({
            habits: habits
        })
    }

    componentWillMount (props) {
        console.log('componentWillMount')
        const habits = this.getHabits();
        this.setState=({
            habits: habits
        })
    }

    render () {
        console.log(this.state.habits)
        const habitList = this.createHabitList();

        return(
            <View>
                <Text
                    style={ styles.title }
                >
                    Habit Editor
                </Text>
                <View
                    style={ styles.controllsContainer }
                >
                    <View
                        style={ styles.leftContainer }
                    >
                        <MiniHabit
                            title='MiniHabit1' 
                        />
                        <MiniHabit
                            title='MiniHabit2' 
                        />
                        <MiniHabit
                            title='MiniHabit3' 
                        />
                        <View
                            style={ styles.buttonContainer }
                        >
                            <TouchableOpacity
                                style={ styles.button }
                            >
                                <Text>
                                    Save
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={ styles.button }
                            >
                                <Text>
                                    Discard
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={ styles.button }
                                onPress={ this.handleBackPressed }
                            >
                                <Text>
                                    Back
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View
                        style={ styles.rightContainer }
                    >
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        >
                            {habitList}
                        </ScrollView>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        alignSelf: 'center',
        fontSize: 25
    },
    controllsContainer: {
        flexDirection: 'row',
    },
    leftContainer: {
        flex: 5,
        backgroundColor: 'red',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        padding: 15,
        borderTopWidth: 2,
        borderColor: 'black'
    },
    button: {
        borderRadius: 5,
        backgroundColor: 'white',
        paddingVertical: 2,
        paddingHorizontal: 3
    },
    rightContainer: {
        flex: 4,
        alignSelf: 'stretch',
        backgroundColor: 'blue',
        height: 300
    }
});