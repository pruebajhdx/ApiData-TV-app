const { filterByLeagues, getListFeed } = require("../controllers/get-listFeed");

const searchWord = async(word, data) => {
    const filterDataSearch = data.filter(values => {
        if( values.name != undefined ) {
            const words = values.name.split(' ')
            if(words.includes(word)) {
                return values;
            }
        }
    });
    return filterDataSearch;
}

const searchObjectDict = async(word, data) => {
    const dataDict = {}
    Object.entries(data).forEach( (idx, value) => {
        const list = idx[0].toLowerCase().split(' ');
        if(list.includes(word)){
            dataDict[idx[0]] = idx[1];
        }
    });
    return dataDict;
}

const searchByLeague = async(word, data) => {
    const result = []
    const listAllEvent = await getListFeed(data); 
    const filterLeague = await filterByLeagues(data);
    
    listAllEvent.filter( (value) => {
        if( filterLeague[word] == value.imgTitle){
            result.push(value)
        }
    })
    return result;
}

module.exports = {
    searchWord,
    searchObjectDict,
    searchByLeague
}