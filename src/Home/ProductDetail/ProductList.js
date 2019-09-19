import React, {Component} from 'react'
import Dimen from  '../../../Tools/dimission';
import {GET, POST} from '../../../Tools/HttpUtil';
import * as HttpConfig from '../../../Tools/HttpConfig';
import PTRControl from 'react-native-ptr-control';
let scale = Dimen.scaleW;

import {StyleSheet,
    Text,
    View,
    Image,
    Alert,TouchableOpacity,FlatList,ActivityIndicator,
    SectionList} from 'react-native'
class FooterInfinite extends Component {
    static defaultProps = {
        gestureStatus: 1
    }

    constructor(props) {
        super(props)
    }

    render() {
        let {gestureStatus} = this.props, _refreshFont = ''
        switch (gestureStatus) {
            case 1:
                _refreshFont = 'pull-up-to-load-more'
                break;
            case 3:
                _refreshFont = 'release-to-load'
                break;
            case 5:
                _refreshFont = 'loading'
                break;
            default:
                _refreshFont = 'pull-up-to-load-more'
        }
        return (
            <View style={styles.footerInfinite}>
                {gestureStatus === 5 ?
                    <ActivityIndicator
                        size={'small'}
                        animating={true}
                        color={'#75c5fe'}
                        style={{marginRight: 10}}/> : null}
                <Text style={styles.refreshFont}>{_refreshFont}</Text>
            </View>
        );
    }
}

class ProductCell extends Component{
    constructor(props){
        super(props)
    }
    render() {
        var theModel = this.props.itemModel
        return (
            <View style={styles.cellContainer}>
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
            </View>
        )
    }
}

export default class ProductList extends Component{
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.section.title,
    });

    constructor(props){
        super(props);
        const {navigation} = this.props;
        const section = navigation.getParam('section',{});
        this.state = {
            list:[],
            section:section,
            pageNumber:1,
            paginationVo:{totalPage: 1},
            showFoot:0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
        }
        this.getData = this.getData.bind(this);
    }

    _renderItem = ({item}) => (
        <ProductCell
            itemModel = {item}
        />
    )

    getData(isHeadFresh){
        let params = {
            type:this.state.section.typeid,
            pageNumber:this.state.pageNumber,
            pageSize:2,
        }
        console.log('开始请求')
        POST(HttpConfig.kProductList,params,(response) => {
            console.log(response);
            if (response.code === 0){
                // console.log(response);
                let tempArr = response.data.list;
                console.log(tempArr);
                if (!isHeadFresh){
                    //上拉加载 拼接
                    tempArr = this.state.list.concat(tempArr);
                }
                let  foot = 0;
                if (this.state.pageNumber >= response.data.paginationVo.totalPage){
                    foot = 1;
                }
                //更新界面
                this.setState({
                    list:tempArr,
                    paginationVo:response.data.paginationVo,
                    showFoot:foot,
                })

            }
            if (isHeadFresh){
                //关闭下拉刷新
                PTRControl.headerRefreshDone();
            }else {
                // PTRControl.footerInfiniteDone()
            }

        },(error)=>{
            console.log('Request- failture'+error);
            if (isHeadFresh){
                //关闭下拉刷新
                PTRControl.headerRefreshDone();
            }else {
                // PTRControl.footerInfiniteDone()
            }

        })

    }

    _renderFooter(){
        if (this.state.showFoot === 1) {
            return (
                <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
                    <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>
                        没有更多数据了
                    </Text>
                </View>
            );
        } else if(this.state.showFoot === 2) {
            return (
                <View style={styles.footer}>
                    <ActivityIndicator />
                    <Text>正在加载更多数据...</Text>
                </View>
            );
        } else if(this.state.showFoot === 0){
            return (
                <View style={styles.footer}>
                    <Text></Text>
                </View>
            );
        }
    }

    _separator(){
        return <View style={{height:1,backgroundColor:'#999999'}}/>;
    }

    render() {
        return ( <View style={styles.container}>
            <PTRControl
                style={styles.ptctr}
                scrollComponent={'ScrollView'}
                onHeaderRefreshing={()=>{
                   //请求数据
                    console.log('下拉---')
                    this.state.pageNumber = 1;
                    this.getData(true);
                }}
                // enableFooterInfinite={true}
                // setFooterHeight={60}
                // onEndReachedThreshold={10}
                // renderFooterInfinite={
                //     (gestureStatus, offset) => <FooterInfinite gestureStatus={gestureStatus} offset={offset}/>
                // }
                // onFooterInfiniting={()=>{
                //     console.log('scroolview 的上拉刷新...');
                //     // if (this.state.pageNumber >= this.state.paginationVo.totalPage){
                //     //     Alert.alert('没有更多','敬请期待',
                //     //         [
                //     //             {text:'我知道了',onPress:()=>{}}
                //     //         ])
                //     //     PTRControl.footerInfiniteDone()
                //     //     return;
                //     // }
                //     // this.state.pageNumber = this.state.pageNumber +1;
                //     // this.getData(false);
                // }}

            >
               <FlatList
                   style={styles.flatList}
                   data={this.state.list}
                   renderItem={this._renderItem}
                   keyExtractor={(item, index) => index.toString()}
                   ListFooterComponent={this._renderFooter.bind(this)}
                   onEndReached={this._onEndReached.bind(this)}
                   onEndReachedThreshold={1}
                   ItemSeparatorComponent={this._separator}
               >
               </FlatList>
            </PTRControl>
        </View>);
    }
    _onEndReached(){
        console.log('上拉刷新2...');
        //如果是正在加载中或没有更多数据了，则返回
        if(this.state.showFoot != 0 ){
            return ;
        }
        //如果当前页大于或等于总页数，那就是到最后一页了，返回
        if((this.state.pageNumber!=1) && (this.state.pageNumber>=this.state.paginationVo.totalPage)){
            return;
        } else {
            this.state.pageNumber = this.state.pageNumber +1;
        }
        //底部显示正在加载更多数据
        this.setState({showFoot:2});
        this.getData(false);
    }
    componentDidMount(): void {

    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:5,
        paddingBottom: 60,
    },
    ptctr:{
      flex:1,
        position:'relative',
        backgroundColor:'red',
    },
    flatList:{
        flex:1,
        backgroundColor: 'yellow',
    },
    cellContainer: {
        //flex:1, // 空间平均分布
        alignItems:'center',
        width:Dimen.window.width,
        padding:5,
        display:'flex',
        flexDirection:'row',
        justifyContent: 'flex-start'
    },
    cellTitleViewStyle:{
        flex:1,
        display:'flex',
        flexDirection:'column',
        justifyContent: "center",
        alignItems: 'center',
        padding: 5.0,
    },
    cellImg: {
        width: Dimen.window.width/2.0-10,
        height: (Dimen.window.width/2.0-10)*(56.0/42.0),
        borderRadius: 10.0,
    },
    cellTitleItem:{
        // overflow: 'hidden',
        // height: 20,
        // lineHeight:20,
        fontSize: 12,
        color: 'gray',
    },
    footerInfinite: {
        width: Dimen.window.width,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    refreshFont: {
        fontSize: 16,
        color: '#b84f35'
    },

})
