
const searchWord = async(word, data) => {
    const filterDataSearch = data.filter(values => {
        const words = values.name.split(' ')
        if(words.includes(word)) {
            return values;
        }});
    return filterDataSearch;
}

module.exports = {
    searchWord
}