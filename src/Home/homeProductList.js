import React, {Component} from 'react'
import Dimen from  '../../Tools/dimission';
import { GET } from '../../Tools/HttpUtil';
import * as HttpConfig from '../../Tools/HttpConfig';

let scale = Dimen.scaleW;

import {StyleSheet,
    Text,
    View,
    Image,
    Alert,TouchableOpacity,
    SectionList} from 'react-native'

class ProductCell extends Component{
    constructor(props){
        super(props)
    }
    render() {
        var theModel = this.props.itemModel
        return (
            <View style={styles.cellContainer}>
                <TouchableOpacity onPress={() =>this.props.onPressItem(theModel)}>
                <Image
                    resizeMode={'cover'}
                    source={{uri: theModel.thumUrl}}
                    style={styles.cellImg}/>
                <View
                    style={styles.cellTitleViewStyle}
                >
                    <Text style={{padding:5.0}}>{theModel.name}</Text>
                    <Text style={styles.cellTitleItem}>{theModel.desciption}</Text>
                </View>
                </TouchableOpacity>
            </View>
        )
    }
}

let productListObject = null;
export class HomeProductList extends Component<Props>{
    constructor(props){
        super(props);
        this.state = {
            sections:[]
        }
        this.getData = this.getData.bind(this);
    }

    //给外部调用
    static loadingDidCreate(ref){
        productListObject = ref;
    }

    getData(){
        console.log('log Test...')
        let params = {
        }
        GET(HttpConfig.kHomeGetProducts,params,(response) => {
            console.log(response);
            if (response.code === 0){
                // console.log(response);
                let tempArr = response.data.Category.map((item,index) =>{
                    let tempData = {};
                    tempData.title = item.title;
                    tempData.data = item.items;
                    tempData.typeid =  item.type;
                    return tempData;
                })
                console.log(tempArr)
                //更新界面
                this.setState({
                    sections:tempArr
                })
                this.props.headRefreshDone();
            }
        },(error)=>{
            console.log('Request- failture'+error)
            this.props.headRefreshDone();
        })
    }
    _renderItem = ({item}) => (
        <ProductCell
            itemModel = {item}
            onPressItem={this.props.onPressItem}
        />
    )
    _clickSectionTitle(section){
        console.log(section);
        //跳转作品详情页
        this.props.navigation.navigate('ProductListVC',{section:section})

    }
    render() {
        return ( <View style={styles.container}>
            <SectionList  contentContainerStyle={styles.listViewSytle}
                sections={this.state.sections}
                renderItem={this._renderItem}
                renderSectionHeader={({section}) => (
                    <View style={styles.sectionHeader}>
                    <Text style={styles.sectionText}>
                    {section.title}</Text>
                        <TouchableOpacity onPress={()=>{this._clickSectionTitle(section)}}>
                        <Text>查看更多</Text>
                       </TouchableOpacity>
                    </View>
                )
                }
                keyExtractor={(item, index) => index}
            />
        </View>);
    }

    componentDidMount(): void {
        console.log('componentDidMount2----')
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:22
    },
    sectionHeader:{
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center',
        width: Dimen.window.width,
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    listViewSytle:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    sectionText: {
        fontSize: 14,
        fontWeight: 'bold',
    },

    cellContainer: {
        //flex:1, // 空间平均分布
        alignItems:'center',
        width:Dimen.window.width/2.0,
        padding:5,
    },
    cellTitleViewStyle:{
        justifyContent: "center"
    },
    cellImg: {
        width: Dimen.window.width/2.0-10,
        height: (Dimen.window.width/2.0-10)*(56.0/42.0),
        borderRadius: 10.0,
    },
    cellTitleItem:{
        overflow: 'hidden',
        height: 20,
        lineHeight:20,
        fontSize: 12,
        color: 'gray',
    }

})

/*
[
                    {title: '推荐漫画', data: [{name:'luoluo1',desciption:'作品描述',
                            iconUrl:'http://img0.pclady.com.cn/pclady/pet/choice/cat/1701/6.jpg'},
                            {name:'作品二',desciption:'作品描述2',
                            iconUrl:'http://img0.pclady.com.cn/pclady/pet/choice/cat/1701/6.jpg'}]},

                    {title: '最新漫画', data: [{name:'luoluo1',desciption:'作品描述',
                            iconUrl:'http://img0.pclady.com.cn/pclady/pet/choice/cat/1701/6.jpg'},
                            {name:'作品二',desciption:'作品描述2',
                                iconUrl:'http://img0.pclady.com.cn/pclady/pet/choice/cat/1701/6.jpg'}]},
                ]
 */
