import React, { Component } from 'react';
import { AppRegistry, View, Text, ScrollView } from 'react-native';

// --------------------- NAVBAR ------------------------
class NavBar extends Component {
    render () {
        return (
            <View style={{
                borderBottomWidth: 4,
                borderBottomColor: '#CCC',
                height: 44, 
                backgroundColor: 'white',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <View style={{
                    flex: 1
                }}>
                </View>
                <View style={{
                    flex: 1
                }}>
                    <Text style={{
                        alignSelf: 'center', 
                        fontSize: 22, 
                        color: 'blue'
                    }}> 
                        Habit 
                    </Text>
                </View>
                <View style={{
                    flex: 1
                }}>
                    <Text style={{
                        alignSelf: 'center'
                    }}>
                        Temp Menu
                    </Text>
                </View>
            </View>
        );
    }
}
// --------------------- HABITCARD ------------------------
class HabitCard extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <View style={{
                width: 343, 
                height: 181,
                backgroundColor: 'white',
                marginTop: 15
            }}>
                <Text style={{
                    flex: 1,

                }}> 
                    {this.props.title} 
                </Text>
            </View>
        )
    }
}


// --------------------- HABITCONTAINER ------------------------
class HabitContainer extends Component {
    constructor (props) {
        super(props);
        this.state = { habits: props.habits }
        this.handleReload = this.handleReload.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            habits: props.habits
        })
    }

    //Get user info from database
    handleReload () {
        fetch(this.props.url)
            .then((res) => res.json())
            .then((resJson) => {
                let newUser = resJson;
                this.setState({
                    habits: newUser.habits
                });
            })
            .catch((err) => {
                console.log(err);
            });
    } 

    render () {
        let habits = [];
        //Map habits to an array of Card 
        if (this.state.habits.length > 0) {
            habits = Array.from(this.state.habits).map((habit) => {
                return <HabitCard title={habit.title} key={habit.id} />
            });
        }

        while (habits.length < 3) {
            habits.push(
                <Text key={habits.length + 1}>Empty Card</Text>
            );
        }

        return(
            <View style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignText: 'center',
                alignSelf: 'center',
                backgroundColor: '#E6E6E6',
            }}>
                {habits}
            </View>
        );
    }
}


// --------------------- APP ------------------------
class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = { 
            user: '',
            habits: []
        };
        this.queryDB = this.queryDB.bind(this);
    }

    queryDB () {
        fetch(this.props.url)
            .then((res) => res.json())
            .then((resJson) => {
                let newUser = resJson;
                this.setState({
                    user: newUser,
                    habits: newUser.habits
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    componentWillMount () {
        this.queryDB();
    }

    render () {
        return (
            <View style={{
                flexDirection: 'column',
                justifyContent: 'flex-start'
            }}>
                <NavBar />
                <HabitContainer habits={this.state.habits} url={this.props.url} />
            </View>
        );
    }
}

// --------------------- HABIT ------------------------
class Habit extends Component {
  render() {
    return (
        <View>
            <App url="http://192.168.0.107:3001/api/user" />
        </View>
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => Habit);