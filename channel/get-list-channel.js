const cheerio = require('cheerio');
const { getIframeChannel } = require('../helpers/get-iframe');
const { getData } = require('../helpers/get-information');

const dictChannel = {}

getListChannel = async( url ) => {
    
    const data = await getData(url).then( dataHtml => dataHtml.data);
    const $ = cheerio.load(data);
    const objSelectorTitle = $('#menu-live-channles');

    const keys = [];
    const values = [];

    objSelectorTitle.each(  (idx, channelTitle) => {
        $(channelTitle).children('li').each( (idc, obj) => {
            keys.push($(obj).children('a').text()); 
            values.push($(obj).children('a').attr('href'));
            $(obj).children('ul').children('li').each( (idxul, li) => {
                keys.push($(li).text());
                values.push($(li).children('a').attr('href'));
            }); 
        });
    });

    for (let i = 0; i < values.length; i++) {
        dictChannel[keys[i]] = values[i]; 
    }
    
    return dictChannel;
}

const getChannelLink = async( name ) => {

    const data = await getIframeChannel(dictChannel[name]) 
    return data;
}

module.exports = {
    getListChannel,
    getChannelLink
}