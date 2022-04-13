const cheerio = require('cheerio');
const { getReplays } = require('./get-streamingReplays');
const { getIframe } = require('../helpers/get-iframe');
const { getData } = require('../helpers/get-information');

const getListFeed = async( url ) => {
    try {
        let count = 0
        const data = await getData(url).then(dataHtml => dataHtml.data)
        const $ = cheerio.load(data)
        const objSelector = $('#myTable > tr')
        const listObj = []
   
        objSelector.each( ( parentIdObject, value) => {
            $(value).children('td').children('a').each( (parentTdObject, valueSelector) => {
                count += 1
                listObj.push({
                    id         :  count - 1,
                    eventTime  : $(value).find('.matchtime').text(),
                    eventTitle : $(value).find('.event-title').text().replace(/(\r\n|\n|\r)/gm, " "),
                    imgTitle   : $(value).children('td').children('img').attr('src'),
                    nameLinks  : $(valueSelector).text(),
                    eventLinks : $(valueSelector).attr('href')
                });
                return
            });
          
        });
        return listObj;

    } catch (error) {
        console.error(error)
    }
}

const dataStreaming = async( idx, data ) => {
    const listFeed = await getListFeed(data);
    const dataStreaming = await getIframe(idx, listFeed);
    return dataStreaming;

}

const dataReplay = async( data ) => {
    const listReplay = await getListFeed(data);
    const dataReplay = await getReplays(listReplay);
    return dataReplay;
}

module.exports = {
    dataStreaming,
    dataReplay,
    getListFeed
}
