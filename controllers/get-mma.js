const cheerio = require('cheerio');
const { getData } = require('../helpers/get-information');


const getListMma = async( url ) => {

    const data = await getData( url ).then( dataHtml => dataHtml.data);
    const $ = cheerio.load(data);
    const objSelector = $('#post-23938 > div > div > div > div > div');

    const date = [];
    const dataEvent = [];
   
    objSelector.each( (idx, objValue) => {
        $(objValue).children('section').each( (ids, valueSection) => {
            console.log($(valueSection).html())
            /* if(ids >= 1){
                console.log($(valueSection).find('.elementor-widget-container').children('h2').text())
            } */
            date.push($(valueSection).find('.elementor-heading-title').text());
            dataEvent.push({
                imgSrc: $(valueSection).find('.aligncenter').attr('src'),
                time: $(valueSection).find('.elementor-text-editor').children('h5').children('span').text(),
                name : $(valueSection).find('.name').text(),
                eventLinks: $(valueSection).find('.elementor-button-wrapper').children('a').attr('href')
            });
        });    
    }); 

    const cleaningDataDate = date.filter( data => data != '');
    const cleaningData = dataEvent.filter( (value) => value.imgSrc);
    cleaningData.push( { date: cleaningDataDate } );
    
    return cleaningData
}

const getIframeUfc = async( idx, data) => {
    const listFeed = await getListMma(data);
    const dataStreaming = await getIframe(idx, listFeed);
    return dataStreaming;
}

module.exports = {
    getListMma,
    getIframeUfc
}