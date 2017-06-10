import React, { Component } from 'react';
import { 
    View, 
    Easing
} from 'react-native';

export default class ProgressBar extends Component {

    render () {
        const progressBorderRadius = (this.progress >= 100) ? 0 : 6;
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
                    flexBasis: this.props.progress + '%'
                }}>
                </View>
            </View>
        );
    }
}