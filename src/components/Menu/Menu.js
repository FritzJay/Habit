// FadeInView.js
import React, { Component } from 'react';
import {
    Dimensions,
    Text,
    TouchableHighlight,
    Image,
    StyleSheet,
    AsyncStorage
} from 'react-native';
import SlideInView from '../SlideInView';
import config from '../../config';


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
    console.log(this.props.user)
    return (
      <SlideInView
        ref={(slideInView) => { this.slideInView = slideInView }}
        style={{
          backgroundColor: "white",
          position: "absolute",
          height: 500,
          width: Dimensions.get('window').width * 0.8,
          right: this.props.slideAnim * 0.8, 
          top: 40,
          borderLeftWidth: 2,
          borderColor: '#EEE'
         }}
        width={ Dimensions.get('window').width }
        duration={ 250 }            // The duration of the slideIn
      >
        <Text style={ styles.username }>
          {this.props.user.username}
        </Text>
        <Image 
            style={ styles.profilePicture }
            source={{ uri: this.props.user.picture }}
        />
        <TouchableHighlight
          onPress={ this.onLogoutPressed }
          style={ styles.button }
        >
          <Text>
            Logout
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={this.onProfilePressed}
          style={ styles.button }
        >
          <Text>
            Profile
          </Text>
        </TouchableHighlight>

      </SlideInView>
    );
  }
}

const styles = StyleSheet.create({
  username: {
    alignSelf: 'center',
    fontSize: 22
  },
  profilePicture: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: 'black',
    borderWidth: 2,
    alignSelf: 'center',
    margin: 14
  },
  button: {
    height: 50,
    backgroundColor: 'gray',
    paddingLeft: 5,
    justifyContent: 'center'
  }
})