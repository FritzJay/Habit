//config holds connection and user info
import config from '../../config';
import React, { Component } from 'react';
import HabitContainer from '../HabitContainer/HabitContainer';
import NavBar from '../NavBar/NavBar';
import {
   View,
   StatusBar,
    AppRegistry
} from 'react-native';


export default class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = { 
            user: '',
            habits: []
        };

        // bind functions to this component
        this.queryDB = this.queryDB.bind(this);
    }

    //Get's user info from db
    queryDB () {
        fetch(this.props.url)           // fetches info from supplied url
            .then((res) => res.json())  // gets json from response
            .then((resJson) => {
                let newUser = resJson;
                console.log('Successfully queried db: ' + resJson);
                //Format user.picture
                newUser.picture = "http://" + config.ip + ":" + config.port + "/pics/" + newUser.picture;
                console.log(newUser.picture);
                console.log(newUser);
                console.log("-----------");
                this.setState({
                    user: newUser,
                    habits: newUser.habits
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //Query database before component mounts
    componentWillMount () {
        this.queryDB();
    }

    render () {
        return (
            <View style={{                          // App container
                flex: 1,       
                flexDirection: 'column',
                justifyContent: 'flex-start'
            }}>
                <StatusBar
                    backgroundColor="#222"
                    barStyle="light-content"
                />
                <NavBar />
                <HabitContainer 
                    habits={this.state.habits} 
                    url={this.props.url} 
                />
            </View>
        );
    }
}

AppRegistry.registerComponent('App', () => App);