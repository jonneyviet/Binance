import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, Alert} from 'react-native';
import { withNavigation } from 'react-navigation';
import { config } from './config.js';
const IP_SERVER = config.data.IP_SERVER;

class itemCoin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:props.alert
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ data: nextProps.alert });
    }
    render() {
        const { navigate } = this.props.navigation;
        let url ="";
        if(!this.props.alert){
            url = require('./assets/img/checked.png');
        }else {
            url =require('./assets/img/checked_not.png')
        }
        return (

                    <View style={[styles.item_coin_content,{backgroundColor:this.props.bgcolor}]}  >
                        <View style={[styles.alert]}>
                            <TouchableOpacity onPress={()=>this.props.action(this.props.name)}>
                                <Image style={[styles.checkbox]}
                                       source={url}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.item_coin_block_name}>
                            <Text style={[styles.item_coin,styles.name_coin,(this.props.bgcolor!='#fff')? styles.white:'']}>{this.props.name}</Text>
                            <Text style={[styles.item_coin,styles.priceS,(this.props.bgcolor!='#fff')? styles.white:'']}>{this.props.price}</Text>
                        </View>
                        <View style={[styles.item_coin_block_volume,styles.percent_block]}>
                            <Text style={[styles.item_coin,(this.props.bgcolor!='#fff')? styles.white:'']}>Volum</Text>
                            <Text style={[styles.item_coin,styles.data,(this.props.bgcolor!='#fff')? styles.white:'']}>{this.props.volume}</Text>
                        </View>
                        <View style={[styles.item_coin_block_min,styles.percent_block]}>
                            <Text style={[styles.item_coin,(this.props.bgcolor!='#fff')? styles.white:'']}>Min</Text>
                            <Text style={[styles.item_coin,styles.data,(this.props.bgcolor!='#fff')? styles.white:'']}>{this.props.min}%</Text>
                        </View>
                        <View style={[styles.item_coin_block_max,styles.percent_block]}>
                            <Text style={[styles.item_coin,(this.props.bgcolor!='#fff')? styles.white:'']}>Max</Text>
                            <Text style={[styles.item_coin,styles.data,(this.props.bgcolor!='#fff')? styles.white:'']}>{this.props.max}%</Text>
                        </View>
                        <View style={[styles.detail]}>
                            <TouchableOpacity onPress={() => navigate('Detail',{symbol:this.props.name})}>
                                <Image style={[styles.imgDetail]} source={require('./assets/img/detail.png')}/>
                            </TouchableOpacity>
                        </View>
                </View>
        );
    }
}
export default withNavigation(itemCoin);
const styles = StyleSheet.create({
    item_coin_content:{
        flex: 1,
        flexDirection: 'row',
        alignItems:'center',
        padding: 10,
        borderBottomColor: '#989898',
        borderBottomWidth: 1,
    },
    alert:{
        flex: 2,
        flexDirection: 'row',
        alignItems:'center',
        opacity:2
    },
    item_coin_block_name:{
        flex:7,
        paddingLeft: 10,
    },
    item_coin_block_volume:{
        flex:4,
        flexDirection: 'column',
        alignItems:'center'
    },
    item_coin_block_min:{
        flex:4,
        flexDirection: 'column',
        alignItems:'center'
    },
    item_coin_block_max:{
        flex:4,
        flexDirection: 'column',
        alignItems:'center'
    },
    detail:{
        flex: 1,
        flexDirection: 'row',
        alignItems:'center',
        textAlign: 'center',
    },
    item_coin: {
        alignSelf: 'stretch',
        textAlign: 'left',

    },
    name_coin:{
        fontSize:18,
        fontWeight: 'bold',
        color: '#990033',
    },
    priceS:{
        color: '#333333',
        fontWeight:'bold'
    },
    data:{
        color: '#333333',
        fontWeight: 'bold',
        fontSize: 14
    },
    white:{
        color:'#333333'
    },
    imgDetail:{
        padding: 10
    },
    checkbox:{
    }
})

