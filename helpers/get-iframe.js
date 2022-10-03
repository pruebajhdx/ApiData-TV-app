const cheerio = require('cheerio');
const { getData } = require('./get-information');

getIframe = async (i, listObj, type) => {
    link = String;

    if(type === 'Motors') {
        listObj.forEach(element => {
            if (element.id === parseInt(i)) {
                link = element.eventLinks
            }
        });
    } else {
        link = listObj[i].eventLinks
    }

    const iframeSrcStreaming = [];
    const data = await getData(link).then(dataHtml => dataHtml.data);
    const $ = cheerio.load(data);
    const objSelector = $('#main');

    objSelector.each((idx, main) => {
        iframeSrcStreaming.push({
            frameStreaming: $(main).find('iframe').attr('src')
        });
    })

    return iframeSrcStreaming;
}

getIframeChannel = async (value) => {

    const iframeSrcStreaming = [];
    const data = await getData(value).then(dataHtml => dataHtml.data);
    const $ = cheerio.load(data);
    const objSelector = $('#main');

    objSelector.each((idx, main) => {
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