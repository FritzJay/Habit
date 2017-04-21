import React, { Component } from 'react';
import config from '../../config';
import ProgressBar from './ProgressBar/ProgressBar';
import { 
    View, 
    Text,
    Image,
    AppRegistry
} from 'react-native';

export default class HabitCard extends Component {
    render () {
        console.log(this.props.picture);
        return (
            <View style={{                  // Main Container
                flex: 1,
                flexDirection: 'column',
                backgroundColor: 'white',
                alignSelf: 'stretch',
                marginTop: 15,
                marginLeft: 15,
                marginRight: 15,
                padding: 15,
                borderColor: '#EEE',
                borderLeftColor: '#FFF',
                borderTopColor: '#FFF',
                borderStyle: 'solid',
                borderBottomWidth: 3,
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderTopWidth: 1,
                borderRadius: 5
            }}>
                <View style={{                      //Top container (Img, title, and info)
                    flex: 10,
                    flexDirection: 'row',
                    marginBottom: 10
                }}>
                    <View style={{                  //IMG container
                        flex: 3,
                        alignItems: 'center',
                        marginBottom: -10,
                    }}>
                        <Image 
                            style={{
                                    width: 100, 
                                    height: 120
                            }}
                            source={{ uri: "http://" + config.ip + ":" + config.port + "/pics/" + this.props.picture }}
                        />
                    </View>

                    <View style={{                  //Top right container (title, info)
                        flex: 4,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <View style={{                  //Title container
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'flex-end'
                        }}>
                            <Text style={{              // Title
                                flex: 1,
                                borderStyle: 'solid',
                                borderBottomColor: '#CFCFCF',
                                borderBottomWidth: 1,
                                marginBottom: 15
                            }}> 
                                {this.props.title}
                            </Text>
                            <Text style={{              //Info
                                flex: 3,
                                textAlign: 'center',
                                padding: 10,
                                borderColor: '#CFCFCF',
                                borderTopWidth: 1,
                                borderRightWidth: 2,
                                borderLeftWidth: 2,
                                borderBottomWidth: 3
                            }}>
                                {this.props.info}
                            </Text>
                        </View>
                    </View>
                </View>

                <ProgressBar accentColor={this.props.accentColor}/>

                <View style={{                          //Bottom Container (notes, icons, streak)
                    flex: 3,
                    flexDirection: 'row',
                    marginTop: 10
                }}>

                    <Text style={{                      //Notes
                        marginLeft: 15,
                        flex: 1,
                    }}>
                        {this.props.notes}
                    </Text>

                    <View style={{                      //Icons
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginRight: 15
                    }}>

                        <Image source={require('./edit.png')}
                            style={{
                                width: 20, 
                                height: 20
                            }}
                        />
                        <Image source={require('./heart.png')}
                            style={{
                                width: 20,
                                height: 20
                            }}
                        />
                        <Image source={require('./share.png')}
                            style={{
                                width: 20, 
                                height: 20
                            }}
                        />
                        <Image source={require('./notification.png')}
                            style={{
                                width: 20, 
                                height: 20
                            }}
                        />
                    </View>

                </View>
            </View>
        )
    }
}

AppRegistry.registerComponent('HabitCard', () => HabitCard);