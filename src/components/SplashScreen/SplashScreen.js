'use strict';

import React, { Component } from 'react';
import { 
    View, 
    Text,
    Dimensions,
    StyleSheet,
} from 'react-native';
import TimerMixin from 'react-timer-mixin'
import FadeInView from '../FadeInView'

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: false,
            mixins: [TimerMixin]
        }
    }

    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        console.log("splash mounted")
        // I love es6
        setTimeout(
            () => {
                console.log("remove splash")
                this.setState({ hidden: true })
            }, 
            totalDuration
        )
    }

    render () {
        if (!this.state.hidden) {
            return (
                <View
                    style={{
                        position: 'absolute',
                        width: windowWidth,
                        height: windowHeight,
                        backgroundColor: 'white',
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <FadeInView
                        duration={fadeDuration}
                        fadeOut={true}
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
                </View>
            );
        } else {
            return (
                <View />
            );
        }
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
        width: 32,
        height: 32,
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

const fadeDuration  = 250,
      totalDuration = 3000