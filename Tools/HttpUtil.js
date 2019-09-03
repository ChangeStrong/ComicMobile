/**
 * 网络请求工具类
 * @flow
 * url:请求地址
 * successCallback:成功回调
 * failCallback:失败回调
 */

import * as CommConfig from './HttpConfig';

let HttpUtil = {

    /**
     * Get请求，没有参数传null
     */
    fetchGet: (url, params, successCallback, failCallback) => {

         // 1.拼接参数
        url = CommConfig.URL_main + url;
        console.log('url:'+url);
        if (params) {
            var paramsBody = Object.keys(params)
                .reduce((a, k) => {
                    a.push(k + "=" + encodeURIComponent(params[k]));
                    return a;
                }, [])
                .join('&');
            url += "&" + paramsBody;
        }
        console.info(url);
        fetch(url)
            .then((response) => response.json())
            .then((responseObj) => {successCallback(responseObj)})
            .catch((error) => {
                failCallback(error);
            });
    },

    /**
     * POST请求
     */
    fetchPost: (url, params, successCallback, failCallback) => {
        url = CommConfig.URL_main + url;

        console.log('POST请求开始url:'+url+'参数：'+params);
        return fetch(url, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params,
          })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log('服务器数据:'+JSON.stringify(responseJson));
            successCallback(responseJson);
          })
          .catch((error) =>{
            failCallback(error);
            console.error('error:' + error);
          });
    }
}

export default HttpUtil;

export const GET = (url, params, callback, failCallback) => {
    let paramsArray = [];
    if (params) {
        // 拼接参数
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]));
        if (url.search(/\?/) === -1) {
            url += "?" + paramsArray.join("&");
        } else {
            url += "&" + paramsArray.join("&");
        }
    }
    // url = url +"&"+ "token=" + UserInfoManager.userToken;
    console.log(CommConfig.URL_main+url);
    // fetch请求
    return fetch(CommConfig.URL_main + url, {
        method: "GET",
    })
    .then((response) => {
        return response.json()
    })
    .then((responseJson) => {
        callback(responseJson)
    })
    .catch((error) => {
        failCallback(error);
    })
}

export const POST = (url, params, callback, failCallback) => {
    let paramsArray = [];

    // if (url.search(/\?/) === -1) {
    //     url += "?" + paramsArray.join("&");
    // } else {
    //     url += "&" + paramsArray.join("&");
    // }

    let paramStr = '';
    if (params){
        Object.keys(params).forEach(key => {
            paramsArray.push(key + '=' + params[key])
        });

       paramsArray.forEach(function (item,index) {
          if (index === 0){
              paramStr = paramStr + item;
          } else {
              paramStr = paramStr + '&' + item;
          }
       });
    }

    fetch(CommConfig.URL_main + url, {
        method: 'POST',
        body: paramStr,//JSON.stringify(params)
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
    .then((response) => response.json())
    .then((responseJson) => {
        callback(responseJson)
    })
    .catch((error) => {
        failCallback(error)
    });
}
