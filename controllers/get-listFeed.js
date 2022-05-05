const cheerio = require('cheerio');
const { getReplays } = require('./get-streamingReplays');
const { getIframe } = require('../helpers/get-iframe');
const { getData } = require('../helpers/get-information');

//Get information F1, FOTBALL AND MOTOGP

const getListFeed = async( url ) => {
    let count = 0;
    const data = await getData(url).then(dataHtml => dataHtml.data);
    const $ = cheerio.load(data);
    const objSelector = $('#myTable > tr');
    const listObj = [];
    const date = []

    objSelector.each( ( parentIdObject, value) => {
        $(value).children('td').children('a').each( (parentTdObject, valueSelector) => {
            const selector = $(valueSelector).find('.elementor-heading-title').text();
            //
            count += 1;
            if(selector) {
                date.push(selector);
            }
            listObj.push({
                id         :  count - 1,
                eventTime  : $(value).find('.matchtime').text(),
                name : $(value).find('.event-title').text().replace(/(\r\n|\n|\r)/gm, " "),
                imgTitle   : $(value).children('td').children('img').attr('src'),
                nameLinks  : $(valueSelector).text(),
                eventLinks : $(valueSelector).attr('href')
            });
        });
    });

    if(date.length > 0) {
        listObj.push(date);
    }
    return listObj;
};

const dataStreaming = async( idx, data ) => {
    const listFeed = await getListFeed(data);
    const dataStreaming = await getIframe(idx, listFeed);
    return dataStreaming;

};

const dataReplay = async( data ) => {
    const listReplay = await getListFeed(data);
    const dataReplay = await getReplays(listReplay);
    return dataReplay;
};

const filterByLeagues = async(data) => {

    const key = [];
    const value = [];
    const dict = {};
    
    const listMatchesFootball = await getListFeed(data);
     Object.entries(listMatchesFootball).forEach( (idx) => {
         if (idx[1].imgTitle != undefined){
             let formatData = idx[1].imgTitle?.split('/');
             formatData = formatData[7].split('.').slice(0, 1).join();
             key.push(formatData);
             if(key.includes(formatData)){
                 value.push(idx[1].imgTitle.toString());
             }
         }
    });

    const removingDuplicatesKey = key.filter((item,index)=>{
        return key.indexOf(item) === index;
    });

    const removingDuplicatesValue = value.filter((item,index)=>{
        return value.indexOf(item) === index;
    });

    for (let i in removingDuplicatesKey) {
        dict[removingDuplicatesKey[i]] = removingDuplicatesValue[i];
    } 

    
    return dict;
};

module.exports = {
    dataStreaming,
    dataReplay,
    getListFeed,
    filterByLeagues
}
