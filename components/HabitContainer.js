import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class HabitContainer extends Component {
    constructor (props) {
        super(props);
        this.state = { 
            url: this.props.url,
            habits: this.props.habits
        }
        this.handleReload = this.handleReload.bind(this);
    }
    //Get user info from database
    handleReload () {
        let habits = fetch(this.state.url)
            .then((res) => res.json())
            .then((resJson) => {
                return resJson.habits;
            })
            .catch((err) => {
                console.log(err);
            });
    }
    render () {
        if (this.state.habits.length > 0) {
            let habits = this.state.habits.map(function(habit) {
                return <Text>{habit}</Text>
            });
        }
        return(
            <View>
                {habits}
            </View>
        );
    }
}