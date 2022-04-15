
const searchWord = async(word, data) => {
    const filterDataSearch = data.filter(values => {
        const words = values.name.split(' ')
        if(words.includes(word)) {
            return values;
        }});
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

module.exports = {
    searchWord,
    searchObjectDict
}