import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export default class NavBar extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        const menuButton = (this.props.menu.slideInView === undefined) ? 
            <TouchableOpacity style={ styles.menuButtonContainer } >
                <Image                              // Menu button
                    source={require('./menu.png')}
                    style={ styles.menuButton }
                />
            </TouchableOpacity>
            :
            <TouchableOpacity
                style={ styles.menuButtonContainer }
                onPress={ this.props.menu.slideInView.handleMenuPressed }
            >
                <Image                              // Menu button
                    source={require('./menu.png')}
                    style={ styles.menuButton }
                />
            </TouchableOpacity>
        return (
            <View style={ styles.navbarContainer }>
                    <View style={{                      // Left hand container
                        flex: 1
                    }}>
                    </View>
                    <View>
                        <Text style={ styles.title }> 
                            Habit 
                        </Text>
                    </View>
                    <View style={{                          // Right container
                        flex: 1,
                    }}>
                        {menuButton}
                    </View>
                </View>
            );
        }
}

const styles = StyleSheet.create({
    navbarContainer: {
        borderBottomWidth: 4,
        borderBottomColor: '#EEE',
        height: 44, 
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menuButtonContainer: {
        alignSelf: 'center',
        justifyContent: 'center',
        height: 25,
        width: 35,
        top: 2
    },
    menuButton: {                  
        alignSelf: 'center',
        height: 50,
        width: 60
    },
    title: {
        alignSelf: 'center', 
        fontSize: 22, 
        color: '#000080'
    }
})