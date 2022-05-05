const cheerio = require("cheerio");
const { getIframe } = require("../helpers/get-iframe");
const { getData } = require("../helpers/get-information");

const getDataOtherLeague = async ( url ) => {
    const getHtml = await getData( url ).then((html) => html.data);
    const $ = cheerio.load(getHtml);
    const objSelector = $("#my-table > tbody");

    const data = [];
    const pirlo = process.env.URL_PILO

    objSelector.each((idx, value) => {
        $(value)
            .children("tr")
            .each((idtr, valueTr) => {
                data.push({
                    name: $(valueTr).find("b").text(),
                    type: $(valueTr).children('td:nth-child(2)').children('span').attr('class'),
                    eventTime: $(valueTr).find(".t").text(),
                    eventLinks: `${pirlo}${$(valueTr).children('td:nth-child(3)').children('a').attr('href')}`
                })
            });
    });

    let count = 0
    const filterByCountry = data.filter( (value) => {

        if (value.type === 'before co'){
            ++count
            value['id'] = count - 1
            value['championship'] = 'Liga Betplay'
            return value
        }

        if (value.type === 'before pe'){
            ++count
            value['id'] = count - 1
            return value
        }

       /*  if (value.type === 'before lib'){
            ++count
            value['id'] = count - 1
            value['championship'] = 'Copa Libertadores'
            return value
        }

        if (value.type === 'before csuda'){
            ++count
            value['championship'] = 'Copa Sudamericana'
            value['id'] = count - 1
            return value
        } */
        
    })

   return filterByCountry;
};


const getIframePirloTv = async( idx, url) => {
    const listFeed = await getDataOtherLeague(url);
    const dataStreaming = await getIframe(idx, listFeed);
    return dataStreaming;
}

module.exports = {
    getDataOtherLeague,
    getIframePirloTv
};
