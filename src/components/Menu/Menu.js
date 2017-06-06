// FadeInView.js
import React, { Component } from 'react';
import {
    Dimensions,
    Text,
    TouchableHighlight
} from 'react-native';
import SlideInView from '../SlideInView';

export default class Menu extends Component {
  constructor(props) {
    super(props);
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
          <TouchableHighlight onPress={this.onLogoutPressed}>
            <Text>
              Logout
            </Text>
          </TouchableHighlight>
        </SlideInView>
    );
  }
}