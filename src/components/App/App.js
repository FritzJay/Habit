//config holds connection and user info
import config from '../../config.js';
import React, { Component } from 'react';
import PushNotification from 'react-native-push-notification'
import HabitContainer from '../HabitContainer/HabitContainer';
import PushController from '../PushController/PushController.js';
import FadeInView from '../FadeInView';
import Menu from '../Menu/Menu';
import NavBar from '../NavBar/NavBar';
import {
    Text,
    View,
    StatusBar,
    Animated,
    StyleSheet,
    AsyncStorage,
    AppState
} from 'react-native';

// App will be in charge of fetching all user related data from the database...
// and relaying that data to HabitContainer and Menu.
export default class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = { 
            user: '',
            menu: { },
            token: this.props.navigation.state.params.token
        };

        // bind functions to this component
        this.GetUser = this.GetUser.bind(this);
        this.redirect = this.redirect.bind(this);
        this.handleAppStateChange = this.handleAppStateChange.bind(this);
    }

    redirect (routeName) {
        let { navigate } = this.props.navigation;
        navigate(routName)
    }

    handleAppStateChange (appState) {
        console.log('App state changed');
        console.log(appState);
        if (appState === 'background') {
            PushNotification.localNotificationSchedule({
                message: "My Notification MEssage",
                date: new Date(Date.now() + (5 * 1000))
            })
        }
    }

    componentDidMount () {
        AppState.addEventListener('change', this.handleAppStateChange); // Add event listener for push notification
        // If we cannot successfully get the user from the database
        // Return to the login screen
        if (!this.GetUser()) {
            // Go back to the login screen
            //this.redirect('Login');
        }
        // Set menu to be passed down to children
        this.setState({ menu: this.menu });
    }

    componentWillUnmount () {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    render () {
        return (
            <View style={ styles.mainContainer }>
                <StatusBar
                    backgroundColor="#222"
                    barStyle="light-content"
                />
                <NavBar menu={ this.state.menu } />
                <HabitContainer 
                    user_id={this.state.user.user_id} 
                    url={this.props.url}
                    token={this.state.token}
                />
                <Menu
                    ref={(menu) => { this.menu = menu }}
                    navigate={this.props.navigation}
                    user={this.state.user}
                />
                <PushController />
            </View>
        );
    }

    //Get's user info from db
    GetUser () {
        console.log("navigation state: ");
        console.log(this.props.navigation.state.params.token);
        fetch(this.props.url + '/users/' + this.state.token, {                // fetches info from supplied url
            method: 'GET',
            headers: {
                'x-access-token': this.state.token
            }})
            .then((res) => res.json())                      // gets json from response
            .then((resJson) => {
                let newUser = resJson;
                console.log('Successfully queried db:');
                console.log(resJson);
                //Format user.picture
                newUser.picture = "http://" + config.ip + ":" + config.port + "/pics/" + newUser.picture;
                this.setState({
                    user: newUser
                });
                return true;
            })
            .catch((err) => {
                console.log(err);
                return false;
            });
        return false;
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,       
        flexDirection: 'column',
        justifyContent: 'flex-start'
    }
})