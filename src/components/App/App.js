//config holds connection and user info
import config from '../../config.js';
import React, { Component } from 'react';
import HabitContainer from '../HabitContainer/HabitContainer';
import FadeInView from '../FadeInView';
import Menu from '../Menu/Menu';
import NavBar from '../NavBar/NavBar';
import {
    View,
    StatusBar,
    Animated,
    AppRegistry
} from 'react-native';

// App will be in charge of fetching all user related data from the database...
// and relaying that data to HabitContainer and Menu.
export default class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = { 
            user: '',
            menu: { }
        };

        // bind functions to this component
        this.GetUser = this.GetUser.bind(this);
    }

    componentWillMount () {
        this.GetUser();
    }

    componentDidMount () {
        this.setState({ menu: this.menu })
    }

    render () {
        return (
            <FadeInView duration={500} style={{
                flex: 1,       
                flexDirection: 'column',
                justifyContent: 'flex-start',
                opacity: this.state.fadeAnim
            }}>
                <StatusBar
                    backgroundColor="#222"
                    barStyle="light-content"
                />
                <NavBar menu={this.state.menu} />
                <HabitContainer 
                    user_id={this.state.user.user_id} 
                    url={this.props.url} 
                />
                <Menu
                    ref={(menu) => { this.menu = menu }}
                />
            </FadeInView>
        );
    }

    //Get's user info from db
    GetUser () {
        fetch(this.props.url + '/users/1')           // fetches info from supplied url
            .then((res) => res.json())               // gets json from response
            .then((resJson) => {
                let newUser = resJson;
                console.log('Successfully queried db: ' + resJson);
                //Format user.picture
                newUser.picture = "http://" + config.ip + ":" + config.port + "/pics/" + newUser.picture;
                this.setState({
                    user: newUser
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

AppRegistry.registerComponent('App', () => App);