'use strict';

import React, { Component } from 'react';
import { 
    View, 
    Text,
    Dimensions,
    StyleSheet,
    AsyncStorage,
} from 'react-native';
import TimerMixin from 'react-timer-mixin'
import FadeInView from '../FadeInView'
 
export default class Register extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            hidden: false
        }

        this.showSplash = this.showSplash.bind(this)
        this.setSeenSplash = this.setSeenSplash.bind(this)
        this.getShowSplash = this.getShowSplash.bind(this)
    }

    showSplash () {
        console.log("SplashScreen.showSplash: Initiated")
        setTimeout(
            () => {
                const { navigate } = this.props.navigation;
                navigate('Login')
            }, 
            totalDuration
        )
    }

    async getShowSplash () {
        // If it's the first time the user has used this app
        // Display the splash screen
        AsyncStorage.getItem('seen_splash').then((data) => {
            console.log('SplashScreen.getShowSplash: seen_splash = ' + data)
            if (data == null) {
                return true
            } else {
                return false
            }
        })
    }

    async setSeenSplash () {
        // Store a seen_splash value so we can skip showing it
        // the next time a user uses the app.
        try {
            // seen_splash is consumed in Authentication/Login
            await AsyncStorage.setItem('seen_splash', 'true')
            console.log("SplashScreen.setSeenSplash: Succesfully stored 'seen_splash' as 'true'")
        } catch (error) {
            console.log("Something went wrong: " + error)
        }
    }

    componentWillMount () {
        console.log("SplashScreen.componentWillReceiveProps: Initiated")
        this.showSplash()
    }

    render () {
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