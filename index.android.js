import React, { Component } from 'react';
import { 
    AppRegistry, 
    View, 
    Text, 
    ScrollView,
    Image,
    StatusBar
 } from 'react-native';
 import App from './src/components/App/App';
 import Config from './src/config';

/*
// --------------------- NAVBAR ------------------------
class NavBar extends Component {
    render () {
        return (
            <View style={{                          // Navbar Container
                borderBottomWidth: 4,
                borderBottomColor: '#EEE',
                height: 44, 
                backgroundColor: 'white',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <View style={{                      // Left hand container
                    flex: 1
                }}>
                </View>
                <View style={{                      // Middle container
                    flex: 1
                }}>
                    <Text style={{                  // Title
                        alignSelf: 'center', 
                        fontSize: 22, 
                        color: 'blue'
                    }}> 
                        Habit 
                    </Text>
                </View>
                <View style={{                      // Right container
                    flex: 1
                }}>
                    <Text style={{                  // Menu button
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
            <View style={{                  // Main Container
                flex: 1,
                flexDirection: 'column',
                backgroundColor: 'white',
                alignSelf: 'stretch',
                marginTop: 15,
                marginLeft: 15,
                marginRight: 15,
                padding: 15,
                borderColor: '#EEE',
                borderStyle: 'solid',
                borderBottomWidth: 3,
                borderLeftWidth: 1,
                borderRightWidth: 1
            }}>
                <View style={{                      //Top container (Img, title, and info)
                    flex: 10,
                    flexDirection: 'row',
                    marginBottom: 10
                }}>
                    <View style={{                  //IMG container
                        flex: 3,
                        alignItems: 'center',
                        marginBottom: -10,
                    }}>
                        <Image 
                            source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }}
                            style={{
                                width: 100, 
                                height: 120
                        }}/>
                    </View>

                    <View style={{                  //Top right container (title, info)
                        flex: 4,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <View style={{                  //Title container
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'flex-end'
                        }}>
                            <Text style={{              // Title
                                flex: 1,
                                borderStyle: 'solid',
                                borderBottomColor: '#CFCFCF',
                                borderBottomWidth: 1,
                                marginBottom: 5,
                            }}> 
                                {this.props.title}
                            </Text>
                            <Text style={{              //Info
                                flex: 3,
                                textAlign: 'center',
                                padding: 10,
                                borderColor: '#CFCFCF',
                                borderTopWidth: 1,
                                borderRightWidth: 2,
                                borderLeftWidth: 2,
                                borderBottomWidth: 3
                            }}>
                                {this.props.info}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{                          //Temporary StreakBar
                    flex: 1,
                    alignSelf: 'stretch',
                    backgroundColor: '#CCC',
                    height: 12,
                    marginRight: -15,
                    marginLeft: -15
                }} />
                <View style={{                          //Bottom Container (notes, icons, streak)
                    flex: 3,
                    flexDirection: 'row',
                    marginTop: 10
                }}>

                    <Text style={{                      //Notes
                        marginLeft: 15,
                        flex: 1,
                    }}>
                        {this.props.notes}
                    </Text>

                    <View style={{                      //Icons
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginRight: 15
                    }}>

                        <Image source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }}
                            style={{
                                width: 20, 
                                height: 20
                            }}
                        />
                        <Image source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }}
                            style={{
                                width: 20, 
                                height: 20
                            }}
                        />
                        <Image source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }}
                            style={{
                                width: 20, 
                                height: 20
                            }}
                        />
                    </View>

                </View>
            </View>
        )
    }
}

// --------------------- EMPTYCARD -----------------------------
class EmptyCard extends Component {
    render () {
        return (
            <View style={{                  // Main Container
                flex: 1,
                flexDirection: 'column',
                height: 181,
                backgroundColor: 'white',
                alignSelf: 'stretch',
                marginTop: 15,
                marginLeft: 15,
                marginRight: 15
            }}>
                <Text style={{              // Title
                    flex: 1,

                }}> 
                    Empty Card
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
        
        // Bind functions to component
        this.handleReload = this.handleReload.bind(this);
    }

    // Set state on componentWillReceiveProps to make sure-
    // habits can be mapped to a HabitCard via state
    componentWillReceiveProps(props) {
        this.setState({
            habits: props.habits
        })
    }

    // Get user info from database
    handleReload () {
        fetch(this.props.url)           // fetch from supplied url
            .then((res) => res.json())  // Get json from fetch
            .then((resJson) => {
                let newUser = resJson;
                console.log('Successfully reloaded: ' + resJson);                
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
                //Create a habit card for each habit in state.habits
                console.log(habit);
                return (
                    <HabitCard 
                        isLoved={habit.isLoved}
                        isActive={habit.isActive}
                        streak={habit.streak}
                        notes={habit.notes}
                        picture={habit.picture}
                        info={habit.info}
                        title={habit.title}
                        key={habit.id} 
                    />
                )
            });
        }

        //Fill remaining space in habits with empty cards
        while (habits.length < 3) {
            habits.push(
                <EmptyCard 
                    key={habits.length + 1}
                />    
            );
        }

        return(
            <ScrollView style={{
                flex:1
            }}>
                <View style={{                      //Habit Container
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    alignSelf: 'stretch',
                    backgroundColor: '#F9F9F9',
                }}>
                    {habits}
                </View>
            </ScrollView>
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
}*/

// --------------------- HABIT ------------------------
class Habit extends Component {
  render() {
    return (
        <View style={{flex:1}}>
            <App url={"http://" + Config.ip + ":3001/api/users/58e5f621734d1d12d73a0e5f"} />
        </View>
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => Habit);