import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    PanResponder,
    Animated
} from 'react-native';

const snapTime = 0.15;     // The time it takes objects to 'snap' back into place.

export default class ListHabit extends Component {
    constructor (props) {
        super(props);

        this.state = {
            touchOpacity: 0.54,
            left: new Animated.Value(0),
            top: new Animated.Value(0),
            zIndex: null,
        }

        this.move = this.move.bind(this);
    }

    move (x, y, dur) {
        // Add's x and y to the left and top state
        // Set's the duration of the animations to dur

        // Convert dur to seconds
        dur *= 1000;

        Animated.parallel([
            Animated.timing(
                this.state.left,
                {
                    toValue: x,
                    duration: dur
                }
            ),
            Animated.timing(
                this.state.top,
                {
                    toValue: y,
                    duration: dur
                }
            )
        ]).start()
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
          touchOpacity: 0.84,
          zIndex: 5,
        })
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        console.log("X: " + gestureState.dx);
        console.log("Y: " + gestureState.dy);
        this.move(gestureState.dx, gestureState.dy, 0);
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        console.log('PanResponderRelease');
        this.move(0, 0, snapTime)
        this.setState({
            touchOpacity: 0.54,
            zIndex: null,
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

    render () {
        return (
            <Animated.View
                style={{
                    alignSelf: 'stretch',
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 8,
                    paddingVertical: 3,
                    paddingHorizontal: 3,
                    borderRadius: 3,
                    left: this.state.left,
                    top: this.state.top,
                    opacity: this.state.touchOpacity,
                    zIndex: this.state.zIndex
                }}
                { ...this._panResponder.panHandlers }
            >
                <Text 
                    style={ styles.habitTitle } 
                >
                    {this.props.title}
                </Text>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    habitTitle: {
        fontSize: 16,
    }
});