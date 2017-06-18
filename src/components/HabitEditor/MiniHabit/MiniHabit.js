import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

export default class MiniHabit extends Component {
    render () {
        return (
            <TouchableOpacity
                style={ styles.habit }
            >
                <Text>
                    Mini Habit { this.props.title }
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    habit: {
        height: 50,
        alignSelf: 'stretch',
        marginVertical: 15,
        marginHorizontal: 25,
        backgroundColor: 'white',
        borderRadius: 3
    }
});