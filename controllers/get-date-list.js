const cheerio = require("cheerio");
const { getData } = require("../helpers/get-information");

const getDateF1 = async (url, type) => {
    const data = await getData(url).then((dataHtml) => dataHtml.data);
    const $ = cheerio.load(data);
    const objSelector = $("#main");
    const obj = [];

    if (type === "f1") {
        objSelector.each((idx, value) => {
            $(value)
                .find(".elementor-widget-wrap")
                .children("div")
                .each((ide, valueDiv) => {
                    if (
                        $(valueDiv)
                            .find(".elementor-widget-container")
                            .children("h2")
                            .text() !== ""
                    ) {
                        obj.push({
                            date: $(valueDiv)
                                .find(".elementor-widget-container")
                                .children("h2")
                                .text(),
                        });
                    }
                    $(valueDiv)
                        .children("div")
                        .children("table")
                        .find("tbody")
                        .children("tr")
                        .each((idb, valueTr) => {
                            obj.push({
                                time: $(valueTr).find(".matchtime").text()
                            });
                            obj.push({
                                name:  $(valueTr)
                                .find(".event-title")
                                .text()
                                .replace(/(\r\n|\n|\r)/gm, " ")
                            });
                        });
                });
        });
    }

    return obj;
};

module.exports = {
    getDateF1,
};
