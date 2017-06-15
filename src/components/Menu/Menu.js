import React, { Component } from 'react';
import {
    Dimensions,
    Text,
    TouchableOpacity,
    PanResponder,
    View,
    Image,
    StyleSheet,
    AsyncStorage
} from 'react-native';
import SlideInView from '../SlideInView';
import config from '../../config';

const windowWidth = Dimensions.get('window').width,
  windowHeight = Dimensions.get('window').height

export default class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      touchOpacity: 0.54
    }
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

    componentWillMount () {
      this._panResponder = PanResponder.create({
        // Ask to be the responder:
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

        onPanResponderGrant: (evt, gestureState) => {
          // The gesture has started. Show visual feedback so the user knows
          // what is happening!
          console.log('onPanResponderGrant');
          this.setState({
            touchOpacity: 0.84
          })

          // gestureState.d{x,y} will be set to zero now
        },
        onPanResponderMove: (evt, gestureState) => {
          // The most recent move distance is gestureState.move{X,Y}
          this.slideInView.move(gestureState.moveX);
          // The accumulated gesture distance since becoming responder is
          // gestureState.d{x,y}
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (evt, gestureState) => {
          // The user has released all touches while this view is the
          // responder. This typically means a gesture has succeeded
          console.log('PanResponderRelease');
          if(gestureState.moveX >= windowWidth - 75 || gestureState.vx > 1.25) {
            this.slideInView.slideOut();
          } else {
            this.slideInView.reset();
          }
          this.setState({
              touchOpacity: 0.54
            })
        },
        onPanResponderTerminate: (evt, gestureState) => {
          // Another component has become the responder, so this gesture
          // should be cancelled
          console.log('PanResponderTerminate')
        },
        onShouldBlockNativeResponder: (evt, gestureState) => {
          // Returns whether this component should block native components from becoming the JS
          // responder. Returns true by default. Is currently only supported on android.
          return true;
        },
      });
    }
  
  render() {
    return (
      <SlideInView
        ref={(slideInView) => { this.slideInView = slideInView }}
        style={{
          backgroundColor: "white",
          position: "absolute",
          height: windowHeight - 40,
          width: windowWidth,
          top: 40,
          borderLeftWidth: 2,
          borderColor: '#EEE',
          flexDirection: 'row'
         }}
        width={ windowWidth }
        duration={ 250 }            // The duration of the slideIn
      >
        <View
          style={{
            width: 20,
            backgroundColor: 'black',
            opacity: this.state.touchOpacity
          }}
          { ...this._panResponder.panHandlers }
        />
        <View
          style={ styles.middleContainer }
        >
          <Text style={ styles.username }>
            {this.props.user.username}
          </Text>
          <Image 
              style={ styles.profilePicture }
              source={{ uri: this.props.user.picture }}
          />
          <TouchableOpacity
            onPress={ this.onLogoutPressed }
            style={ styles.button }
          >
            <Text>
              Logout
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onProfilePressed}
            style={ styles.button }
          >
            <Text>
              Profile
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={ styles.rightContainer }
        />
      </SlideInView>
    );
  }
}

const styles = StyleSheet.create({
  middleContainer: {
    width: windowWidth * 0.8,
  },
  rightContainer: {
    width: 50
  },
  username: {
    alignSelf: 'center',
    fontSize: 22,
    color: 'black'
  },
  profilePicture: {
    width: 160,
    height: 160,
    borderRadius: 100,
    borderColor: 'rgba(0,0,0,0.84)',
    borderWidth: 1,
    alignSelf: 'center',
    margin: 14
  },
  button: {
    height: 50,
    borderColor: 'rgba(0,0,0,0.84)',
    borderTopWidth: 1,
    paddingLeft: 5,
    justifyContent: 'center',
    opacity: 0.84
  }
})