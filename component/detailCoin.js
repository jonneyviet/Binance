import React, { Component } from 'react';
import {StyleSheet, View, ScrollView, Dimensions, AsyncStorage, RefreshControl} from 'react-native';
import ItemCoin2 from './ItemCoin2';

import { config } from './config.js';
const IP_SERVER = config.data.IP_SERVER;


let getDetail  = async (symbol,callback) =>{
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    var url = IP_SERVER + '/getDetail?token='+fcmToken+'&symbol='+symbol;
    fetch(url).then((response) => response.json())
        .then((responseJson) => {
            let docs = responseJson.data;
            return callback({
                data: docs
            });
        })
        .catch((error) => {
            console.error(error);
        });
}

export default class detailCoin extends Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.getParam('symbol', 'DefaultTitle'),
    })
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        };
    }
    componentDidMount(){
        var that =this;
        let symbol =(this.props.navigation.state.params.symbol);
        getDetail(symbol,(data)=>{
            that.setState({'response':data.data});
        });
    }
    actionReload = async ()=>{
        let symbol =(this.props.navigation.state.params.symbol);
        this.setState({refreshing: true});
        getDetail(symbol,(data)=>{
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
            let d = new Date(response[item].date)
            let dateT = d.getDate()+"/"+d.getMonth()+"-"+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
            list.push(
                <ItemCoin2
                    key={item}
                    date={dateT}
                    price={response[item].price}
                    volume={response[item].volume}
                    percent={response[item].percent}
                    bgcolor={bc}
                />
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

