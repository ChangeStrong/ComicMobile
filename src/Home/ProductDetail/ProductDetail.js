import React, {Component} from 'react'
import Dimen from  './../../../Tools/dimission'
import { GET,POST} from '../../../Tools/HttpUtil';
import * as HttpConfig from '../../../Tools/HttpConfig';

import {StyleSheet,
    Text,
    View,
    Button,
    Image,
    Alert,ScrollView,TouchableOpacity,FlatList} from 'react-native'


let scale = Dimen.scaleW;

class ChapterCell extends Component{
    constructor(props){
        super(props)
    }

    render() {
        var item = this.props.itemModel;
        // console.log(model);
        return (
            <TouchableOpacity onPress={() =>{this.props.clickItem(item)}}>
            <View style={styles.chapterItemBg}>
            <Text style={styles.chapterItem}>{item.name}</Text>
        </View>
            </TouchableOpacity>);

    }
}

export default class ProductDetail extends Component<Props>{

    static navigationOptions = {
        title:'作品详情',
    }

    constructor(props){
        super(props);
        this.state = {
            chapters:[],
            productInfo:{name:'',desciption:'',author:''},
        }
        this._clickItem = this._clickItem.bind(this);
    }

    _clickItem(item){
        console.log(item);
        const {navigation} = this.props;
        const productId =  navigation.getParam('productId','');
        item.productId = productId;
        //跳转观看界面
         this.props.navigation.navigate('ProductLookVc',{chapterItem:item});
    }

    _statReadProduct(){
        console.log('start read product.')
        if (this.state.chapters.length <= 0){
            Alert.alert('提示','没有可读章节');
            return;
        }
        let firstChapter = this.state.chapters[0];
        const {navigation} = this.props;
        const productId =  navigation.getParam('productId','');
        firstChapter.productId = productId;
        //跳转观看界面
        this.props.navigation.navigate('ProductLookVc',{chapterItem:firstChapter});
    }
    //此处关键字必须是item
    _ChapterCellItem = ({item}) => (
        <ChapterCell itemModel={item} clickItem={this._clickItem}></ChapterCell>
    )

    render(){
        return (
            <ScrollView style={styles.container}>
                <View style={styles.headerBg}>
                    <Image style={styles.productImag} source={{uri: this.state.productInfo.thumUrl}}>
                    </Image>

                    <View style={styles.headerRightBg}>
                    <Text style={styles.productName}>{this.state.productInfo.name}</Text>
                    <Text style={styles.authorName}>作者:{this.state.productInfo.author}</Text>
                    <Text style={styles.descripton}>{this.state.productInfo.desciption}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => {this._statReadProduct()}}>
                <Text style={styles.startReadButton}> {'开始阅读'}</Text>
                </TouchableOpacity>
                <View style={styles.bottomBgView}>
                    <FlatList style='styles.flatList'
                              data={this.state.chapters}
                              renderItem={this._ChapterCellItem}
                              keyExtractor={(item, index) => index.toString()} />
                </View>
             </ScrollView>
        );
    }

    _getChapterListData(productId){

         //请求章节列表
         let params = {
            productId:productId,
            pageNumber: 1,
            pageSize: 500,
        }
        POST(HttpConfig.kProductChapterList,params,(response) => {
            console.log(response);
            if (response.code === 0){
                //更新界面
                //  console.log(response.data.list);
                this.setState({
                    chapters:response.data.list,
                })
            }
        })
    }

    componentDidMount(): void {
        const {navigation} = this.props;
        const productId = navigation.getParam('productId','');
        console.log("productId="+productId);
        //请求作品详情
        let params = {
            productId:productId
        }
        POST(HttpConfig.kProductDetail,params,(response) => {
            console.log(response);
            if (response.code === 0){
                //更新界面
                this.setState({
                    productInfo:response.data.info,
                })
            }
        })

        //请求章节列表信息
        this._getChapterListData(productId);

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
        marginTop:10,
        marginLeft:5,
        backgroundColor:'red',
        width:151,
        height:151*(56.0/42.0)
    },
    headerRightBg:{
        flex:1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    productName:{
        marginTop:15,
        fontSize:18,
        marginBottom:20,
    },
    authorName:{
        marginTop:10,
    },
    descripton:{
      marginLeft:5,
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
        fontWeight: '400',

    },
    bottomBgView:{
        flex:1,
    },
    flatList:{
        flex:1,
    },
    chapterItemBg:{
      display:'flex',
      justifyContent:'center',
      alignItems:'flex-start',
        borderBottomWidth: 1,
        borderBottomColor:'gray',
        padding: 10,
    },
    chapterItem:{
        fontSize:18,
    }
})
