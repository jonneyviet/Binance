import {Component} from "react";
import {AsyncStorage, Button, StyleSheet, Text, TextInput, View,Alert} from "react-native";
import React from "react";

import { config } from './config.js';
const IP_SERVER = config.data.IP_SERVER;

let getConfig =async (callback) =>{
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    var url = IP_SERVER + '/getConfig?token='+fcmToken;
    fetch(url).then((response) => response.json())
        .then((responseJson) => {
            let docs = responseJson.data;
            return callback({
                data: docs[0]
            });
        })
        .catch((error) => {
            console.error(error);
        });
}

export default class Setting extends Component{
    static navigationOptions = {
        title: 'Setting',
    };
    constructor(props) {
        super(props);
        this.state = {
                min:"",
                max:"",
                volume:""
        };
    }
    componentWillMount(){
        var that =this;
        getConfig((data)=>{
            if(typeof(data.data)!="undefined") {
                that.setState({'volume': data.data.volume});
                that.setState({'max': data.data.max});
                that.setState({'min': data.data.min});
            }
        });
    }
    componentDidMount(){

    }

    handleInputChangeVolume = async (text) => {
        this.setState({ "volume": text });
    }
    handleInputChangePercentUp = (text) => {
        this.setState({
            'max': text
        });
    }
    handleInputChangePercentDown = (text) => {
        this.setState({
            'min': text
        });
    }
    setStorage = async () =>{
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        const { volume, max, min } = this.state
        var url = IP_SERVER + '/addDevice?token='+fcmToken+'&volume='+volume+'&max='+max+'&min='+min;
        fetch(url).then(() => {
            this.props.navigation.navigate('Home',{ reload: true });
        }).catch((error) => {
                Alert(error);
        });

    }
    render () {
        const {volume,min,max} = this.state;
        return (
            <View>
                <View style={styles.group_input}>
                    <Text style={styles.input_label}>Volume</Text>
                    <TextInput style={styles.input}
                               underlineColorAndroid='transparent'
                               keyboardType='numeric'
                               onChangeText={this.handleInputChangeVolume}
                               value={String(volume)}
                    />
                </View>
                <View style={styles.group_input}>
                    <Text style={styles.input_label}>Percent Up (%)</Text>
                    <TextInput style={styles.input}
                               underlineColorAndroid='transparent'
                               keyboardType='numeric'
                               onChangeText={this.handleInputChangePercentUp}
                               value={String(max)}
                    />
                </View>
                <View style={styles.group_input}>
                    <Text style={styles.input_label}>Percent Down (%)</Text>
                    <TextInput style={styles.input}
                               underlineColorAndroid='transparent'
                               keyboardType='numeric'
                               onChangeText={this.handleInputChangePercentDown}
                               value={String(min)}
                    />
                </View>
                <View style={styles.group_input}>
                    <Button style={styles.btnSave}
                            onPress={this.setStorage}
                            title="Save"
                            color="#880e4f"
                    />
                </View>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    bottomButtons: {
        alignItems:'center',
        justifyContent: 'center',
        flex:1,
    },
    textBtn:{
        color:'white',
        fontWeight:'bold',
        alignItems:'center',
        fontSize:16,
    },
    group_input:{
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        marginBottom: 10,
    },
    input_label:{
        fontSize:16,
        fontWeight:'bold'
    },
    input: {
        height: 40,
        borderColor: '#404040',
        borderWidth: 1,
        paddingLeft: 10,
        paddingRight: 10,
    },
    btnSave:{
        width:160,
    }
})
