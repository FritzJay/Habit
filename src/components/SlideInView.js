import React, { Component } from 'react';
import {
  Animated
} from 'react-native';

class SlideInView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideAnim: new Animated.Value(-this.props.width - 50),
      isActive: false
    }
    // Bind slideIn
    this.handleMenuPressed = this.handleMenuPressed.bind(this);
    this.slideIn = this.slideIn.bind(this);
    this.slideOut = this.slideOut.bind(this);
  }

  handleMenuPressed () {
    if (this.state.isActive) {
      this.slideOut();
      this.setState({
        isActive: false
      });
    } else {
      this.slideIn();
      this.setState({
        isActive: true
      });
    }
  }

  move (newPos) {
    Animated.timing(
      this.state.slideAnim,
      {
        toValue: -newPos - 35,
        duration: 0
      }
    ).start()
  }

  reset () {
    Animated.timing(
      this.state.slideAnim,
      {
        toValue: (-this.props.width * 0.2) - 50,
        duration: this.props.duration / 2
      }
    ).start()
  }

  slideIn () {
    Animated.timing(                            // Animate over time
      this.state.slideAnim,                      // The animated value to drive
      {
        toValue: (-this.props.width * 0.2) - 50,                             // Animate to XOffset
        duration: this.props.duration,
      }
    ).start();                                  // Starts the animation
    console.log('slideIn')
    this.setState({
      isActive: true
    })
  }

  slideOut () {
    Animated.timing(
      this.state.slideAnim,
      {
        toValue: -this.props.width - 50,
        duration: this.props.duration
      }
    ).start();
    console.log('slideOut')
    this.setState({
      isActive: false
    })
  }
  
  render() {
    return (
      <Animated.View                            // Special animatable View
        style={{
          ...this.props.style,
          width: this.props.width + 50,          // +50
          right: this.state.slideAnim            // bind right with slideAnim
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

module.exports = SlideInView;