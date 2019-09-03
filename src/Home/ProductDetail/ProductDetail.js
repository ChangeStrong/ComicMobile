import React, {Component} from 'react'
import Dimen from  './../../../Tools/dimission'
import { GET } from '../../../Tools/HttpUtil';
import * as HttpConfig from '../../../Tools/HttpConfig';

import {StyleSheet,
    Text,
    View,
    Button,
    Image,
    Alert,ScrollView} from 'react-native'


let scale = Dimen.scaleW;

export default class ProductDetail extends Component<Props>{

    // ProductDetail.propTypes ={
    //
    // }

    constructor(props){
        super(props)
    }

    render(){
        return (
            <ScrollView style={styles.container}>
                <View style={styles.headerBg}>
                    <Image style={styles.productImag} src={{uri: 'http://img0.pclady.com.cn/pclady/pet/choice/cat/1701/6.jpg'}}>

                    </Image>
                    <Text>作品名称</Text>
                    <Text>作者</Text>
                    <Text>描述0.012333</Text>
                </View>
                <View>
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

    },
    productImag:{
        width:151,
        height:151*(56.0/42.0)
    }
})
