const cheerio = require('cheerio');
const { getData } = require('./get-information');

getIframe = async ( i, listObj ) => {

    const iframeSrcStreaming = [];
    const data = await getData(listObj[i].eventLinks).then(dataHtml => dataHtml.data);
    const $ = cheerio.load(data);
    const objSelector = $('#main');

    objSelector.each( (idx, main) => {
        iframeSrcStreaming.push({
            frameStreaming: $(main).find('iframe').attr('src')
        }); 
    })

    return iframeSrcStreaming;
}

getIframeChannel = async ( value ) => {

    const iframeSrcStreaming = [];
    const data = await getData( value ).then(dataHtml => dataHtml.data);
    const $ = cheerio.load(data);
    const objSelector = $('#main');

    objSelector.each( (idx, main) => {
        iframeSrcStreaming.push({
            frameStreaming: $(main).find('iframe').attr('src')
        }); 
    })

    return iframeSrcStreaming;
}



module.exports = {
    getIframe,
    getIframeChannel
}