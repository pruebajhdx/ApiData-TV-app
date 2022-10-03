const cheerio = require("cheerio");
const { getIframe } = require("../helpers/get-iframe");
const { getData } = require("../helpers/get-information");


//Get information MotorSport's

const getMotoSport = async (url) => {
    let count = 0;
    const data = await getData(url).then((dataHtml) => dataHtml.data);
    const $ = cheerio.load(data);
    const objSelector = $("#post-24115 > div > div > div.elementor.elementor-24115 > div > div > section.elementor-section.elementor-top-section.elementor-element.elementor-element-c26eacf.elementor-section-boxed.elementor-section-height-default.elementor-section-height-default > div.elementor-container.elementor-column-gap-default > div > div > div > div");
    const result = []

    objSelector.each((idx, value) => {
        //$(value).find('.elementor-widget-container').find('.elementor-heading-title').text()
        $(value).find('.elementor-widget-container').each((idy, container) => {
            if ($(container).find('.elementor-heading-title').text() !== '') {
                result.push({
                    title: $(container).find('.elementor-heading-title').text().replace(/(\r\n|\n|\r)/gm, "")
                })

            }
            $(container).find('.table').children('tbody').children('tr').each((idf, tr) => {
                $(tr).children('td').find('a').each((idr, td) => {
                    count += 1;
                    result.push({
                        id: count - 1,
                        eventTime: $(tr).find('.matchtime').text(),
                        name: $(tr).find('.event-title').text().replace(/\n/g, ''),
                        imgTitle: $(tr).children('td').find('img').attr('src'),
                        nameLinks: $(td).text(),
                        eventLinks: $(td).attr('href'),
                    })
                })
            })

        })
    })
    return result;
}

const dataMotoSport = async(idx, data) => {
    const resultFeed = await getMotoSport(data);
    const dataStreaming = await getIframe(idx, resultFeed, 'Motors');
    return dataStreaming
}


module.exports = {
    getMotoSport,
    dataMotoSport
}