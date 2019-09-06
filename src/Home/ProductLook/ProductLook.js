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
import {STATUSBAR_HEIGHT} from '../../../Tools/Layout';
let scale = Dimen.scaleW;

class  LookCell extends Component {
    constructor(props){
        super(props)
    }



    render(){
        var model = this.props.itemModel;
        // console.log(model);
        return (
            <View style={styles.cellBgView}>
                <Image style={styles.cellContentImage} source={{uri: model}}>

                </Image>
            </View>

        );
    }
}

export default class ProductLook extends Component{
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.chapterItem.name,
    });
    constructor(props){
        super(props)
        const {navigation} = this.props;
        const chapter = navigation.getParam('chapterItem',{});
        this.state = {
            allImages:[],
            currentChapterId:chapter.id,
            nextChapterId:-1,
            upChapterId:-1,
            isShowToolBar:false,
        }
    }

    _LookCellItem = ({item}) => (
        <LookCell itemModel={item}>

        </LookCell>
    )

    render() {
        // Image.prefetch('').then(
        //     (result)=>{
        //     }
        // ).catch(
        //     (error)=>{
        //
        //     }
        // );
        return (
            <View style={styles.container}>
            <FlatList
                      style={styles.flatList}
                      keyExtractor={(item, index) => index.toString()}
                      data={this.state.allImages}
                      renderItem={this._LookCellItem} />
            </View>
        );
    }
    //重新请求当前页面数据
    _onRetry(){
        this._onGetCurrentChapterData();
    }
    //请求章节图片信息
    _getChapterImageData(chapterId,productId){
        //请求章节列表
        let params = {
            chapterId:chapterId,
            productId:productId,
            pageNumber: 1,
            pageSize: 500,
        }
        // console.log(params);
        POST(HttpConfig.kProductGetChapter,params,(response) => {
            console.log(response);
            //更新界面
            if (response.code === 0){
                let chapter = response.data.Chapter;
                console.log(chapter);
                if (chapter.episodeVos.length === 0){
                   Alert.alert('无此章节资源','是否重试',
                       [
                           {text:'重试',onPress:()=>{this._onRetry()}},
                           {text:'取消',onPress:()=>{}}
                           ])
                    return;
                }
                this.state.currentChapterId = chapter.id;
                this.state.nextChapterId = chapter.nextChapterId;
                this.state.upChapterId = chapter.upChapterId;

                let  episode = chapter.episodeVos[0];
                console.log(episode);
                this.setState({
                    allImages:episode.resources,
                })
            }
        })
    }
    //获取当前章节详情
    _onGetCurrentChapterData(){
        const {navigation} = this.props;
        const chapter = navigation.getParam('chapterItem',{});
        console.log("chapterId="+this.state.currentChapterId+"productId="+chapter.productId);
        //获取章节图片
        this._getChapterImageData(this.state.currentChapterId,chapter.productId);
    }
    _onGetNextChapterData(){
        if (this.state.nextChapterId == -1){
            Alert.alert("已到最后一页");
            return;
        }
        this.state.currentChapterId = this.state.nextChapterId;
        this._onGetCurrentChapterData();
    }

    _onGetUpChapterData(){
        if (this.state.upChapterId == -1){
            Alert.alert("已到最前页");
            return;
        }
        this.state.currentChapterId = this.state.upChapterId;
        this._onGetCurrentChapterData();
    }

    componentDidMount(): void {
       this._onGetCurrentChapterData();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flatList:{
        flex:1,
        backgroundColor:'#E6E6FA',
    },
    //比列980x1381
    cellBgView:{
      flex:1
    },
    cellContentImage:{
        width:Dimen.window.width,
        height:Dimen.window.width*(1381.0/980.0),
    },
})
