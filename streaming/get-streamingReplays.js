const cheerio = require('cheerio');
const { getData } = require('../helpers/get-information');


getReplays = async( listObj ) => {

    if ( listObj[0].eventTime == '') { // F1 replays

        const replays = [];
        const linkReplays = [];
        const dataReplay = {};

        const data = await getData(listObj[0].eventLinks)
            .then( dataHtml => dataHtml.data);
            
        const $ = cheerio.load(data);
        const objSelector = $( '#post-80076 > div > div > div > div > div > section >' + 
        'div > div > div > div > div > div > div > div > div.elementor-tabs-content-wrapper > div');
        
        objSelector.each( (idx, object) => {
            replays.push( $(object).text().replace(/(\''|''|\r)/gm, "")); 
            linkReplays.push($(object).children('center').children('iframe').attr('src')); 
        }); 
        
        const keysReplays = replays.filter( text => text != '');
        const valueReplays = linkReplays.filter( text => text != undefined);

        for ( let i = 0; i < keysReplays.length; i++){ 
            dataReplay[keysReplays[i]] = valueReplays[i]
        }
        
        return dataReplay;
    }
}

module.exports = {
    getReplays
}