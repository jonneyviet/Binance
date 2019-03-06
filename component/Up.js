import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Dimensions,
    AsyncStorage,
    Text,
    TouchableOpacity,
    RefreshControl
} from 'react-native';

import { config } from './config.js';
const IP_SERVER = config.data.IP_SERVER;

import ItemCoin from './ItemCoin';
let getData = async (callback) =>{
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    var url = IP_SERVER + '/getAll?token='+fcmToken+'&status=up';
    fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            var alarm =false;
            let  docs = responseJson.data;
            return callback({
                alarm : alarm,
                data : docs
            });
        })
        .catch((error) => {
            console.error(error);
        });

}

export default class Up extends Component {
    static navigationOptions = {
        title: 'Up',
    };
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        }
    }
    componentDidMount(){
        var that =this;
        getData((data)=>{
            that.setState({'response':data.data});
        });
    }
    actionReload = async ()=>{
        this.setState({refreshing: true});
        getData((data)=>{
            this.setState({'response':data.data});
            this.setState({refreshing: false});
        });
    }
    actionClick = async (symbol) =>{
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        var url = IP_SERVER + '/configNotification?token='+fcmToken+'&symbol='+symbol;
        let data = await fetch(url);
        getData((data)=>{
            this.setState({'response':data.data});
        });
    }
    render() {
        const {response} = this.state;
        var list = [];
        for(var item in response){
            var bc='#fff';
            if(response[item].status === 'down'){
                bc ='#ffcdd2';
            }
            if(response[item].status === 'up'){
                bc ='#c8e6c9';
            }
            list.push(
                <ItemCoin
                    key={item}
                    name={response[item].symbol}
                    price={response[item].price}
                    volume={response[item].volume}
                    min={response[item].min}
                    max={response[item].max}
                    alert={response[item].alert}
                    bgcolor={bc}
                    action={this.actionClick}
                ></ItemCoin>
            )
        }
        return (

            <View style={{flex: 1}}>
                <ScrollView style={styles.main}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.actionReload}
                                />
                            }
                >
                    <View style={styles.container}>
                        {
                            list
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const window = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    }
})

