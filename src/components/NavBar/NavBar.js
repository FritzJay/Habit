import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    TouchableHighlight,
    StyleSheet
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
                    style={ styles.menuButton }
                />
            </TouchableHighlight>
            :
            <TouchableHighlight onPress={this.onMenuPressed}>
                <Image                              // Menu button
                    source={require('./menu.png')}
                    style={ styles.menuButton }
                />
            </TouchableHighlight>
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
                        flex: 1
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