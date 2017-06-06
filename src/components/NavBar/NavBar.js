import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    TouchableHighlight,
    AppRegistry
} from 'react-native';

export default class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isMenuActive: true
        }

        this.onMenuPressed = this.onMenuPressed.bind(this);
    }

    onMenuPressed () {
        if (this.state.isMenuActive) {
            this.props.menu.slideInView.slideIn();
            this.setState({ isMenuActive: false });
        }
        else {
            this.props.menu.slideInView.slideOut();
            this.setState({ isMenuActive: true });
        }
    }

    render () {
        const menuButton = (this.props.menu.slideInView === undefined) ? 
            <TouchableHighlight>
                <Image                              // Menu button
                    source={require('./menu.png')}
                    style={{                  
                        alignSelf: 'center',
                        height: 50,
                        width: 60
                    }}
                />
            </TouchableHighlight>
            :
            <TouchableHighlight onPress={this.onMenuPressed}>
                <Image                              // Menu button
                    source={require('./menu.png')}
                    style={{                  
                        alignSelf: 'center',
                        height: 50,
                        width: 60
                    }}
                />
            </TouchableHighlight>
        return (
            <View style={{                          // Navbar Container
                    borderBottomWidth: 4,
                    borderBottomColor: '#EEE',
                    height: 44, 
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
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
                            color: '#000080'
                        }}> 
                            Habit 
                        </Text>
                    </View>
                    <View style={{                          // Right container
                        flex: 1
                    }}>
                        {menuButton}
                    </View>
                </View>
            );
        }
}

AppRegistry.registerComponent('NavBar', () => NavBar);