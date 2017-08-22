'use strict';

import React, { Component } from 'react';
import { 
    View, 
    Text,
    Dimensions,
    StyleSheet
} from 'react-native';
import FadeInView from '../FadeInView'

export default class Register extends React.Component {
    static navigationOptions = {
        header: null
    };

    render () {
        return (
            <FadeInView
                style={{
                    position: 'absolute',
                    width: windowWidth,
                    height: windowHeight,
                    backgroundColor: 'white',
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            duration= {500}
            >
                <Text 
                    style={ styles.title }
                >
                    Habit
                </Text>
                <View
                    style={ styles.circlesContainer }
                >
                    <View
                        style={[
                            styles.circle,
                            styles.circleOne 
                        ]}
                    />
                    <View
                        style={[
                            styles.circle,
                            styles.circleTwo 
                        ]}
                    />
                    <View
                        style={[
                            styles.circle,
                            styles.circleThree 
                        ]}
                    />
                </View>
            </FadeInView>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 51,
        color: '#172E58',
        textAlign: 'center'
    },
    circlesContainer: {
        flexDirection: 'row',
        justifyContent: 'center', 
    },
    circle: {
        width: 35,
        height: 35,
        borderRadius: 29,
        margin: 5,
    },
    circleOne: {
        backgroundColor: '#E84721',
    },
    circleTwo: {
        backgroundColor: '#F9BE01',
    },
    circleThree: {
        backgroundColor: '#0595C2',
    },
})

const windowWidth = Dimensions.get('window').width,
  windowHeight = Dimensions.get('window').height