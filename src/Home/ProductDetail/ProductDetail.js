import React, {Component} from 'react'
import Dimen from  './../../../Tools/dimission'
import { GET } from '../../../Tools/HttpUtil';
import * as HttpConfig from '../../../Tools/HttpConfig';

import {StyleSheet,
    Text,
    View,
    Button,
    Image,
    Alert,ScrollView,TouchableOpacity} from 'react-native'


let scale = Dimen.scaleW;

export default class ProductDetail extends Component<Props>{

    static navigationOptions = {
        title:'作品详情',
    }

    constructor(props){
        super(props)
    }

    _statReadProduct(){
        console.log('start read product.')
    }

    render(){
        return (
            <ScrollView style={styles.container}>
                <View style={styles.headerBg}>
                    <Image style={styles.productImag} source={{uri: 'http://img0.pclady.com.cn/pclady/pet/choice/cat/1701/6.jpg'}}>
                    </Image>

                    <View style={styles.headerRightBg}>
                    <Text style={styles.productName}>作品名称</Text>
                    <Text style={styles.authorName}>作者</Text>
                    <Text style={styles.authorName}>描述0.012333</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => {this._statReadProduct()}}>
                <Text style={styles.startReadButton}> {'开始阅读'}</Text>
                </TouchableOpacity>
                <View style={styles.bottomBgView}>
                    <Text>章节列表</Text>
                </View>
             </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    headerBg:{
        flex:1,
        display:'flex',
        flexDirection:'row',
    },
    productImag:{
        backgroundColor:'red',
        width:151,
        height:151*(56.0/42.0)
    },
    headerRightBg:{
        flex:1,
        display: 'flex',
        flexDirection: 'column'
    },
    productName:{
        fontSize:18,
        marginBottom:20,
    },
    authorName:{
        marginTop:10,
    },
    startReadButton:{
        backgroundColor:'#F8D3AB',
        color:'white',
        width: Dimen.window.width-120,
        fontSize:18,
        marginTop: 10,
        marginLeft: 60,
        marginRight: 60,
        height: 40*scale,
        textAlign: 'center',
        lineHeight:40*scale,
        borderRadius:20*scale,


    },
    bottomBgView:{
        flex:1
    }
})
