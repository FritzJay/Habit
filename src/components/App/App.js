//config holds connection and user info
import config from '../../config.js';
import React, { Component } from 'react';
import HabitContainer from '../HabitContainer/HabitContainer';
import FadeInView from '../FadeInView';
import Menu from '../Menu/Menu';
import NavBar from '../NavBar/NavBar';
import {
    Text,
    View,
    StatusBar,
    Animated,
    StyleSheet,
    AsyncStorage
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
    }

    redirect (routeName) {
        let { navigate } = this.props.navigation;
        navigate(routName)
    }

    componentDidMount () {
        // If we cannot successfully get the user from the database
        // Return to the login screen
        if (!this.GetUser()) {
            // Go back to the login screen
            //this.redirect('Login');
        }
        // Set menu to be passed down to children
        this.setState({ menu: this.menu });
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