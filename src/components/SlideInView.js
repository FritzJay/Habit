import React, { Component } from 'react';
import {
  Animated,
} from 'react-native';

class SlideInView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideAnim: new Animated.Value(-200),          // Initial value for Xoffset: 0
    };
  }
  componentDidMount() {
    Animated.timing(                            // Animate over time
      this.state.slideAnim,                      // The animated value to drive
      {
        toValue: 0,                             // Animate to Xoffset 0
        duration: this.props.duration,
      }
    ).start();                                  // Starts the animation
  }
  render() {
    return (
      <Animated.View                            // Special animatable View
        style={{
          ...this.props.style,
          right: this.state.slideAnim            // bind left with slideAnim
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

module.exports = SlideInView;