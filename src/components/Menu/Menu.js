// FadeInView.js
import React, { Component } from 'react';
import {
    Dimensions,
    Text,
    TouchableHighlight,
    AsyncStorage
} from 'react-native';
import SlideInView from '../SlideInView';

export default class Menu extends Component {
  constructor(props) {
    super(props);

    this.onLogoutPressed = this.onLogoutPressed.bind(this);
  }

  async onLogoutPressed () {
    console.log('Logout pressed')
    // Clear storage
    try {
      await AsyncStorage.clear();
    } catch (error) {
      return console.error('Something bad happened.', error);
    }
    // Redirect to login screen
    let { navigate } = this.props.navigate;
      navigate('Login');
  }
  
  render() {
    return (
      <SlideInView
        ref={(slideInView) => { this.slideInView = slideInView }}
        width={Dimensions.get('window').width}
        duration={250}            // The duration of the slideIn
        style={{                   // Menu container
            backgroundColor: "white",
            position: "absolute",
            height: 500,
            width: Dimensions.get('window').width,
            right: this.props.slideAnim, 
            top: 44
        }}>
          <TouchableHighlight
            onPress={this.onLogoutPressed}
            style={{
              height: 50,
              backgroundColor: 'gray'
            }}
          >
            <Text>
              Logout
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={this.onProfilePressed}
            style={{
              height: 50,
              backgroundColor: 'gray'
            }}
          >
            <Text>
              Profile
            </Text>
          </TouchableHighlight>

        </SlideInView>
    );
  }
}