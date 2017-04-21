import React, { Component } from 'react';
import { 
    View, 
    AppRegistry
} from 'react-native';

export default class ProgressBar extends Component {
    constructor (props) {
        super(props);
        this.state = { progress: '50%' };
    }
    render () {
        return (
            <View style={{                          //Progress
                flex: 1,
                flexDirection: 'row',
                alignSelf: 'stretch',
                backgroundColor: '#DEDEDE',
                borderRadius: 6,
                height: 12,
                marginRight: -15,
                marginLeft: -15
            }}>
                <View style={{
                    backgroundColor: '#ffc600',
                    borderRadius: 6,
                    flex: 0,
                    flexBasis: this.state.progress
                }} />
            </View>
        );
    }
}

AppRegistry.registerComponent('ProgressBar', () => ProgressBar);