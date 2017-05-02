//config holds connection and user info
import config from '../../config';
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


export default class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = { 
            user: '',
            habits: [],
            menu: { }
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

    componentDidMount () {
        this.setState({ menu: this.menu })
    }

    render () {
        return (
            <FadeInView duration={500} style={{                          // App container
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
                    habits={this.state.habits} 
                    url={this.props.url} 
                />
                <Menu
                    ref={(menu) => { this.menu = menu }}
                />
            </FadeInView>
        );
    }
}

AppRegistry.registerComponent('App', () => App);