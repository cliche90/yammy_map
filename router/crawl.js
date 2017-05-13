module.exports = (app) => {
    let express = require('express')
    let route = express.Router()
    let request = require('request');
    let cheerio = require('cheerio');

    let urlRequest = function (param) {
        return new Promise(function (resolve, reject) {
            let url = param;
            request(url, function (error, response, body) {
                try {
                    if (error) reject('Unexpected Error :::');
                    let $ = cheerio.load(body);
                    resolve($);
                    
                } catch(e) {
                    resolve();
                    console.log('request Error :::', e);
                }
            })
        });
    };

    route.get('/', (req, res)=>{
        res.send('Hello /yammy/map')
    })
    
    route.get('/yam', (req, res)=>{
        //frame 의 src 를 바탕으로 다시 검색
        // urlRequest('http://blog.naver.com/hamhaeran/221002478153')
        urlRequest('http://blog.naver.com/PostView.nhn?blogId=richard2828&logNo=220611771263&redirect=Dlog&widgetTypeCall=true&topReferer=http%3A%2F%2Fblog.naver.com%2FPostView.nhn%3FblogId%3Drichard2828%26logNo%3D220627228978%26categoryNo%3D6%26parentCategoryNo%3D-1%26viewDate%3D%26currentPage%3D%26postListTopCurrentPage%3D%26isAfterWrite%3Dtrue')
        .then(($)=>{
            if(!$) console.log('error .... request')
            // let urlReq = $('[href*="http://map.naver.com"]');
            // let urlReq = $('[class="se_map_link"]');
            let urlReq = $('div[class="se_mediaArea"] img');
            console.log('aaa',urlReq.length)
            // let urlReq = $('img');
            // console.log('urlReq',urlReq)

            let str = 'http://cstatic.map.naver.net/image?version=1.1&center=126.9530998,37.4756201&level=12&w=886&h=415&baselayer=default&markers=126.9530998,37.4756201&caller=naver_se3_blog&scale=2&dataversion=167.1'
            let reg = new RegExp('&markers=(.*?)&')
            console.log(reg.exec(str, '$1')[1])
            urlReq.each(function(i,obj) {
                console.log(i, ' : ', $(obj).attr('src'))
            })

            res.send('jajaja')
        },(err)=>{
            res.send('errorrorororo')
        })
    })
    return route
}