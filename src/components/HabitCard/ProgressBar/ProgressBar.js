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
    render (props) {
        const progressBorderRadius = (this.state.progress === '100%') ? 0 : 6;
        return (
            <View style={{                          //Progress
                flex: 1,
                flexDirection: 'row',
                alignSelf: 'stretch',
                backgroundColor: '#DEDEDE',
                height: 12,
                marginRight: -15,
                marginLeft: -15
            }}>
                <View style={{
                    backgroundColor: this.props.accentColor,
                    borderTopRightRadius: progressBorderRadius,
                    borderBottomRightRadius: progressBorderRadius,
                    flex: 0,
                    flexBasis: this.state.progress
                }} />
            </View>
        );
    }
}

AppRegistry.registerComponent('ProgressBar', () => ProgressBar);