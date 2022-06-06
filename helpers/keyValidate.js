
const keyValidate = (req, data) => {

    const { key } = req.headers
    if (key === 'Mmjj5566?apiTvK1@too.sport.com') {
        return data
    } else {
        return 'Unauthorized access, an access key is required.'
    }
}

module.exports = {
    keyValidate
}