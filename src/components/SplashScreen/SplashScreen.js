'use strict';

import React, { Component } from 'react';
import { 
    View, 
    Text,
    Dimensions,
    StyleSheet
} from 'react-native';
import FadeInView from '../FadeInView'

export default class Register extends React.Component {
    static navigationOptions = {
        header: null
    };

    render () {
        return (
            <FadeInView
                style={{
                    position: 'absolute',
                    width: windowWidth,
                    height: windowHeight,
                    backgroundColor: 'white'
                }}
            duration= {500}
            >
                <Text>TESTTESTTEST</Text>
            </FadeInView>
        );
    }
}

const windowWidth = Dimensions.get('window').width,
  windowHeight = Dimensions.get('window').height