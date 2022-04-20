const cheerio = require('cheerio');
const { getIframe } = require('../helpers/get-iframe');
const { getData } = require('../helpers/get-information');

// Get information sport's NBA, BOXING and BASEBALL

const getListSports = async( selector, url ) => {

    const data = await getData( url ).then( dataHtml => dataHtml.data);
    const $ = cheerio.load(data);
    const objSelector = $(selector);

    const date = [];
    const dataEvent = [];

    objSelector.each( (idx, objValue) => {
        $(objValue).children('section').each( (ids, valueSection) => {
            date.push($(valueSection).find('.elementor-heading-title').text());
            if($(valueSection).find('.elementor-text-editor')){
                dataEvent.push({
                    time: $(valueSection).find('.elementor-text-editor').children('p').children('span').text(),
                    name : $(valueSection).find('h2').find('span').text(),
                    eventLinks: $(valueSection).find('.elementor-button-wrapper').children('a').attr('href')
                });
            };
        });    
    });

    
    const cleaningDataDate = date.filter( data => data != '');

    let cleaningData;

    if (cleaningDataDate[0] == 'MLB LIVE STREAM') {
        cleaningData = dataEvent.filter( (value) => value.name && value.eventLinks != undefined);
    } else {
        cleaningData = dataEvent.filter( (value) => value.eventLinks);
    }
    cleaningData.push( { date: cleaningDataDate } );
    
    let count =  0;
    if (cleaningData[0].time === ''){
        for ( let i= 0; i < cleaningData.length - 1; i++) {
            count++
            cleaningData[i]['id'] = count - 1;
            cleaningData[i].time = cleaningDataDate[i+2];
        }
    } else {
        for ( let i= 0; i < cleaningData.length - 1; i++) {
            count++
            cleaningData[i]['id'] = count - 1;
        }
    }
    
    return cleaningData;
}

const getIframeSports = async( idx, selector, data) => {
    const listFeed = await getListSports(selector, data);
    const dataStreaming = await getIframe(idx, listFeed);
    return dataStreaming;
}

module.exports = {
    getListSports,
    getIframeSports
}