import React, { Component } from 'react';
import { 
    View, 
    Text
} from 'react-native';

export default class NavBar extends Component {
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

AppRegistry.registerComponent('NavBar', () => NavBar);