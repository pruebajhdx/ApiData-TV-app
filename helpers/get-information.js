const axios = require('axios');

const getData = async( url ) => {
    const data = await axios({
        method: "GET",
        url,
    });
    return data
}


module.exports = {
    getData,
}